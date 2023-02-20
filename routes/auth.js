'use strict'
// const mongo = require('mongodb')
const User = require('../models/user')
const bcrypt = require('bcrypt')

const tags = ['auth']
const expToken = '1h'

const schema = {
  login: {
    description: 'login',
    tags,
    // response: {
    //   200: {
    //     type: 'object',
    //     properties: {
    //       status: { type: 'boolean' },
    //       msg: { type: 'string' },
    //       token: { type: 'string' },
    //       data: {
    //         type: 'object',
    //         properties: {
    //           fname: { type: 'string' },
    //           lname: { type: 'string' },
    //           username: { type: 'string' },
    //           phone: { type: 'string' },
    //           updatedAt: { type: 'number' },
    //           createdAt: { type: 'number' },
    //         },
    //       },
    //     },
    //   },
    // },
    body: {
      type: 'object',
      required: ['username', 'password'],
      properties: {
        username: { type: 'string', minLength: 6 },
        password: { type: 'string', minLength: 6 },
      },
    },

  },

}

module.exports = async function (fastify, opts) {
  fastify.get('/', {
    schema: schema.getUser,
    // preValidation: [fastify.authenticate]
  }, async function (request, reply) {
    try {
      const getUser = await User.find({})
      if (getUser.length === 0) throw new Error('fuck!!')
      return getUser
    } catch (error) {
      return error
    }
  })

  fastify.post('/login', {
    schema: schema.login,
  }, async function (requset, reply) {
    try {
      const { username, password: reqPassword } = requset.body
      const user = await User.findOne({ username })

      if (!user) throw new Error('ชื่อผู้ใช้ไม่ถูกต้อง')

      const { password, ...other } = user

      const checkPass = await bcrypt.compare(reqPassword, password)
      if (!checkPass) throw new Error('รหัสผ่านไม่ถูกต้อง')

      const token = await fastify.jwt.sign({ sub: { ...other._doc } }, { expiresIn: expToken })

      reply.send({
        data: { ...other._doc },
        status: true,
        msg: 'เข้าสู่ระบบสำเร็จ',
        token,
      })
    } catch (error) {
      return error
    }
  })
}

module.exports.autoPrefix = '/auth'
