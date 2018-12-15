const util = require('../service/util')
const logger = require('../service/logger').getLogger('public.js')
const http = require('http')
const request = require('request')
const qs = require('querystring')
const iconv = require('iconv-lite')
var regin = require('../json/regin')

/**
 * 获取地址省市区
 * @param {*} req
 * @param {*} res
 */
async function getAddress(req, res) {
  let type = req.query.type
  let s = req.query.s
  let m = req.query.m
  let data = []
  if (type == 1) {
    data = getNameList(regin)
  }
  if (type == 2) {
    for (shen in regin) {
      if (regin[shen].name == s) {
        data = getNameList(regin[shen].child)
      }
    }
  }
  if (type == 3) {
    for (shen in regin) {
      if (regin[shen].name == s) {
        for (shi in regin[shen].child) {
          if (regin[shen].child[shi].name == m) {
            for (qu in regin[shen].child[shi].child) {
              data.push(regin[shen].child[shi].child[qu])
            }
          }
        }
      }
    }
  }
  res.json({ code: 0, msg: 'ok', data: data })
  return
}

function getNameList(obj) {
  let data = []
  for (key in obj) {
    data.push(obj[key].name)
  }
  return data
}

/**
 * 获取星座列表
 * @param {*} req
 * @param {*} res
 */
function getStarSignList(req, res) {
  let data = [
    '白羊座',
    '金牛座',
    '双子座',
    '巨蟹座',
    '狮子座',
    '处女座',
    '天枰座',
    '天蝎座',
    '射手座',
    '摩羯座',
    '水瓶座',
    '双鱼座'
  ]
  res.json({ code: 0, msg: 'ok', data: data })
  return
}

/**
 * 获取行业列表
 * @param {*} req
 * @param {*} res
 */
function getIndustryList(req, res) {
  let data = [
    'IT互联网',
    '工业制造业',
    '医药健康',
    '传媒公关',
    '影视娱乐',
    '文化艺术',
    '教育科研',
    '服务业',
    '公务员',
    '政法',
    '金融',
    '零售',
    '模特',
    '空姐',
    '学生',
    '其他'
  ]
  res.json({ code: 0, msg: 'ok', data: data })
  return
}

/**
 * 获取兴趣列表
 * @param {*} req
 * @param {*} res
 */
function getHobbyTypeList(req, res) {
  let data = ['运动', '歌曲', '影视', '书籍', '其他']
  res.json({ code: 0, msg: 'ok', data: data })
  return
}

module.exports = {
  getAddress: getAddress,
  getHobbyTypeList: getHobbyTypeList,
  getIndustryList: getIndustryList,
  getStarSignList: getStarSignList
}
