const mongoose = require('mongoose');
const User = require('../models/user');
const Offer = require('../models/offer');


module.exports.profile_get = (req, res) => {
    //AFFICHE LA PAGE PROFIL DU USER, REDIRECT VERS LOGIN SI PAS DE TOKEN
    res.render('profile.ejs')
}
module.exports.profile_update = (req, res) => {
    //UPDATE LES INFORMATION DU USER DANS LA DB
    res.render('profile.ejs')
}
module.exports.profile_delete = (req, res) => {
    //SUPPRIME LE USER DE LA DB
    res.render('profile.ejs')
}