class ClientError extends Error {
  constructor(status, message, statusCode = 400) {
    super(status, message);
    this.name = 'ClientError';
    this.status = status;
    this.message = message;
    this.statusCode = statusCode;
  }
}

module.exports = ClientError;
