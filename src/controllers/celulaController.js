const Celula = require('../models/celulaModel');

exports.getAll = async (req, res) => {
    try {
        const result = await Celula.getAll();
        res.status(200).json(result);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error interno del servidor' });
    }
};

exports.getById = async (req, res) => {
    const id = req.params.id;

    try {
        const result = await Celula.getById(id);

        if (!result || result.length === 0) {
            res.status(404).json({ message: 'Celula no encontrada' });
        } else {
            res.status(200).json(result);
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error interno del servidor' });
    }
};
exports.createCelula = async (req, res) => {
    const nuevaCelula = req.body;

    try {
        const nuevaCelulaId = await Celula.create(nuevaCelula);
        res.status(201).json({ message: 'Célula creada', id: nuevaCelulaId });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error interno del servidor' });
    }
};

exports.editarCelula = async (req, res) => {
    const { id } = req.params; 
    const { nombre, idCliente } = req.body; 

    try {
        const result = await Celula.editarCelula(id, nombre, idCliente);
        res.status(200).json({ message: 'Célula actualizada exitosamente', id: id });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error interno del servidor' });
    }
};

exports.eliminarCelula = async (req, res) => {
    const id = req.params.id; 

    try {
        const result = await Celula.eliminarCelula(id); 
        res.status(200).json({ message: 'Célula eliminada correctamente' }); 
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error interno del servidor' });
    }
};

