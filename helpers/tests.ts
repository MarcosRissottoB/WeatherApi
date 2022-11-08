import Fastify from 'fastify'
import fp from 'fastify-plugin'
import app from '../src/app'

async function config () {
  return {}
}

async function build () {
  const server = Fastify()

  server.register(fp(app), await config())
  await server.ready()

  server.close()

  return server
}

export {
  config,
  build
}
