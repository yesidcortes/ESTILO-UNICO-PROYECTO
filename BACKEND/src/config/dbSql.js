const mysql = require('mysql2/promise');

const poolSql = mysql.createPool({
  host: process.env.SQL_HOST || 'localhost',
  user: process.env.SQL_USER || 'root',
  password: process.env.SQL_PASSWORD || '',
  database: process.env.SQL_DB || 'estilo_unico',
  waitForConnections: true,
  connectionLimit: 10,
});

module.exports = poolSql;