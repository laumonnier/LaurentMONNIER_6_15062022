//Importing Express and mangoose to link the server to the database.
const express = require('express');
const helmet = require('helmet');
const session = require('cookie-session');
const mongoose = require('mongoose');
require('dotenv').config();

const sauceRoutes = require('./routes/sauces');
const userRoutes = require('./routes/user');

const path = require('path');

const app = express();

//Connecting our API to our database
mongoose.connect(process.env.SECRET_DB,
    {useNewUrlParser: true,
     useUnifiedTopology: true})
    .then(() => console.log('Connexion à MongoDB réussi !'))
    .catch(() => console.log('Connexion à MongoDB échouée !'));

// Ability to access the body of the query
app.use(express.json());

//Helmet helps us secure our Express applications by defining various HTTP headers
//Helmet helps us secure our applications against XSS attacks
app.use(helmet());

//Prevents some JS code injection-type breaches on the client side, allowing access to a user’s identifying data, thanks to a cookie
//ATTENTION: This is an example, it is not functional
let expiryDate = new Date(Date.now() + 60 * 60 * 1000); // 1 hour
app.use(session({
    name: 'roro',
    keys: ['key1', 'key2'],
    cookie: {
                secure: true, // Avoid that the cookie is intercepted by an attack of type «Man In The Middle».
                httpOnly: true, //  Prevents injection attacks with session data recovery.
                path: 'foo/bar',
                expires: expiryDate 
    }
}));

// Addition of "headers" allowing communication between different port servers
app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', 'http://localhost:4200');
    res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
    res.setHeader('Cross-Origin-Resource-Policy', 'cross-origin');
    next();
});

// This tells Express how to statically manage the "images" resource each time it receives a query to the "/images" route.
app.use('/images', express.static(path.join(__dirname, 'images')));

app.use('/api/sauces', sauceRoutes);
app.use('/api/auth', userRoutes);


// Exporting the "app"
module.exports = app;