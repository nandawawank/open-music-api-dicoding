/* eslint-disable max-len */
const {Pool} = require('pg');
const uuid = require('uuid');
const bcrypt = require('bcrypt');

const query = require('./query');

const AuthenticationError = require('../../../exception/AuthenticationError');
const InvariantError = require('../../../exception/InvariantError');
const NotFoundError = require('../../../exception/NotFoundError');
class UsersService {
  constructor() {
    this._pool = new Pool();
  }

  async addUser({username, password, fullname}) {
    const id = `user-${uuid.v4()}`;
    const createAt = new Date().toISOString();
    const updateAt = createAt;
    const salt = bcrypt.genSaltSync(parseInt(process.env.SALTLONG));
    const hashPassword = bcrypt.hashSync(password, salt);

    await this.verifyNewUsername(username);
    return new Promise((resolve, reject) => {
      this._pool.connect((err, client, done) => {
        if (err) return reject(new InvariantError('fail', err.message));

        client.query(query.addUser, [
          id,
          username,
          hashPassword,
          fullname,
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

  async verifyNewUsername(username) {
    return new Promise((resolve, reject) => {
      this._pool.connect((err, client, done) => {
        if (err) return reject(new InvariantError('fail', err.message));

        client.query(query.verifyNewUsername, [username], (err, result) => {
          done();
          if (err) return reject(new InvariantError('fail', err.message));
          if (result.rowCount !== 0) return reject(new InvariantError('fail', `${username} already exists`));
          return resolve([]);
        });
      });
    });
  }

  async verifyUserCredential({username, password}) {
    return new Promise((resolve, reject) => {
      this._pool.connect((err, client, done) => {
        if (err) return reject(new InvariantError('fail', err.message));

        client.query(query.verifyUserCredential, [username], (err, result) => {
          done();
          if (err) return reject(new InvariantError('fail', err.message));
          if (result.rowCount === 0) return reject(new AuthenticationError('fail', 'username not exist'));

          const isMatch = bcrypt.compareSync(password, result.rows[0].password);
          if (!isMatch) return reject(new AuthenticationError('fail', 'Credential Not Valid'));

          return resolve(result.rows[0].id);
        });
      });
    });
  }

  async verifyUserById({userId}) {
    return new Promise((resolve, reject) => {
      this._pool.connect((err, client, done) => {
        if (err) return reject(new InvariantError('fail', err.message));

        client.query(query.verifyUserById, [userId], (err, result) => {
          done();

          if (err) return reject(new InvariantError('fail', err.message));
          if (result.rowCount === 0) return reject(new NotFoundError('fail', `User ${userId} does not exist`));

          return resolve([]);
        });
      });
    });
  }
}

module.exports = UsersService;
