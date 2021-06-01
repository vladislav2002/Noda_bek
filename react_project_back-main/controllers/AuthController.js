exports.singUp = async function (request, body) {
  const token = fastify.jwt.sign({ foo: 'bar' })
  reply.send({ token })
}