const ClientResponse = require('./ClientResponse');

class GetResponse extends ClientResponse {
  constructor(status, statusCode, data) {
    super(status, statusCode);
    this.name = 'GetResponse';
    this.status = status;
    this.statusCode = statusCode;
    this.data = data;
  }
}

module.exports = GetResponse;
