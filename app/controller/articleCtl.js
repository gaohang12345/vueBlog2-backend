const util = require('../service/util')
const logger = require('../service/logger').getLogger('articleCtl.js')
const AuthService = require('../service/authService')

const Article = require('../model/article')

/**
 * 获取文章列表
 *
 * @param {*} req
 * @param {*} res
 */
async function getArticleList(req, res) {
  try {
    let queryJson = req.params
    let list = await Article.getArticleList()
    let result = {
      list: list,
      total: 0
    }
    res.json({ code: 0, msg: '获取文章列表成功', data: result })
  } catch (e) {
    logger.error(e)
    res.json({ code: -1, msg: e.message })
  }
}

/**
 * 获取文章详情
 * @param {*} req
 * @param {*} res
 */
async function getArticleDetail(req, res) {
  try {
    let id = req.query.id
    let data = await Article.getArticleDetail(id)
    res.json({ code: 0, msg: 'ok', data: data })
  } catch (e) {
    logger.error(e)
    res.json({ code: -1, msg: e.message })
  }
}

/**
 * 新增文章
 *
 * @param {*} req
 * @param {*} res
 */
async function addArticle(req, res) {
  try {
    let articleJson = req.body.params
    articleJson.id = util.getUUID()
    let data = await Article.addArticle(articleJson)
    res.json({ code: 0, msg: 'ok', data: data })
  } catch (e) {
    logger.error(e)
    res.json({ code: -1, msg: e.message })
  }
}

module.exports = {
  addArticle: addArticle,
  getArticleList: getArticleList,
  getArticleDetail: getArticleDetail
}
