const pg = require('pg');
const uuid = require('uuid');

const query = require('./query');
const InvariantError = require('../../../exception/InvariantError');

class AlbumsService {
  constructor() {
    this._pool = new pg.Pool();
  }

  async addAlbum(payload) {
    const {name, year} = payload;
    const createAt = new Date().toISOString();
    const updateAt = createAt;
    const id = uuid.v4();

    return new Promise((resolve, reject) => {
      this._pool.connect((err, client, done) => {
        if (err) throw reject(new InvariantError('fail', err.message));
        client.query(query.addAlbum, [id, name, year, createAt, updateAt],
            (err, result) => {
              done();

              // eslint-disable-next-line max-len
              if (err) throw reject(new InvariantError('fail', err.message));
              return resolve(result.rows[0].id);
            },
        );
      });
    });
  }
}

module.exports = AlbumsService;
