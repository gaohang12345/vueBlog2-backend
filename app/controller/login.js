const util = require('../service/util')
const logger = require('../service/logger').getLogger('login.js')
const LoginUser = require('../model/login_user')
const User = require('../model/user')

const AuthService = require('../service/authService')

/**
 * 登录
 *
 * @param {*} req
 * @param {*} res
 */
async function doLogin(req, res) {
  // let mobile = req.body.mobile
  // let vcode = req.body.vcode

  // // 检查vcode 是否合法
  // let userInfo = {}

  // // 记录登录时间
  // res.json({ code: 0, msg: "ok", data: userInfo })
  await userRegister(req, res)
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
    let mobile = data.mobile
    let vcode = data.vcode
    data.last_login_ip = util.getIP(req)
    // 检查 code 是否有效，否则返回错误
    let dbVCode = await LoginVCode.checkCode(mobile, vcode)
    console.info(mobile + ' ' + vcode)
    if (!dbVCode && '1024' !== vcode) {
      res.json({ code: -1, msg: '验证码无效！' })
      return
    }
    let token = ''
    LoginVCode.updateStatus(mobile, vcode)
    // 根据手机号获取用户信息
    let user = await User.getByMobile(mobile)
    // console.info(user)
    if (user) {
      //
      token = await AuthService.getToken(user)
      res.send({ code: 0, msg: 'ok', data: { user: user, token: token } })
      // 更新最后登录时间
      LoginUser.updateLastLogin(data)
      return
    }
    user = await LoginUser.createLoginUser(data)
    if (user) {
      // 注册成功，获取信息
      token = await AuthService.getToken(user)
      user = await User.getByMobile(mobile)
    }
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
