const Pregunta = require('../models/preguntaModel');

exports.getAll = async (req, res) => {
    try {
        const result = await Pregunta.getAll();
        res.status(200).json(result);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error interno del servidor' });
    }
};

exports.getById = async (req, res) => {
    const id = req.params.id;

    try {
        const result = await Pregunta.getById(id);

        if (!result || result.length === 0) {
            res.status(404).json({ message: 'Pregunta no encontrada' });
        } else {
            res.status(200).json(result);
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error interno del servidor' });
    }
};

exports.create = async (req, res) => {
    const newPregunta = req.body;

    try {
        const preguntaId = await Pregunta.create(newPregunta);
        res.status(201).json({ message: 'Pregunta creada', id: preguntaId });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error interno del servidor' });
    }
};

exports.update = async (req, res) => {
    const id = req.params.id;
    const updatedPregunta = req.body;

    try {
        await Pregunta.update(id, updatedPregunta);
        res.status(200).json({ message: 'Pregunta actualizada' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error interno del servidor' });
    }
};

exports.delete = async (req, res) => {
    const id = req.params.id;

    try {
        await Pregunta.delete(id);
        res.status(200).json({ message: 'Pregunta eliminada' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error interno del servidor' });
    }
};

exports.createMultiple = async (req, res) => {
    const newPreguntas = req.body;

    try {
        // Itera sobre las preguntas y guárdalas una por una
        for (const pregunta of newPreguntas) {
            await Pregunta.create(pregunta);
        }

        res.status(200).json({ message: 'Preguntas creadas exitosamente' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error interno del servidor' });
    }
};
