/* eslint-disable max-len */
const {Pool} = require('pg');
const uuid = require('uuid');
const query = require('./query');

const InvariantError = require('../../../exception/InvariantError');

class CollaborationsService {
  constructor() {
    this._pool = new Pool();
  }

  async addCollaboration({playlistId, userId}) {
    const id = `collaboration-${uuid.v4()}`;
    const createAt = new Date().toISOString();
    const updateAt = createAt;

    return new Promise((resolve, reject) => {
      this._pool.connect((err, client, done) => {
        if (err) return reject(new InvariantError('fail', err.message));

        client.query(query.addCollaborations, [
          id,
          playlistId,
          userId,
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

  async deleteCollaborations({playlistId, userId}) {
    return new Promise((resolve, reject) => {
      this._pool.connect((err, client, done) => {
        if (err) return reject(new InvariantError('fail', err.message));

        client.query(query.deleteCollaborations, [playlistId, userId], (err, result) => {
          done();

          if (err) return reject(new InvariantError('fail', err.message));
          if (result.rowCount === 0) return reject(new NotFoundError('fail', 'Playlist and user not found'));

          resolve(result.rows[0].id);
        });
      });
    });
  }

  async verifyCollaboration({playlistId, userId}) {
    return new Promise((resolve, reject) => {
      this._pool.connect((err, client, done) => {
        if (err) return reject(new InvariantError('fail', err.message));

        client.query(query.verifyCollaboration, [playlistId, userId], (err, result) => {
          done();

          if (err) return reject(new InvariantError('fail', err.message));
          if (!result.rowCount) return reject(new InvariantError('fail', 'Collaborations not found'));

          return resolve([]);
        });
      });
    });
  }
}

module.exports = CollaborationsService;
