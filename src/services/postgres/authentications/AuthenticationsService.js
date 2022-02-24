/* eslint-disable max-len */
const {Pool} = require('pg');
const query = require('./query');
const InvariantError = require('../../../exception/InvariantError');

class AuthenticationsService {
  constructor() {
    this._pool = new Pool();
  }

  async addToken({id, token}) {
    const updateAt = new Date().toISOString();

    return new Promise((resolve, reject) => {
      this._pool.connect((err, client, done) => {
        if (err) return reject(new InvariantError('fail', err.message));

        client.query(query.updateToken, [token, updateAt, id], (err, result) => {
          done();

          if (err) return reject(new InvariantError('fail', err.message));
          return resolve(result.rows[0].id);
        });
      });
    });
  }

  async addRefreshToken({id, token}) {
    const updateAt = new Date().toISOString();

    return new Promise((resolve, reject) => {
      this._pool.connect((err, client, done) => {
        if (err) return reject(new InvariantError('fail', err.message));

        client.query(query.updateRefreshToken, [token, updateAt, id], (err, result) => {
          done();

          if (err) return reject(new InvariantError('fail', err.message));
          return resolve(result.rows[0].id);
        });
      });
    });
  }
}

module.exports = AuthenticationsService;
