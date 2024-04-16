const express = require("express");
const scrapeRoute = require("../routes/scrape");
const {
  supportedBanks,
  supportedCurrencies,
  supportedTypes,
} = require("../constants");

const router = express.Router();

router.get("/banks", (req, res) => {
  const banksArray = Object.values(supportedBanks).map((bank) => ({
    id: bank.id,
    name: bank.name,
  }));
  res.json(banksArray);
});

router.get("/currencies", (req, res) => {
  const currenciesArray = Object.values(supportedCurrencies).map(
    (currency) => ({
      id: currency.id,
      name: currency.name,
    })
  );
  res.json(currenciesArray);
});

router.get("/types", (req, res) => {
  const typesArray = Object.keys(supportedTypes).map((key) => ({
    id: key,
    name: supportedTypes[key],
  }));
  res.json(typesArray);
});

router.get("/metadata", (req, res) => {
  const banksArray = Object.values(supportedBanks).map((bank) => ({
    id: bank.id,
    name: bank.name,
  }));

  const currenciesArray = Object.values(supportedCurrencies).map(
    (currency) => ({
      id: currency.id,
      name: currency.name,
    })
  );

  const typesArray = Object.keys(supportedTypes).map((key) => ({
    id: key,
    name: supportedTypes[key],
  }));

  res.json({
    banks: banksArray,
    currencies: currenciesArray,
    types: typesArray,
  });
});

router.use("/scrape", scrapeRoute);

module.exports = router;
