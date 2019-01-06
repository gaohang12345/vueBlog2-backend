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
  is_deleted: { type: Sequelize.TINYINT, defaultValue: 0 },
  publish_date: { type: Sequelize.NOW },
  title: { type: Sequelize.STRING, defaultValue: '' },
  html: { type: Sequelize.STRING, defaultValue: '' },
  text: { type: Sequelize.STRING, defaultValue: '' },
  article_type_title: { type: Sequelize.STRING, defaultValue: '' },
  article_type_id: { type: Sequelize.STRING, defaultValue: '' },
  article_desc: { type: Sequelize.STRING, defaultValue: '' },
  thumbnail: { type: Sequelize.STRING, defaultValue: '' },
  status: { type: Sequelize.TINYINT, defaultValue: 1 }
})

/**
 * 获取文章列表
 * @param {*} userId
 */
Article.getArticleList = function(queryData) {
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

/**
 * 获取文详情
 * @param {*} id
 */
Article.getArticleDetail = function(id) {
  return Article.findOne({
    where: {
      is_deleted: 0,
      id: id
    }
  })
}

/**
 * 添加文章
 * @param {s} articleJson
 */
Article.addArticle = function(articleJson) {
  return Article.create(articleJson)
}

module.exports = Article
