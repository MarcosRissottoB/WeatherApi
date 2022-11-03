import { FastifyRequest, FastifyReply } from 'fastify'

export async function weatherHandler (req: FastifyRequest, reply: FastifyReply) {
  return ({ status: 'Weather handler' })
}
