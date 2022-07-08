const multer = require('multer');

const MIMETYPES = {
    'image/jpg': 'jpg',
    'image/jpeg': 'jpg',
    'image/png': 'png'
};

const storage = multer.diskStorage({
    destination: (res, file, callback) => {
        callback(null, 'images');
    },
    filename: (req, file, callback) => {
        const name = file.originalname.split(' ').join('_');
        const extension = MIMETYPES[file.mimetype];
        callback(null, name + Date.now()+2 + '.' + extension);
    } 
});

module.exports = multer({storage: storage}).single('image');