/* eslint-disable max-len */

const ClientError = require('../../exception/ClientError');
const InvariantError = require('../../exception/InvariantError');

const PostResponse = require('../../response/PostResponse');
const PutResponse = require('../../response/PutResponse');
const GetResponse = require('../../response/GetResponse');

class AlbumsHandler {
  constructor(albumsService, storageService, validator) {
    this._albumsService = albumsService;
    this._storageService = storageService;
    this._validator = validator;

    this.postAlbumHandler = this.postAlbumHandler.bind(this);
    this.getAlbumByIdHandler = this.getAlbumByIdHandler.bind(this);
    this.putAlbumByIdHandler = this.putAlbumByIdHandler.bind(this);
    this.deleteAlbumByIdHandler = this.deleteAlbumByIdHandler.bind(this);
    this.postCoverAlbumHandler = this.postCoverAlbumHandler.bind(this);
  }

  async postAlbumHandler(request, h) {
    try {
      this._validator.validatorAlbumPayload(request.payload);

      const albumsId = await this._albumsService.addAlbum(request.payload);

      return h.response(
          new PostResponse('success', 201, {albumId: albumsId})).code(201);
    } catch (err) {
      if (err instanceof ClientError) {
        return h.response({
          status: err.status,
          message: err.message,
          statusCode: err.statusCode,
        }).code(err.statusCode);
      }

      // SERVER ERROR
      return h.response(new InvariantError('fail', err)).code(500);
    }
  }

  async getAlbumByIdHandler(request, h) {
    try {
      const {albumId} = request.params;
      if (!albumId) {
        return h.response(
            new InvariantError('fail', 'id is required').code(400));
      }

      const album = await this._albumsService.getAlbumById(albumId);

      return h.response(
          new GetResponse('success', {album: album})).code(200);
    } catch (err) {
      if (err instanceof ClientError) {
        return h.response({
          status: err.status,
          message: err.message,
          statusCode: err.statusCode,
        }).code(err.statusCode);
      }

      // SERVER ERROR
      return h.response(new InvariantError('fail', err)).code(500);
    }
  }

  async putAlbumByIdHandler(request, h) {
    try {
      this._validator.validatorAlbumPayload(request.payload);

      const {albumId} = request.params;
      if (!albumId) return h.response(new InvariantError('fail', 'id is required'));

      const id = await this._albumsService.editAlbumById(albumId, request.payload);

      return h.response(
          new PutResponse(
              'success', 200,
              `Albums with ${id} has been updated`))
          .code(200);
    } catch (err) {
      if (err instanceof ClientError) {
        return h.response({
          status: err.status,
          message: err.message,
          statusCode: err.statusCode,
        }).code(err.statusCode);
      }

      // SERVER ERROR
      return h.response(new InvariantError('fail', err)).code(500);
    }
  }

  async deleteAlbumByIdHandler(request, h) {
    try {
      const {albumId} = request.params;
      if (!albumId) return h.response(new InvariantError('fail', 'id is required'));

      const id = await this._albumsService.deleteAlbumById(albumId);

      return h.response({
        status: 'success',
        message: `${id} has been deleted`,
        code: 200,
      }).code(200);
    } catch (err) {
      if (err instanceof ClientError) {
        return h.response({
          status: err.status,
          message: err.message,
          statusCode: err.statusCode,
        }).code(err.statusCode);
      }

      // SERVER ERROR
      return h.response(new InvariantError('fail', err)).code(500);
    }
  }

  async postCoverAlbumHandler(request, h) {
    try {
      const {cover} = request.payload;
      this._validator.validatorImageHeader(cover.hapi.headers);

      const fileLocation = await this._storageService.writeFile(
          cover,
          cover.hapi,
      );
      console.log('fileLocation, ', fileLocation);

      const response = h.response({
        status: 'success',
        message: 'Sampul berhasil diunggah',
      });
      response.code(201);
      return response;
    } catch (err) {
      throw err;
    }
  }
}

module.exports = AlbumsHandler;
