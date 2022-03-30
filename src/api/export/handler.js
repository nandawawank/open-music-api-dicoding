const {sendMessage} = require('../../services/rabbitmq/ProducerService');
class ExportHandler {
  constructor(playlistsService, validator) {
    this._playlistsService = playlistsService;
    this._validator = validator;

    this.postExportPlaylistHandler = this.postExportPlaylistHandler.bind(this);
  }

  async postExportPlaylistHandler(request, h) {
    try {
      this._validator.validateExportPlaylist(request.payload);

      const {playlistId} = request.params;
      const {targetEmail} = request.payload;
      const {id: userId} = await request.auth.credentials;

      await this._playlistsService.verifyPlaylistAccess({playlistId, userId});

      const message = {
        playlistId: playlistId,
        targetEmail: targetEmail,
      };

      await sendMessage(
          `export:playlist`,
          JSON.stringify(message),
      );

      return h.response({
        'status': 'success',
        'message': 'Permintaan Anda sedang kami proses',
      }).code(201);
    } catch (err) {
      throw err;
    }
  }
}

module.exports = ExportHandler;
