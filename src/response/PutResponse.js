const ClientResponse = require('./ClientResponse');

class PutRequest extends ClientResponse {
  constructor(status, statusCode, message) {
    super(status, statusCode, message);
    this.status = status;
    this.statusCode = statusCode;
    this.message = message;
  }
}

module.exports = PutRequest;
