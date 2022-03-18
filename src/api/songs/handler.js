/* eslint-disable max-len */
const ClientError = require('../../exception/ClientError');
const InvariantError = require('../../exception/InvariantError');
// const NotFoundError = require('../../exception/NotFoundError');

const GetResponse = require('../../response/GetResponse');
const PostResponse = require('../../response/PostResponse');
const PutResponse = require('../../response/PutResponse');
const DeleteResponse = require('../../response/DeleteResponse');

class SongsHandler {
  constructor(service, validator) {
    this._service = service;
    this._validator = validator;

    this.postSongHandler = this.postSongHandler.bind(this);
    this.getAllSongsHandler = this.getAllSongsHandler.bind(this);
    this.getSongByIdHandler = this.getSongByIdHandler.bind(this);
    this.putSongByIdHandler = this.putSongByIdHandler.bind(this);
    this.deleteSongByIdHandler = this.deleteSongByIdHandler.bind(this);
  }

  async getAllSongsHandler(request, h) {
    try {
      const {
        title = null,
        performer = null,
      } = request.query;

      const songs = await this._service.getAllSongs(title, performer);
      return h.response(new GetResponse('success', {songs: songs})).code(200);
    } catch (err) {
      if (err instanceof ClientError) {
        return h.response({
          status: err.status,
          message: err.message,
          statusCode: err.statusCode,
        }).code(err.statusCode);
      }

      // SERVER ERROR
      return h.response(new InvariantError('fail', err));
    }
  }

  async getSongByIdHandler(request, h) {
    try {
      const {songId} = request.params;
      if (!songId) {
        return h.response(
            new InvariantError('fail', 'id is required').code(400));
      }

      const song = await this._service.getSongById(songId);
      return h.response(new GetResponse('success', {song: song[0]}));
    } catch (err) {
      if (err instanceof ClientError) {
        return h.response({
          status: err.status,
          message: err.message,
          statusCode: err.statusCode,
        }).code(err.statusCode);
      }

      // SERVER ERROR
      return h.response(new InvariantError('fail', err));
    }
  }

  async postSongHandler(request, h) {
    try {
      this._validator.validatorSongPayload(request.payload);

      const songId = await this._service.addSong(request.payload);

      return h.response(new PostResponse('success', 201, {songId: songId})).code(201);
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

  async putSongByIdHandler(request, h) {
    try {
      this._validator.validatorSongPayload(request.payload);

      const {songId} = request.params;
      if (!songId) return h.response(new InvariantError('fail', 'id is required')).code(400);

      const song = await this._service.getSongById(songId);
      if (song instanceof ClientError) {
        return h.response({
          status: song.status,
          message: song.message,
          statusCode: song.statusCode,
        }).code(song.statusCode);
      }

      const id = await this._service.editSongById(songId, request.payload);
      return h.response(new PutResponse('success', 200, `song with ${id} has been added`)).code(200);
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

  async deleteSongByIdHandler(request, h) {
    try {
      const {songId} = request.params;
      if (!songId) return h.response(new InvariantError('fail', 'id is required')).code(400);

      const song = await this._service.getSongById(songId);
      if (song instanceof ClientError) {
        return h.response({
          status: song.status,
          message: song.message,
          statusCode: song.statusCode,
        }).code(song.statusCode);
      }

      const id = await this._service.deleteSongById(songId);
      return h.response(new DeleteResponse('success', `song with ${id} has been deleted`)).code(200);
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
}

module.exports = SongsHandler;
