import Fastify, { FastifyInstance } from 'fastify'
import { Server, IncomingMessage, ServerResponse } from 'http'
import fastifySwagger from '@fastify/swagger'
import fastifySwaggerUI from '@fastify/swagger-ui'
import weatherRoutes from './modules/weather/weather.route'
import fp from 'fastify-plugin'
import middie from 'middie'

const swaggerOptions = {
  routePrefix: '/docs',
  swagger: {
    info: {
      title: 'Fastify API Weather App',
      description: 'Fastify API Weather',
      version: '1.0.0'
    },
    schemes: ['http'],
    consumes: ['application/json'],
    produces: ['application/json']
  },
  exposeRoute: true
}

async function redisConnect (fastify, done) {
  fastify.register(require('@fastify/redis'),
    {
      host: '127.0.0.1',
      port: 6380,
      namespace: 'hello'
    })
  done()
}

const build = async (): Promise<FastifyInstance<Server, IncomingMessage, ServerResponse>> => {
  const fastify: FastifyInstance<
    Server,
    IncomingMessage,
    ServerResponse
  > = Fastify({
    logger: true
  })

  // Config
  fastify.register(fp((fastify, opts, done) => {
    fastify.decorate(redisConnect)
    done()
  }))
  fastify
    .register(fastifySwagger)
    .register(fastifySwaggerUI, swaggerOptions)
  fastify.register(middie)

  // Routes
  fastify
    .register(weatherRoutes, { prefix: 'api/weather' })
    .get('/api/health', function (req, reply) {
      reply.send({ status: 'ok' })
    })
    .get('/api/cache', function (req, reply) {
      const { redis } = fastify
      console.log('redis', redis)

      redis.hello.set(req.body.key, req.body.value, (err) => {
        reply.send(err || { status: 'ok' })
      })
    })

  return fastify
}

export default build
export { build }
