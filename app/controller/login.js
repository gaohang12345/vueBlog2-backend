const util = require('../service/util')
const logger = require('../service/logger').getLogger('login.js')
const User = require('../model/user_info')

const AuthService = require('../service/authService')

/**
 * 登录
 *
 * @param {*} req
 * @param {*} res
 */
async function doLogin(req, res) {
  let user = {
    id: 1,
    username: 'admin',
    password: '123456',
    avatar:
      'https://raw.githubusercontent.com/taylorchen709/markdown-images/master/vueadmin/user.png',
    name: '张某某'
  }

  res.json({ code: 0, msg: '登陆成功！', data: user })
}

/**
 * 用户注册
 * login_user 、user_info 表 同时插入新数据
 * @param {*} req
 * @param {*} res
 */
async function userRegister(req, res) {
  let data = req.body
  try {
    // 注册成功，获取信息
    token = await AuthService.getToken(user)
    user = await User.getByMobile(mobile)

    res.json({ code: 0, msg: 'ok', data: { user: user, token: token } })
  } catch (e) {
    logger.error(e)
    res.json({ code: -1, msg: e.message })
    return
  }
}

module.exports = {
  doLogin: doLogin,
  userRegister: userRegister
}
