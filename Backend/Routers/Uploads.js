const multer = require('multer');
const { CloudinaryStorage } = require('multer-storage-cloudinary');
const cloudinary = require('./Cloudinary.js'); // Import the Cloudinary config

// Set up Cloudinary storage
const storage = new CloudinaryStorage({
    cloudinary: cloudinary,
    params: {
        folder: 'Images', // Specify the folder in Cloudinary
        allowed_formats: ['jpg', 'png', 'jpeg', 'gif'], // Allowed formats
    },
});

// Initialize multer with the Cloudinary storage
const upload = multer({ storage: storage });

module.exports = upload;

