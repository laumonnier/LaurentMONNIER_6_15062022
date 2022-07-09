const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const sauce = require('../controllers/sauces');
const multer = require('../middleware/multer-config');

router.get('/', auth, sauce.getAllSauces);
router.get('/:id', auth, sauce.getOneSauce);
router.post('/', auth, multer, sauce.createSauce);
router.put('/:id', auth, multer, sauce.modifySauce);
router.delete('/:id', auth, sauce.deleteSauce);
router.post('/:id/like', auth, sauce.createLikeStatus);


module.exports = router;