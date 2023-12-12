const db = require('../config/database');

class Rol {
    static getAll() {
        return new Promise((resolve, reject) => {
            db.query('SELECT * FROM rol', (err, result) => {
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
            db.query('INSERT INTO rol SET ?', rol, (err, result) => {
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
