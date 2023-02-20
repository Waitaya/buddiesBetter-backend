const mongoose = require('mongoose')
const Schema = mongoose.Schema
const collection = 'orderLog'

const Collections = new Schema({
  userId: { type: mongoose.Types.ObjectId, required: true },
  orderId: { type: String, required: true, unique: true, trim: true },
  amount: { type: Number, default: 0 },
}, {
  collection,
  versionKey: false,
  timestamps: true, // createAt, updateAt
})

module.exports = mongoose.model(collection, Collections, collection)
