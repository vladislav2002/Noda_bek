// плагин авторизации
const customJwtAuth = require('./plugins/authPlugin')
// модуль для работы с файловой системой
const fs = require('fs')
// модуль для работы с путями
const path = require('path')

// подключаем сам fastify
const fastify = require('fastify')({
    logger: true
})

// подключаем плагины fastify
fastify.register(require('./plugins/userPlugin'))
fastify.register(require('fastify-cors'))
fastify.register(customJwtAuth)
fastify.register(require('./plugins/uploadHandler'))

// Стартуем сервер
const start = async () => {
    try {
      await fastify.listen(3000)
      fastify.log.info(`server listening on ${fastify.server.address().port}`)
    } catch (err) {
      fastify.log.error(err)
      process.exit(1)
    }
  }
start()
// Подключаем модуль для работы с mongodb mongoose
const mongoose = require('mongoose')
// Подключаемся к базе данных
mongoose.connect('mongodb://localhost:27017/react-twitter', {
    useUnifiedTopology: true,
    useNewUrlParser: true
}).then(() => console.log('MongoDB connected')).catch(err => console.log(err))

const dir = './files';
// создаем папку для загрузки файлов (если она не была создана)
if (!fs.existsSync(dir)){
    fs.mkdirSync(dir);
}
// опредялем статические файлы для доступа
fastify.register(require('fastify-static'), {
  root: path.join(__dirname, 'files'),
  prefix: '/files/', // optional: default '/'
})