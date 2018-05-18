const request = require('request-promise');
const errors = require('throw.js');

module.exports.getCurrencies = async function (req, res, next) {
  console.log('getCurrencies');

  try {
    const page = req.query.page;

    const currencies = await request(
      {
        url: `https://api.coinmarketcap.com/v2/ticker/?limit=50${page ? `&start=${page * 50}` : ``}`,
        json:true
      }
    );

    res.json({
      success: true,
      total: currencies.metadata.num_cryptocurrencies,
      data: Object.keys(currencies.data).map(c => ({
        id: currencies.data[c].id,
        name: currencies.data[c].name,
        symbol: currencies.data[c].symbol,
        price: currencies.data[c].quotes.USD.price
      }))
    })
  }catch(e) {
    next(new errors.BadRequest());
  }
}
