/**
 * 文章
 */
const Sequelize = require('sequelize')
const Op = Sequelize.Op
const db = require('../../config/database')

const moment = require('moment')

const Comment = db.define('comment', {
  id: { type: Sequelize.STRING, primaryKey: true },
  create_at: { type: Sequelize.NOW },
  update_at: { type: Sequelize.NOW },
  is_deleted: { type: Sequelize.TINYINT, defaultValue: 0 },
  article_id: { type: Sequelize.STRING, defaultValue: '' },
  comment_content: { type: Sequelize.STRING, defaultValue: '' },
  comment_time: { type: Sequelize.NOW },
  praise_count: { type: Sequelize.NUMBER, defaultValue: 0 },
  reply_id: { type: Sequelize.STRING, defaultValue: '' },
  user_id: { type: Sequelize.STRING, defaultValue: '' }
})

module.exports = Comment
