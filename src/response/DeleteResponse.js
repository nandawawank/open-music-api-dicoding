const ClientResponse = require('./ClientResponse');

class PutRequest extends ClientResponse {
  constructor(status, message) {
    super(status);
    this.status = status;
    this.message = message;
  }
}

module.exports = PutRequest;
