const express = require('express');
const mongoose = require('mongoose');
const routes = require('./routes/routes')
const cookieParser = require('cookie-parser')
const { requireAuth, checkUser }= require('./middlewares/authMiddleware')


// LES MIDDLEWARES ON VERRA PLUS TARD



/* const { requireAuth, checkUser }= require('./middlewares/authMiddleware') */

const app = express();



// middleware
app.use(express.static('public'));
app.use(express.json());
app.use(cookieParser());

// view engine
app.set('view engine', 'ejs');

// database connection
const dbURI = 'mongodb+srv://colas:avaT8sp70QPVOK8W@cluster0.mfbymrg.mongodb.net/jobtracker';
mongoose.connect(dbURI)
    .then((result) => app.listen(3000))
    .catch((err) => console.log(err));

// routes
app.get('*', checkUser);
/* app.get('/', (req, res) => res.render('home')); */
app.use(routes);

//cookies

