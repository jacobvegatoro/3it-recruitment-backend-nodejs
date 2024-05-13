const Etapa = require('../models/etapaModel');

exports.getAll = async (req, res) => {
    try {
        const result = await Etapa.getAll();
        res.status(200).json(result);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error interno del servidor' });
    }
};

exports.getById = async (req, res) => {
    const id = req.params.id;

    try {
        const result = await Etapa.getById(id);

        if (!result || result.length === 0) {
            res.status(404).json({ message: 'Etapa no encontrada' });
        } else {
            res.status(200).json(result);
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error interno del servidor' });
    }
};
