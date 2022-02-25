/* eslint-disable max-len */
const {
  AuthenticationPayloadSchema,
  RefreshTokenPayloadSchema,
} = require('./schema');
const InvariantError = require('../../exception/InvariantError');

const AuthenticationValidator = {
  validatorAuthenticationPayload: (payload) => {
    const validatorResult = AuthenticationPayloadSchema.validate(payload);
    if (validatorResult.error) {
      throw new InvariantError('fail', validatorResult.error.message);
    }
  },
  validatorRefreshTokenPayload: (payload) => {
    const validatorResult = RefreshTokenPayloadSchema.validate(payload);
    if (validatorResult.error) {
      throw new InvariantError('fail', validatorResult.error.message);
    }
  },
};

module.exports = AuthenticationValidator;
