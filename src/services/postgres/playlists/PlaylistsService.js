const {Pool} = require('pg');
const uuid = require('uuid');
const query = require('./query');

const InvariantError = require('../../../exception/InvariantError');

class PlaylistsService {
  constructor() {
    this._pool = new Pool();
  }

  async addPlaylist({name, owner}) {
    const playlistId = await uuid.v4();
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
          return resolve(result.rows[0].name);
        });
      });
    });
  }
}

module.exports = PlaylistsService;
