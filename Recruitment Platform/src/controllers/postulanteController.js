const Postulante = require('../models/postulanteModel');
const limit = 10;

exports.getAll = async (req, res) => {
    try {
        const result = await Postulante.getAll();
        res.status(200).json(result);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error interno del servidor' });
    }
};

exports.getById = async (req, res) => {
    const id = req.params.id;

    try {
        const result = await Postulante.getById(id);

        if (!result || result.length === 0) {
            res.status(404).json({ message: 'Postulante no encontrado' });
        } else {
            res.status(200).json(result);
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error interno del servidor' });
    }
};

exports.create = async (req, res) => {
    const newPostulante = req.body;

    try {
        const postId = await Postulante.create(newPostulante);
        res.status(201).json({ message: 'Postulante creado', id: postId });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error interno del servidor' });
    }
};

exports.update = async (req, res) => {
    const id = req.params.id;
    const updatedPostulante = req.body;

    try {
        await Postulante.update(id, updatedPostulante);
        res.status(200).json({ message: 'Postulante actualizado' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error interno del servidor' });
    }
};

exports.delete = async (req, res) => {
    const id = req.params.id;

    try {
        await Postulante.delete(id);
        res.status(200).json({ message: 'Postulante eliminado' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error interno del servidor' });
    }
};

exports.searchByKeyword = async (req, res) => {
    const keyword = req.query.keyword;

    try {
        const result = await Postulante.searchByKeyword(keyword);
        
        if (!result || result.length === 0) {
            res.status(404).json({ message: 'No se encontraron postulantes con la palabra clave proporcionada' });
        } else {
            res.status(200).json(result);
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error interno del servidor' });
    }
};


exports.getAllPaginated = async (req, res) => {
    const page = parseInt(req.query.page) || 1;

    try {
        const result = await Postulante.getAllPaginated(page, limit);
        res.status(200).json(result);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error interno del servidor' });
    }
};
