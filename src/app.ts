import Fastify, { FastifyInstance } from 'fastify'
import { Server, IncomingMessage, ServerResponse } from 'http'
import fastifySwagger from '@fastify/swagger'
import fastifySwaggerUI from '@fastify/swagger-ui'
import weatherRoutes from './modules/weather/weather.route'
import fp from 'fastify-plugin'

require('dotenv').config()
const port = process.env.PORT || 5000

const fastify = Fastify({
  logger: true
})

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

const start = async (): Promise<FastifyInstance<Server, IncomingMessage, ServerResponse>> => {
  fastify.register(fp((fastify, opts, done) => {
    fastify.decorate(redisConnect)
    done()
  }))

  fastify
    .register(fastifySwagger)
    .register(fastifySwaggerUI, swaggerOptions)

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

  fastify.listen({ port, host: '0.0.0.0' }, function (err, address) {
    if (err) {
      fastify.log.error(err)
      process.exit(1)
    }
    fastify.log.info(`server listening on ${address}`)
  })
}

start()
