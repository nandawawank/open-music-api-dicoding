const ExportPlaylistSchema = require('./schema');
const InvariantError = require('../../exception/InvariantError');

const ExportsValidatorPlaylist = {
  validateExportPlaylist: (payload) => {
    const validationResult = ExportPlaylistSchema.validate(payload);

    if (validationResult.error) {
      throw new InvariantError(validationResult.error.message);
    }
  },
};

module.exports = ExportsValidatorPlaylist;
