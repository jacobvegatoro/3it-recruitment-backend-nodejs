const db = require('../config/database');

class Entrevista {
    static getAll() {
        return new Promise((resolve, reject) => {
            db.query('SELECT * FROM entrevista', (err, result) => {
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
            db.query('SELECT * FROM entrevista WHERE id = ?', [id], (err, result) => {
                if (err) {
                    reject(err);
                } else {
                    resolve(result);
                }
            });
        });
    }

    static create(entrevista) {
        return new Promise((resolve, reject) => {
            db.query('INSERT INTO entrevista SET ?', entrevista, (err, result) => {
                if (err) {
                    reject(err);
                } else {
                    resolve(result.insertId);
                }
            });
        });
    }

    static update(id, updatedEntrevista) {
        return new Promise((resolve, reject) => {
            db.query('UPDATE entrevista SET ? WHERE id = ?', [updatedEntrevista, id], (err, result) => {
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
            db.query('DELETE FROM entrevista WHERE id = ?', [id], (err, result) => {
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
        const query = 'SELECT * FROM entrevista LIMIT ?, ?';

        return new Promise((resolve, reject) => {
            db.query(query, [offset, limit], (err, result) => {
                if (err) {
                    reject(err);
                } else {
                    resolve(result);
                }
            });
        });
    }
}

module.exports = Entrevista;
