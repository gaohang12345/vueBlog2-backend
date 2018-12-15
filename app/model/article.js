/**
 * 文章
 */
const Sequelize = require('sequelize')
const Op = Sequelize.Op
const db = require('../../config/database')

const moment = require('moment')

const Article = db.define('article', {
  id: { type: Sequelize.STRING, primaryKey: true },
  create_at: { type: Sequelize.NOW },
  update_at: { type: Sequelize.NOW },
  is_deleted: { type: Sequelize.TINYINT, defaultValue: 0 }
})

/**
 * 获取文章列表
 * @param {*} userId
 */
Article.queryAll = function(queryData) {
  return new Promise(function(resolve, reject) {
    Article.findAll({
      where: {
        is_deleted: 0
      },
      raw: true
    })
      .then(result => {
        resolve(result)
      })
      .catch(e => {
        reject(e)
      })
  })
}

module.exports = Article
