/* eslint-disable max-len */
const PostResponse = require('../../response/PostResponse');
const DeleteResponse = require('../../response/DeleteResponse');
class CollaborationsHandler {
  constructor(
      songsService,
      playlistsService,
      usersService,
      colaborationService,
      validator,
  ) {
    this._songsService = songsService;
    this._playlistsService = playlistsService;
    this._usersService = usersService;
    this._colaborationService = colaborationService;
    this._validator = validator;

    this.postCollaborationsHandler = this.postCollaborationsHandler.bind(this);
    this.deleteCollaborationsHandler = this.deleteCollaborationsHandler.bind(this);
  }

  async postCollaborationsHandler(request, h) {
    try {
      this._validator.validatorCollaborationPayload(request.payload);

      const {playlistId, userId} = request.payload;
      const {id: owner} = request.auth.credentials;

      await this._usersService.verifyUserById({userId: userId});
      await this._playlistsService.verifyPlaylistById({playlistId});
      await this._playlistsService.verifyPlaylistOwner({owner: owner, playlistId});

      const colabirationId = await this._colaborationService.addCollaboration({playlistId, userId});

      return h.response(new PostResponse(
          'success',
          201,
          {collaborationId: colabirationId}))
          .code(201);
    } catch (err) {
      throw err;
    }
  }

  async deleteCollaborationsHandler(request, h) {
    try {
      this._validator.validatorCollaborationPayload(request.payload);

      const {playlistId, userId} = request.payload;
      const {id: owner} = request.auth.credentials;

      await this._usersService.verifyUserById({userId});
      await this._playlistsService.verifyPlaylistById({playlistId});
      await this._playlistsService.verifyPlaylistOwner({owner, playlistId});

      const collaboratorId = await this._colaborationService.deleteCollaborations({playlistId, userId});

      return h.response(new DeleteResponse('success', `${collaboratorId} has been deleted`));
    } catch (err) {
      throw err;
    }
  }
}

module.exports = CollaborationsHandler;
