const fastify = require('fastify')({
  logger: true
})
const PORT = process.env.PORT || 5000

fastify.get('/test', function (req, reply) {
  reply.send({ test: 'test' })
})

const start = async () => {
  try {
    await fastify.listen({ port: PORT, host: '0.0.0.0' })
    console.log('Server listin on port: ', PORT)
  } catch (err) {
    fastify.log.error(err)
    process.exit(1)
  }
}
start()
