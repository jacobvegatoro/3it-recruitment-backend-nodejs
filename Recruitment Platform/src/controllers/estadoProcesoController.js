const EstadoProceso = require('../models/estadoProcesoModel');

const formatEstadoProcesoResult = (result) => {
    return result.map(row => ({
        id: row.id,
        fecha: row.fecha,
        comentario: row.comentario,
        proceso: {
            idProceso: row.idProceso,
            fecha_ingreso: row.fecha_ingreso,
            postulante: {
                nombresPostulante: row.nombresPostulante,
                apellidosPostulante: row.apellidosPostulante
            },
            rol: {
                detalleRol: row.detalleRol
            },
            celula: {
                nombreCelula: row.nombreCelula,
                cliente: {
                    nombreCliente: row.nombreCliente
                }
            }
        },
        estado: {
            nombreEstado: row.nombreEstado
        },
        usuario: {
            nombreUsuario: row.nombreUsuario,
            apellidoUsuario: row.apellidoUsuario
        }
    }));
};

module.exports = {
    getAll: (req, res) => {
        EstadoProceso.getAll((err, result) => {
            if (err) {
                console.error(err);
                res.end(JSON.stringify({ message: 'Error interno del servidor' }));
            } else {
                res.end(JSON.stringify(result));
            }
        });
    },

    getById: (req, res) => {
        const id = req.params.id;
        EstadoProceso.getById(id, (err, result) => {
            if (err) {
                console.error(err);
                res.end(JSON.stringify({ message: 'Error interno del servidor' }));
            } else if (!result || result.length === 0) {
                res.end(JSON.stringify({ message: 'Estado-Proceso no encontrado' }));
            } else {
                res.end(JSON.stringify(result));
            }
        });
    },

    getAllWithDetails: (req, res) => {
        EstadoProceso.getAllWithDetails((err, result) => {
            if (err) {
                console.error(err);
                res.end(JSON.stringify({ message: 'Error interno del servidor' }));
            } else {
                const formattedResult = formatEstadoProcesoResult(result);
                res.end(JSON.stringify(formattedResult));
            }
        });
    }

};
