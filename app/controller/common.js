
const cfg = require("../../config/constants")

/**
 * 获取随机头像，返回10张
 * @param {*} req 
 * @param {*} res 
 */
function getRandomAvatar(req, res) {
    let sex = req.query.sex || '1'
    let maxCount = 25
    let returnCount = 20
    let prefix = cfg.imgServer

    let rdSet = new Set()
    while (rdSet.size < returnCount) {
        let i = Math.round(Math.random() * maxCount)
        if (i > 0) {
            rdSet.add(i)
        }
    }

    let img = []
    for (let i of rdSet) {
        img.push(prefix + "/avatar/" + sex + "_" + i + ".jpg")
    }

    res.json({ code: 0, msg: "ok", data: img })
}

module.exports = {
    getRandomAvatar: getRandomAvatar
}