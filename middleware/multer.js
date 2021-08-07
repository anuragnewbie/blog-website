const multer = require('multer');

const storage = multer.diskStorage({
    destination: (req, file, callback) => {
        callback(null, 'uploads/');
    },
    filename: (req, file, callback) => {
        let fileExtension = Date.now() + '_' + file.originalname;
        callback(null, fileExtension);
    }
});

const upload = multer({
    storage: storage,
    fileFilter: (req, file, callback) => {
        if(file.mimetype === "image/jpeg" || file.mimetype === "image/png"){
            console.log("valid image uploaded.")
            callback(null, true);
        } else {
            console.log("only jpeg and png allowed.")
            callback(newError("Allowed image file extensions are: jpeg and png"));
        }
    }
});

module.exports = upload;
