const supportedBanks = {
  combank: { id: "combank", name: "Commercial Bank Of Ceylon" },
  amana: { id: "amana", name: "Amana Bank" },
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

const httpStatuses = {
  SUCCESS: 200,
  SERVER_ERROR: 500,
  BAD_REQUEST: 400,
  NOT_FOUND: 404,
};

module.exports = {
  supportedBanks,
  supportedCurrencies,
  supportedTypes,
  httpStatuses,
};
