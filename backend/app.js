
//Importing Express and mangoose to link the server to the database.
const express = require('express');
const mongoose = require('mongoose');
const sauceRoutes = require('./routes/sauces');

const app = express();

//Connecting our API to our database
mongoose.connect('mongodb+srv://mognal23:LAU12htdp45@cluster0.v4x3lde.mongodb.net/?retryWrites=true&w=majority',
    {useNewUrlParser: true,
     useUnifiedTopology: true})
    .then(() => console.log('Connexion à MongoDB réussi !'))
    .catch(() => console.log('Connexion à MongoDB échouée !'));

// Ability to access the body of the query
app.use(express.json());

// Addition of "headers" allowing communication between different port servers
app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Header', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization');
    res.setHeader('Access-Control-Allow-Method', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
    next();
});

// Additions of the various endpoints

app.post('api/auth/signup',(req, res, next) => {

});

app.post('api/auth/login',(req, res, next) => {

});

app.use('/api/sauces', sauceRoutes);

// Additions of the various endpoints

router.get('/',(req, res, next) => {
    res.json('Requête reçue !');
    next();
});

router.get('/:id', (req, res, next) => {

});

router.post('/',(req, res, next) => {

});

router.put('/:id',(req, res, next) => {

});

router.delete('/:id',(req, res, next) => {

});

router.post('/:id/like',(req, res, next) => {

});

// Exporting the "app"
module.exports = app;