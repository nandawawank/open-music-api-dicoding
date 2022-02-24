const AuthenticationSchema = require('./schema');
const InvariantError = require('../../exception/InvariantError');

const AuthenticationValidator = {
  validatorAuthenticationPayload: (payload) => {
    const validatorResult = AuthenticationSchema.validate(payload);

    if (validatorResult.error) {
      throw new InvariantError('fail', validatorResult.error.message);
    }
  },
};

module.exports = AuthenticationValidator;
