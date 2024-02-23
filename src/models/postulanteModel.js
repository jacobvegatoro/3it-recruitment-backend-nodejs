const { pool } = require('../config/database');

class Postulante {
    static getAll() {
        return new Promise((resolve, reject) => {
            pool.query('SELECT * FROM postulante', (err, result) => {
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
            pool.query('SELECT * FROM postulante WHERE id = ?', [id], (err, result) => {
                if (err) {
                    reject(err);
                } else {
                    resolve(result);
                }
            });
        });
    }

    static create(postulante) {
        return new Promise((resolve, reject) => {
            pool.query('INSERT INTO postulante SET ?', postulante, (err, result) => {
                if (err) {
                    reject(err);
                } else {
                    resolve(result.insertId);
                }
            });
        });
    }

    static update(id, updatedPostulante) {
        return new Promise((resolve, reject) => {
            pool.query('UPDATE postulante SET ? WHERE id = ?', [updatedPostulante, id], (err, result) => {
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
            pool.query('DELETE FROM postulante WHERE id = ?', [id], (err, result) => {
                if (err) {
                    reject(err);
                } else {
                    resolve(result);
                }
            });
        });
    }

    static searchByKeyword(keyword) {
        const query = `
            SELECT *
            FROM postulante
            WHERE nombres LIKE ? OR apellidos LIKE ?;
        `;
        const keywordPattern = `%${keyword}%`;

        return new Promise((resolve, reject) => {
            pool.query(query, [keywordPattern, keywordPattern], (err, result) => {
                if (err) {
                    reject(err);
                } else {
                    resolve(result);
                }
            });
        });
    }

    static getAllPaginated(page, limit) {
        const offset = (page - 1) * limit;
        const query = 'SELECT * FROM postulante LIMIT ?, ?';

        return new Promise((resolve, reject) => {
            pool.query(query, [offset, limit], (err, result) => {
                if (err) {
                    reject(err);
                } else {
                    resolve(result);
                }
            });
        });
    }
}

module.exports = Postulante;
