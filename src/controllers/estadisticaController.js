const Estadistica = require('../models/estadisticaModel');

exports.getEntrevistas = async (req, res) => {
    try {
        const result = await Estadistica.getEntrevistasPerMonth();
        res.status(200).json(result);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error interno del servidor' });
    }
};

exports.getProcesos = async (req, res) => {
    try {
        const result = await Estadistica.getProcesosPerMonth();
        res.status(200).json(result);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error interno del servidor' });
    }
};