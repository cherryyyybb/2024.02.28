const cryptoPrices = require("./src/price");

async function main() {
  const price = await cryptoPrices.getPrice("BTC", "USDT");
  console.log(`The current price of BTC/USDT`, price);
}

main();
