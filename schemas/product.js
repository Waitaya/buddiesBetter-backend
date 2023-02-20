'use strict'

const tags = ['product']

const productProperties = {
  _id: { type: 'string' },
  name: { type: 'string', minLength: 1 },
  description: { type: 'string', minLength: 1 },
  images: { type: 'array', items: { type: 'string' } },
  status: { type: 'boolean' },
  categoriesId: { type: 'string' },
  modelList: {
    type: 'array',
    items: {
      type: 'object',
      properties: {
        _id: { type: 'string' },
        color: { type: 'string' },
        image: { type: 'string' },
        options: {
          type: 'array',
          items: {
            type: 'object',
            properties: {
              price: { type: 'number' },
              stock: { type: 'number' },
              size: { type: 'string' },
              optionId: { type: 'string' },
            },
          },
        },
      },
    },
  },
  createdAt: { type: 'number' },
  updatedAt: { type: 'number' },
}

const productsResponse = {
  type: 'object',
  properties: {
    _id: { type: 'string' },
    name: { type: 'string', minLength: 1 },
    description: { type: 'string', minLength: 1 },
    images: { type: 'array', items: { type: 'string' } },
    status: { type: 'boolean' },
    categoriesId: { type: 'string' },
    modelList: {
      type: 'array',
      items: {
        type: 'object',
        properties: {
          _id: { type: 'string' },
          color: { type: 'string' },
          image: { type: 'string' },
          options: {
            type: 'array',
            items: {
              type: 'object',
              properties: {
                price: { type: 'number' },
                stock: { type: 'number' },
                size: { type: 'string' },
                optionId: { type: 'string' },
              },
            },
          },
        },
      },
    },
    createdAt: { type: 'number' },
    updatedAt: { type: 'number' },
  },
}

const getList = {
  description: 'ดึงข้อมูล categories ทั้งหมด',
  tags,
  response: {
    200: {
      type: 'object',
      properties: {
        docs: { type: 'array', items: productsResponse },
        totalDocs: { type: 'number' },
        limit: { type: 'number' },
        page: { type: 'number' },
        totalPages: { type: 'number' },
        pagingCounter: { type: 'number' },
        hasPrevPage: { type: 'boolean' },
        hasNextPage: { type: 'boolean' },
        prevPage: { type: 'number' },
        nextPage: { type: 'number' },
      },
    },
    500: {
      type: 'object',
      properties: {
        message: { type: 'string' },
      },
    },
  },
  headers: {
    Authorization: {
      type: 'string',
    },
  },
}

const findAll = {
  description: 'ดึงข้อมูล Product ทั้งหมด',
  tags,
  response: {
    200: {
      type: 'array',
      items: {
        type: 'object',
        properties: productProperties,
      },
    },
    500: {
      type: 'object',
      properties: {
        message: { type: 'string' },
      },
    },
  },
  headers: {
    Authorization: {
      type: 'string',
    },
  },
}

const findOne = {
  description: 'ดึงข้อมูล Product ตาม ID ที่กำหนด',
  tags,
  response: {
    200: {
      type: 'object',
      properties: productProperties,
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
  headers: {
    Authorization: {
      type: 'string',
    },
  },
}

const findByCategoryID = {
  description: 'ดึงข้อมูล Product ตาม categoryId',
  tags,
  response: {
    200: {
      type: 'array',
      items: {
        type: 'object',
        properties: productProperties,
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
  headers: {
    Authorization: {
      type: 'string',
    },
  },
}

module.exports = {
  findAll,
  findOne,
  getList,
  findByCategoryID,
  productProperties,
}
