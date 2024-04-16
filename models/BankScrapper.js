const RateResponse = require("./RateResponse");
// TODO: include other functionalities as well to prevent redundancy
class BankScrapper {
  constructor(scrapeData = async (currency, type) => new RateResponse()) {
    this.scrapeData = scrapeData;
  }
}

module.exports = BankScrapper;
