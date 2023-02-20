'use strict'
// const mongo = require('mongodb')
const User = require('../models/user')
const bcrypt = require('bcrypt')

const tags = ['register']

const schema = {
  register: {
    description: 'register',
    tags,
    response: {
      200: {
        type: 'string',
      },
    },
    body: {
      type: 'object',
      required: ['username', 'password', 'confirmPassword'],
      properties: {
        username: { type: 'string', minLength: 6 },
        password: { type: 'string', minLength: 6 },
        confirmPassword: { type: 'string', minLength: 6 },
        phone: { type: 'string' },
        line: { type: 'object' },
      },
    },
  },

}

module.exports = async function (fastify, opts) {
  fastify.post('/', {
    schema: schema.register,
  }, async function (request, reply) {
    const { username, password, confirmPassword, phone, line } = request.body

    const userNameLowerCase = username.toLowerCase()
    const checkUser = await User.findOne({ username: userNameLowerCase.trim() })

    if (checkUser) throw new Error('ชื่อผู้ใช้นี้ถูกใช้ไปแล้ว')

    if (password !== confirmPassword) {
      throw new Error('รหัสผ่านไม่ตรงกัน !!')
    }

    const passwordBcrypt = bcrypt.hashSync(password, 10)

    const userCreated = await User.create({
      username: userNameLowerCase,
      password: passwordBcrypt,
      phone: phone || null,
      line: line || null,
    })

    if (!userCreated) throw new Error('เกิดข้อผิดพลาด ไม่สามารถสมัครสมาชิคได้ กรุณารองใหม่อีกครั้ง')

    return reply.send('ลงทะเบียนสำเร็จ!!')
  })
}

module.exports.autoPrefix = '/register'
