
//Importing Express and mangoose to link the server to the database.
const express = require('express');
const mongoose = require('mongoose');

const sauceRoutes = require('./routes/sauces');

//Connecting our API to our database
mongoose.connect('mongodb+srv://mognal23:LAU12htdp45@cluster0.v4x3lde.mongodb.net/?retryWrites=true&w=majority',
    {useNewUrlParser: true,
     useUnifiedTopology: true})
    .then(() => console.log('Connexion à MongoDB réussi !'))
    .catch(() => console.log('Connexion à MongoDB échouée !'));

const app = express();

// Addition of "headers" allowing communication between different port servers
app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Header', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization');
    res.setHeader('Access-Control-Allow-Method', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
    next();
});

// Ability to access the body of the query
app.use(express.json());

app.use('/api/sauces', sauceRoutes);


// Exporting the "app"
module.exports = app;