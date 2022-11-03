import Fastify from 'fastify'
import weatherRoutes from './modules/weather/weather.route'

require('dotenv').config()

const port = process.env.PORT || 5000

const fastify = Fastify({
  logger: true
})

fastify.get('/health', function (req, reply) {
  reply.send({ status: 'Ok' })
})

const start = async () => {
  fastify.register(weatherRoutes, { prefix: 'api/weather' })

  fastify.listen({ port, host: '0.0.0.0' }, function (err, address) {
    if (err) {
      fastify.log.error(err)
      process.exit(1)
    }
    fastify.log.info(`server listening on ${address}`)
  })
}
start()
