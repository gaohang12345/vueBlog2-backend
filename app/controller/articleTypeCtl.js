const util = require('../service/util')
const logger = require('../service/logger').getLogger('articleTypeCtl.js')
const AuthService = require('../service/authService')

const ArticleType = require('../model/article_type')

/**
 * 获取文章类型列表
 *
 * @param {*} req
 * @param {*} res
 */
async function getArticleTypeList(req, res) {
  try {
    let data = await ArticleType.getArticleTypeList()
    let result = {
      data: data,
      total: 0
    }
    res.json({ code: 0, msg: 'ok', data: result })
  } catch (e) {
    logger.error(e)
    res.json({ code: -1, msg: e.message })
  }
}

/**
 * 添加文章类型
 *
 * @param {*} req
 * @param {*} res
 */
async function addArticleType(req, res) {
  try {
    let articleTypeJson = res.body
    let data = await ArticleType.addArticleType(articleTypeJson)
    res.json({ code: 0, msg: 'ok', data: data })
  } catch (e) {
    logger.error(e)
    res.json({ code: -1, msg: e.message })
  }
}

module.exports = {
  addArticleType: addArticleType,
  getArticleTypeList: getArticleTypeList
}
