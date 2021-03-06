const Sauce = require('../models/sauce');
const fs = require('fs');

// business logic implementations concerning all sauces
exports.getAllSauces = (req, res, next) => {
    console.log("J\'utilise la middleware getAllSauce !");
    Sauce.find()
        .then((sauces) => {
            res.status(200)
            .json(sauces)
        })
        .catch((error) => {
            res.status(400)
            .json({ error: error })
        });
};

// business logic regarding the choice of a sauce
exports.getOneSauce = (req, res, next) => {
    console.log("J\'utilise la middleware getOneSauce !");
    Sauce.findOne({
        _id: req.params.id
    })
        .then((sauce) => {
            res.status(200)
            .json(sauce)
        })
        .catch((error) => {
            res.status(404)
            .json({error: error})
        });
};

// business logic concerning the creation of a sauce
exports.createSauce = (req, res, next) => {
    console.log("J\'utilise la middleware createSauce !");
    const sauceObject = JSON.parse(req.body.sauce);
    delete sauceObject._id;
    delete sauceObject._userId; //Never trust a user
    const sauce = new Sauce({
        userId: req.auth.userId, //We get the authenticated userId
        ...sauceObject, //We get all the values of the body
        imageUrl: `${req.protocol}://${req.get('host')}/images/${req.file.filename}`,
        //We initialize all values in correspondence with the 'likes'
        likes: 0,
        dislikes: 0,
        usersLiked: [],
        usersDisliked: []
    });
    sauce.save()
        .then(() => {
            res.status(201)
            .json({message: 'Object created !'})
        })
        .catch(error => {
            res.status(400)
            .json({error: error})
        });
};

// business logic concerning the modification of a sauce
exports.modifySauce = (req, res, next) => {
    console.log("J\'utilise la middleware modifySauce !");
    const sauceObject = req.file ? {
        ...JSON.parse(req.body.sauce),
        imageUrl: `${req.protocol}://${req.get('host')}/images/${req.file.filename}`
    } : {...req.body};

    delete sauceObject._userId;
    Sauce.findOne({_id: req.params.id})
        .then((sauce) => {
            if(sauce.userId != req.auth.userId){
                res.status(403).json({message: 'Unauthorized request !'});
            }else{
                Sauce.updateOne({_id: req.params.id}, {...sauceObject, _id: req.params.id})
                    .then(() => {
                        res.status(200)
                        .json({message: 'Object modified !'})
                    })
                    .catch((error) => {
                        res.status(401)
                        .json({error: error})
                    });
            }
        })
        .catch((error) => {
            res.status(400)
            .json({ error: error});
        });
};

// business logic concerning the removal of a sauce
exports.deleteSauce = (req, res, next) => {
    console.log("J\'utilise la middleware deleteSauce !");
    Sauce.findOne({_id: req.params.id})
        .then(sauce => {
            if(sauce.userId != req.auth.userId){
                res.status(403)
                .json({message: 'Unauthorized request !'});
            }else{
                const filename = sauce.imageUrl.split('/images/')[1];
                fs.unlink(`images/${filename}`, () => {
                    Sauce.deleteOne({_id: req.params.id})
                        .then(() => {
                            res.status(200)
                            .json({message:'Object deleted !'})
                        })
                        .catch((error) => {
                            res.status(401)
                            .json({ error: error})
                        });
                });
            }
        })
        .catch((error) => {
            res.status(500)
            .json({ error: error});
        })
};

// business logic concerning the creation of a Status Like
exports.createLikeStatus = (req, res) => {
    console.log("J\'utilise la middleware createLikeStatus !");
    console.log(req.body);
    Sauce.findOne({_id: req.params.id})
            .then(sauce => {            
        try{
            if(!(sauce.usersLiked.includes(req.body.userId)) && req.body.like === 1){ // The "includes" method will check whether the data is present or not in the parameter defined
                console.log("Adding like !"); 
                Sauce.updateOne(
                    {_id: req.params.id},
                    {
                        $inc: {likes: 1}, // Operator "$inc" will increment a value to an existing data
                        $push: {usersLiked: req.body.userId} // The operator "$push" will add a data to an existing array
                    }
                )
                    .then(() => {
                        res.status(201)
                        .json({message: 'LikeStatus created !'})
                    })
                    .catch((error) => {
                        res.status(400)
                        .json({ error: error})
                    });
                
                console.log("Utilisation de like = 1 !");

            }else if(!(sauce.usersDisliked.includes(req.body.userId)) && req.body.like === -1){
                console.log("the user dislike !");
                Sauce.updateOne(
                    {_id: req.params.id},
                    {
                        $inc: {dislikes: 1},
                        $push: {usersDisliked: req.body.userId}
                    }
                )
                    .then(() => {
                        res.status(201)
                        .json({message: 'dislikedStatus created !'})
                    })
                    .catch((error) => {
                        res.status(400)
                        .json({error: error})
                    });
                
                console.log("Utilisation de like = -1!");

            }else if(sauce.usersLiked.includes(req.body.userId) && req.body.like === 0){ //The user cancels his "like"
                console.log("canceled like");
                Sauce.updateOne(
                    {_id: req.params.id},
                    {
                        $inc: {likes: -1},
                        $pull: {usersLiked: req.body.userId} // The operator "$pull" removes the data as a parameter
                    }
                )
                    .then(() => {
                        res.status(200)
                        .json({message: 'likeStatus has been successfully updated !'})
                    })
                    .catch((error) => {
                        res.status(400)
                        .json({ error: error})
                    });
                
                console.log("Suppression de like !");

            }else if(sauce.usersDisliked.includes(req.body.userId) && req.body.like === 0){
                console.log("canceled disliked !");
                Sauce.updateOne(
                    {_id: req.params.id},
                    {
                        $inc: {dislikes: -1},
                        $pull: {usersDisliked: req.body.userId}
                    }
                )
                    .then(() => {
                        res.status(200)
                        .json({message: 'DislikedStatus has been successfully updated !'})
                    })
                    .catch((error) => {
                        res.status(400)
                        .json({error: error })
                    });
                console.log("Suppression de dislike !");
            }
        }catch(e){
            console.log('Il y a une erreur lorsque l\'utilisateur veut liker ou disliker et qu\'il est non pr??sent dans le tableau usersLiked ou usersDisliked' + 'erreur:' + e)
        }
                
        })
        .catch((error) => {
            res.status(400)
            .json({ error: error})
        });     
};

