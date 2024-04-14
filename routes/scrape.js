const express = require("express");
const router = express.Router();
const bankScrapers = require("../scrapers");
const constants = require("../constants");

router.get("/", async (req, res) => {
  const { bank, currency, type } = req.query;

  try {
    if (!bank || !currency) {
      return res.status(400).json({
        error: "Both 'bank' and 'currency' query parameters are required.",
      });
    }

    const passedBank = constants.supportedBanks[bank];
    if (!passedBank) {
      return res.status(400).json({
        error: "Bank not supported.",
      });
    }

    if (!constants.supportedCurrencies[currency]) {
      return res.status(400).json({
        error: "Currency not supported",
      });
    }

    const passedType = type
      ? constants.supportedTypes[type]
      : constants.supportedTypes.ttr;

    if (!passedType) {
      return res.status(400).json({
        error: "Invalid 'type' parameter",
      });
    }

    const scrapedData = await bankScrapers[passedBank.id].scrapeData(
      currency,
      passedType
    );
    res.json(scrapedData);
  } catch (error) {
    console.error(error);
    res.status(500).send({ error: error.message || "Server error" });
  }
});

module.exports = router;
