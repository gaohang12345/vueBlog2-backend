const router = require('express').Router()

const auth = require('../service/authService').auth

const articleCtl = require('../controller/articleCtl')

// 获取文章列表
router.get('/article/list', articleCtl.getArticleList)

// 获取文章详情
router.get('/article/detail/:id', articleCtl.getArticleDetail)

// 新增文章
router.post('/article/add', articleCtl.addArticle)

module.exports = router
