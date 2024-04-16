const axios = require("axios");
const cheerio = require("cheerio");
const { NotFoundError, BaseError, ServerError } = require("../models/Error");
const BankScrapper = require("../models/BankScrapper");

const {
  supportedBanks,
  supportedCurrencies,
  supportedTypes,
  httpStatuses,
} = require("../constants");
const RateResponse = require("../models/RateResponse");

const bank = supportedBanks.amana;

const targetUrl =
  "https://www.amanabank.lk/business/treasury/exchange-rates.html";

const currencyDisplayTextInWebsite = Object.assign({}, supportedCurrencies);

currencyDisplayTextInWebsite.USD = "US Dollar";
currencyDisplayTextInWebsite.EUR = "Euro";
currencyDisplayTextInWebsite.GBP = "Sterling Pound";

const scrapper = async (currency, type) => {
  try {
    const response = await axios.get(targetUrl);
    const $ = cheerio.load(response.data);
    const table = $(".table-colored");
    const row = table.find(
      `tbody tr:contains('${currencyDisplayTextInWebsite[currency]}')`
    );

    if (row.length === 0) {
      throw new NotFoundError(`${currency}' is not supported by ${bank.name}.`);
    }

    let buyingElementIndex = null;
    let sellingElementIndex = null;

    if (type === supportedTypes.cur) {
      // note: bank doesn't provide currency buying rate
      sellingElementIndex = 4;
    } else if (type === supportedTypes.ttr) {
      // type === supportedTypes.ttr
      buyingElementIndex = 2;
      sellingElementIndex = 3;
    }

    const buyingRate =
      buyingElementIndex !== null
        ? parseFloat(
            row.find(`td:nth-child(${buyingElementIndex})`).text().trim()
          )
        : null;

    const sellingRate =
      sellingElementIndex !== null
        ? parseFloat(
            row.find(`td:nth-child(${sellingElementIndex})`).text().trim()
          )
        : null;

    if (buyingRate === null && sellingRate === null) {
      throw new NotFoundError(`Type '${type}' not supported by ${bank.name}.`);
    }

    return new RateResponse(
      bank,
      supportedCurrencies[currency],
      type,
      buyingRate,
      sellingRate
    );
  } catch (error) {
    if (error instanceof BaseError) {
      throw error;
    } else {
      throw new ServerError(`Server error. Scraping failed for ${bank.name}.`);
    }
  }
};

module.exports = new BankScrapper(scrapper);
