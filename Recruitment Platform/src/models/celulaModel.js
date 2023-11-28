const db = require('../config/database')

class Celula {
    static getAll(callback) {
        db.query('SELECT * FROM celula', callback);
    }

    static getById(id, callback) {
        db.query('SELECT * FROM celula WHERE id = ?', [id], callback)
    }

    /*Cliente al que está asociada la célula*/
    static getCelulaWithCliente(id, callback) {
        const query = `
            SELECT celula.*, cliente.*
            FROM celula
            JOIN cliente ON celula.cliente_id = clientes.id
            WHERE celula.id = ?;
        `;
        db.query(query, [id], callback);
    }
}

module.exports = Celula;
