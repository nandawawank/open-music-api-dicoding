/* eslint-disable max-len */
const pg = require('pg');
const uuid = require('uuid');

const InvariantError = require('../../../exception/InvariantError');
const NotFoundError = require('../../../exception/NotFoundError');

const query = require('./query');
const SongsService = require('../../../services/postgres/songs/SongsService');

const CacheService = require('../../redis/CacheService');

const {
  objectIsEmpty,
  mapObjectToAlbumModel,
} = require('../../../utils/index');
class AlbumsService {
  constructor() {
    this._pool = new pg.Pool();
    this._songsService = new SongsService();
    this._cacheService = new CacheService();
  }

  async getAlbumById(id) {
    const songs = await this._songsService.getSongByAlbumId(id);

    return new Promise((resolve, reject) => {
      this._pool.connect((err, client, done) => {
        if (err) return reject(new InvariantError('fail', err.message));

        client.query(query.getAlbum, [id],
            (err, result) => {
              done();

              if (err) return reject(new InvariantError('fail', err.message));
              if (result.rowCount === 0) return reject(new NotFoundError('fail', `albums with ${id} not found`));

              const albumModel = result.rows.map(mapObjectToAlbumModel);
              const allResult = {...albumModel[0], songs};
              return resolve(allResult);
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

  async addAlbumCover({albumId, coverUrl}) {
    const album = await this.getAlbumById(albumId);
    if (objectIsEmpty(album)) return new NotFoundError('fail', `${albumId} not found`);

    return new Promise((resolve, reject) => {
      this._pool.connect((err, client, done) => {
        if (err) return reject(new InvariantError('fail', err.message));

        client.query(query.addAlbumCover, [coverUrl, albumId], (err, result) => {
          done();

          if (err) return reject(new InvariantError('fail', err.message));
          return resolve(result.rows[0].id);
        });
      });
    });
  }

  async getAlbumLike({albumId}) {
    return new Promise((resolve, reject) => {
      this._pool.connect((err, client, done) => {
        if (err) return reject(new InvariantError('fail', err.message));

        client.query(query.getAlbumLike, [albumId], (err, result) => {
          done();

          if (err) return reject(new InvariantError('fail', err.message));

          return resolve(parseInt(result.rows[0].like));
        });
      });
    });
  }

  async verifyLike({albumId, userId}) {
    return new Promise((resolve, reject) => {
      this._pool.connect((err, client, done) => {
        if (err) return reject(new InvariantError('fail', err.message));

        client.query(
            query.getAlbumLikeByAlbumIdAndUserId,
            [albumId, userId],
            (err, result) => {
              done();

              if (err) return reject(new InvariantError('fail', err.message));
              if (result.rowCount === 0) return resolve(0);
              return resolve(result.rows[0].id);
            });
      });
    });
  }

  async addLikeAlbum({albumId, userId}) {
    return new Promise((resolve, reject) => {
      this._pool.connect((err, client, done) => {
        if (err) return reject(new InvariantError('fail', err.message));
        const likeId = `like-album-${uuid.v4()}`;

        client.query(query.addLikeAlbum, [likeId, userId, albumId], async (err, result) => {
          done();

          const like = await this.getAlbumLike({albumId});
          this._cacheService.set('like', like)
              .catch((errCache) => {
                throw reject(errCache);
              });

          if (err) return reject(new InvariantError('fail', err.message));
          return resolve(result.rows);
        });
      });
    });
  }

  async deleteLikeAlbum({likeId}) {
    return new Promise((resolve, reject) => {
      this._pool.connect((err, client, done) => {
        if (err) return reject(new InvariantError('fail', err.message));

        client.query(query.deleteLikeAlbum, [likeId], (err, result) => {
          done();

          this._cacheService.delete('like')
              .catch((errCache) => {
                throw reject(errCache);
              });

          if (err) return reject(new InvariantError('fail', err.message));
          return resolve(result);
        });
      });
    });
  }
}

module.exports = AlbumsService;
