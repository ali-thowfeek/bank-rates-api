const axios = require("axios");
const cheerio = require("cheerio");

const { supportedCurrencies } = require("../constants");

const targetUrl = "https://www.combank.lk/rates-tariff#exchange-rates";

const currencyDisplayText = Object.keys(supportedCurrencies).reduce(
  (obj, key) => {
    obj[key] = key;
    return obj;
  },
  {}
);

currencyDisplayText.USD = "US DOLLARS";

exports.scrapeData = async (currency) => {
  try {
    const response = await axios.get(targetUrl);
    const $ = cheerio.load(response.data);
    const table = $(".with-border");

    const row = table.find(
      `tbody tr:contains('${currencyDisplayText[currency]}')`
    );
    const buyingRate = parseFloat(row.find("td:nth-child(3)").text().trim());
    const sellingRate = parseFloat(row.find("td:nth-child(4)").text().trim());

    return {
      bank: "Commercial Bank",
      currency,
      buyingRate,
      sellingRate,
    };
  } catch (error) {
    console.error(error);
    throw new Error("Scraping failed for Commercial Bank.");
  }
};
