class ClientResponse {
  constructor(status, code = 200) {
    this.name = 'ClientResponse';
    this.status = status;
    this.code = code;
  }
}

module.exports = ClientResponse;
