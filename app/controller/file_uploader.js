/**
 *  文件上传、图片上传 
 */

const fs = require('fs')
const path = require("path")
const multer = require('multer')
const util = require("../service/util")
const cfg = require("../../config/constants")
const gm = require("gm")
const Url = require("url")

// 定义存储 
let avatarStorage = multer.diskStorage({
    destination: function (req, file, callback) {
        let date = new Date();
        let filePath = path.join("./", "static", "avatar", date.getFullYear() + "", (date.getMonth() + 1) + "",
            date.getDate() + "");
        util.mkdirsSync(filePath);
        callback(null, filePath);
    },
    filename: function (req, file, callback) {
        let extname = path.extname(file.originalname)
        let fname = util.getUUID() + extname
        console.info(fname) //Date.now() + "_" + file.originalname
        callback(null, fname);
    }
});

let avatarUploader = multer({ storage: avatarStorage }).any()//.array("file", 1); //Field name and max count

// 定义存储 
let imgStorage = multer.diskStorage({
    destination: function (req, file, callback) {
        let date = new Date();
        let filePath = path.join("./", "static", "images", date.getFullYear() + "", (date.getMonth() + 1) + "",
            date.getDate() + "");
        util.mkdirsSync(filePath);
        callback(null, filePath);
    },
    filename: function (req, file, callback) {
        let extname = path.extname(file.originalname)
        let fname = util.getUUID() + extname
        console.info(fname) //Date.now() + "_" + file.originalname
        callback(null, fname);
    }
});

let imgUploader = multer({ storage: imgStorage }).any()//.array("file", 1); //Field name and max count


// 定义存储  视频存储位置
let videoStorage = multer.diskStorage({
    destination: function (req, file, callback) {
        let date = new Date();
        let filePath = path.join("./", "static", "videos", date.getFullYear() + "", (date.getMonth() + 1) + "",
            date.getDate() + "");
        util.mkdirsSync(filePath);
        callback(null, filePath);
    },
    filename: function (req, file, callback) {
        let extname = path.extname(file.originalname)
        let fname = util.getUUID() + extname
        console.info(fname) //Date.now() + "_" + file.originalname
        callback(null, fname);
    }
});

let videoUploader = multer({ storage: videoStorage }).any()//.array("file", 1); //Field name and max count


/**
 * 上传图片 (注意：只支持单文件)
 * @param {*} req 
 * @param {*} res 
 */
async function uploadAvatar(req, res) {
    avatarUploader(req, res, (err) => {
        console.info("上传成功")
        if (!req.files || req.files.length == 0) {
            res.json({ code: -1, msg: "请选择图片" })
            return
        }
        if (err) {
            res.json({ code: -1, msg: "上传失败！" + err.message });
        } else {
            // TOOD:// 根据配置文件 放入 远程ftp服务器
            // url 地址 
            let url = req.files[0].path.replace('static', '')
            // console.info(url)
            url = cfg.imgServer + url.replace(/\\/g, '/')
            res.json({ code: 0, msg: "上传成功！", data: { img: req.files[0].path, url: url } })
        }
    })
}

/**
 * 上传图片 (支持多张)
 * @param {*} req 
 * @param {*} res 
 */
async function uploadImages(req, res) {
    imgUploader(req, res, (err) => {
        let needThumb = req.query.thumb
        console.info("上传成功 " + needThumb)
        if (!req.files || req.files.length == 0) {
            res.json({ code: -1, msg: "请选择图片" })
            return
        }
        if (err) {
            res.json({ code: -1, msg: "上传失败！" + err.message });
        } else {
            // url 地址 
            let resultFiles = []

            for (let f of req.files) {
                console.info(f)
                let url = f.path.replace('static', '')
                url = cfg.imgServer + url.replace(/\\/g, '/')

                let extName = path.extname(f.path)
                let fname = path.basename(f.path, extName)

                resultFiles.push({
                    img: f.path,
                    url: url,
                    originalname: f.originalname,
                    extname: extName,
                    thumb: Url.resolve(cfg.imgServer, path.dirname(f.path)).replace('static/', '') + "/" + fname + "_thumb" + extName
                })

                if (!needThumb){
                    continue
                }
                // 缩率图 
                let thumbFile = path.join(process.cwd(), path.dirname(f.path), fname + "_thumb" + extName)
                // console.info(thumbFile)

                let width = 600
                gm(path.join(process.cwd(), f.path)).size(function (err, size) {
                    // console.info(size)
                    width = size.width
                    if (width > 600) {
                        width = 600
                    }
                    gm(path.join(process.cwd(), f.path)).selectFrame(0).resize(width, width).autoOrient().write(thumbFile, function (err) {
                        if (err) {
                            console.info(err)
                        }
                    })
                })

            }
            // console.info(url)
            res.json({ code: 0, msg: "上传成功！", data: { img: resultFiles } })
        }
    })
}


/**
 * 上传视频 (注意：只支持单文件)
 * @param {*} req 
 * @param {*} res 
 */
async function uploadVideo(req, res) {
    videoUploader(req, res, (err) => {
        console.info("上传成功")
        if (!req.files || req.files.length == 0) {
            res.json({ code: -1, msg: "请选择视频文件" })
            return
        }
        if (err) {
            res.json({ code: -1, msg: "上传失败！" + err.message });
        } else {
            // TOOD:// 根据配置文件 放入 远程ftp服务器
            // url 地址 
            let url = req.files[0].path.replace('static', '')
            // console.info(url)
            url = cfg.imgServer + url.replace(/\\/g, '/')
            res.json({ code: 0, msg: "上传成功！", data: { video: req.files[0].path, url: url } })
        }
    })
}


module.exports = {
    uploadAvatar: uploadAvatar,
    uploadImages: uploadImages,
    uploadVideo: uploadVideo
}