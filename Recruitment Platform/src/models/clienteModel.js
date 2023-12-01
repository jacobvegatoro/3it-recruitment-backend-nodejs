const db = require('../config/database')

class Cliente {
    static getAll(callback) {
        db.query('SELECT * FROM cliente', callback);
    }

    static getById(id, callback) {
        db.query('SELECT * FROM cliente WHERE id = ?', [id], callback);
    }

    /*Todas las células que tiene un cliente en específico*/
    static getCelulasByClienteId(id, callback) {
        const query = `
            SELECT celula.id AS id, celula.nombre AS nombre
            FROM cliente
            JOIN celula ON cliente.id = celula.idCliente
            WHERE idCliente = ?;
            `;
        db.query(query, [id], callback);
    }

}

module.exports = Cliente;
