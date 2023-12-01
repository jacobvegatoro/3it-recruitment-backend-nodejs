const db = require('../config/database');

class Pregunta {
    static getAll(callback) {
        db.query('SELECT * FROM pregunta', callback);
    }

    static getById(id, callback) {
        db.query('SELECT * FROM pregunta WHERE id = ?', [id], callback);
    }

    static create(pregunta, callback) {
        db.query('INSERT INTO pregunta SET ?', pregunta, callback);
    }

    static update(id, updatedPregunta, callback) {
        db.query('UPDATE pregunta SET ? WHERE id = ?', [updatedPregunta, id], callback);
    }

    static delete(id, callback) {
        db.query('DELETE FROM pregunta WHERE id = ?', [id], callback);
    }

}

module.exports = Pregunta;
