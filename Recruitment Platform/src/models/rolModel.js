const { pool } = require('../config/database');

class Rol {
    static getAll() {
        return new Promise((resolve, reject) => {
            pool.query('SELECT * FROM rol', (err, result) => {
                if (err) {
                    reject(err);
                } else {
                    resolve(result);
                }
            });
        });
    }

    static create(rol) {
        return new Promise((resolve, reject) => {
            pool.query('INSERT INTO rol SET ?', rol, (err, result) => {
                if (err) {
                    reject(err);
                } else {
                    resolve(result.insertId);
                }
            });
        });
    }
}
module.exports = Rol;
