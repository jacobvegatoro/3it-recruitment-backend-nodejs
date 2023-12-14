const mysql2 = require('mysql2');

const pool = mysql2.createPool({
    host: '127.0.0.1',
    user: 'root',
    password: 'nadmin',
    database: 'recruitment_db',
    connectionLimit: 100,
});

module.exports = { pool };
