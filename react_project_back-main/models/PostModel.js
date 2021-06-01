// подключаем зависимости для БД с npm пакета mongoose
const mongoose = require('mongoose')
const { Schema } = require('mongoose')
// описываем схему модели постов в mongodb
const postSchema = new mongoose.Schema({
  title: String,
  text: String,
  comment: String,
  images: Array,
  user: Object,
  publisher: {
    type: Schema.Types.ObjectId,
    ref: 'Users',
    required: true
  },
}, { timestamps: true })

module.exports = mongoose.model('Posts', postSchema)