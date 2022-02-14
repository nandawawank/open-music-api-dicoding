const ClientResponse = require('./ClientResponse');

class PutRequest extends ClientResponse {
  constructor(status, code, message) {
    super(status, code, message);
    this.status = status;
    this.code = code;
    this.message = message;
  }
}

module.exports = PutRequest;
