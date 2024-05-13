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

    static create(celula) {
        return new Promise((resolve, reject) => {
            const query = 'INSERT INTO celula (nombre, idCliente) VALUES (?, ?)';
            pool.query(query, [celula.nombre, celula.idCliente], (err, result) => {
                if (err) {
                    reject(err);
                } else {
                    resolve(result.insertId);
                }
            });
        });
    }      

    static editarCelula(id, nombre, idCliente) {
        return new Promise((resolve, reject) => {
            const query = 'UPDATE celula SET nombre = ?, idCliente = ? WHERE id = ?';
            pool.query(query, [nombre, idCliente, id], (err, result) => {
                if (err) {
                    reject(err);
                } else {
                    resolve(result);
                }
            });
        });
    }      

    static eliminarCelula(id) {
        return new Promise((resolve, reject) => {
            const query = 'DELETE FROM celula WHERE id = ?';
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
