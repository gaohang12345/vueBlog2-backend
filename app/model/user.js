/**
 * 用户基本信息
 */
const Sequelize = require('sequelize')
const Op = Sequelize.Op
const db = require('../../config/database')

const moment = require('moment')
const util = require('../service/util')

const User = db.define('user_info', {
  user_id: { type: Sequelize.STRING, primaryKey: true },
  create_at: { type: Sequelize.NOW },
  update_at: { type: Sequelize.NOW },
  is_deleted: { type: Sequelize.TINYINT, defaultValue: 0 },
  user_status: { type: Sequelize.TINYINT, defaultValue: 0 },
  age: { type: Sequelize.TINYINT, defaultValue: 0 },
  sex: { type: Sequelize.TINYINT, defaultValue: 0 },
  nick_name: { type: Sequelize.STRING, defaultValue: '' },
  mobile: { type: Sequelize.STRING },
  avatar: { type: Sequelize.STRING, defaultValue: '' },
  follower_count: { type: Sequelize.INTEGER, defaultValue: 0 },
  follow_count: { type: Sequelize.INTEGER, defaultValue: 0 },
  feed_count: { type: Sequelize.INTEGER, defaultValue: 0 },
  get_like_count: { type: Sequelize.INTEGER, defaultValue: 0 },
  score: { type: Sequelize.INTEGER, defaultValue: 0 },
  user_level: { type: Sequelize.INTEGER, defaultValue: 0 },
  is_realname: { type: Sequelize.INTEGER, defaultValue: 0 },
  last_location_log: { type: Sequelize.INTEGER, defaultValue: 0 },
  last_location_lat: { type: Sequelize.INTEGER, defaultValue: 0 },
  last_location_time: { type: Sequelize.NOW },
  birthday: { type: Sequelize.DATE },
  user_sign: { type: Sequelize.STRING, defaultValue: '' },
  star_sign: { type: Sequelize.STRING, defaultValue: '' },
  province: { type: Sequelize.STRING, defaultValue: '' },
  city: { type: Sequelize.STRING, defaultValue: '' },
  district: { type: Sequelize.STRING, defaultValue: '' },
  id_no: { type: Sequelize.STRING, defaultValue: '' },
  industry: { type: Sequelize.STRING, defaultValue: '' },
  company: { type: Sequelize.STRING, defaultValue: '' },
  graduate_school: { type: Sequelize.STRING, defaultValue: '' },
  education: { type: Sequelize.STRING, defaultValue: '' },
  duty: { type: Sequelize.STRING, defaultValue: '' },
  profile_bg: { type: Sequelize.STRING, defaultValue: '' },
  like_user_count: { type: Sequelize.INTEGER, defaultValue: 0 },
  get_user_like_count: { type: Sequelize.INTEGER, defaultValue: 0 }
})

module.exports = User
