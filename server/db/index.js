/*import pool class from the pg (node-progres) library  - for DB connections */
const { Pool } = require('pg');
require('dotenv').config();

const pool = new Pool({
    connectionString : process.env.DATABASE_URL,
});

module.exports = pool;