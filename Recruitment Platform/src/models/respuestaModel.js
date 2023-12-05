const db = require('../config/database');

class Respuesta {
    static getAll(callback) {
        db.query('SELECT * FROM respuesta', callback);
    }

    static getById(id, callback) {
        db.query('SELECT * FROM respuesta WHERE id = ?', [id], callback);
    }

    static create(respuesta, callback) {
        db.query('INSERT INTO respuesta SET ?', respuesta, callback);
    }

    static update(id, updatedRespuesta, callback) {
        db.query('UPDATE respuesta SET ? WHERE id = ?', [updatedRespuesta, id], callback);
    }

    static delete(id, callback) {
        db.query('DELETE FROM respuesta WHERE id = ?', [id], callback);
    }

}

module.exports = Respuesta;
