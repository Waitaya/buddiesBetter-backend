const mongoose = require('mongoose')
const Schema = mongoose.Schema
const collection = 'favorite'

const Collections = new Schema({
  userId: { type: mongoose.Types.ObjectId, required: true },
  productId: { type: mongoose.Types.ObjectId, required: true },
}, {
  collection,
  versionKey: false,
  timestamps: true, // createAt, updateAt
})

module.exports = mongoose.model(collection, Collections, collection)
