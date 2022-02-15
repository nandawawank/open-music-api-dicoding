
const ClientError = require('../../exception/ClientError');
const InvariantError = require('../../exception/InvariantError');

const PostResponse = require('../../response/PostResponse');
const PutResponse = require('../../response/PutResponse');
const GetResponse = require('../../response/GetResponse');

class AlbumsHandler {
  constructor(service, validator) {
    this._service = service;
    this._validator = validator;

    this.postAlbumHandler = this.postAlbumHandler.bind(this);
    this.getAlbumByIdHandler = this.getAlbumByIdHandler.bind(this);
    this.putAlbumByIdHandler = this.putAlbumByIdHandler.bind(this);
    this.deleteAlbumByIdHandler = this.deleteAlbumByIdHandler.bind(this);
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

  async getAlbumByIdHandler(request, h) {
    try {
      const {id} = request.params;
      if (!id) {
        return h.response(
            new InvariantError('fail', 'id is required').code(400));
      }

      const album = await this._service.getAlbumById(id);

      return h.response(
          new GetResponse('success', 200, {album: album})).code(200);
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

  async putAlbumByIdHandler(request, h) {
    try {
      this._validator.validatorAlbumPayload(request.payload);

      const id = request.params.id;
      if (!id) return h.response(new InvariantError('fail', 'id is required'));

      const albumId = await this._service.editAlbumById(id, request.payload);

      return h.response(
          new PutResponse(
              'success', 200,
              `Albums with ${albumId} has been updated`))
          .code(200);
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

  async deleteAlbumByIdHandler(request, h) {
    try {
      const id = request.params.id;
      if (!id) return h.response(new InvariantError('fail', 'id is required'));

      const albumId = await this._service.deleteAlbumById(id);

      return h.response({
        status: 'success',
        message: `${albumId} has been deleted`,
        code: 200,
      }).code(200);
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
