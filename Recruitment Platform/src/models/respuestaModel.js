const { pool } = require('../config/database');

class Respuesta {
    static getAll() {
        return new Promise((resolve, reject) => {
            pool.query('SELECT * FROM respuesta', (err, result) => {
                if (err) {
                    reject(err);
                } else {
                    resolve(result);
                }
            });
        });
    }

    static getById(id) {
        return new Promise((resolve, reject) => {
            pool.query('SELECT * FROM respuesta WHERE id = ?', [id], (err, result) => {
                if (err) {
                    reject(err);
                } else {
                    resolve(result);
                }
            });
        });
    }

    static create(respuesta) {
        return new Promise((resolve, reject) => {
            pool.query('INSERT INTO respuesta SET ?', respuesta, (err, result) => {
                if (err) {
                    reject(err);
                } else {
                    resolve(result.insertId);
                }
            });
        });
    }

    static update(id, updatedRespuesta) {
        return new Promise((resolve, reject) => {
            pool.query('UPDATE respuesta SET ? WHERE id = ?', [updatedRespuesta, id], (err, result) => {
                if (err) {
                    reject(err);
                } else {
                    resolve(result);
                }
            });
        });
    }

    static delete(id) {
        return new Promise((resolve, reject) => {
            pool.query('DELETE FROM respuesta WHERE id = ?', [id], (err, result) => {
                if (err) {
                    reject(err);
                } else {
                    resolve(result);
                }
            });
        });
    }

}

module.exports = Respuesta;
