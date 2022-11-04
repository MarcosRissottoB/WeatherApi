import { FastifyRequest, FastifyReply } from 'fastify'
import { getWeatherCurrentCity } from './weather.services'

export async function weatherHandler (req: FastifyRequest, reply: FastifyReply) {
  try {
    const currentCityHot = await getWeatherCurrentCity(req, reply)
    reply.send({ currentCityHot })
  } catch (error) {
    throw new Error(error.message)
  }
}
