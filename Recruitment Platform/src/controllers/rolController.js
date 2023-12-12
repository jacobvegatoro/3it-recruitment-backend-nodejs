const Rol = require('../models/rolModel');

exports.getAll = async (req, res) => {
    try {
        const result = await Rol.getAll();
        res.status(200).json(result);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error interno del servidor' });
    }
};

exports.create = async (req, res) => {
    const newRol = req.body;

    try {
        const postId = await Rol.create(newRol);
        res.status(201).json({ message: 'Rol creado', id: postId });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error interno del servidor' });
    }
};
