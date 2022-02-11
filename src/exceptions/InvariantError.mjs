import ClientError from './ClientError.mjs';

class InvariantError extends ClientError {
  constructor(message, statusCode) {
    super(message, statusCode);
    this.message = message;
    this.statusCode = statusCode;
  }
}

module.exports = InvariantError;

