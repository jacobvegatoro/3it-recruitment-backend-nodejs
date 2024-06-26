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

exports.buscarPorNombre = async (req, res) => {
    try {
        const { nombres, apellidos } = req.query;
        const result = await Proceso.buscarPorNombre(nombres, apellidos);
        res.status(200).json(result);
    } catch (error) {
        console.error('Error al buscar procesos por nombres del postulante:', error);
        res.status(500).json({ message: 'Error al buscar procesos por nombres del postulante' });
    }
};

exports.buscarPorApellido = async (req, res) => {
    try {
        const { apellidos } = req.query;
        const result = await Proceso.buscarPorApellido(apellidos);
        res.status(200).json(result);
    } catch (error) {
        console.error('Error al buscar procesos por apellidos del postulante:', error);
        res.status(500).json({ message: 'Error al buscar procesos por apellidos del postulante' });
    }
};

exports.buscarPorRol = async (req, res) => {
    const rol = req.query.rol;
    try {
        const result = await Proceso.buscarPorRol(rol);
        res.status(200).json(result);
    } catch (error) {
        console.error('Error al buscar procesos por rol:', error);
        res.status(500).json({ message: 'Error al buscar procesos por rol' });
    }
};

exports.buscarPorCelula = async (req, res) => {
    const celula = req.query.celula;
    try {
        const result = await Proceso.buscarPorCelula(celula);
        res.status(200).json(result);
    } catch (error) {
        console.error('Error al buscar procesos por célula:', error);
        res.status(500).json({ message: 'Error al buscar procesos por célula' });
    }
};

exports.create = async (req, res) => {
    const newProceso = req.body;

    try {
        const postId = await Proceso.create(newProceso);
        const procesoNuevo = await Proceso.getById(postId);
        //res.status(201).json({ message: 'Proceso creado', id: postId });
        res.status(201).json(procesoNuevo);
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