const app = require('../../src/app')
const tap = require('tap')
const supertest = require('supertest')

tap.test('GET `/health` route', async (t) => {
  const fastify = app()

  t.teardown(() => fastify.close())

  await fastify.ready()

  const response = await supertest(fastify.server)
    .get('/health')
    .expect(200)
    .expect('Content-Type', 'application/json; charset=utf-8')
  t.same(response.json(), { status: 'ok' })
})
