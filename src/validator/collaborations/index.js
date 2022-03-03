/* eslint-disable max-len */
const CollaborationPayloadSchema = require('./schema');
const InvariantError = require('../../exception/InvariantError');

const CollaborationPayloadValidator = {
  validatorCollaborationPayload: (payload) => {
    const validateResult = CollaborationPayloadSchema.validate(payload);

    if (validateResult.error) throw new InvariantError('fail', validateResult.error);
  },
};

module.exports = CollaborationPayloadValidator;
