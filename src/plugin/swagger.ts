import Fastify from 'fastify'

const fastify = Fastify()

fastify.get('/weather', {
  schema: {
    description: 'Get weather current city data',
    tags: ['weather', 'city'],
    params: {
      type: 'object',
      properties: {
        city: { type: 'string' }
      }
    },
    response: {
      200: {
        description: 'Successful response',
        type: 'object',
        properties: {
          currentCityHot: { type: 'boolean' }
        }
      }
    },
    security: [
      {
        apiKey: []
      }
    ]
  }
}, (req, reply) => {})

fastify.ready()
