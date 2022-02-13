
const ClientError = require('../../exception/ClientError');
const InvariantError = require('../../exception/InvariantError');
const PostResponse = require('../../response/PostResponse');

class AlbumsHandler {
  constructor(service, validator) {
    this._service = service;
    this._validator = validator;

    this.postAlbumHandler = this.postAlbumHandler.bind(this);
  }

  async postAlbumHandler(request, h) {
    try {
      this._validator.validatorAlbumPayload(request.payload);

      const albumsId = await this._service.addAlbum(request.payload);

      return h.response(
          new PostResponse('success', 201, {albumId: albumsId})).code(201);
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

module.exports = AlbumsHandler;
