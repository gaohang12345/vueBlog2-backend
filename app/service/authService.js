/**
 * 认证服务
 */
const cfg = require('../../config/constants')
const jwt = require('jsonwebtoken')

const key = 'x_oliver_x'

// token过期 秒数 20分钟  测试cookie 时间超长
const expiredSeconds = 60 * 20 * 10000

function getToken(user) {
  return new Promise((resolve, reject) => {
    let obj = {
      user_id: user.user_id
    }
    let token = jwt.sign(obj, key, {
      expiresIn: expiredSeconds
    })
    console.info('token:' + token)
    resolve(token)
  })
}

function auth(req, res, next) {
  let token = req.query.token || req.body.token || req.headers['token']
  // console.info(token)
  jwt.verify(token, key, function(err, decode) {
    if (err) {
      console.info('授权失败！token:' + token)
      // 失败
      res.json({ code: -9, msg: '用户授权失败！请重新登录' })
    } else {
      console.info(decode)
      req.user = decode
      next()
    }
  })
}

module.exports = {
  getToken: getToken,
  auth: auth
}

// test
let user = {
  user_id: 'b9e8a5d046ca11e8b53c958b065d2c6c'
}

getToken(user).then(d => {
  console.info(d)
})
