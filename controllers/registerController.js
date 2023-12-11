const mongoose = require('mongoose');
const User = require('../models/user');
const Offer = require('../models/offer');
const jwt = require('jsonwebtoken');
const { response } = require('express');

// handle errors

const handleErrors = (err) => {
    console.log(err.message);
    console.log(err.code);
    let errors = {
        email: '',
        password: '',
    }
    //duplicate error code

    if (err.code === 11000) {
        errors.email = 'that email is already registered'
        return errors;
    }
    //validation errors


    if (err.message.includes('user validation failed')) {
        Object.values(err.errors).forEach(error => {
            let properties = error.properties;
            errors[properties.path] = properties.message
        })
    }

    //incorrect email

    if (err.message === 'incorrect email') {
        errors.email = 'that email is not registered'
     }

     //incorrect password

     if (err.message === 'incorrect password') {
        errors.password = 'that password is incorrect'
     }

    return errors;
}

// create tokens

const maxAge = 3 * 24 * 60 * 60 * 1000

const createToken = (id) => {
    return jwt.sign({ id }, 'crazy secret secret', {
        expiresIn: maxAge
    })
}

module.exports.register_get = (req, res) => {
    //RENDER LA PAGE REGISTER
    res.render('register.ejs')
}
module.exports.register_post = async(req, res) => {
    //AJOUTER UN USER DANS LA DB

        const { firstName, lastName, email, github, profilePicture, CV, password, offers } = req.body;
    
        try {
            const user = await User.create({  firstName, lastName, email, github, profilePicture, CV, password, offers });
            const token = createToken(user._id);
            res.cookie('jwt', token, {
                httpOnly: true,
                maxAge: maxAge
            })
            res.status(201).json({ user: user._id });
        }
        catch (err) {
            const errors = handleErrors(err)
            res.status(400).json({ errors })
        }
    
        console.log("user created" + email, password);
    
        /* res.send('new signup'); */

    
}