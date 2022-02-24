/* eslint-disable max-len */
const PostResponse = require('../../response/PostResponse');
class UsersHandler {
  constructor(service, validator) {
    this._service = service;
    this._validator = validator;

    this.postUserHandler = this.postUserHandler.bind(this);
  }

  async postUserHandler(request, h) {
    try {
      this._validator.validatorUserPayload(request.payload);
      const {
        username,
        password,
        fullname,
      } = request.payload;

      const userId = await this._service.addUser({username, password, fullname});
      return h.response(new PostResponse('success', 201, {userId: userId})).code(201);
    } catch (err) {
      throw err;
    }
  }
}

module.exports = UsersHandler;
