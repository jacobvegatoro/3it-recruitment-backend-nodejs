const db = require('../config/database');

class Entrevista {
    static getAll(callback) {
        db.query('SELECT * FROM entrevista', callback);
    }

    static getById(id, callback) {
        db.query('SELECT * FROM entrevista WHERE id = ?', [id], callback);
    }

    static create(entrevista, callback) {
        db.query('INSERT INTO entrevista SET ?', entrevista, callback);
    }

    static update(id, updatedEntrevista, callback) {
        db.query('UPDATE entrevista SET ? WHERE id = ?', [updatedEntrevista, id], callback);
    }

    static delete(id, callback) {
        db.query('DELETE FROM entrevista WHERE id = ?', [id], callback);
    }

    static getAllPaginated(page, limit, callback) {
        const offset = (page - 1) * limit;
        const query = 'SELECT * FROM entrevista LIMIT ?, ?';
        db.query(query, [offset, limit], callback);
    }

}

module.exports = Entrevista;
