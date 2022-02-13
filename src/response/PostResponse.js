const ClientResponse = require('./ClientResponse');

class PostResponse extends ClientResponse {
  constructor(status, code, data) {
    super(status, code);
    this.name = 'PostResponse';
    this.status = status;
    this.code = code;
    this.data = data;
  }
}

module.exports = PostResponse;
