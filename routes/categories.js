'use strict'
const schemas = require('../schemas/categories')
const Categories = require('../models/categories')
const mongo = require('mongodb')

module.exports = async function (fastify, opts) {
  fastify.get(
    '/',
    {
      schema: schemas.findAll,
      //   preValidation: [fastify.authenticate],
    },
    async function (request, reply) {
      const categories = await Categories.find().sort({ _id: -1 }).lean()
      if (!categories) throw new Error('เกิดข้อผิดพลาด')

      return categories
    }
  )

  fastify.get(
    '/:id',
    {
      schema: schemas.findOne,
    },
    async function (request, reply) {
      const { id: categoryId } = request.params

      const category = await Categories.findOne({
        _id: new mongo.ObjectId(categoryId),
      })
      if (!category) throw new Error('เกิดข้อผิดพลาด')

      return category
    }
  )
}

module.exports.autoPrefix = '/categories'
