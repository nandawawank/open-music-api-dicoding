const ClientResponse = require('./ClientResponse');

class GetResponse extends ClientResponse {
  constructor(status, data) {
    super(status);
    this.name = 'GetResponse';
    this.status = status;
    this.data = data;
  }
}

module.exports = GetResponse;
