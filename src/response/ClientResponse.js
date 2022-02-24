class ClientResponse {
  constructor(status, statusCode = 200) {
    this.name = 'ClientResponse';
    this.status = status;
    this.statusCode = statusCode;
  }
}

module.exports = ClientResponse;
