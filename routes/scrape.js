const express = require("express");
const router = express.Router();
const bankScrapers = require("../scrapers");

router.get("/", async (req, res) => {
  const { bank, currency } = req.query;

  try {
    if (!bank || !currency) {
      throw new Error(
        "Both 'bank' and 'currency' query parameters are required."
      );
    }

    const scrapedData = await bankScrapers[bank].scrapeData(currency);
    res.json(scrapedData);
  } catch (error) {
    console.error(error);
    res.status(400).send(error.message || "Invalid request.");
  }
});

module.exports = router;
