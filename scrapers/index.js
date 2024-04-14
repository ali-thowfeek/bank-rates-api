const combankScaper = require("./combank");
const {
  supportedBanks: { combank },
} = require("../constants");

module.exports = {
  [combank.id]: combankScaper,
};
