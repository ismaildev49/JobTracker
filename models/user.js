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

userSchema.pre('save', async function (next) {
    const salt = await bcrypt.genSalt()
    this.password = await bcrypt.hash(this.password, salt)
    next()
  })
  
  //Static method to login user
  
  userSchema.statics.login = async function(email, password) {
    const user = await this.findOne({email});
    if (user) {
        try {
            const auth = await bcrypt.compare(password, user.password);
            if (auth) {
                return user;
            } else {
                throw Error('Incorrect password');
            }
        } catch (err) {
            console.error('Error during bcrypt.compare:', err);
            throw Error('An error occurred during login');
        }
    }
    throw Error('Incorrect email');
  };
  
const User = mongoose.model('User', userSchema);

module.exports = User;