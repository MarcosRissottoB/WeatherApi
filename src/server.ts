import app from './app'

require('dotenv').config()
const port = process.env.PORT || 5000

const start = async () => {
  try {
    const server = await app()
    server.listen({ port, host: '0.0.0.0' })
  } catch (err) {
    console.log('err', err)
    server.log.error(err)
    process.exit(1)
  }
}
start()
