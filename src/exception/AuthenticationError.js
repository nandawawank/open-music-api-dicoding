const ClientError = require('./ClientError');

class AuthenticationError extends ClientError {
  constructor(status, message) {
    super(status, message, 401);
    this.name = 'AuthenticationError';
    this.status = status;
    this.message = message;
  }
}

module.exports = AuthenticationError;
