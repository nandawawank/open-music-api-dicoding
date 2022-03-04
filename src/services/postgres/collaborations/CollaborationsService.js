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
}

module.exports = CollaborationsService;
