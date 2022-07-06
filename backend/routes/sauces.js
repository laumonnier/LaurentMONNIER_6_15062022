const express = require('express');
const router = express.Router();
const auth = require('../control/auth');
const sauceCtrl = require('../controllers/sauces');
const multer = require('../control/multer-config');

router.get('/', auth, sauceCtrl.getAllSauces);
router.get('/:id', auth, sauceCtrl.getOneSauce);
router.post('/', auth, multer, sauceCtrl.createImageSauce);
router.put('/:id', auth, multer, sauceCtrl.updateSauce);
router.delete('/:id', auth, sauceCtrl.deleteSauce);
router.post('/:id/like', auth, sauceCtrl.createLikeStatus);


module.exports = router;