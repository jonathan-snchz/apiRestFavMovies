const multer = require("multer");
const cloudinary = require('cloudinary').v2;
const { CloudinaryStorage } = require('multer-storage-cloudinary');

console.log('multer-storage-cloudinary imported successfully');
console.log('CloudinaryStorage type:', typeof CloudinaryStorage);

const storage = new CloudinaryStorage({
    cloudinary,
    params: {
        folder: 'UsersPfps',
        allowedFormats: ['jpg', 'png', 'jpeg', 'gif', 'webp']
    }
});

const upload = multer({storage});

console.log("Success");


module.exports = upload