const mongoose = require('mongoose');
const User = require('../models/user');
const Offer = require('../models/offer');
const jwt = require('jsonwebtoken')
const { requireAuth, checkUser } = require('../middlewares/authMiddleware');



module.exports.offer_post = async (req, res) => {
    const { title, company, website, contact, origin, status, comment } = req.body;

    try {
        let token = req.cookies.jwt
        const decoded = jwt.verify(token, 'crazy secret secret');
        let userID = decoded.id
        const user = await User.findById(userID);
        console.log(user)

        if (!user) {
            return res.status(404).json({ error: 'User not found' });
        }
        const newOffer = {
            title,
            company,
            website,
            contact,
            origin,
            status,
            comment,
        };

        user.offers.push(newOffer);
        await user.save();
        res.status(201).json({ message: 'Offer created successfully', offer: newOffer });
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error' });
      }
}
module.exports.offer_get = (req, res) => {
    //VA CHERCHER TOUTES LES OFFRES DU USER CONNECTE
    res.render('offer.ejs')
    console.log(res.locals.user.email)
}
/* module.exports.offer_get_id = () => {
    //FETCH UNE OFFRE SPECIFIQUE GRACE A UNE ID
}
module.exports.offer_update = () => {
    //MET A JOUR LES DONNEES D'UNE OFFRE SPECIFIQUE
}
module.exports.offer_delete = () => {
    //SUPPRIME UNE OFFRE SPECIFIQUE
}
 */