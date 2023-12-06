const mongoose = require('mongoose');
const User = require('../models/user');
const Offer = require('../models/offer');

//handle errors
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


module.exports.login_get = (req, res) => {
    res.render('login.ejs')
}
module.exports.login_post = (req, res) => {
    module.exports.login_post = async (req, res) => {
        const { email, password } = req.body;
    
        try {
            const user = await User.login(email, password);
            const token = createToken(user._id);
            res.cookie('jwt', token, {
                httpOnly: true,
                maxAge: maxAge
            })
            res.status(200).json({ user: user._id });
    
        }
        catch (err) {
            const errors = handleErrors(err)
            res.status(400).json({ errors });
        }
    }
}