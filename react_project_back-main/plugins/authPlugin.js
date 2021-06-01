const fastifyJwt = require('fastify-jwt')
// подключаем необходимые зависимости
const User = require('../models/UserModel')
const { passwordCompare } = require('../bcrypt')
const routes = require('../routes')

// описываем плагин для внедрения аутендификации регистрации и авторизации
async function customJwtAuth(fastify, opts) {

    await fastify.register(fastifyJwt, { secret: 'asecretthatsverylongandimportedfromanenvfile' })
    fastify.post('/api/login', async (req, reply) => {
      const { email, password } = req.body
      if(!email || !password) {
          reply.send(
              {data: { empty: true }}
          )
      }
      const user = await User.findOne({email})
      if(!user) {
         return reply.code(404).send({message: 'пользователь не существует'})
      }
      else {
         if(passwordCompare(password, user.password)) {
            const token = fastify.jwt.sign({user: user})
            reply.send({empty: false, token, password: true, user: user })
         }
         else {
            reply.code(500).send({message: 'неправильный пароль'})
         }
         return reply.send({user: user})
      }
    })

    fastify.get('/user', async (request, reply) => {
      const auth = request.headers.authorization;
      const token = auth.split(' ')[1]

      if(!token || !auth) {
        return false
      }

      fastify.jwt.verify(token, (err, user) => {
        if (err) fastify.log.error(err)
        console.log(user)
        fastify.log.info('username : ' + user.username)
        reply.send(user)
      })
    })

    fastify.decorate("authenticate", async function(request, reply) {
      try {
        await request.jwtVerify()
      } catch (err) {
        reply.send(err)
      }
    })

    routes.forEach(route => {
      route.preValidation = [fastify.authenticate]
      fastify.route(route)
    })

}


module.exports = customJwtAuth