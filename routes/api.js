const express = require("express");
const scrapeRoute = require("../routes/scrape");
const constants = require("../constants");

const router = express.Router();

router.get("/banks", (req, res) => {
  const banksArray = Object.values(constants.supportedBanks).map((bank) => ({
    id: bank.id,
    name: bank.name,
  }));
  res.json(banksArray);
});

router.get("/currencies", (req, res) => {
  const currenciesArray = Object.values(constants.supportedCurrencies).map(
    (currency) => ({
      id: currency.id,
      name: currency.name,
    })
  );
  res.json(currenciesArray);
});

router.get("/types", (req, res) => {
  const typesArray = Object.keys(constants.supportedTypes).map((key) => ({
    id: key,
    name: constants.supportedTypes[key],
  }));
  res.json(typesArray);
});

router.use("/scrape", scrapeRoute);

module.exports = router;
