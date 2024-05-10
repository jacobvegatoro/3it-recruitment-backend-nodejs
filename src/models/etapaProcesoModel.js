const { pool } = require('../config/database');

class EtapaProceso {
    static getAll() {
        return new Promise((resolve, reject) => {
            pool.query('SELECT * FROM etapaProceso', (err, result) => {
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
            pool.query('SELECT * FROM etapaProceso WHERE id = ?', [id], (err, result) => {
                if (err) {
                    reject(err);
                } else {
                    resolve(result);
                }
            });
        });
    }

    static getAllWithDetails() {
        return new Promise((resolve, reject) => {
            const query = `
                SELECT 
                    etapaProceso.id, etapaProceso.fecha, etapaProceso.comentario, etapaProceso.estado, 
                    etapa.nombre as nombreEtapa,
                    usuario.nombre as nombreUsuario, usuario.apellido as apellidoUsuario,
                    proceso.id as idProceso, proceso.fecha_ingreso,
                    postulante.nombres as nombresPostulante,
                    rol.detalle as detalleRol,
                    celula.nombre as nombreCelula,
                    cliente.nombre as nombreCliente
                FROM etapaProceso
                INNER JOIN etapa ON etapaProceso.idEtapa = etapa.id
                INNER JOIN usuario ON etapaProceso.idUsuario = usuario.id
                INNER JOIN proceso ON etapaProceso.idProceso = proceso.id
                INNER JOIN postulante ON proceso.idPostulante = postulante.id
                INNER JOIN rol ON proceso.idRol = rol.id
                INNER JOIN celula ON proceso.idCelula = celula.id
                INNER JOIN cliente ON celula.idCliente = cliente.id
            `;
            pool.query(query, (err, result) => {
                if (err) {
                    reject(err);
                } else {
                    resolve(result);
                }
            });
        });
    }

    static create(etapaProceso) {
        return new Promise((resolve, reject) => {
            pool.query('INSERT INTO etapaProceso SET ?', etapaProceso, (err, result) => {
                if (err) {
                    reject(err);
                } else {
                    resolve(result.insertId);
                }
            });
        });
    }

}

module.exports = EtapaProceso;
