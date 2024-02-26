const EstadoProceso = require('../models/estadoProcesoModel');

const formatEstadoProcesoResult = (result) => {
    // Verificar si result es undefined o null
    if (!result) {
        return [];
    }

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
    getAll: async (req, res) => {
        try {
            const result = await EstadoProceso.getAll();
            res.status(200).json(result);
        } catch (error) {
            console.error(error);
            res.status(500).json({ message: 'Error interno del servidor' });
        }
    },

    getById: async (req, res) => {
        const id = req.params.id;

        try {
            const result = await EstadoProceso.getById(id);

            if (!result || result.length === 0) {
                res.status(404).json({ message: 'Estado-Proceso no encontrado' });
            } else {
                res.status(200).json(result);
            }
        } catch (error) {
            console.error(error);
            res.status(500).json({ message: 'Error interno del servidor' });
        }
    },

    getAllWithDetails: async (req, res) => {
        try {
            const result = await EstadoProceso.getAllWithDetails();
            const formattedResult = formatEstadoProcesoResult(result);
            res.status(200).json(formattedResult);
        } catch (error) {
            console.error(error);
            res.status(500).json({ message: 'Error interno del servidorrrr' });
        }
    }
};
