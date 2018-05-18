const Sequelize = require("sequelize")
const sequelize = require("./../services/sequelize").sequelize;

const Portfolio = sequelize.define("portfolio", {
  id: {
    type: Sequelize.INTEGER,
    autoIncrement: true,
    primaryKey: true
  },
})

module.exports = Portfolio;
