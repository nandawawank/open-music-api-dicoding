import ClientError from './ClientError.mjs';

class NotFoundError extends ClientError {
  constructor(message) {
    super(message, statusCode = 500);
    this.message = message;
    this.statusCode = statusCode;
  }
}

module.exports = NotFoundError;
