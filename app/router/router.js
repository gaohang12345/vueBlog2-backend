const router = require('express').Router()

const commonCtl = require('../controller/common')
const loginCtl = require('../controller/login')
const fileUploadCtl = require('../controller/file_uploader')
const auth = require('../service/authService').auth

router.get('/', (req, res) => {
  res.send('ok')
})

// 获取随机头像列表
router.get('/getRandomAvatar', commonCtl.getRandomAvatar)

// 登录
router.post('/login', loginCtl.doLogin)

// 注册
router.post('/userReg', loginCtl.userRegister)

router.post('/uploadAvatar', auth, fileUploadCtl.uploadAvatar)
router.post('/uploadImages', auth, fileUploadCtl.uploadImages)
router.post('/uploadVideo', auth, fileUploadCtl.uploadVideo)

module.exports = router
