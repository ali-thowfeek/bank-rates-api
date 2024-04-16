const BankScrapper = require("../models/BankScrapper");

const { supportedBanks, supportedCurrencies } = require("../constants");

const bank = supportedBanks.combank;
const targetUrl = "https://www.combank.lk/rates-tariff#exchange-rates";
const tableClass = ".with-border";

const currencyDisplayTextInWebsite = Object.assign({}, supportedCurrencies);

currencyDisplayTextInWebsite.USD = "US DOLLARS";
currencyDisplayTextInWebsite.EUR = "EURO";
currencyDisplayTextInWebsite.GBP = "STERLING POUNDS";

const currencyBuyingIndex = 2;
const currencySellingIndex = 3;
const chequeBuyingIndex = 4;
const chequeSellingIndex = 5;
const transferBuyingIndex = 6;
const transferSellingIndex = 7;

const CombankScrapper = new BankScrapper(
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

module.exports = CombankScrapper;
