class RateResponse {
  constructor(
    bank = "",
    currency = "",
    type = "",
    buyingRate = 0,
    sellingRate = 0
  ) {
    this.bank = bank;
    this.currency = currency;
    this.type = type;
    this.buyingRate = buyingRate;
    this.sellingRate = sellingRate;
  }
}

module.exports = RateResponse;
