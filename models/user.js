const mongoose = require('mongoose')
const Schema = mongoose.Schema
const collection = 'user'

const Collections = new Schema({
  image: { type: String, trim: true, default: 'https://cdn.duckbet.com/wl/?id=1zHC0AgTRUrDLbj3EdgAALvkmO2pXYAE', index: true },
  username: { type: String, required: true, unique: true, trim: true, index: true },
  password: { type: String, required: true, trim: true },
  line: { type: Schema.Types.Mixed, default: null },
  phone: { type: String, trim: true, index: true, default: null },
  address: { type: Array, default: null },
  birth: { type: Date, default: null },
}, {
  collection,
  versionKey: false,
  timestamps: true, // createAt, updateAt
})

module.exports = mongoose.model(collection, Collections, collection)
