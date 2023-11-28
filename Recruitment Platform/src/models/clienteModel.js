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
            SELECT cliente.nombre AS nombre_cliente, celula.nombre AS nombre_celula
            FROM cliente
            JOIN celula ON cliente.id = celula.idCliente
            WHERE idCliente = 1;
            `;
        db.query(query, [id], callback);
    }

}

module.exports = Cliente;
