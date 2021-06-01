// подключаем mongoose
const mongoose = require('mongoose')
// описываем схему бд для пользователей
const usersSchema = new mongoose.Schema({
  username: String,
  password: String,
  postcount: String,
  email: String,
  posts: {
    type: Map,
    of: String
  }
}, { timestamps: true })

module.exports = mongoose.model('Users', usersSchema)