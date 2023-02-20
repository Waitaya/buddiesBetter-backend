const mongoose = require('mongoose')
const Schema = mongoose.Schema
const collection = 'product'
const mongoosePaginate = require('mongoose-paginate-v2')
const mongooseAggregatePaginate = require('mongoose-aggregate-paginate-v2')

const Collections = new Schema({
  name: { type: String, required: true, trim: true },
  description: { type: String, required: true, trim: true },
  images: [{
    type: String,
    required: true,
  }],
  // price: { type: Number, required: true, trim: true, default: 0 },
  // sale: { type: Number, trim: true, default: null },
  // stock: { type: Number, required: true, trim: true, default: 0 },
  // size: [{
  //   type: String,
  //   required: true,
  // }],
  // colors: [{
  //   type: String,
  //   required: true,
  // }],
  modelList: [{
    type: {
      // _id: false,
      color: { type: String, required: true },
      image: { type: String, required: true },
      // sale: { type: Number, trim: true, default: null },
      options: [{
        type: {
          size: { type: String, required: true },
          price: { type: Number, required: true, trim: true, default: 0 },
          stock: { type: Number, required: true, trim: true, default: 0 },
          _id: false,
          optionId: { type: String, required: true },
        },
      }],
    },
    required: true,
  }],
  status: { type: Boolean, default: true },
  categoriesId: { type: String, required: true },
  // categoriesId: { type: mongoose.Types.ObjectId, required: true },
}, {
  collection,
  versionKey: false,
  timestamps: true, // createAt, updateAt
})

Collections.plugin(mongoosePaginate)
Collections.plugin(mongooseAggregatePaginate)

module.exports = mongoose.model(collection, Collections, collection)
