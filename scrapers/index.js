const combankScaper = require("./combank");
const amanaScaper = require("./amanabank");

const {
  supportedBanks: { combank, amana },
} = require("../constants");

module.exports = {
  [combank.id]: combankScaper,
  [amana.id]: amanaScaper,
};
