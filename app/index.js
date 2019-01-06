const router = require('./router/router')
const publicRouter = require('./router/public')
const articleRouter = require('./router/article')
const articleTypeRouter = require('./router/articleType')

module.exports = function(app) {
  app.use(router)
  app.use(publicRouter)
  app.use(articleRouter)
  app.use(articleTypeRouter)
}
