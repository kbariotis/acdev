const Sequelize = require("sequelize");

const sequelize = new Sequelize(
  "assetz_capital_dev",
  process.env.MYSQL_ROOT_PASSWORD,
  process.env.MYSQL_USER,
  {
    dialect: "mysql",
    host: "mysql",
  }
);

module.exports = {
  sequelize
}
