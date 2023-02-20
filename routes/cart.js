'use strict'
const schemas = require('../schemas/cart')
const Cart = require('../models/cart')
// const Product = require('../../models/product')
const mongo = require('mongodb')

module.exports = async function (fastify, opts) {
  fastify.get(
    '/',
    {
      schema: schemas.getCart,
      preValidation: [fastify.authenticate],
    },
    async function (req, res) {
      const { _id } = req.user
      //   const cart = await Cart.find({ userId: new mongo.ObjectId(_id) }).lean()

      const cart = await Cart.aggregate([
        {
          $match: {
            userId: new mongo.ObjectId(_id),
          },
        },
        {
          $lookup: {
            from: 'product',
            localField: 'productId',
            foreignField: '_id',
            as: 'product',
          },
        },
        // { $unwind: { path: '$product', preserveNullAndEmptyArrays: true } },
        {
          $project: {
            _id: 1,
            modelId: 1,
            optionId: 1,
            quantity: 1,
            createdAt: 1,
            updatedAt: 1,
            checked: 1,
            product: { $arrayElemAt: ['$product', 0] },
          },
        },
      ])

      return cart
    }
  )

  fastify.post(
    '/addToCart',
    {
      schema: schemas.addToCart,
      preValidation: [fastify.authenticate],
    },
    async function (request, reply) {
      const { userId, productId, modelId, optionId, quantity, checked } = request.body

      const checkCart = await Cart.findOne({ productId, modelId, optionId })

      if (checkCart) {
        const updateCart = await Cart.updateOne({
          userId: new mongo.ObjectId(userId),
          productId: new mongo.ObjectId(productId),
          modelId: new mongo.ObjectId(modelId),
          optionId,
        }, {
          $set: {
            userId, productId, modelId, optionId, quantity: checkCart.quantity + quantity, checked,
          },
        })
        if (updateCart.modifiedCount !== 1) throw new Error('เกิดข้อผิดพลาด ไม่สามารถเพิ่มไปยังรถเข็นได้')
        return reply.send('เพิ่มไปยังรถเข็นแล้ว')
      }

      const category = await Cart.create({ userId, productId, modelId, optionId, quantity, checked })
      if (!category) throw new Error('ไม่สามารถสร้าง Category นี้ได้กรุณาติดต่อเจ้าหน้าที่')

      return reply.send('เพิ่มไปยังรถเข็นแล้ว')
    }
  )

  fastify.put(
    '/addToCart',
    {
      schema: schemas.addToCart,
      preValidation: [fastify.authenticate],
    },
    async function (request, reply) {
      const { userId, productId, modelId, optionId, quantity, checked } = request.body

      const checkCart = await Cart.findOne({ productId, modelId, optionId })
      if (!checkCart) throw new Error('เกิดข้อผิดพลาด ไม่สามารถเพิ่มไปยังรถเข็นได้')

      const updateCart = await Cart.updateOne({
        userId: new mongo.ObjectId(userId),
        productId: new mongo.ObjectId(productId),
        modelId: new mongo.ObjectId(modelId),
        optionId,
      }, {
        $set: {
          userId, productId, modelId, optionId, quantity, checked,
        },
      })
      if (updateCart.modifiedCount !== 1) throw new Error('เกิดข้อผิดพลาด ไม่สามารถเพิ่มไปยังรถเข็นได้')
      return reply.send('เพิ่มไปยังรถเข็นแล้ว')
    }
  )

  fastify.post('/delete',
    {
      schema: schemas.delCart,
      preValidation: [fastify.authenticate],
    },
    async function (request, reply) {
      const { cartId } = request.body

      const cartIds = cartId.map(item => mongo.ObjectId(item))

      const delectCart = await Cart.deleteMany({ _id: { $in: cartIds } })

      if (!delectCart) throw new Error('ไม่สามาถลบสินค้านี้ได้')

      return reply.send('ลบสินค้าสำเร็จ')
    }
  )
}

module.exports.autoPrefix = '/cart'
