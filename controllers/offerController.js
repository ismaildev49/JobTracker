const mongoose = require('mongoose');
const User = require('../models/user');
const Offer = require('../models/offer');
const jwt = require('jsonwebtoken')

module.exports.offer_post = async (req, res) => {

    const offerData = req.body;

    try {
        let currentUser = res.locals.user;

        if (!currentUser) {
            return res.status(404).json({ error: 'User not found' });
        }

        const offer = new Offer({ ...offerData, user: currentUser.id });
        await offer.save();

        // Corrected line: use currentUser.offers instead of user.offers
        currentUser.offers.push(offer._id);

        await currentUser.save();

        res.status(201).json({ message: 'Offer created successfully', offer: offer });
    } catch (error) {
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

    if (!offer) {
        return res.status(404).json({ error: 'Offer not found' });
    }

    if (offer.user.toString() === currentUser.id.toString()) {
        console.log('Offer and User matching')
        res.send(offer);
    }
    else {
        console.log('Offer and user not matching')
        res.status(403).json({ error: 'Not authorized' });
    }
}


/* A TESTER  */

module.exports.offer_update = async (req, res) => {

    module.exports.offer_update = async (req, res) => {
        const offerData = req.body;
        let currentUser = res.locals.user;

        const offerID = req.params.id;
        const offer = await Offer.findById(offerID);

        try {
            if (!offer) {
                return res.status(404).json({ error: 'Offer not found' });
            }

            if (offer.user.toString() === currentUser.id.toString()) {
                console.log('Offer and User matching');

                const updatedOffer = await Offer.findByIdAndUpdate(offerID, offerData, { new: true });

                console.log('Offer successfully updated:', updatedOffer);
                res.status(200).json({ message: 'Offer successfully updated', offer: updatedOffer });
            } else {
                console.log('Offer and user not matching');
                res.status(403).json({ error: 'Not authorized' });
            }
        } catch (error) {
            console.error('Error updating offer:', error);
            res.status(500).json({ error: 'Internal Server Error' });
        }
    };
}


module.exports.offer_delete = async (req, res) => {
    try {
        console.log('hello')
        let currentUser = res.locals.user;

        const offerID = req.params.id;

        // Find the offer to be deleted
        const offer = await Offer.findById(offerID);

        if (!offer) {
            return res.status(404).json({ error: 'Offer not found' });
        }

        // Check if the current user is the owner of the offer
        if (offer.user.toString() === currentUser.id.toString()) {
            console.log('Offer and User matching');

            // Remove the offer from the user's "offers" array
            await User.findByIdAndUpdate(currentUser.id, {
                $pull: { offers: offerID }
            });

            // Delete the offer
            await offer.deleteOne();

            console.log('Offer successfully deleted');
            res.status(200).json({ message: 'Offer successfully deleted' });
        } else {
            console.log('Offer and user not matching');
            res.status(403).json({ error: 'Not authorized' });
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
}