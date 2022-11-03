import { FastifyRequest, FastifyReply } from 'fastify'
import { getWeatherCurrentCityIsHot } from './weather.services'

export async function weatherHandler (req: FastifyRequest, reply: FastifyReply) {
  try {
    const weatherCurrentCityIsHot = await getWeatherCurrentCityIsHot(req, reply)
    reply.send({ weatherCurrentCityIsHot })
  } catch (error) {
    throw new Error(error.message)
  }
}
