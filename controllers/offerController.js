const mongoose = require('mongoose');
const User = require('../models/user');
const Offer = require('../models/offer');
const jwt = require('jsonwebtoken')

module.exports.offer_post = async (req, res) => {

    const token = req.cookies.jwt
    console.log(req.body);
    const offerData = req.body
    if (token) {
        try {
            jwt.verify(token, 'crazy secret secret', async (err, decodedToken) => {
                if (err) {
                    console.log(err.message);
                    } else {
                        try {
                            let user = await User.findById(decodedToken.id)
                            const offer = new Offer({...offerData, user : user.id})
                            await offer.save()
                            user.offers.push(offer._id)
                            await user.save()
                            res.redirect('/')
                        } catch (error) {
                            console.log(`An error occured when attempting to find the user by his ID, or when creating and saving the offer, or when saving the id of the offer in the user, or when saving the user : ${error}`);
                        }
                        
                    }
                })
        } catch (error) {
            console.log("JWT token not valid : " + error);
            res.redirect('/login')
        }
        
    } else {
        res.redirect('/login')
    }
    
}


module.exports.offer_get = (req, res) => {
    res.render('create_offer')
}

module.exports.offer_get_id = async (req, res) => {
    const offerId = req.params.id
    const offer = await Offer.findById(offerId)
    res.locals.offer = offer       
    res.render('display_offer')        
    console.log(offer);
}




module.exports.offer_update = async (req, res) => {

    const offerId = req.params.id
    const {title, company, website, contact, origin, status, comment} = req.body
    try {
        await Offer.findOneAndUpdate(
            {_id : offerId},
            {$set : {
                title,
                company,
                website, 
                contact, 
                origin, 
                status, 
                comment,
            }});
            console.log("offer updated");
            res.redirect('/')
    } catch (error) {
        console.log(error)
    }
}


module.exports.offer_delete = async (req, res) => {
    const offerId = req.params.id
    const token = req.cookies.jwt

    if (token) {
        jwt.verify(token, 'crazy secret secret', async (err, decodedToken) => {
            if (err) {
                console.log(err.message);
                res.redirect('/login');
            }
            else {
                const userId = decodedToken.id 
                await User.updateOne(
                    {_id : userId},
                    {$pull : {offers : offerId}
                })
                await Offer.findOneAndDelete(
                    {_id : offerId})
                res.redirect('/')
                
            }
        })
    }


    
}