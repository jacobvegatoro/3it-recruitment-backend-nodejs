const db = require('../config/database');

class EstadoProceso {
    static getAll() {
        return new Promise((resolve, reject) => {
            db.query('SELECT * FROM estadoProceso', (err, result) => {
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
            db.query('SELECT * FROM estadoProceso WHERE id = ?', [id], (err, result) => {
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
                    estadoProceso.id, estadoProceso.fecha, estadoProceso.comentario,
                    estado.nombre as nombreEstado,
                    usuario.nombre as nombreUsuario, usuario.apellido as apellidoUsuario,
                    proceso.id as idProceso, proceso.fecha_ingreso,
                    postulante.nombres as nombresPostulante,
                    rol.detalle as detalleRol,
                    celula.nombre as nombreCelula,
                    cliente.nombre as nombreCliente
                FROM estadoProceso
                INNER JOIN estado ON estadoProceso.idEstado = estado.id
                INNER JOIN usuario ON estadoProceso.idUsuario = usuario.id
                INNER JOIN proceso ON estadoProceso.idProceso = proceso.id
                INNER JOIN postulante ON proceso.idPostulante = postulante.id
                INNER JOIN rol ON proceso.idRol = rol.id
                INNER JOIN celula ON proceso.idCelula = celula.id
                INNER JOIN cliente ON celula.idCliente = cliente.id
            `;
            db.query(query, (err, result) => {
                if (err) {
                    reject(err);
                } else {
                    resolve(result);
                }
            });
        });
    }

}

module.exports = EstadoProceso;
