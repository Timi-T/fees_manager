// Database operations

const { MongoClient } = require('mongodb');

class DBClient {
  constructor () {
    const host = process.env.DB_HOST || 'localhost';
    const port = process.env.DB_PORT || 27017;
    const database = process.env.DB_DATABASE || 'fees-manager';
    const uri = `mongodb://${host}:${port}`;
    const client = new MongoClient(uri, { useUnifiedTopology: true });
    const wait = client.connect();
    this.client = client;
    this.database = database;
  }

  async get(collectionName, filterBy) {
    const db = this.client.db(this.database);
    const collection = db.collection(collectionName)
    const results = await collection.find(filterBy).toArray();
    if (results.length > 0) {
      return results;
    }
    return false;
  }

  async post(collectionName, data) {
    const db = this.client.db(this.database);
    const collection = db.collection(collectionName);
    if (collectionName === 'users') {
      const { email, phone } = data;
      const user = await this.get('users', { email });
      if (user) return { 'response': 'User exists email' };
      const user2 = await this.get('users', { phone });
      if (user2) return { 'response': 'User exists phone' };
    }
    const response = await collection.insertOne(data);
    if (response.ops.length > 0) return { 'response': response.ops[0]._id };
    return { 'response': null };
  }

  async put(collectionName, filter, data) {
    const db = this.client.db(this.database);
    const collection = db.collection(collectionName);
    const response = await collection.updateOne(filter, { $set: data });
    if (response.modifiedCount == 1) {
      return true;
    }
    return false;
  }
}

module.exports = new DBClient();
