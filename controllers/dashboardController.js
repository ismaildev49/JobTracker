const mongoose = require('mongoose');
const User = require('../models/user');
/* const Offer = require('../models/offer'); */

module.exports.dashboard_get = (req, res, err) => {
    if(err) {
        res.send(err)
    }
    res.render('dashboard');

}