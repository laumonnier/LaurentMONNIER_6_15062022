// Will allow us to have a password at our convenience
const passwordValidator = require('password-validator');

// Create a schema
const passwordSchema = new passwordValidator();

// Add properties to it
passwordSchema
.is().min(7)    // Minimum length 7
.is().max(25)   // Maximum length 25
.has().uppercase()    // Must have uppercase letters
.has().lowercase()    // Must have lowercase letters
.has().digits(2)      // Must have at least 2 digits
.has().not().spaces() // Should not have spaces
.is().not().oneOf(['Passw0rd1', 'Password123', 'Password12','AzertY123', 'Azerty12']); //Blacklist these values



module.exports = (req, res, next) => {
    if(passwordSchema.validate(req.body.password)){
        next();
    }else{
        return res.status(400)
        .json({error: `The password is not developed enough ${passwordSchema.validate('req.body.password', { list: true })}` })
    }
}