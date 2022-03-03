const GetResponse = require('../../response/GetResponse');
class CollaborationsHandler {
  constructor(songsService, playlistsService, validator) {
    this._songsService = songsService;
    this._playlistsService = playlistsService;
    this._validator = validator;
  }

  async postCollaborationsHandler(request, h) {
    try {
      this._validator.validateCollaborationsPayload(request.payload);
      //   TODO HERE
      h.response(new GetResponse('success', '<some-data-here>'));
    } catch (err) {
      throw err;
    }
  }
}

module.exports = CollaborationsHandler;
