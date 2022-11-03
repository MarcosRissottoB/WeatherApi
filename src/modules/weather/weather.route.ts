import { FastifyInstance } from 'fastify'
import { weatherHandler } from './weather.controller'
import { schema } from './weather.schema'
async function weatherRoutes (server: FastifyInstance) {
  server.get('/', { schema }, weatherHandler)
}

export default weatherRoutes
