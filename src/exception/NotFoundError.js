const ClientError = require('./ClientError');

class NotFoundError extends ClientError {
  constructor(status, message) {
    super(status, message, 404);
    this.name = 'NotFoundError';
    this.status = status;
    this.message = message;
  }
}

module.exports = NotFoundError;
