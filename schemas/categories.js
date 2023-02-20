'use strict'

const tags = ['categories']

// const categoriesResponse = {
//   type: 'object',
//   properties: {
//     _id: { type: 'string' },
//     name: { type: 'string' },
//     image: { type: 'string' },
//     createdAt: { type: 'number' },
//     updatedAt: { type: 'number' },
//   },
// }

const findAll = {
  description: 'ดึงข้อมูล categories ทั้งหมด',
  tags,
  response: {
    200: {
      type: 'array',
      items: {
        type: 'object',
        properties: {
          _id: { type: 'string' },
          name: { type: 'string' },
          image: { type: 'string' },
          createdAt: { type: 'number' },
          updatedAt: { type: 'number' },
        },
      },
    },
    500: {
      type: 'object',
      properties: {
        message: { type: 'string' },
      },
    },
  },
//   headers: {
//     Authorization: {
//       type: 'string',
//     },
//   },
}

const findOne = {
  description: 'ดึงข้อมูล categories โดย Id',
  tags,
  response: {
    200: {
      type: 'object',
      properties: {
        _id: { type: 'string' },
        name: { type: 'string' },
        image: { type: 'string' },
        createdAt: { type: 'number' },
        updatedAt: { type: 'number' },
      },
    },
    500: {
      type: 'object',
      properties: {
        message: { type: 'string' },
      },
    },
  },
  params: {
    type: 'object',
    properties: {
      id: { type: 'string' },
    },
  },

}

module.exports = { findAll, findOne }
