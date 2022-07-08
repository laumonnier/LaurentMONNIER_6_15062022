//Importing Express and mangoose to link the server to the database.
const express = require('express');
const mongoose = require('mongoose');

const sauceRoutes = require('./routes/sauces');
const userRoutes = require('./routes/user');

const path = require('path');

const app = express();

//Connecting our API to our database
mongoose.connect('mongodb+srv://mognal:HTDP12htdp45@cluster0.lbywk93.mongodb.net/?retryWrites=true&w=majority',
    {useNewUrlParser: true,
     useUnifiedTopology: true})
    .then(() => console.log('Connexion à MongoDB réussi !'))
    .catch(() => console.log('Connexion à MongoDB échouée !'));

// Ability to access the body of the query
app.use(express.json());

// Addition of "headers" allowing communication between different port servers
app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
    next();
});

app.use('/images', express.static(path.join(__dirname, 'images')));
app.use('/api/sauces', sauceRoutes);
app.use('/api/auth', userRoutes);


// Exporting the "app"
module.exports = app;