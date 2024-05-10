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
            /*const query = `
                SELECT celula.id AS id, celula.nombre AS nombre
                FROM cliente
                JOIN celula ON cliente.id = celula.idCliente
                WHERE idCliente = ?;
            `;*/
            const query = `
                SELECT cel.id AS id, cel.nombre AS nombre, 
                JSON_OBJECT('id', cli.id, 'nombre', cli.nombre, 'casaMatriz', cli.casaMatriz) as cliente 
                FROM cliente cli
                JOIN celula cel ON cli.id = cel.idCliente
                WHERE cel.idCliente = ?;
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

    static createCliente(cliente) {
        return new Promise((resolve, reject) => {
            pool.query('INSERT INTO cliente SET ?', cliente, (err, result) => {
                if (err) {
                    reject(err);
                } else {
                    resolve(result.insertId);
                }
            });
        });
    }

    static updateCliente(id, updatedCliente) {
        return new Promise((resolve, reject) => {
            pool.query('UPDATE cliente SET ? WHERE id = ?', [updatedCliente, id], (err, result) => {
                if (err) {
                    reject(err);
                } else {
                    resolve(result);
                }
            });
        });
    }

    static deleteCliente(id) {
        return new Promise((resolve, reject) => {
            pool.query('DELETE FROM cliente WHERE id = ?', [id], (err, result) => {
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
