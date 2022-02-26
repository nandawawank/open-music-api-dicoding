/* eslint-disable new-cap */
/* eslint-disable max-len */
const PostResponse = require('../../response/PostResponse');
const DeleteResponse = require('../../response/DeleteResponse');

class AuthenticationHandler {
  constructor(userService, authenticationService, tokenManager, validator) {
    this._userService = userService;
    this._authenticationService = authenticationService;
    this._tokenManager = tokenManager;
    this._validator = validator;

    this.postAuthenticationHandler = this.postAuthenticationHandler.bind(this);
    this.putAuthenticationHandler = this.putAuthenticationHandler.bind(this);
    this.deleteAuthenticationHandler = this.deleteAuthenticationHandler.bind(this);
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

      return h.response(new PostResponse('success', 201, {
        accessToken: token,
        refreshToken: refreshToken,
      })).code(201);
    } catch (err) {
      throw err;
    }
  }

  async putAuthenticationHandler(request, h) {
    try {
      this._validator.validatorRefreshTokenPayload(request.payload);

      const {refreshToken} = request.payload;

      await this._authenticationService.verifyRefreshToken({refreshToken});
      const {userId} = this._tokenManager.verifyRefreshToken(refreshToken);

      const newToken = this._tokenManager.generateToken({userId});
      const newRefreshToken = this._tokenManager.generateRefreshToken({userId});

      await this._authenticationService.addToken({userId, token: newToken});
      await this._authenticationService.addRefreshToken({userId, refreshToken: newRefreshToken});

      return h.response(new PostResponse('success', 200, {accessToken: newToken})).code(200);
    } catch (err) {
      throw err;
    }
  }

  async deleteAuthenticationHandler(request, h) {
    try {
      this._validator.validatorRefreshTokenPayload(request.payload);

      const {refreshToken} = request.payload;

      await this._authenticationService.verifyRefreshToken({refreshToken});
      const {userId} = this._tokenManager.verifyRefreshToken(refreshToken);

      await this._authenticationService.deleteToken({userId});
      await this._authenticationService.deleteRefreshToken({userId});

      return h.response(new DeleteResponse('success', `Token ${userId} has been deleted`));
    } catch (err) {
      throw err;
    }
  }
}

module.exports = AuthenticationHandler;
