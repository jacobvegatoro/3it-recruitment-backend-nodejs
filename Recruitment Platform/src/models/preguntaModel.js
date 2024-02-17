const { pool } = require('../config/database');

class Pregunta {
    static getAll() {
        return new Promise((resolve, reject) => {
            pool.query('SELECT * FROM pregunta', (err, result) => {
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
            pool.query('SELECT * FROM pregunta WHERE id = ?', [id], (err, result) => {
                if (err) {
                    reject(err);
                } else {
                    resolve(result);
                }
            });
        });
    }

    static getByRolId(id) {
        return new Promise((resolve, reject) => {
            pool.query('SELECT * FROM pregunta WHERE idRol = ?', [id], (err, result) => {
                if (err) {
                    reject(err);
                } else {
                    resolve(result);
                }
            });
        });
    }

    static create(pregunta) {
        return new Promise((resolve, reject) => {
            pool.query('INSERT INTO pregunta SET ?', pregunta, (err, result) => {
                if (err) {
                    reject(err);
                } else {
                    resolve(result.insertId);
                }
            });
        });
    }

    static update(id, updatedPregunta) {
        return new Promise((resolve, reject) => {
            pool.query('UPDATE pregunta SET ? WHERE id = ?', [updatedPregunta, id], (err, result) => {
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
            pool.query('DELETE FROM pregunta WHERE id = ?', [id], (err, result) => {
                if (err) {
                    reject(err);
                } else {
                    resolve(result);
                }
            });
        });
    }

}

module.exports = Pregunta;
