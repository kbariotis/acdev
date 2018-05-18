const Sequelize = require("sequelize")

const sequelize = require("./../services/sequelize").sequelize;

const Portfolio = require("./portfolio");

const PortfolioItem = sequelize.define("portfolioItem", {
  id: {
    type: Sequelize.INTEGER,
    autoIncrement: true,
    primaryKey: true
  },
  portfolioId: {
    type: Sequelize.INTEGER,
    references: {
      model: Portfolio,
      key: "id"
    }
  },
  quantity: {
    type: Sequelize.INTEGER,
  },
  currencyId: {
    type: Sequelize.STRING,
  }
})

module.exports = PortfolioItem;
