const SongPayloadSchema = require('./schema');
const InvariantError = require('../../exception/InvariantError');


const SongValidator = {
  validatorSongPayload: (payload) => {
    const validationResult = SongPayloadSchema.validate(payload);

    if (validationResult.error) {
      return new InvariantError('fail', validationResult.error.message);
    }
  },
};

module.exports = SongValidator;
