const { Sequelize } = require('sequelize');
const config = require('../config');

const sequelize = new Sequelize(config.db.database, config.db.username, config.db.password, {
  host: config.db.host,
  dialect: config.db.dialect
});

const Video = require('./video')(sequelize, Sequelize);
const Insight = require('./Insight')(sequelize, Sequelize);

sequelize.sync({ alter: true });

module.exports = {
  sequelize,
  Video,
  Insight
};