const { httpStatuses } = require("../constants");

class CustomError {
  constructor(errorMessage) {
    this.error = errorMessage;
  }
}

class BaseError {
  constructor(errorMessage, httpStatusCode) {
    this.body = new CustomError(errorMessage);
    this.httpStatusCode = httpStatusCode;
  }
}

class NotFoundError extends BaseError {
  constructor(error) {
    super(error, httpStatuses.NOT_FOUND);
  }
}

class ServerError extends BaseError {
  constructor(error) {
    super(error, httpStatuses.SERVER_ERROR);
  }
}

module.exports = { BaseError, NotFoundError, ServerError, CustomError };
