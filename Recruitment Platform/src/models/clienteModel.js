const { pool } = require('../config/database');

class Cliente {
    static getAll() {
        return new Promise((resolve, reject) => {
            pool.query('SELECT * FROM cliente', (err, result) => {
                if (err) {
                    reject(err);
                } else {
                    resolve(result);
                }
            });
        });
    }

    static getById(id) {
        return new Promise((resolve, reject) => {
            pool.query('SELECT * FROM cliente WHERE id = ?', [id], (err, result) => {
                if (err) {
                    reject(err);
                } else {
                    resolve(result);
                }
            });
        });
    }

    /*Todas las células que tiene un cliente en específico*/
    static getCelulasByClienteId(id) {
        return new Promise((resolve, reject) => {
            const query = `
                SELECT celula.id AS id, celula.nombre AS nombre
                FROM cliente
                JOIN celula ON cliente.id = celula.idCliente
                WHERE idCliente = ?;
            `;
            pool.query(query, [id], (err, result) => {
                if (err) {
                    reject(err);
                } else {
                    resolve(result);
                }
            });
        });
    }

}

module.exports = Cliente;
