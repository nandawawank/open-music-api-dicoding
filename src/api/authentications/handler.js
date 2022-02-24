/* eslint-disable max-len */
const PostResponse = require('../../response/PostResponse');

class AuthenticationHandler {
  constructor(userService, authenticationService, tokenManager, validator) {
    this._userService = userService;
    this._authenticationService = authenticationService;
    this._tokenManager = tokenManager;
    this._validator = validator;

    this.postAuthenticationHandler = this.postAuthenticationHandler.bind(this);
  }

  async postAuthenticationHandler(request, h) {
    try {
      this._validator.validatorAuthenticationPayload(request.payload);

      const {username, password} = request.payload;
      const userId = await this._userService.verifyUserCredential({username, password});

      const token = this._tokenManager.generateToken({userId});
      const refreshToken = this._tokenManager.generateRefreshToken({userId});

      await this._authenticationService.addToken({userId, token});
      await this._authenticationService.addRefreshToken({userId, refreshToken});

      return h.response(new PostResponse('success', 200, `Authentication has been Successfully`)).code(200);
    } catch (err) {
      throw err;
    }
  }
}

module.exports = AuthenticationHandler;
