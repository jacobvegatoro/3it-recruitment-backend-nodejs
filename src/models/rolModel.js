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

    static update(id, updatedRol) {
        return new Promise((resolve, reject) => {
            pool.query('UPDATE rol SET ? WHERE id = ?', [updatedRol, id], (err, result) => {
                if (err) {
                    reject(err);
                } else {
                    resolve(result);
                }
            });
        });
    }
    
}
module.exports = Rol;
