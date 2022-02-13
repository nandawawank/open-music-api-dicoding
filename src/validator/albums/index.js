const AlbumPayloadSchema = require('./schema');
const InvariantError = require('../../exception/InvariantError');

const AlbumValidator = {
  validatorAlbumPayload: (payload) => {
    const validationResult = AlbumPayloadSchema.validate(payload);

    if (validationResult.error) {
      throw new InvariantError('fail', validationResult.error.message);
    }
  },
};

module.exports =AlbumValidator;
