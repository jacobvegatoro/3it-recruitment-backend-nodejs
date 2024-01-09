const { pool } = require('../config/database');

class Proceso {
    static getAll() {
        let query = "select pr.id, pr.fecha_ingreso, " + 
        "JSON_OBJECT('id', ps.id, 'nombres', ps.nombres, 'apellidos', ps.apellidos, 'ciudad', ps.ciudad, 'enlaceBizneo', ps.enlaceBizneo) as postulante, " + 
        "JSON_OBJECT('id', r.id, 'detalle', r.detalle) as rol, " + 
        "JSON_OBJECT('id', c.id, 'nombre', c.nombre) as celula " + 
        "from proceso pr left join postulante ps on pr.idPostulante = ps.id " + 
        "left join rol r on pr.idRol = r.id " + 
        "left join celula c on pr.idCelula = c.id";
        return new Promise((resolve, reject) => {
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
        let query = "select pr.id, pr.fecha_ingreso, " + 
        "JSON_OBJECT('id', ps.id, 'nombres', ps.nombres, 'apellidos', ps.apellidos, 'ciudad', ps.ciudad, 'enlaceBizneo', ps.enlaceBizneo) as postulante, " + 
        "JSON_OBJECT('id', r.id, 'detalle', r.detalle) as rol, " + 
        "JSON_OBJECT('id', c.id, 'nombre', c.nombre) as celula " + 
        "from proceso pr left join postulante ps on pr.idPostulante = ps.id " + 
        "left join rol r on pr.idRol = r.id " + 
        "left join celula c on pr.idCelula = c.id " + 
        "where pr.id = ?";        
        return new Promise((resolve, reject) => {
            //pool.query('SELECT * FROM proceso WHERE id = ?', [id], (err, result) => {
            pool.query(query, [id], (err, result) => {
                    if (err) {
                    reject(err);
                } else {
                    resolve(result);
                }
            });
        });
    }

    static getByPostulante(idPostulante) {
        let query = "select pr.id, pr.fecha_ingreso, " + 
        "JSON_OBJECT('id', ps.id, 'nombres', ps.nombres, 'apellidos', ps.apellidos, 'ciudad', ps.ciudad, 'enlaceBizneo', ps.enlaceBizneo) as postulante, " + 
        "JSON_OBJECT('id', r.id, 'detalle', r.detalle) as rol, " + 
        "JSON_OBJECT('id', c.id, 'nombre', c.nombre) as celula " + 
        "from proceso pr left join postulante ps on pr.idPostulante = ps.id " + 
        "left join rol r on pr.idRol = r.id " + 
        "left join celula c on pr.idCelula = c.id " + 
        "where ps.id = ?";        
        return new Promise((resolve, reject) => {
            pool.query(query, [idPostulante], (err, result) => {
                    if (err) {
                    reject(err);
                } else {
                    resolve(result);
                }
            });
        });
    }

    static create(proceso) {
        return new Promise((resolve, reject) => {
            pool.query('INSERT INTO proceso SET ?', proceso, (err, result) => {
                if (err) {
                    reject(err);
                } else {
                    resolve(result.insertId);
                }
            });
        });
    }

    static update(id, updatedProceso) {
        return new Promise((resolve, reject) => {
            pool.query('UPDATE proceso SET ? WHERE id = ?', [updatedProceso, id], (err, result) => {
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
            pool.query('DELETE FROM proceso WHERE id = ?', [id], (err, result) => {
                if (err) {
                    reject(err);
                } else {
                    resolve(result);
                }
            });
        });
    }

}

module.exports = Proceso;
