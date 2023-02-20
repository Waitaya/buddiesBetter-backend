const tags = ['user']

const getUser = {
  description: 'sample get',
  tags,
  response: {
    200: {
      type: 'array',
      items: {
        type: 'object',
        properties: {
          _id: { type: 'string' },
          fname: { type: 'string' },
          lname: { type: 'string' },
          username: { type: 'string' },
          password: { type: 'string' },
          createdAt: { type: 'number' },
          updatedAt: { type: 'number' },
          contact: { type: 'object' },
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

const createUser = {
  description: 'register',
  tags,
  response: {
    200: {
      type: 'object',
      properties: {
        msg: { type: 'string' },
      },
    },
  },
  body: {
    type: 'object',
    required: ['username', 'password', 'confirmPassword'],
    properties: {
      username: { type: 'string', minLength: 6 },
      password: { type: 'string', minLength: 6 },
      confirmPassword: { type: 'string', minLength: 6 },
    },
  },
}

module.exports = {
  getUser,
  createUser,
}
