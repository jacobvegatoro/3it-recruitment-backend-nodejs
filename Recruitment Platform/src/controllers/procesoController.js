const Proceso = require('../models/procesoModel');

exports.getAll = async (req, res) => {
    try {
        const result = await Proceso.getAll();
        res.status(200).json(result);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error interno del servidor' });
    }
};

exports.getById = async (req, res) => {
    const id = req.params.id;

    try {
        const result = await Proceso.getById(id);

        if (!result || result.length === 0) {
            res.status(404).json({ message: 'Proceso no encontrado' });
        } else {
            res.status(200).json(result);
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error interno del servidor' });
    }
};

exports.create = async (req, res) => {
    const newProceso = req.body;

    try {
        const postId = await Proceso.create(newProceso);
        res.status(201).json({ message: 'Proceso creado', id: postId });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error interno del servidor' });
    }
};

exports.update = async (req, res) => {
    const id = req.params.id;
    const updatedProceso = req.body;

    try {
        await Proceso.update(id, updatedProceso);
        res.status(200).json({ message: 'Proceso actualizado' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error interno del servidor' });
    }
};

exports.delete = async (req, res) => {
    const id = req.params.id;

    try {
        await Proceso.delete(id);
        res.status(200).json({ message: 'Proceso eliminado' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error interno del servidor' });
    }
};

exports.getByPostulante = async (req, res) => {
    const id = req.params.id;

    try {
        const result = await Proceso.getByPostulante(id);

        res.status(200).json(result);

        /*if (!result || result.length === 0) {
            res.status(404).json({ message: 'Proceso no encontrado' });
        } else {
            res.status(200).json(result);
        }*/
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error interno del servidor' });
    }
};