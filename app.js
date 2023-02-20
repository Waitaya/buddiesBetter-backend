const mongoose = require('mongoose')
const fastify = require('fastify')
const path = require('path')

const options = {
  logger: true,
}

const app = fastify(options)

// const DB_URI = 'mongodb://localhost:27017/buddiesbetter'
const DB_URI = 'mongodb+srv://buddies_better:m6fV0JJ0pxTRcGFH@cluster0.oinb2rd.mongodb.net/?retryWrites=true&w=majority'
const port = process.env.PORT || 3008
const name = 'FRONT'
const secreyKey = 'root'

const connectDB = async () => {
  try {
    await mongoose.connect(DB_URI)
    console.log('MongoDB connected!!')
  } catch (err) {
    console.log('Failed to connect to MongoDB', err)
  }
}

connectDB()
app.register(require('@fastify/cors'))
app.register(require('@fastify/jwt'), { secret: secreyKey })
app.register(require('@fastify/autoload'), { dir: path.join(__dirname, 'routes') })

app.decorate('authenticate', async (req, res) => {
  try {
    const authen = await req.jwtVerify()
    req.user = authen.sub
  } catch {
    res.statusCode = 401
    res.mesage = '401 Unauthorized'
    throw new Error('401 Unauthorized')
  }
})

app.listen(
  {
    port,
    host: '0.0.0.0',
  },
  (err) => {
    if (err) {
      throw err
    } else {
      console.log(`start port ${port}`)
    }

    app.log.info('%s listening in %s environment', name, process.env.NODE_ENV)
  }
)
