const express = require('express');
const router = express.Router();
const authorize = require('../middleware/auth');
const sauceCtrl = require('../controllers/sauces');
const multer = require('../middleware/multer-config');

router.get('/', authorize, sauceCtrl.getAllSauces);
router.get('/:id', authorize, sauceCtrl.getOneSauce);
router.post('/', authorize, multer, sauceCtrl.createSauce);
router.put('/:id', authorize, multer, sauceCtrl.modifySauce);
router.delete('/:id', authorize, sauceCtrl.deleteSauce);
router.post('/:id/like', authorize, multer, sauceCtrl.createLikeStatus);


module.exports = router;