const app = require('../../src/app')
const tap = require('tap')
const supertest = require('supertest')

tap.test('GET `/` route', async (t) => {
  const fastify = app()

  t.teardown(() => fastify.close())

  await fastify.ready()

  const response = await supertest(fastify.server)
    .get('/')
    .expect(200)
    .expect('Content-Type', 'application/json; charset=utf-8')
})
