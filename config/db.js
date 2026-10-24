const pgp = require('pg-promise')();
require('dotenv').config();

const host = process.env.DB_HOST || 'localhost';
const isLocalHost = /^(localhost|127(?:\.\d{1,3}){3}|\[?::1\]?)$/i.test(host);
const isHosted = process.env.NODE_ENV === 'production' || process.env.RENDER === 'true';
const sslEnabled = isHosted
  || process.env.DB_SSL === 'true'
  || (process.env.DB_SSL !== 'false' && !isLocalHost);

const ssl = sslEnabled
  ? { rejectUnauthorized: process.env.DB_SSL_REJECT_UNAUTHORIZED === 'true' }
  : undefined;

console.log(`PostgreSQL SSL ${sslEnabled ? 'enabled' : 'disabled'}`);
console.log("DB_HOST =", process.env.DB_HOST);
console.log("NODE_ENV =", process.env.NODE_ENV);
console.log("RENDER =", process.env.RENDER);
console.log("SSL Enabled =", sslEnabled);

const db = pgp({
  
  host,
  port: process.env.DB_PORT || 5432,
  database: process.env.DB_NAME || 'campus_eats_db',
  user: process.env.DB_USER || 'postgres',
  password: process.env.DB_PASS,
  ssl,
});

module.exports = db;
