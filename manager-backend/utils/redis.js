// Redis handler

const redis = require('redis');

const util = require('util');

class RedisClient {
    constructor() {
        this.client = redis.createClient();
        this.client.on('connect', () => {});
        this.client.on('error', (err) => console.log(err));
    }

    async set (key, value, exp=null) {
        await this.client.set(key, value);
        if (exp) {
          await this.client.expire(key, exp);
        }
    }

    async get (key) {
      const getSet = util.promisify(this.client.get).bind(this.client);
      try {
        const value = await getSet(key);
      return value;
      } catch (error) {
        console.log(error);
      }
    }

    async del (key) {
      await this.client.del(key);
      return true;
    }
}

module.exports = new RedisClient();
