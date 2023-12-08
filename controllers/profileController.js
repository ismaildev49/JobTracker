const mongoose = require('mongoose');
const User = require('../models/user');
const Offer = require('../models/offer');


module.exports.profile_get = (req, res) => {
    //AFFICHE LA PAGE PROFIL DU USER, REDIRECT VERS LOGIN SI PAS DE TOKEN
    res.render('profile.ejs')
}
module.exports.profile_update = async (req, res) => {
    // UPDATE LES INFORMATION DU USER DANS LA DB
    const userData = req.body;
    let currentUser = res.locals.user;

    const userID = currentUser.id;

    try {
        const user = await User.findByIdAndUpdate(userID, userData, { new: true });

        if (!user) {
            return res.status(404).json({ error: 'User not found' });
        }

        console.log('User successfully updated:', user);
        res.status(200).json({ message: 'User successfully updated', user });
    } catch (error) {
        console.error('Error updating user:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};


module.exports.profile_delete = async (req, res) => {
    //AJOUTER UN MESSAGE DE WARNING
    //SUPPRIME LE USER DE LA DB
    const userData = req.body
    let currentUser = res.locals.user;

    const userID = currentUser.id;
    const user = await Offer.findOneAndDelete(userID);

}