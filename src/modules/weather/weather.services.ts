import axios from 'axios'
import { FastifyRequest, FastifyReply } from 'fastify'
import { weatherConfig } from '../../config/openWeatherMap.config'

const getWeather = async (city = 'Río Cuarto') => {
  try {
    const url = `${weatherConfig.baseUrl}weather?q=${city},&appid=${weatherConfig.apiKey}&units=metric`
    const { data } = await axios.get(url)
    return data
  } catch (error) {
    throw new Error(error.message)
  }
}

export async function getWeatherCurrentCity (req: FastifyRequest, reply: FastifyReply) {
  try {
    const { city } = req.query
    const data = await getWeather(city)
    let currentCityHot = false
    if (data.main.temp > 15) {
      currentCityHot = true
    }
    return currentCityHot
  } catch (error) {
    throw new Error(error.message)
  }
}
