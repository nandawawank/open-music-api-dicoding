const ClientResponse = require('./ClientResponse');

class PostResponse extends ClientResponse {
  constructor(status, statusCode, data) {
    super(status, statusCode);
    this.name = 'PostResponse';
    this.status = status;
    this.statusCode = statusCode;
    this.data = data;
  }
}

module.exports = PostResponse;
