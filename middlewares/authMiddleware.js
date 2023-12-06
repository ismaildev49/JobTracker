const jwt = require('jsonwebtoken');
const User = require('../models/user')

const requireAuth = (req, res, next) => {

    const token = req.cookies.jwt

    //check jwt exists

    if (token) {
        jwt.verify(token, 'crazy secret secret', (err, decodedToken) => {
            if (err) {
                console.log(err.message);
                res.redirect('/login');
            }
            else {
                console.log(decodedToken);
                next()
            }
        })
    }

    else {
        res.redirect('/login')
    };
}

// check current user
const checkUser = (req, res, next) => {
    const token = req.cookies.jwt;
    if (token) {
      jwt.verify(token, 'crazy secret secret', async (err, decodedToken) => {
        if (err) {
          res.locals.user = null;
          next();
          console.log('no')
        } else {
          let user = await User.findById(decodedToken.id);
          res.locals.user = user;
          console.log('yes')
          next();
        }
      });
    } else {
      res.locals.user = null;
      next();
    }
  };

module.exports = { requireAuth, checkUser };
