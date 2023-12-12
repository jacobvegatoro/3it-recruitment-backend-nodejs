const RolUsuario = require('../models/rolUsuarioModel');

exports.getAll = async (req, res) => {
    try {
        const result = await RolUsuario.getAll();
        res.status(200).json(result);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error interno del servidor' });
    }
};