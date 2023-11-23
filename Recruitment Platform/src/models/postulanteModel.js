const db = require('../config/database');

class Postulante {
    static getAll(callback) {
        db.query('SELECT * FROM postulantes', callback);
    }

    static getById(id, callback) {
        db.query('SELECT * FROM postulantes WHERE id = ?', [id], callback);
    }

    static create(postulante, callback) {
        db.query('INSERT INTO postulantes SET ?', postulante, callback);
    }

    static update(id, updatedPostulante, callback) {
        db.query('UPDATE postulantes SET ? WHERE id = ?', [updatedPostulante, id], callback);
    }

    static delete(id, callback) {
        db.query('DELETE FROM postulantes WHERE id = ?', [id], callback);
    }
}

module.exports = Postulante;
