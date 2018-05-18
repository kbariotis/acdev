const express = require("express")
const app = express()
const logger = require("winston");

app.use(require("body-parser").json())
app.use(require("cors")())

const sequelize = require("./services/sequelize").sequelize;
sequelize.sync()

const {
  getCurrencies
} = require("./routes/currencies");

const {
  getPortfolios,
  getPortfolio,
  createPortfolio,
  getPortfolioTotalValue
} = require("./routes/portfolios");

app.get("/currencies", getCurrencies)
app.get("/portfolios", getPortfolios)
app.post("/portfolios", createPortfolio)
app.get("/portfolios/:id", getPortfolio)
app.get("/portfolios/:id/totalValue", getPortfolioTotalValue)

app.use((err, req, res, next) => {
  logger.error(err);

  if (req.app.get("env") !== "development" && req.app.get("env") !== "test") {
    delete err.stack;
  }

  res.status(err.statusCode || 500).json({
    success: false,
    error: err
  });
});

app.listen(3000, "0.0.0.0", () => console.log("Example app listening on port 3000!"))
