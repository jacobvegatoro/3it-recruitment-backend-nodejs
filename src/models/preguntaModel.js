const { pool } = require('../config/database');

class Pregunta {
    static getAll() {
        return new Promise((resolve, reject) => {
            pool.query('SELECT pregunta.*, rol.id AS rol_id, rol.detalle AS rol_detalle FROM pregunta JOIN rol ON pregunta.idRol = rol.id ORDER BY pregunta.id', (err, result) => {
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
            pool.query('SELECT pregunta.*, rol.id AS rol_id, rol.detalle AS rol_detalle FROM pregunta JOIN rol ON pregunta.idRol = rol.id WHERE pregunta.id = ? ORDER BY pregunta.id', [id], (err, rows) => {
                if (err) {
                    reject(err);
                } else {
                    if (rows.length === 0) {
                        resolve(null); // No se encontró ninguna pregunta
                    } else {
                        resolve(rows[0]); // Devuelve la primera fila de resultados
                    }
                }
            });
        })            
    }

    static getByRolId(id) {
        return new Promise((resolve, reject) => {
            pool.query('SELECT pregunta.*, rol.id AS rol_id, rol.detalle AS rol_detalle FROM pregunta JOIN rol ON pregunta.idRol = rol.id WHERE pregunta.idRol = ? and pregunta.activo = 1 ORDER BY pregunta.id', [id], (err, result) => {
                if (err) {
                    reject(err);
                } else {
                    resolve(result);
                }
            });
        });
    }

    static create(pregunta) {
        return new Promise((resolve, reject) => {
            pool.query('INSERT INTO pregunta SET ?', pregunta, (err, result) => {
                if (err) {
                    reject(err);
                } else {
                    resolve(result.insertId);
                }
            });
        });
    }      

    static update(id, updatedPregunta) {
        return new Promise((resolve, reject) => {
            pool.query('UPDATE pregunta SET ? WHERE id = ?', [updatedPregunta, id], (err, result) => {
                if (err) {
                    reject(err);
                } else {
                    resolve(result);
                }
            });
        });
    }

    static delete(id) {
        return new Promise((resolve, reject) => {
            pool.query('DELETE FROM pregunta WHERE id = ?', [id], (err, result) => {
                if (err) {
                    reject(err);
                } else {
                    resolve(result);
                }
            });
        });
    }

}

module.exports = Pregunta;
