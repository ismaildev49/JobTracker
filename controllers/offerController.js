const mongoose = require('mongoose');
const User = require('../models/user');
const Offer = require('../models/offer');
const jwt = require('jsonwebtoken')

module.exports.offer_post = async (req, res) => {

    const offerData = req.body

    try {

        let currentUser = res.locals.user

        if (!currentUser) {

            return res.status(404).json({ error: 'User not found' });
        }

        const offer = new Offer({ ...offerData, user: currentUser.id });
        await offer.save();
        console.log(offer)
        user.offers.push(offer._id);
        await user.save();
        res.status(201).json({ message: 'Offer created successfully', offer: offer });
    }

    catch (error) {

        console.error(error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
}

module.exports.offer_get = async (req, res) => {

    try {
        // TROUVER LE USER
        let currentUser = res.locals.user

        if (!currentUser) {
            return res.status(404).json({ error: 'User not found' });
        }

        const user = await User.findById(currentUser.id).populate('offers')
        if (!user) {
            return res.status(404).json({ error: 'User not found in the database' });
        }
        offers = user.offers;
        return res.status(201).json({ offers })
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
    //VA CHERCHER TOUTES LES OFFRES DU USER CONNECTE
    res.render('offer.ejs')
    console.log(res.locals.user.email)
}

module.exports.offer_get_id = async (req, res) => {
    let currentUser = res.locals.user;
    
    const offerID = req.params.id;
    const offer = await Offer.findById(offerID);
    
    if(offer.user.toString() === currentUser.id.toString()){
        console.log ('Offer and User matching')
        res.send(offer);
    }
    else {
        console.log ('Offer and user not matching')
        res.status(500).json({ error: 'Not authorized' });
    }
}
/* module.exports.offer_update = () => {
    //MET A JOUR LES DONNEES D'UNE OFFRE SPECIFIQUE
}
module.exports.offer_delete = () => {
    //SUPPRIME UNE OFFRE SPECIFIQUE
} */