const { pool } = require('../config/database');

class Celula {
    static getAll() {
        return new Promise((resolve, reject) => {
            let query = "select cel.id, cel.nombre, JSON_OBJECT('id', cli.id, 'nombre', cli.nombre, 'casaMatriz', cli.casaMatriz) as cliente " + 
            "from celula cel left join cliente cli on cel.idCliente = cli.id";
            //pool.query('SELECT * FROM celula', (err, result) => {
            pool.query(query, (err, result) => {
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
            let query = "select cel.id, cel.nombre, JSON_OBJECT('id', cli.id, 'nombre', cli.nombre, 'casaMatriz', cli.casaMatriz) as cliente " + 
            "from celula cel left join cliente cli on cel.idCliente = cli.id where cel.id = ?";
            //pool.query('SELECT * FROM celula WHERE id = ?', [id], (err, result) => {
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

module.exports = Celula;
