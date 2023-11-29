const db = require('../config/database');

class Proceso {
    static getAll(callback) {
        db.query('SELECT * FROM proceso', callback);
    }

    static getById(id, callback) {
        db.query('SELECT * FROM proceso WHERE id = ?', [id], callback);
    }

    static create(proceso, callback) {
        db.query('INSERT INTO proceso SET ?', proceso, callback);
    }

    static update(id, updatedProceso, callback) {
        db.query('UPDATE proceso SET ? WHERE id = ?', [updatedProceso, id], callback);
    }

    static delete(id, callback) {
        db.query('DELETE FROM proceso WHERE id = ?', [id], callback);
    }

}

module.exports = Proceso;
