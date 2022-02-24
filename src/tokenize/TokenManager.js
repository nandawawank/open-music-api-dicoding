/* eslint-disable max-len */
const Jwt = require('@hapi/jwt');
const InvariantError = require('../exception/InvariantError');

const TokenManager = {
  generateToken: (payload) => Jwt.token.generate(payload, process.env.TOKEN),
  generateRefreshToken: (payload) => Jwt.token.generate(payload, process.env.REFRESH_TOKEN),
  verifyRefreshToken: (refreshToken) => {
    try {
      const artifacts = Jwt.token.decode(refreshToken);
      Jwt.token.verifySignature(artifacts, process.env.REFRESH_TOKEN);
      const {payload} = artifacts.decoded;
      return payload;
    } catch (err) {
      throw new InvariantError('fail', 'Refresh Token Invalid');
    }
  },
};

module.exports = TokenManager;
