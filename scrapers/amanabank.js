const BankScrapper = require("../models/BankScrapper");

const { supportedBanks, supportedCurrencies } = require("../constants");

const bank = supportedBanks.amana;
const targetUrl =
  "https://www.amanabank.lk/business/treasury/exchange-rates.html";
const tableClass = ".table-colored";

const currencyDisplayTextInWebsite = Object.assign({}, supportedCurrencies);

currencyDisplayTextInWebsite.USD = "US Dollar";
currencyDisplayTextInWebsite.EUR = "Euro";
currencyDisplayTextInWebsite.GBP = "Sterling Pound";

const currencyBuyingIndex = null;
const currencySellingIndex = 4;
const chequeBuyingIndex = null;
const chequeSellingIndex = null;
const transferBuyingIndex = 2;
const transferSellingIndex = 3;

const AmanaScrapper = new BankScrapper(
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
);

module.exports = AmanaScrapper;
