const express = require('express');
const mongoose = require('mongoose');
const PORT = process.env.PORT || 3001;
const DBURI = process.env.MONGODB_URI || process.env.DB_URI;
const routes = require('./routes/routes')
const cookieParser = require('cookie-parser')
const { requireAuth, checkUser }= require('./middlewares/authMiddleware')


// LES MIDDLEWARES ON VERRA PLUS TARD


/* const { requireAuth, checkUser }= require('./middlewares/authMiddleware') */

const app = express();



// middleware
/* app.use(express.static('public')); */
app.use(express.json());
app.use(cookieParser());

app.set("views", __dirname + "/views");
app.set("view engine", "ejs");
app.use(express.static(__dirname + "/public"));

// database connection
const dbURI = 'mongodb+srv://ismaelbentatou:blabla123@cluster0.pnvb5it.mongodb.net/jobTracker';
mongoose.connect(dbURI)
    .then(() => {
        console.log('MongoDB connected successfully');
        return app.listen(PORT);
    })
    .then(() => {
        console.log(`App is listening on port ${PORT}`);
    })
    .catch((err) => console.error(err));
// routes
app.get('/', (req, res) => res.redirect('dashboard'));
app.use(routes);

//cookies

module.exports = app