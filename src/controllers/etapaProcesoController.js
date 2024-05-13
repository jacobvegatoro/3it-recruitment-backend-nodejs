const EtapaProceso = require('../models/etapaProcesoModel');

const formatEtapaProcesoResult = (result) => {
    // Verificar si result es undefined o null
    if (!result) {
        return [];
    }

    return result.map(row => ({
        id: row.id,
        fecha: row.fecha,
        comentario: row.comentario,
        estado: row.estado,
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
        etapa: {
            nombreEtapa: row.nombreEtapa
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
            const result = await EtapaProceso.getAll();
            res.status(200).json(result);
        } catch (error) {
            console.error(error);
            res.status(500).json({ message: 'Error interno del servidor' });
        }
    },

    getById: async (req, res) => {
        const id = req.params.id;

        try {
            const result = await EtapaProceso.getById(id);

            if (!result || result.length === 0) {
                res.status(404).json({ message: 'Etapa-Proceso no encontrado' });
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
            const result = await EtapaProceso.getAllWithDetails();
            const formattedResult = formatEtapaProcesoResult(result);
            res.status(200).json(formattedResult);
        } catch (error) {
            console.error(error);
            res.status(500).json({ message: 'Error interno del servidorrrr' });
        }
    },

    create: async (req, res) => {
        const newEtapaProceso = req.body;

        try {
            const etapaProcesoId = await EtapaProceso.create(newEtapaProceso);
            res.status(201).json({ message: 'Etapa de proceso creada', id: etapaProcesoId });
        } catch (error) {
            console.error(error);
            res.status(500).json({ message: 'Error interno del servidor' });
        }
    }

};
