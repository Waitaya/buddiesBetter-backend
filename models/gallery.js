const mongoose = require('mongoose')
const Schema = mongoose.Schema
const collection = 'gallery'

const Collections = new Schema({
  filename: {
    type: String,
    required: true,
  },
  originalname: {
    type: String,
    required: true,
  },
  url: {
    type: String,
    required: true,
  },
}, {
  collection,
  versionKey: false,
  timestamps: true, // createAt, updateAt
})

module.exports = mongoose.model(collection, Collections, collection)
