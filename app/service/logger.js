var log4js = require('log4js');
var path = require("path");

const cfg = require("../../config/constants")

const logFile = cfg.logger.file || 'logs/log.log'
log4js.configure({
    appenders: {
        app: {
            type: 'file', 
            filename: logFile, 
            pattern: "_yyyy-MM-dd", 
            maxLogSize: (1048576 * 50), // 最大 50M
            backups: 5 // 保留5份 
        },
        console: { type: 'stdout' }
    },
    categories: { default: { appenders: ['app', 'console'], level: 'debug' } }
});

//log4js.setGlobalLogLevel(log4js.levels.ERROR);
// exports.setLogLevel = function (level) {
//     log4js.setGlobalLogLevel(level || log4js.levels.DEBUG);
// };

// module.exports = log4js
exports.getLogger = function (file) {
    var logger = log4js.getLogger(file || "app");
    return logger
};

exports.use = function (app) {
    //页面请求日志,用auto的话,默认级别是WARN  
    //app.use(log4js.connectLogger(dateFileLog, {level:'auto', format:':method :url'}));  
    app.use(log4js.connectLogger(log4js.getLogger("http"), { level: 'auto', format: ':method :url :status' }));
}

// log4js.getLogger().debug("hello")