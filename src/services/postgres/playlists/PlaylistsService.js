/* eslint-disable max-len */
const {Pool} = require('pg');
const uuid = require('uuid');
const query = require('./query');

const InvariantError = require('../../../exception/InvariantError');
const NotFoundError = require('../../../exception/NotFoundError');

class PlaylistsService {
  constructor() {
    this._pool = new Pool();
  }

  async addPlaylist({name, owner}) {
    const playlistId = `playlist-${uuid.v4()}`;
    const createAt = new Date().toISOString();
    const updateAt = createAt;

    return new Promise((resolve, reject) => {
      this._pool.connect((err, client, done) => {
        if (err) return reject(new InvariantError('fail', err.message));

        client.query(query.addPlaylist, [
          playlistId,
          name,
          owner,
          createAt,
          updateAt,
        ], (err, result) => {
          done();

          if (err) return reject(new InvariantError('fail', err.message));
          return resolve(result.rows[0].id);
        });
      });
    });
  }

  async getPlaylists({owner}) {
    return new Promise((resolve, reject) => {
      this._pool.connect((err, client, done) => {
        if (err) return reject(new InvariantError('fail', err.message));

        client.query(query.getPlaylists, [owner], (err, result) => {
          done();

          if (err) return reject(new InvariantError('fail', err.message));
          if (result.rowCount === 0) return reject(new NotFoundError('fail', `Playlist for ${owner} not found`));

          // const newResponse = result.rows.map(mapObjectToPlaylistModel);
          return resolve(result.rows);
        });
      });
    });
  }

  async deletePlaylist({playlistId, owner}) {
    return new Promise((resolve, reject) => {
      this._pool.connect((err, client, done) => {
        if (err) return reject(new InvariantError('fail', err.message));

        client.query(query.deletePlaylist, [playlistId, owner], (err, result) => {
          if (err) return reject(new InvariantError('fail', err.message));
          if (result.rowCount === 0) return reject(new NotFoundError('fail', `Playlist ${playlistId} not found`));

          return resolve([]);
        });
      });
    });
  }

  async addPlaylistSong({playlistId, songId}) {
    const id = `playlist_song-${uuid.v4()}`;
    const createAt = new Date().toISOString();
    const updateAt = createAt;

    return new Promise((resolve, reject) => {
      this._pool.connect((err, client, done) => {
        if (err) return reject(new InvariantError('fail', err.message));

        client.query(query.addPlaylistSong, [
          id,
          playlistId,
          songId,
          createAt,
          updateAt,
        ], (err, result) => {
          done();

          if (err) return reject(new InvariantError('fail', err.message));
          return resolve(result.rows[0].id);
        });
      });
    });
  }
}

module.exports = PlaylistsService;
