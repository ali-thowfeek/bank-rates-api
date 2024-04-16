const express = require("express");
const router = express.Router();
const bankScrapers = require("../scrapers");
const {
  supportedBanks,
  supportedCurrencies,
  supportedTypes,
  httpStatuses,
} = require("../constants");
const { CustomError, BaseError } = require("../models/Error");

router.get("/", async (req, res) => {
  const { bank, currency, type } = req.query;

  try {
    if (!bank || !currency) {
      return res
        .status(httpStatuses.BAD_REQUEST)
        .json(
          new CustomError(
            "Both 'bank' and 'currency' query parameters are required."
          )
        );
    }

    const passedBank = supportedBanks[bank];
    if (!passedBank) {
      return res
        .status(httpStatuses.BAD_REQUEST)
        .json(new CustomError("Invalid 'bank' parameter."));
    }

    if (!supportedCurrencies[currency]) {
      return res
        .status(httpStatuses.BAD_REQUEST)
        .json(new CustomError("Invalid 'currency' parameter."));
    }

    const passedType = type ? supportedTypes[type] : supportedTypes.ttr;

    if (!passedType) {
      return res
        .status(httpStatuses.BAD_REQUEST)
        .json(new CustomError("Invalid 'type' parameter."));
    }

    const scrapedData = await bankScrapers[passedBank.id].scrapeData(
      currency,
      passedType
    );

    res.json(scrapedData);
  } catch (error) {
    if (error instanceof BaseError) {
      res.status(error.httpStatusCode).send(error.body);
    } else {
      res
        .status(httpStatuses.SERVER_ERROR)
        .send(new CustomError("Server error."));
    }
  }
});

module.exports = router;
