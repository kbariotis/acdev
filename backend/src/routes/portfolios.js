const request = require("request-promise");
const Portfolio = require("./../models/portfolio");
const PortfolioItem = require("./../models/portfolioItem");
const errors = require('throw.js');

module.exports.getPortfolios = async function (req, res, next) {
  const portfolios = await Portfolio.findAll();
  const total = await Portfolio.count();

  res.json({
    success: true,
    data: portfolios,
    total,
  })
}

module.exports.getPortfolio = async function (req, res, next) {
  const portfolio = await Portfolio.findById(req.params.id)

  if (portfolio) {
    res.json({
      success: true,
      data: portfolio
    })
  } else {
    next(new errors.NotFound())
  }
}

module.exports.createPortfolio = async function (req, res, next) {
  const portfolio = await Portfolio.create();

  for (const item in req.body.holdings) {
    const portfolioItem = await PortfolioItem.create({
      quantity: req.body.holdings[item].quantity,
      currencyId: req.body.holdings[item].id,
      portfolioId: portfolio.id
    });
  }

  res.json({
    success: true,
    data: portfolio
  })
}

module.exports.getPortfolioTotalValue = async function (req, res, next) {
  try{
    const portfolioItems = await PortfolioItem.findAll({
      where: {
        portfolioId: req.params.id
      }
    })

    let totalPrice = 0;

    for (const item in portfolioItems) {
      const price = await request(
        {
          url: `https://api.coinmarketcap.com/v2/ticker/${portfolioItems[item].currencyId}`,
          json:true
        }
      );

      totalPrice += price.data.quotes.USD.price;
    }

    res.json({
      success: true,
      data: totalPrice
    })
  }catch(e) {
    next(new errors.BadRequest());
  }
}
