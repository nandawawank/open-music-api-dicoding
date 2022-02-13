class ClientError extends Error {
  constructor(status, message, code = 400) {
    super(status, message);
    this.name = 'ClientError';
    this.status = status;
    this.message = message;
    this.code = code;
  }
}

module.exports = ClientError;
