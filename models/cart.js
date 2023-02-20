const mongoose = require('mongoose')
const Schema = mongoose.Schema
const collection = 'cart'

const Collections = new Schema({
  userId: { type: mongoose.Types.ObjectId, required: true },
  productId: { type: mongoose.Types.ObjectId, required: true },
  modelId: { type: mongoose.Types.ObjectId, required: true },
  optionId: { type: String, required: true, trim: true },
  quantity: { type: Number, require: true },
  checked: { type: Boolean, default: false },
}, {
  collection,
  versionKey: false,
  timestamps: true, // createAt, updateAt
})

module.exports = mongoose.model(collection, Collections, collection)
