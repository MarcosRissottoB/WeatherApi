require('dotenv').config()

export const weatherConfig = {
  baseUrl: process.env.WEATHER_BASE_URL,
  apiKey: process.env.WEATHER_API_KEY
}
