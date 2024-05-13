// db.js
const { Pool } = require('pg');
const config = require('./config/config');

const pool = new Pool(config);

module.exports = {
  query: (text, params) => pool.query(text, params),
};