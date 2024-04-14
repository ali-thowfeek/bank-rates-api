const express = require("express");
const router = express.Router();
const bankScrapers = require("../scrapers");
const constants = require("../constants");

router.get("/", async (req, res) => {
  const { bank, currency } = req.query;

  try {
    if (!bank || !currency) {
      throw new Error(
        "Both 'bank' and 'currency' query parameters are required."
      );
    }

    const passedBank = constants.supportedBanks[bank];
    if (!passedBank) {
      throw new Error("Bank not supported");
    }

    if (!constants.supportedCurrencies[currency]) {
      throw new Error("Currency not supported");
    }

    const scrapedData = await bankScrapers[passedBank.id].scrapeData(currency);
    res.json(scrapedData);
  } catch (error) {
    console.error(error);
    res.status(500).send(error.message || "Server error");
  }
});

module.exports = router;
