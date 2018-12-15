const uuid = require("uuid")

const fs = require('fs')
const path = require("path")
const moment = require("moment")

/**
 * 生成uuid
 * 
 */
function getUUID() {
    return uuid.v1().replace(/\-/g, '')
}

/**
 * 递归创建目录 同步
 * @param {*} dirname 
 */
function mkdirsSync(dirname) {
    //console.log(dirname);
    if (fs.existsSync(dirname)) {
        return true;
    } else {
        if (mkdirsSync(path.dirname(dirname))) {
            fs.mkdirSync(dirname);
            return true;
        }
    }
}
let chars = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9']

function getRandomCode(n) {
    var res = "";
    for (var i = 0; i < n; i++) {
        var id = Math.ceil(Math.random() * 9);
        res += chars[id];
    }
    return res;
}

/**
 * 获取客户端ip
 * @param {*} req 
 */
function getIP(req) {
    var ip = req.headers['x-real-ip'] ||
        req.headers['x-forwarded-for'] ||
        req.ip ||
        req.connection.remoteAddress ||
        req.socket.remoteAddress ||
        req.connection.socket.remoteAddress || '';

    if (ip.split(',').length > 0) {
        ip = ip.split(',')[0]
    }
    return ip;
}

/**
 * 日期格式化()
 * @param {*} date
 * @param {*} withTime 默认 true 
 */
function dateFormat(date, withTime) {
    if(!date){
        return ""
    }

    if(typeof withTime == "undefined"){
        withTime = true
    }
    // console.info(withTime)
    if (withTime){
        return moment(date).format("YYYY-MM-DD HH:mm:ss")
    }
    return moment(date).format("YYYY-MM-DD")
}

module.exports = {
    getUUID: getUUID,
    mkdirsSync: mkdirsSync,
    getRandomCode: getRandomCode,
    getIP: getIP,
    dateFormat: dateFormat
}
