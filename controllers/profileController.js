const mongoose = require('mongoose');
const User = require('../models/user');
const Offer = require('../models/offer');
const jwt = require('jsonwebtoken')


module.exports.profile_get = (req, res) => {
    //AFFICHE LA PAGE PROFIL DU USER, REDIRECT VERS LOGIN SI PAS DE TOKEN
    res.render('profile.ejs')
}
module.exports.profile_update = async (req, res) => {
    // UPDATE LES INFORMATION DU USER DANS LA DB
    const {firstName, lastName, email, github, profilePicture, cv, password} = req.body
    const token = req.cookies.jwt    
    if (token) {
        console.log('got token');
        jwt.verify(token, 'crazy secret secret', async (err, decodedToken) => {
            if (err) {
                console.log(err.message);
                res.redirect('/')
            } else {
                try {
                    await User.findOneAndUpdate(
                        {_id : decodedToken.id},
                        {$set : {
                            firstName,
                            lastName,
                            email, 
                            github, 
                            profilePicture, 
                            cv, 
                            password
                        }});
                        res.redirect('/profile')
                } catch (error) {
                    console.log(error);
                }
                
            }
        })
    } else {
        res.redirect('/login')
    }
};


module.exports.profile_delete = async (req, res) => {
    //AJOUTER UN MESSAGE DE WARNING
    //SUPPRIME LE USER DE LA DB

    const token = req.cookies.jwt    
    if (token) {
        jwt.verify(token, 'crazy secret secret', async (err, decodedToken) => {
            if (err) {
                console.log(err.message);
                res.redirect('/')
            } else {
                await User.findOneAndDelete({_id : decodedToken.id})
                res.send(`User ${decodedToken.id} correctly deleted`)
            }
        })
    } else {
        res.redirect('/login')
    }
    

}