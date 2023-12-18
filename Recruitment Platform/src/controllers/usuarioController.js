const Usuario = require('../models/usuarioModel');
const bcrypt = require('bcrypt');
const saltRounds = 10;

exports.getAll = async (req, res) => {
    try {
        const result = await Usuario.getAll();
        res.status(200).json(result);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error interno del servidor' });
    }
};

exports.getById = async (req, res) => {
    const id = req.params.id;

    try {
        const result = await Usuario.getById(id);

        if (!result || result.length === 0) {
            res.status(404).json({ message: 'Usuario no encontrado' });
        } else {
            res.status(200).json(result);
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error interno del servidor' });
    }
};

exports.create = async (req, res) => {
    const newUsuario = req.body;

    try {
        const hashedPassword = await bcrypt.hash(newUsuario.clave, saltRounds);
        newUsuario.clave = hashedPassword;

        const postId = await Usuario.create(newUsuario);
        res.status(201).json({ message: 'Usuario creado', id: postId });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error interno del servidor' });
    }
};


exports.update = async (req, res) => {
    const id = req.params.id;
    const updatedUsuario = req.body;

    try {
        await Usuario.update(id, updatedUsuario);
        res.status(200).json({ message: 'Usuario actualizado' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error interno del servidor' });
    }
};

exports.delete = async (req, res) => {
    const id = req.params.id;

    try {
        await Usuario.delete(id);
        res.status(200).json({ message: 'Usuario eliminado' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error interno del servidor' });
    }
};


/*
saltRounds determina el costo del proceso de hash.
Ajustar este valor según las necesidades de seguridad.
Un valor común es 10, pero puedes usar un valor mayor para hacer el proceso más costoso y, por lo tanto, más seguro contra ataques de fuerza bruta.
*/