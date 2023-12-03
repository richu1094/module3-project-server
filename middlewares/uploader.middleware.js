const cloudinary = require('cloudinary').v2
const { CloudinaryStorage } = require('multer-storage-cloudinary')
const multer = require('multer')

cloudinary.config({
  cloud_name: 'db6gxc2n0',
  api_key: '666788781824258',
  api_secret: 'RoqBryw9dfVu4pK4E6IEDEOKK-A'
});

const storage = new CloudinaryStorage({ cloudinary })

module.exports = multer({ storage })