const Respuesta = require('../models/respuestaModel');

exports.getAll = async (req, res) => {
    try {
        const result = await Respuesta.getAll();
        res.status(200).json(result);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error interno del servidor' });
    }
};

exports.getById = async (req, res) => {
    const id = req.params.id;

    try {
        const result = await Respuesta.getById(id);

        if (!result || result.length === 0) {
            res.status(404).json({ message: 'Respuesta no encontrada' });
        } else {
            res.status(200).json(result);
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error interno del servidor' });
    }
};

exports.create = async (req, res) => {
    const newRespuesta = req.body;

    try {
        const respuestaId = await Respuesta.create(newRespuesta);
        res.status(201).json({ message: 'Respuesta creada', id: respuestaId });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error interno del servidor' });
    }
};

exports.update = async (req, res) => {
    const id = req.params.id;
    const updatedRespuesta = req.body;

    try {
        await Respuesta.update(id, updatedRespuesta);
        res.status(200).json({ message: 'Respuesta actualizada' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error interno del servidor' });
    }
};

exports.delete = async (req, res) => {
    const id = req.params.id;

    try {
        await Respuesta.delete(id);
        res.status(200).json({ message: 'Respuesta eliminada' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error interno del servidor' });
    }
};

exports.createMultiple = async (req, res) => {
    const newRespuestas = req.body;

    try {
        for (const respuesta of newRespuestas) {
            await Respuesta.create(respuesta);
        }

        res.status(200).json({ message: 'Respuestas creadas exitosamente' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error interno del servidor' });
    }
};
