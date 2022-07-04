const express = require('express');
const mongoose = require('mongoose');

const app = express();

mongoose.connect('mongodb+srv://mognal23:LAU12htdp45@cluster0.v4x3lde.mongodb.net/?retryWrites=true&w=majority',
    {useNewUrlParser: true,
     useUnifiedTopology: true})
    .then(() => console.log('Connexion à MongoDB réussi !'))
    .catch(() => console.log('Connexion à MongoDB échouée !'));

app.use(express.json());

app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Header', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization');
    res.setHeader('Access-Control-Allow-Method', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
    next();
});

app.post('/api/auth/signup',(req, res, next) => {

});

app.post('/api/auth/login',(req, res, next) => {

});

app.get('/api/sauces',(req, res, next) => {
    res.json('Requête reçue !');
    next();
});

app.get('/api/sauces/:id', (req, res, next) => {

});

app.post('/api/sauces',(req, res, next) => {

});

app.put('/api/sauces/:id',(req, res, next) => {

});

app.delete('/api/sauces/:id',(req, res, next) => {

});

app.post('/api/sauces/:id/like',(req, res, next) => {

});

module.exports = app;