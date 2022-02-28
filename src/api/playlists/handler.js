/* eslint-disable max-len */
const PostResponse = require('../../response/PostResponse');
const GetResponse = require('../../response/GetResponse');
const DeleteResponse = require('../../response/DeleteResponse');

class PlaylistsHandler {
  constructor(songsService, playlistsService, validator) {
    this._songsService = songsService;
    this._playlistsService = playlistsService;
    this._validator = validator;

    this.postPlaylistHandler = this.postPlaylistHandler.bind(this);
    this.getPlaylistHandler = this.getPlaylistHandler.bind(this);
    this.deletePlaylistHandler = this.deletePlaylistHandler.bind(this);
    this.postPlaylistSongHandler = this.postPlaylistSongHandler.bind(this);
  }

  async postPlaylistHandler(request, h) {
    try {
      this._validator.validatorPlaylistPayload(request.payload);
      const {name} = request.payload;
      const {id: credentialId} = request.auth.credentials;

      const playlistId = await this._playlistsService.addPlaylist({name, owner: credentialId});
      return h.response(new PostResponse('success', 201, {playlistId: playlistId})).code(201);
    } catch (err) {
      throw err;
    }
  }

  async getPlaylistHandler(request, h) {
    try {
      const {id: credentialId} = request.auth.credentials;
      const playlists = await this._playlistsService.getPlaylists({owner: credentialId});
      return h.response(new GetResponse('success', {playlists: playlists})).code(200);
    } catch (err) {
      throw err;
    }
  }

  async deletePlaylistHandler(request, h) {
    try {
      const {id: credentialId} = request.auth.credentials;
      const {playlistId} = request.params;

      await this._playlistsService.deletePlaylist({playlistId, owner: credentialId});
      return h.response(new DeleteResponse('success', `Playlist ${plalistId} has been deleted`)).code(200);
    } catch (err) {
      throw err;
    }
  }

  async postPlaylistSongHandler(request, h) {
    try {
      this._validator.validatorPlaylistSongPayload(request.payload);

      const {playlistId} = request.params;
      const {songId} = request.payload;

      await this._songsService.verifySongId({songId});
      const playlistSongId = await this._playlistsService.addPlaylistSong({playlistId, songId});
      return h.response({
        status: 'success',
        message: `Song ${playlistSongId} has been added to playlist`,
      }).code(201);
    } catch (err) {
      throw err;
    }
  }
}

module.exports = PlaylistsHandler;
