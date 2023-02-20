const mongoose = require('mongoose')
const Schema = mongoose.Schema
const collection = 'categories'
const mongoosePaginate = require('mongoose-paginate-v2')
const mongooseAggregatePaginate = require('mongoose-aggregate-paginate-v2')

const Collections = new Schema({
  name: { type: String, required: true, trim: true },
  image: { type: String, required: true, trim: true },
}, {
  collection,
  versionKey: false,
  timestamps: true, // createAt, updateAt
})

Collections.plugin(mongoosePaginate)
Collections.plugin(mongooseAggregatePaginate)

module.exports = mongoose.model(collection, Collections, collection)
