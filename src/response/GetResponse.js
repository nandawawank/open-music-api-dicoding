const ClientResponse = require('./ClientResponse');

class GetResponse extends ClientResponse {
  constructor(status, code, data) {
    super(status, code);
    this.name = 'GetResponse';
    this.status = status;
    this.code = code;
    this.data = data;
  }
}

module.exports = GetResponse;
