// export = {};
const config = require("../config/db.config");
const Sequelize = require("sequelize");
const sequelize = new Sequelize(
  config.DB,
  config.USER,
  config.PASSWORD,
  {
    host: config.HOST,
    dialect: config.dialect,
    operatorsAliases: false,

    pool: {
      max: config.pool.max,
      min: config.pool.min,
      acquire: config.pool.acquire,
      idle: config.pool.idle
    }
  }
);
const user = require("../models/user.model")(sequelize, Sequelize)
const refreshToken = require("../models/refreshToken.model")(sequelize, Sequelize)

refreshToken.belongsTo(user, {
  foreignKey: 'userId', targetKey: 'id'
});
user.hasOne(refreshToken, {
  foreignKey: 'userId', targetKey: 'id'
});

const db = {
  Sequelize: Sequelize,
  sequelize: sequelize,
  user,
  refreshToken,
};
module.exports = db;