const UserPayloadSchema = require('./schema');
const InvariantError = require('../../exception/InvariantError');

const UserValidator = {
  validatorUserPayload: (payload) => {
    const validateResult = UserPayloadSchema.validate(payload);

    if (validateResult.error) {
      throw new InvariantError('fail', validateResult.error.message);
    }
  },
};

module.exports = UserValidator;
