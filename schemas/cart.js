const { productProperties } = require('./product')

const tags = ['cart']

const getCart = {
  description: 'get cart',
  tags,
  response: {
    200: {
      type: 'array',
      items: {
        type: 'object',
        properties: {
          _id: { type: 'string' },
          product: {
            type: 'object',
            properties: productProperties,
          },
          modelId: { type: 'string' },
          optionId: { type: 'string' },
          quantity: { type: 'number' },
          createdAt: { type: 'number' },
          updatedAt: { type: 'number' },
          checked: { type: 'boolean' },
        },
      },
    },
  },
  headers: {
    Authorization: {
      type: 'string',
    },
  },
}

const addToCart = {
  description: 'register',
  tags,
  response: {
    200: {
      type: 'string',
    },
  },
  body: {
    type: 'object',
    required: ['userId', 'productId', 'modelId', 'optionId', 'quantity', 'checked'],
    properties: {
      userId: { type: 'string' },
      productId: { type: 'string' },
      modelId: { type: 'string' },
      optionId: { type: 'string' },
      quantity: { type: 'number' },
      checked: { type: 'boolean' },
    },
  },
  headers: {
    Authorization: {
      type: 'string',
    },
  },
}

const delCart = {
  description: 'register',
  tags,
  response: {
    200: {
      type: 'string',
    },
  },
  body: {
    type: 'object',
    required: ['cartId'],
    properties: {
      cartId: {
        type: 'array',
        items: {
          type: 'string',
        },
      },
    },

  },

  headers: {
    Authorization: {
      type: 'string',
    },
  },
}

module.exports = {
  getCart,
  addToCart,
  delCart,
}
