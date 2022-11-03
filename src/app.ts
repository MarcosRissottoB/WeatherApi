import Fastify from 'fastify'

const weatherRoutes = require('./modules/weather/weather.route')

const PORT = process.env.PORT || 5000

const server = Fastify()

server.get('/health', function (req, reply) {
  reply.send({ status: 'Ok' })
})

const start = async () => {
  server.register(weatherRoutes, { prefix: 'api/weather' })
  try {
    await server.listen(PORT, '0.0.0.0')
    console.log('Server listin on port: ', PORT)
  } catch (err) {
    server.log.error(err)
    process.exit(1)
  }
}
start()
