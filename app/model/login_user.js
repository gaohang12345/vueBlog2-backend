/**
 * 登录用户
 */

const Sequelize = require('sequelize')
const Op = Sequelize.Op
const db = require('../../config/database')
const util = require('../service/util')

const User = require('./user')

const LoginUser = db.define('login_user', {
  login_id: { type: Sequelize.STRING, primaryKey: true },
  create_at: { type: Sequelize.NOW },
  update_at: { type: Sequelize.NOW },
  is_deleted: { type: Sequelize.TINYINT, defaultValue: 0 },
  user_name: {
    type: Sequelize.STRING,
    allowNull: false,
    validate: {
      notEmpty: { msg: '用户名不能为空！' }
    }
  },
  user_pwd: { type: Sequelize.STRING },
  user_id: {
    type: Sequelize.STRING,
    allowNull: false,
    validate: {
      notEmpty: { msg: '用户ID 不能为空！' }
    }
  },
  device_info: { type: Sequelize.STRING },
  last_login_time: { type: Sequelize.DATE, defaultValue: Date.now },
  account_status: { type: Sequelize.TINYINT, defaultValue: 0 },
  last_login_ip: { type: Sequelize.STRING }
})

module.exports = LoginUser
