const router = require('express').Router()

const auth = require('../service/authService').auth

const articleTypeCtl = require('../controller/articleTypeCtl')

// 获取文章类型列表
router.get('/articleType/list', articleTypeCtl.getArticleTypeList)

// 新增文章类型
router.post('/articleType/add', articleTypeCtl.addArticleType)

module.exports = router
