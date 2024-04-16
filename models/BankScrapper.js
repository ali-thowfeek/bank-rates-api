const axios = require("axios");
const cheerio = require("cheerio");
const RateResponse = require("./RateResponse");
const { supportedTypes, supportedCurrencies } = require("../constants");
const { BaseError, ServerError, NotFoundError } = require("./Error");

class BankScrapper {
  constructor(
    bank,
    targetUrl,
    tableClass,
    currencyDisplayTextInWebsite,
    currencyBuyingIndex,
    currencySellingIndex,
    chequeBuyingIndex,
    chequeSellingIndex,
    transferBuyingIndex,
    transferSellingIndex
  ) {
    this.bank = bank;
    this.targetUrl = targetUrl;
    this.tableClass = tableClass;
    this.currencyDisplayTextInWebsite = currencyDisplayTextInWebsite;
    this.currencyBuyingIndex = currencyBuyingIndex;
    this.currencySellingIndex = currencySellingIndex;
    this.chequeBuyingIndex = chequeBuyingIndex;
    this.chequeSellingIndex = chequeSellingIndex;
    this.transferBuyingIndex = transferBuyingIndex;
    this.transferSellingIndex = transferSellingIndex;
  }

  async scrapeData(currency, type) {
    try {
      const response = await axios.get(this.targetUrl);
      const $ = cheerio.load(response.data);
      const table = $(this.tableClass);
      const row = table.find(
        `tbody tr:contains('${this.currencyDisplayTextInWebsite[currency]}')`
      );

      if (row.length === 0) {
        throw new NotFoundError(
          `${currency}' is not supported by ${this.bank.name}.`
        );
      }

      let buyingElementIndex = null;
      let sellingElementIndex = null;

      if (type === supportedTypes.cur) {
        buyingElementIndex = this.currencyBuyingIndex;
        sellingElementIndex = this.currencySellingIndex;
      } else if (type === supportedTypes.chq) {
        buyingElementIndex = this.chequeBuyingIndex;
        sellingElementIndex = this.chequeSellingIndex;
      } else {
        // type === supportedTypes.ttr
        buyingElementIndex = this.transferBuyingIndex;
        sellingElementIndex = this.transferSellingIndex;
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
        throw new NotFoundError(
          `Type '${type}' not supported by ${this.bank.name}.`
        );
      }

      return new RateResponse(
        this.bank,
        supportedCurrencies[currency],
        type,
        buyingRate,
        sellingRate
      );
    } catch (error) {
      if (error instanceof BaseError) {
        throw error;
      } else {
        throw new ServerError(
          `Server error. Scraping failed for ${this.bank.name}.`
        );
      }
    }
  }
}

module.exports = BankScrapper;
