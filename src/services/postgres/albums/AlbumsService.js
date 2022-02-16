/* eslint-disable max-len */
const pg = require('pg');
const uuid = require('uuid');

const query = require('./query');
const InvariantError = require('../../../exception/InvariantError');
const NotFoundError = require('../../../exception/NotFoundError');

const {objectIsEmpty} = require('../../../utils');
class AlbumsService {
  constructor() {
    this._pool = new pg.Pool();
  }

  async getAlbumById(id) {
    return new Promise((resolve, reject) => {
      this._pool.connect((err, client, done) => {
        if (err) return reject(new InvariantError('fail', err.message));
        client.query(query.getAlbum, [id],
            (err, result) => {
              done();

              if (err) return reject(new InvariantError('fail', err.message));

              if (result.rowCount === 0) return reject(new NotFoundError('fail', `albums with ${id} not found`));
              return resolve(result.rows[0]);
            });
      });
    });
  }

  async addAlbum(payload) {
    const {name, year} = payload;
    const createAt = new Date().toISOString();
    const updateAt = createAt;
    const id = uuid.v4();

    return new Promise((resolve, reject) => {
      this._pool.connect((err, client, done) => {
        if (err) return reject(new InvariantError('fail', err.message));
        client.query(query.addAlbum, [id, name, year, createAt, updateAt],
            (err, result) => {
              done();


              if (err) return reject(new InvariantError('fail', err.message));
              return resolve(result.rows[0].id);
            },
        );
      });
    });
  }

  async editAlbumById(id, payload) {
    const {name, year} = payload;
    const updateAt = new Date().toISOString();

    const album = await this.getAlbumById(id);
    if (objectIsEmpty(album)) return new NotFoundError('fail', `${id} not found`);

    return new Promise((resolve, reject) => {
      this._pool.connect((err, client, done) => {
        if (err) return reject(new InvariantError('fail', err.message));

        client.query(query.editAlbum, [name, year, updateAt, id],
            (err, result) => {
              done();

              if (err) return reject(new InvariantError('fail', err.message));

              if (result.rowCount === 0) return reject(new NotFoundError('fail', `${id} not found`));
              return resolve(result.rows[0].id);
            });
      });
    });
  }

  async deleteAlbumById(id) {
    const album = await this.getAlbumById(id);
    if (objectIsEmpty(album)) return new NotFoundError('fail', `${id} not found`);

    return new Promise((resolve, reject) => {
      this._pool.connect((err, client, done) => {
        if (err) return reject(new InvariantError('fail', err.message));

        client.query(query.deleteAlbum, [id],
            (err, result) => {
              done();

              if (err) return reject(new InvariantError('fail', err.message));
              return resolve(result.rows[0].id);
            });
      });
    });
  }
}

module.exports = AlbumsService;
