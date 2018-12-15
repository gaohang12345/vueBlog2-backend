// 数据库 
const Sequelize = require('sequelize');
const cfg = require("../config/constants")

const sequelize = new Sequelize(cfg.db.database, cfg.db.userName, cfg.db.password, {
  host: cfg.db.host,
  port: cfg.db.port,
  dialect: 'mysql',
  pool: {
    max: 50,
    min: 1,
    acquire: 30000,
    idle: 10000
  },
  define: {
    freezeTableName: true, // 冻结表名
    timestamps: true, // true by default
    updatedAt: "update_at",
    createdAt: "create_at"
  },
  // logging: false,
  // http://docs.sequelizejs.com/manual/tutorial/querying.html#operators
  operatorsAliases: false,
  timezone: '+08:00' //东八时区
});

module.exports = sequelize