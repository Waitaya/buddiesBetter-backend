const mongoose = require('mongoose')
const Schema = mongoose.Schema
const collection = 'order'

const Collections = new Schema({
  userId: { type: mongoose.Types.ObjectId, required: true },
  productId: { type: mongoose.Types.ObjectId, required: true },
  // user: {
  //   type: {
  //     _id: false,
  //     userId: { type: mongoose.Types.ObjectId, required: true },
  //     username: { type: String, required: true },
  //   },
  //   required: true,
  // },
  // products: [{
  //   type: {
  //     _id: false,
  //     productId: { type: mongoose.Types.ObjectId, required: true },
  //   },
  //   required: true,
  // }],
}, {
  collection,
  versionKey: false,
  timestamps: true, // createAt, updateAt
})

module.exports = mongoose.model(collection, Collections, collection)
