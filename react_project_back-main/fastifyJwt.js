//### customAuthJwt.js
const fastifyJwt = require('fastify-jwt')
const fp = require('fastify-plugin')

async function customJwtAuth(fastify, opts, next) {
  fastify.register(fastifyJwt, { secret: 'asecretthatsverylongandimportedfromanenvfile' })
  fastify.decorate('/user', async function (request, reply) {
    try {
      // to whatever you want, read the token from cookies for example..
      const token = request.headers.authorization
      await request.jwtVerify(token)
    } catch (err) {
      reply.send(err)
    }
  })
}

module.exports = fp(customJwtAuth)