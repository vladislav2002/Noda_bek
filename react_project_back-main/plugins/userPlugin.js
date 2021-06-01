const userController = require('../controllers/UserController');
const UserCreateSchema = require('../schemas/userCreateSchema')

module.exports = function(fastify, opts, next) {

    fastify.route({
        method: 'POST',
        url: '/api/user',
        handler: userController.addUser,
        schema: {
            body: UserCreateSchema
        }
        // schema: documentation.addUserSchema
      })

      next()
}