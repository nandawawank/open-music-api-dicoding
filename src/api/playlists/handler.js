const PostResponse = require('../../response/PostResponse');
const GetResponse = require('../../response/GetResponse');
const DeleteResponse = require('../../response/DeleteResponse');

class PlaylistsHandler {
  constructor(service, validator) {
    this._service = service;
    this._validator = validator;

    this.postPlaylistHandler = this.postPlaylistHandler.bind(this);
  }

  async postPlaylistHandler(request, h) {
    try {
      this._validator.validatorPlaylistPayload(request.payload);

      const {playlistName} = await this._service.addPlaylist({name, owner});
      return h.response(new PostResponse('success', 201, {name: playlistName}));
    } catch (err) {
      throw err;
    }
  }
}

module.exports = PlaylistsHandler;
