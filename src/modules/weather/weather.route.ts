import { FastifyInstance } from 'fastify'
import { weatherHandler } from './weather.controller'

async function weatherRoutes (server: FastifyInstance) {
  server.get('/', weatherHandler)
}

export default weatherRoutes
