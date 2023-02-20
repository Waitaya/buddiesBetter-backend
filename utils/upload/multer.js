const { CloudinaryStorage } = require('multer-storage-cloudinary')
const multer = require('fastify-multer')
const cloudinary = require('cloudinary').v2

// cloudinary configuration
cloudinary.config({
  cloud_name: 'waitaya',
  api_key: '271169974862681',
  api_secret: '4siXv7yawjIn9dvoY10YeXEHomg',
})

// create cloudinary storage for multer
const storage = new CloudinaryStorage({
  cloudinary,
  params: {
    folder: 'buddies_better',
    // allowedFormats: ['jpg', 'png'],
    // transformation: [{ width: 800, height: 800, crop: 'limit' }],
  },
})

// create multer image parser
const parser = multer({ storage })

module.exports = {
  storage,
}

module.exports = parser
