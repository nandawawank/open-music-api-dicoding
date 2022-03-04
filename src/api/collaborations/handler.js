/* eslint-disable max-len */
const PostResponse = require('../../response/PostResponse');
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
  }

  async postCollaborationsHandler(request, h) {
    try {
      this._validator.validatorCollaborationPayload(request.payload);

      const {playlistId, userId} = request.payload;

      await this._usersService.verifyUserById({userId: userId});
      await this._playlistsService.verifyPlaylistById({playlistId});
      await this._playlistsService.verifyPlaylistOwner({owner: userId, playlistId});

      const colabirationId = await this._colaborationService.addCollaboration({playlistId, userId});
      h.response(new PostResponse('success', 201, `Collaboration ${colabirationId} has been added`));
    } catch (err) {
      throw err;
    }
  }
}

module.exports = CollaborationsHandler;
