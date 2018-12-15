const router = require('express').Router()

const commonCtl = require('../controller/common')
const publicCtl = require('../controller/public')
const auth = require('../service/authService').auth

// 获取兴趣类型
router.get('/hobbyType/list', publicCtl.getHobbyTypeList)
// 获取行业列表
router.get('/industry/list', publicCtl.getIndustryList)
// 获取星座列表
router.get('/starSign/list', publicCtl.getStarSignList)
// 获取地址省市区
router.get('/address', publicCtl.getAddress)

module.exports = router
