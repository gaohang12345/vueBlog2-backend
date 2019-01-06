/**
 * 用户基本信息
 */
const Sequelize = require('sequelize')
const Op = Sequelize.Op
const db = require('../../config/database')

const moment = require('moment')
const util = require('../service/util')

const UserInfo = db.define('user_info', {
  user_id: { type: Sequelize.STRING, primaryKey: true },
  create_at: { type: Sequelize.NOW },
  update_at: { type: Sequelize.NOW },
  is_deleted: { type: Sequelize.TINYINT, defaultValue: 0 },
  user_name: { type: Sequelize.STRING, defaultValue: '' },
  password: { type: Sequelize.STRING, defaultValue: '' },
  nick_name: { type: Sequelize.STRING, defaultValue: '' }
})

module.exports = UserInfo
