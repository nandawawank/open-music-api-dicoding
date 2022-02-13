const ClientError = require('./ClientError');

class InvariantError extends ClientError {
  constructor(status, message) {
    super(status, message);
    this.name = 'InvariantError';
    this.status = status;
    this.message = message;
  }
}

module.exports = InvariantError;
