const axios = require("axios");
const cheerio = require("cheerio");

const {
  supportedBanks,
  supportedCurrencies,
  supportedTypes,
} = require("../constants");

const targetUrl = "https://www.combank.lk/rates-tariff#exchange-rates";

const currencyDisplayTextInWebsite = Object.assign({}, supportedCurrencies);

currencyDisplayTextInWebsite.USD = "US DOLLARS";
currencyDisplayTextInWebsite.EUR = "EURO";
currencyDisplayTextInWebsite.GBP = "STERLING POUNDS";

exports.scrapeData = async (currency, type) => {
  try {
    const response = await axios.get(targetUrl);
    const $ = cheerio.load(response.data);
    const table = $(".with-border");

    const row = table.find(
      `tbody tr:contains('${currencyDisplayTextInWebsite[currency]}')`
    );

    let buyingElementIndex;
    let sellingElementIndex;

    if (type === supportedTypes.cur) {
      buyingElementIndex = 2;
      sellingElementIndex = 3;
    } else if (type === supportedTypes.chq) {
      buyingElementIndex = 4;
      sellingElementIndex = 5;
    } else {
      // type === supportedTypes.ttr
      buyingElementIndex = 6;
      sellingElementIndex = 7;
    }

    const buyingRate = parseFloat(
      row.find(`td:nth-child(${buyingElementIndex})`).text().trim()
    );
    const sellingRate = parseFloat(
      row.find(`td:nth-child(${sellingElementIndex})`).text().trim()
    );

    return {
      bank: supportedBanks.combank,
      currency: supportedCurrencies[currency],
      type,
      buyingRate,
      sellingRate,
    };
  } catch (error) {
    throw new Error("Scraping failed for Commercial Bank.");
  }
};
