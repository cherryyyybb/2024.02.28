const axios = require("axios");

const BASE_URLS = {
  binance: "https://api.binance.com/api/v3/ticker/24hr?symbol=",
  coinbase: "https://api.pro.coinbase.com/products/",
  bybit: "https://api.bybit.com/v2/public/tickers",
};

async function getPrice(pairA, pairB) {
  const result = {};

  // binance
  try {
    const binance = await axios.get(
      `${BASE_URLS.binance}${pairA.toUpperCase()}${pairB.toUpperCase()}`
    );
    result.binance = binance.data.lastPrice;
  } catch (error) {
    result.binance = null;
  }

  // coinbase
  try {
    const coinbase = await axios.get(
      `${
        BASE_URLS.coinbase
      }${pairA.toLowerCase()}-${pairB.toLowerCase()}/ticker`
    );
    result.coinbase = coinbase.data.price;
  } catch (error) {
    result.coinbase = null;
  }

  try {
    // bybit
    const bybit = await axios.get(`${BASE_URLS.bybit}`);
    const bybitData = bybit.data.result.filter(
      (item) => item.symbol === `${pairA.toUpperCase()}${pairB.toUpperCase()}`
    );
    result.bybit = bybitData[0].last_price;
  } catch (error) {
    result.bybit = null;
  }

  return result;
}

module.exports = {
  getPrice,
};
