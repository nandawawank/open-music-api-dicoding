const redis = require('redis');
const InvariantError = require('../../exception/InvariantError');
const NotFoundError = require('../../exception/NotFoundError');

class CacheService {
  constructor() {
    this._client = redis.createClient({
      host: process.env.REDIS_SERVER,
      port: process.env.REDIS_PORT,
    });

    this._client.connect();
    this._client.on('error', (err) => {
      console.error(err);
    });
  }

  set(key, value, expired = 3600) {
    return new Promise((resolve, reject) => {
      this._client.set(key, value, 'EX', expired,
          (err, ok) => {
            if (err) throw reject(new InvariantError('fail', err));
            return resolve(ok);
          });
    });
  }

  get(key) {
    return this._client.get(key, (err, reply) => {
      if (err) throw reject(new InvariantError('fail', err));
      if (reply === null) {
        throw reject(new NotFoundError('fail', 'Cache not found'));
      }

      return resolve(reply);
    });
  }

  delete(key) {
    return new Promise((resolve, reject) => {
      this._client.del(key, (err, reply) => {
        if (err) throw reject(new InvariantError('fail', err));
        if (reply === null) {
          throw new NotFoundError('fail', 'Cache not found');
        }

        return resolve(reply);
      });
    });
  }
}

module.exports = CacheService;
