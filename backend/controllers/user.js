const bcrypt = require('bcrypt');
const User = require('../models/user');
const jwt = require('jsonwebtoken');

// Additions of the various endpoints
// business logic for creating a user account
exports.signup = (req, res, next) => {
    console.log("J\'utilise la middleware signup !");
    const salt = bcrypt.genSaltSync(14);
    bcrypt.hash(req.body.password, salt)
        .then(hash => {
            const user = new User({
                email: req.body.email,
                password: hash
            });
            user.save()
                .then(() => {
                    res.status(201)
                    .json({message: 'User created !'})
                })
                .catch(error => {
                    res.status(400)
                    .json({error: error})
                });
        })
        .catch(error => {
            res.status(500)
            .json({error: error})
        });
};

// business logic concerning the login of a user account
exports.login = (req, res, next) => {
    console.log("J\'utilise la middleware login !");
    User.findOne({email: req.body.email})
        .then (user => {
            if(!user) {
                return res.status(401)
                .json({message:'email/mot de passe non permis !'});
            }
            bcrypt.compare(req.body.password, user.password)
                .then(valid => {
                    if(!valid){
                        return res.status(401)
                        .json({message:'email/mot de passe non permis !'});
                    }else{
                        res.status(200)
                        .json({
                            userId: user._id,
                            token: jwt.sign(
                                {userId: user._id},
                                process.env.TOKEN,
                                {expiresIn: '12h'}
                            )
                        });
                    }
                })
                .catch(error => {
                    res.status(500)
                    .json({error: error})
                });
        })
        .catch(error => {
            res.status(500)
            .json({error: error})
        });
};