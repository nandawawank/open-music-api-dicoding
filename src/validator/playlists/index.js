/* eslint-disable max-len */
const {
  PlaylistPayloadSchema, PlaylistSongsPayloadSchema,
} = require('./schema');
const InvariantError = require('../../exception/InvariantError');

const PlaylistPayloadValidator = {
  validatorPlaylistPayload: (payload) => {
    const validateResult = PlaylistPayloadSchema.validate(payload);

    if (validateResult.error) throw new InvariantError('fail', validateResult.error.message);
  },
  validatorPlaylistSongPayload: (payload) => {
    const validateResult = PlaylistSongsPayloadSchema.validate(payload);

    if (validateResult.error) throw new InvariantError('fail', validateResult.error.message);
  },
};

module.exports = PlaylistPayloadValidator;
