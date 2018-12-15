const router = require('./router/router')
const publicRouter = require('./router/public')

module.exports = function(app) {
  app.use(router)
  app.use(publicRouter)
}
