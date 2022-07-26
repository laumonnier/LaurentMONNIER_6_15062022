const mongoose = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator');

// Allows to make a model-type of a user in order to respect it afterwards.
const userSchema = mongoose.Schema({
    email: {type: String, required: true, unique: true},
    password: {type: String, required: true}
});

userSchema.plugin(uniqueValidator);

module.exports = mongoose.model('User', userSchema);