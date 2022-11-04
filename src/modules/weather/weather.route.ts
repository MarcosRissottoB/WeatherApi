import { FastifyInstance } from 'fastify'
import { weatherHandler } from './weather.controller'
import { schema } from './weather.schema'
import { IQuerystring } from '../../interfaces/weather'

async function weatherRoutes (server: FastifyInstance) {
  server.get<{Querystring: IQuerystring,}>('/', { schema }, weatherHandler)
}

export default weatherRoutes
