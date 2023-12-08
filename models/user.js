const mongoose = require('mongoose');
const Offer = require('../models/offer');
const { isEmail } = require('validator');
const bcrypt = require('bcrypt');


const userSchema = new mongoose.Schema({
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    email: {
        type: String,
        required: true,
        unique: true,
        lowercase: true,
        validate: [isEmail, 'Invalid email format']
    },
    github: { type: String, unique: true },
    profilePicture: { type: String },
    CV: { type: String },
    password: { type: String, required: true, minlength: 6 },
    offers: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Offer'
    }],
});

const User = mongoose.model('User', userSchema);

module.exports = User;