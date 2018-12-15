function isDev() {
  return true
}

let cfg = {
  PORT: process.env.PORT || 3000,
  isDev: isDev(),
  db: {
    host: 'localhost',
    port: 3306,
    userName: 'root',
    password: '123456',
    database: 'oliver'
  },
  logger: {
    file: 'logs/log.log'
  },
  imgServer: 'http://192.168.1.102:3005' //图片地址
}

module.exports = cfg
