const mongoose = require('mongoose')
const Schema = mongoose.Schema
const collection = 'admin'

const Collections = new Schema({
  username: { type: String, required: true, unique: true, trim: true, index: true },
  password: { type: String, required: true, trim: true },
}, {
  collection,
  versionKey: false,
  timestamps: true, // createAt, updateAt
})

module.exports = mongoose.model(collection, Collections, collection)
