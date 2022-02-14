const ClientError = require('../../exception/ClientError');
const InvariantError = require('../../exception/InvariantError');

const PostResponse = require('../../response/PostResponse');

class SongsHandler {
  constructor(service, validator) {
    this._service = service;
    this._validator = validator;

    this.postSongHandler = this.postSongHandler.bind(this);
  }

  async postSongHandler(request, h) {
    try {
      this._validator.validatorSongPayload(request.payload);

      const songId = await this._service.addSong(request.payload);

      return h.response(
          new PostResponse('success', 201, {songId: songId})).code(201);
    } catch (err) {
      if (err instanceof ClientError) {
        return h.response({
          status: err.status,
          message: err.message,
          code: err.code,
        }).code(err.code);
      }

      // SERVER ERROR
      return h.response(new InvariantError('fail', err)).code(500);
    }
  }
}

module.exports = SongsHandler;
