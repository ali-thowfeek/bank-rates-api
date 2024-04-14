const supportedBanks = {
  combank: { id: "combank", name: "Commercial Bank Of Ceylon" },
  // TODO: add more
};

const supportedCurrencies = {
  USD: { id: "USD", name: "United States Dollar" },
  EUR: { id: "EUR", name: "Euro" },
  GBP: { id: "GBP", name: "British Pound Sterling" },
  // TODO: add more
};

const supportedTypes = {
  ttr: "Telegraphic Transfer Rate",
  cur: "Currency Rate",
  chq: "Cheque Rate",
};

module.exports = {
  supportedBanks: supportedBanks,
  supportedCurrencies: supportedCurrencies,
  supportedTypes: supportedTypes,
};
