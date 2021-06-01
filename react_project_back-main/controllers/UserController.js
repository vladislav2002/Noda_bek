// External Dependancies
const boom = require('boom')

// Get Data Models
const User = require('../models/UserModel.js')
const Posts = require('../models/PostModel')
// bcrypt data
const { passwordHash } = require('../bcrypt.js')

// Получаем всех пользоваталей
exports.getUsers = async (req, reply) => {
  try {
    const users = await User.find()
    return users
  } catch (err) {
    throw boom.boomify(err)
  }
}

// Получать пользователя по id
exports.getSingleUser = async (req, reply) => {
  try {
    const id = req.params.id
    const user = await User.findById(id)
    return user
  } catch (err) {
    throw boom.boomify(err)
  }
}

// Добавляем нового пользователя
exports.addUser = async (req, reply) => {
  try {
    const userEx = await User.findOne({email: req.body.email})
    if(userEx) {
      return {exist: true}
    }
    const password = passwordHash(req.body.password)
    const user_data = { ...req.body, password }
    const user = new User(user_data)
    return user.save()
  } catch (err) {
    throw boom.boomify(err)
  }
}

// Обновляем текущего пользователя
exports.updateUser = async (req, reply) => {
  try {
    const id = req.params.id
    const user = req.body
    const { ...updateData } = user
    const update = await User.findByIdAndUpdate(id, updateData, { new: true })
    return update
  } catch (err) {
    throw boom.boomify(err)
  }
}

// Удаляем пользователя
exports.deleteUser = async (req, reply) => {
  try {
    const id = req.params.id
    const user = await User.findByIdAndRemove(id)
    return user
  } catch (err) {
    throw boom.boomify(err)
  }
}

// получаем топ пользователей 10 !!!!
exports.getTopUsers = async (req, reply) => {
  try {
    const currentUser = req.user.user._id;
    const users = await User.find()
    const results = []
    for await(let user of users) {
      const postByUser = await Posts.find({publisher: user._id})
      if(postByUser.length > 0) {
        if(user._doc._id !== currentUser) {
          await results.push({...user._doc, postcount: postByUser.length})
        }
      }
    }
    await results.sort( function( a , b){
      if(a.postcount > b.postcount) return 1;
      if(a.postcount < b.postcount) return -1;
      return 0;
    });
    reply.send({data: results.slice(0, 10)})
  } catch (err) {
    throw boom.boomify(err)
  }
}