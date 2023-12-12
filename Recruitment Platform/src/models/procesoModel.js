const db = require('../config/database');

class Proceso {
    static getAll() {
        return new Promise((resolve, reject) => {
            db.query('SELECT * FROM proceso', (err, result) => {
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
            db.query('SELECT * FROM proceso WHERE id = ?', [id], (err, result) => {
                if (err) {
                    reject(err);
                } else {
                    resolve(result);
                }
            });
        });
    }

    static create(proceso) {
        return new Promise((resolve, reject) => {
            db.query('INSERT INTO proceso SET ?', proceso, (err, result) => {
                if (err) {
                    reject(err);
                } else {
                    resolve(result.insertId);
                }
            });
        });
    }

    static update(id, updatedProceso) {
        return new Promise((resolve, reject) => {
            db.query('UPDATE proceso SET ? WHERE id = ?', [updatedProceso, id], (err, result) => {
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
            db.query('DELETE FROM proceso WHERE id = ?', [id], (err, result) => {
                if (err) {
                    reject(err);
                } else {
                    resolve(result);
                }
            });
        });
    }

}

module.exports = Proceso;
