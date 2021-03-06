const express = require('express')
const app = require('express')()
const Promise = require('bluebird')
const bodyParser = require('body-parser')

const cfg = require('./config/constants')

// 全局使用 bluebird
global.Promise = Promise

//日志
const logger = require('./app/service/logger')
logger.use(app)

app.use(express.static(__dirname + '/static'))

// console 打入 文件日志
console.info = function(msg) {
  logger.getLogger('console').info(msg)
}
console.error = function(msg) {
  logger.getLogger('console').error(msg)
}

//设置允许跨域访问该服务.
app.all('*', function(req, res, next) {
  res.header('Access-Control-Allow-Origin', '*')
  res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE')
  res.header('Access-Control-Allow-Headers', 'Content-Type')
  res.header('Access-Control-Allow-Credentials', 'true')
  next()
})

app.use(
  bodyParser.json({
    limit: '20mb'
  })
)

app.use(bodyParser.urlencoded({ limit: '20mb', extended: false }))
const routers = require('./app/')

routers(app)

// 异常处理
process.on('uncaughtException', function(err) {
  console.log('Caught exception: ', err)
})

// 监听端口
app.listen(cfg.PORT, err => {
  if (err) {
    console.error('app listen error : ' + err.message)
  } else {
    console.info('server listen on ' + cfg.PORT)
  }
})
