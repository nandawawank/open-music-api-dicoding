/* eslint-disable max-len */
const {Pool} = require('pg');
const query = require('./query');

const InvariantError = require('../../../exception/InvariantError');

class CollaborationsService {
  constructor() {
    this._pool = new Pool();
  }

  async addCollaborations({playlistId, songId}) {
    return new Promise((resolve, reject) => {
      this._pool.connect((err, client, done) => {
        if (err.message) return reject(new InvariantError('fail', err.message));

        client.query(query.addCollaborations, [playlistId, songId], (err, result) => {
          done();

          if (err) return reject(new InvariantError('fail', err.message));
          return resolve(result.rows[0].id);
        });
      });
    });
  }
}

module.exports = CollaborationsService;
