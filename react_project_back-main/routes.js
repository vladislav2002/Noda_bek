// импортируем контроллеры
const userController = require('./controllers/UserController')
const postController = require('./controllers/PostController')
// post schema
const postSchema = require('./schemas/postCreateSchema')

const routesPosts = [
    {
        method: 'GET',
        url: '/api/blurs',
        handler: postController.getPosts
    },
    {
        method: 'GET',
        url: '/api/blurs/:id',
        handler: postController.getSinglePost
    },
    {
        method: 'POST',
        url: '/api/blurs',
        handler: postController.addPost,
        schema: {
            body: postSchema
        }
        // schema: documentation.addUserSchema
    },
    {
        method: 'PUT',
        url: '/api/blurs/:id',
        handler: postController.updatePost
    },
    {
        method: 'DELETE',
        url: '/api/blurs/:id',
        handler: postController.deletePost
    }
]

const routesUser = [
  {
    method: 'GET',
    url: '/api/users',
    handler: userController.getUsers
  },
  {
    method: 'GET',
    url: '/api/user/:id',
    handler: userController.getSingleUser
  },
  {
    method: 'GET',
    url: '/api/user/top',
    handler: userController.getTopUsers
  },
  {
    method: 'PUT',
    url: '/api/user/:id',
    handler: userController.updateUser
  },
  {
    method: 'DELETE',
    url: '/api/user/:id',
    handler: userController.deleteUser
  }
]

module.exports = [...routesUser, ...routesPosts]