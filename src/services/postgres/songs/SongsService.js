const {Pool} = require('pg');
const uuid = require('uuid');

const query = require('./query');
const AlbumsService = require('../albums/AlbumsService');
const {objectIsEmpty} = require('../../../utils');

const InvariantError = require('../../../exception/InvariantError');

class SongsService {
  constructor() {
    this._pool = new Pool();
    this._albumService = new AlbumsService();
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

    if (albumId !== null) {
      const album = await this._albumService.getAlbumById(albumId);

      // eslint-disable-next-line max-len
      if (objectIsEmpty(album)) return new InvariantError('fail', `album with ${albumId} not found`);
    }

    return new Promise((resolve, reject) => {
      this._pool.connect((err, client, done) => {
        if (err) throw reject(new InvariantError('fail', err.message));

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

  async getAllSongs() {
    return new Promise((resolve, reject) => {
      this._pool.connect((err, client, done) => {
        if (err) return reject(new InvariantError('fail', err.message));

        client.query(query.getSongs, (err, result) => {
          done();

          if (err) return reject(new InvariantError('fail', err.message));
          return resolve(result.rows);
        });
      });
    });
  }
}

module.exports = SongsService;
