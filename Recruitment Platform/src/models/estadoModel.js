const db = require('../config/database');

class Estado {
    static getAll(callback) {
        db.query('SELECT * FROM estado', callback);
    }

    static getById(id, callback) {
        db.query('SELECT * FROM estado WHERE id = ?', [id], callback);
    }

    static create(estado, callback) {
        db.query('INSERT INTO estado SET ?', estado, callback);
    }

}

module.exports = Estado;
