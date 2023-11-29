const db = require('../config/database');

class Postulante {
    static getAll(callback) {
        db.query('SELECT * FROM postulante', callback);
    }

    static getById(id, callback) {
        db.query('SELECT * FROM postulante WHERE id = ?', [id], callback);
    }

    static create(postulante, callback) {
        db.query('INSERT INTO postulante SET ?', postulante, callback);
    }

    static update(id, updatedPostulante, callback) {
        db.query('UPDATE postulante SET ? WHERE id = ?', [updatedPostulante, id], callback);
    }

    static delete(id, callback) {
        db.query('DELETE FROM postulante WHERE id = ?', [id], callback);
    }

    static searchByKeyword(keyword, callback) {
        const query = `
            SELECT *
            FROM postulante
            WHERE nombres LIKE ? OR apellidos LIKE ?;
        `;
        const keywordPattern = `%${keyword}%`;

        db.query(query, [keywordPattern, keywordPattern], callback);
    }
}

module.exports = Postulante;
