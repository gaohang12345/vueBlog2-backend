/**
 * 文章
 */
const Sequelize = require('sequelize')
const Op = Sequelize.Op
const db = require('../../config/database')

const moment = require('moment')

const ArticleType = db.define('article_type', {
  id: { type: Sequelize.STRING, primaryKey: true },
  create_at: { type: Sequelize.NOW },
  update_at: { type: Sequelize.NOW },
  is_deleted: { type: Sequelize.TINYINT, defaultValue: 0 },
  code: { type: Sequelize.STRING, defaultValue: '' },
  title: { type: Sequelize.STRING, defaultValue: '' },
  sort: { type: Sequelize.INTEGER, defaultValue: 0 }
})

/**
 * 获取文章类型列表
 * @param {*} userId
 */
ArticleType.getArticleTypeList = function(queryData) {
  return new Promise(function(resolve, reject) {
    ArticleType.findAll({
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
ArticleType.getArticleDetail = function(id) {
  return ArticleType.findOne({
    where: {
      is_deleted: 0,
      id: id
    }
  })
}

/**
 * 添加文章类型
 * @param {s} articleTypeJson
 */
ArticleType.addArticleType = function(articleTypeJson) {
  return ArticleType.create(articleTypeJson)
}

module.exports = ArticleType
