/* eslint-disable max-len */
const {Pool} = require('pg');
const query = require('./query');
const InvariantError = require('../../../exception/InvariantError');

class AuthenticationsService {
  constructor() {
    this._pool = new Pool();
  }

  async addToken({userId, token}) {
    const updateAt = new Date().toISOString();

    return new Promise((resolve, reject) => {
      this._pool.connect((err, client, done) => {
        if (err) return reject(new InvariantError('fail', err.message));
        client.query(query.updateToken, [token, updateAt, userId], (err, result) => {
          done();

          if (err) return reject(new InvariantError('fail', err.message));
          if (result.rowCount === 0) return reject(new InvariantError('fail', `${userId} is not exist`));
          return resolve(result.rows[0].id);
        });
      });
    });
  }

  async addRefreshToken({userId, refreshToken}) {
    const updateAt = new Date().toISOString();

    return new Promise((resolve, reject) => {
      this._pool.connect((err, client, done) => {
        if (err) return reject(new InvariantError('fail', err.message));

        client.query(query.updateRefreshToken, [refreshToken, updateAt, userId], (err, result) => {
          done();

          if (err) return reject(new InvariantError('fail', err.message));
          if (result.rowCount === 0) return reject(new InvariantError('fail', `${userId} is not exist`));
          return resolve(result.rows[0].id);
        });
      });
    });
  }

  async verifyRefreshToken({refreshToken}) {
    return new Promise((resolve, reject) => {
      this._pool.connect((err, client, done) => {
        if (err) return reject(new InvariantError('fail', err.message));

        client.query(query.verifyRefreshToken, [refreshToken], (err, result) => {
          done();
          if (err) return reject(new InvariantError('fail', err.message));

          if (result.rowCount === 0) {
            return reject(new InvariantError('fail', `${refreshToken} token was not found`));
          }
          return resolve([]);
        });
      });
    });
  }
}

module.exports = AuthenticationsService;
