/* eslint-disable max-len */
const {Pool} = require('pg');
const uuid = require('uuid');

const query = require('./query');
const {objectIsEmpty, mapObjectToSongModel} = require('../../../utils');

const ClientError = require('../../../exception/ClientError');
const InvariantError = require('../../../exception/InvariantError');
const NotFoundError = require('../../../exception/NotFoundError');
class SongsService {
  constructor(albumsService) {
    this._pool = new Pool();
    this._albumsService = albumsService;
  }

  async addSong(payload) {
    const {
      title,
      year,
      performer,
      genre,
      duration = null,
      albumId = null,
    } = payload;

    const createAt = new Date().toISOString();
    const updateAt = createAt;
    const id = uuid.v4();

    return new Promise(async (resolve, reject) => {
      if (albumId !== null) {
        const album = await this._albumsService.getAlbumById(albumId);
        if (album instanceof ClientError) return reject(new InvariantError('fail', `album with ${albumId} not found`));
      }

      this._pool.connect((err, client, done) => {
        if (err) return reject(new InvariantError('fail', err.message));
        client.query(query.addSong, [
          id,
          title,
          year,
          performer,
          genre,
          duration,
          albumId,
          createAt,
          updateAt,
        ], (err, result) => {
          if (err) return reject(new InvariantError('fail', err.message));
          done();

          return resolve(result.rows[0].id);
        });
      });
    });
  }

  async getAllSongs(title, performer) {
    let condition = '';
    if (title != null && performer != null) {
      condition = ` WHERE lower(title) like '%${title}%' and lower(performer) like '%${performer}%'`;
    } else {
      if (title != null && performer == null) condition = ` WHERE lower(title) like '%${title}%'`;
      if (title == null && performer != null) condition = ` WHERE lower(performer) like '%${performer}%'`;
    }

    return new Promise((resolve, reject) => {
      this._pool.connect((err, client, done) => {
        if (err) return reject(new InvariantError('fail', err.message));

        client.query(query.getSongs + condition, (err, result) => {
          done();

          if (err) return reject(new InvariantError('fail', err.message));
          return resolve(result.rows);
        });
      });
    });
  }

  async getSongById(id) {
    return new Promise((resolve, reject) => {
      this._pool.connect((err, client, done) => {
        if (err) return reject(new InvariantError('fail', err.message));

        client.query(query.getSongById, [id], (err, result) => {
          done();

          if (err) return reject(new InvariantError('fail', err.message));
          if (result.rowCount === 0) return reject(new NotFoundError('fail', `song with ${id} not found`));

          return resolve(result.rows.map(mapObjectToSongModel));
        });
      });
    });
  }

  async getSongByAlbumId(id) {
    return new Promise((resolve, reject) => {
      this._pool.connect((err, client, done) => {
        if (err) return reject(new InvariantError('fail', err.message));

        client.query(query.getSongByAlbumId, [id], (err, result) => {
          done();

          if (err) return reject(new InvariantError('fail', err.message));
          return resolve(result.rows.map(mapObjectToSongModel));
        });
      });
    });
  }

  async editSongById(id, payload) {
    const {
      title,
      year,
      performer,
      genre,
      duration = null,
      albumId = null,
    } = payload;
    const updateAt = new Date().toISOString();

    return new Promise(async (resolve, reject) => {
      if (albumId !== null) {
        const albumId = await this._albumsService.getAlbumById(albumId);
        if (objectIsEmpty(albumId)) return reject(new NotFoundError('fail', `${albumId} not found`));
      }

      this._pool.connect((err, client, done) => {
        if (err) return reject(new InvariantError('fail', err.message));

        client.query(query.putSongById, [
          title,
          year,
          performer,
          genre,
          duration,
          albumId,
          updateAt,
          id,
        ], (err, result) => {
          done();

          if (err) return reject(new InvariantError('fail', err.message));
          return resolve(result.rows[0].id);
        });
      });
    });
  }

  async deleteSongById(id) {
    return new Promise(async (resolve, reject) => {
      this._pool.connect((err, client, done) => {
        if (err) return reject(new InvariantError('fail', err.message)).code(400);

        client.query(query.deleteSongById, [id], (err, result) => {
          done();

          if (err) return reject(new InvariantError('fail', err.message)).code(400);
          return resolve(result.rows[0].id);
        });
      });
    });
  }
}

module.exports = SongsService;
