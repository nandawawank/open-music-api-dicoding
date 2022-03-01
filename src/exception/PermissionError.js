const ClientError = require('./ClientError');

class PermissionError extends ClientError {
  constructor(status, message) {
    super(status, message, 403);
    this.name = 'PermissionError';
    this.status = status;
    this.message = message;
  }
}

module.exports = PermissionError;
