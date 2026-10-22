const { MongoClient } = require('mongodb');
require('dotenv').config();

const client = new MongoClient(process.env.MONGO_URI);
let db;
let connection;

async function connectMongo() {
  if (db) return db;
  if (!connection) {
    connection = client.connect()
      .then(() => {
        db = client.db(process.env.MONGO_DB_NAME || 'campus_eats_feedback');
        console.log(`Connected to MongoDB (${db.databaseName})`);
        return db;
      })
      .catch(err => {
        connection = undefined;
        throw err;
      });
  }
  return connection;
}

async function closeMongo() {
  if (connection) await connection.catch(() => {});
  if (db) await client.close();
  db = undefined;
  connection = undefined;
}

module.exports = { connectMongo, closeMongo };
