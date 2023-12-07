const db = require('../config/database');

class Usuario {
    static getAll(callback) {
        db.query('SELECT * FROM usuario', callback);
    }

    static getById(id, callback) {
        db.query('SELECT * FROM usuario WHERE id = ?', [id], callback);
    }

    static create(usuario, callback) {
        db.query('INSERT INTO usuario SET ?', usuario, callback);
    }

    static update(id, updatedUsuario, callback) {
        db.query('UPDATE usuario SET ? WHERE id = ?', [updatedUsuario, id], callback);
    }

    static delete(id, callback) {
        db.query('DELETE FROM usuario WHERE id = ?', [id], callback);
    }

}

module.exports = Usuario;
