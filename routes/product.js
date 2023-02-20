'use strict'
const mongo = require('mongodb')
const schemas = require('../schemas/product')
const Product = require('../models/product')

module.exports = async function (fastify, opts) {
  fastify.get('/', { schema: schemas.findAll },
    async function (request, reply) {
      const products = await Product.find()

      if (!products) throw new Error('ไม่พบข้อมูลสินค้า')
      return products
    }
  )

  fastify.get('/:id',
    { schema: schemas.findOne },
    async function (request, reply) {
      const { id: productId } = request.params
      console.log('ProductId eeee', productId)

      const product = await Product.findOne({ _id: new mongo.ObjectId(productId) })

      console.log('product eee:>> ', product)

      if (!product) throw new Error('ไม่พบข้อมูลสินค้า')
      return product
    }
  )

  fastify.get(
    '/list/:page',
    {
      schema: schemas.getList,
      preValidation: [fastify.authenticate],
    },
    async function (request, reply) {
      const { page } = request.params

      const option = { sort: { _id: -1 }, limit: 2, lean: true, page: page || 1 }

      const products = await Product.find().sort({ _id: -1 }).lean()

      const productsPaginate = await Product.aggregatePaginate(products, option)

      if (!productsPaginate) throw new Error('ไม่พบข้อมูลสินค้า')

      return productsPaginate
    }
  )

  fastify.get(
    '/getByCategoryId/:id',
    {
      schema: schemas.findByCategoryID,
    },
    async function (request, reply) {
      const { id: categoryId } = request.params

      console.log('categoryId :>> ', categoryId)

      const products = await Product.find({ categoriesId: categoryId }).sort({ _id: -1 }).lean()
      if (!products) throw new Error('ไม่พบข้อมูลสินค้า')

      console.log('products dddddd', products)

      return products
    }
  )
}

module.exports.autoPrefix = '/product'
