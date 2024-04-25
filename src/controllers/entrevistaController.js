const Entrevista = require('../models/entrevistaModel')
const limit = 10;

exports.getAll = async (req, res) => {
    try {
        const result = await Entrevista.getAll();
        res.status(200).json(result);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error interno del servidor' });
    }
};

exports.buscarPorNombre = async (req, res) => {
    try {
        const { nombre } = req.query;
        const entrevistas = await Entrevista.buscarPorNombre(nombre);
        res.json(entrevistas);
    } catch (error) {
        console.error('Error al buscar entrevistas por nombre:', error);
        res.status(500).json({ message: 'Error al buscar entrevistas por nombre' });
    }
};

exports.buscarPorRol = async (req, res) => {
    try {
        const { rol } = req.query;
        const entrevistas = await Entrevista.buscarPorRol(rol);
        res.json(entrevistas);
    } catch (error) {
        console.error('Error al buscar entrevistas por rol:', error);
        res.status(500).json({ message: 'Error al buscar entrevistas por rol' });
    }
};

exports.buscarPorCelula = async (req, res) => {
    try {
        const { celula } = req.query;
        const entrevistas = await Entrevista.buscarPorCelula(celula);
        res.json(entrevistas);
    } catch (error) {
        console.error('Error al buscar entrevistas por celula:', error);
        res.status(500).json({ message: 'Error al buscar entrevistas por celula' });
    }
};

exports.buscarPorFecha = async (req, res) => {
    try {
        const { fecha } = req.query;
        const entrevistas = await Entrevista.buscarPorFecha(fecha);
        res.json(entrevistas);
    } catch (error) {
        console.error('Error al buscar entrevistas por fecha:', error);
        res.status(500).json({ message: 'Error al buscar entrevistas por fecha' });
    }
};

exports.getById = async (req, res) => {
    const id = req.params.id;

    try {
        const result = await Entrevista.getById(id);

        if (!result || result.length === 0) {
            res.status(404).json({ message: 'Entrevista no encontrado' });
        } else {
            res.status(200).json(result);
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error interno del servidor' });
    }
};

exports.getByProcesoId = async (req, res) => {
    const id = req.params.id;

    try {
        const result = await Entrevista.getByProcesoId(id);
        res.status(200).json(result);

        /*
        if (!result || result.length === 0) {
            res.status(404).json({ message: 'Entrevista no encontrado' });
        } else {
            res.status(200).json(result);
        }
        */
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error interno del servidor' });
    }
};

exports.create = async (req, res) => {
    const newEntrevista = req.body;

    try {
        const postId = await Entrevista.create(newEntrevista);
        const result = await Entrevista.getByIdSimple(postId);
        //res.status(201).json({ message: 'Entrevista creado', id: postId });
        res.status(201).json(result);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error interno del servidor' });
    }
};

exports.update = async (req, res) => {
    const id = req.params.id;
    const updatedEntrevista = req.body;

    try {
        await Entrevista.update(id, updatedEntrevista);
        const result = await Entrevista.getById(id);
        //res.status(200).json({ message: 'Entrevista actualizado' });
        res.status(200).json(result);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error interno del servidor' });
    }
};

exports.delete = async (req, res) => {
    const id = req.params.id;

    try {
        await Entrevista.delete(id);
        res.status(200).json({ message: 'Entrevista eliminado' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error interno del servidor' });
    }
};

exports.getAllPaginated = async (req, res) => {
    const page = parseInt(req.query.page) || 1;

    try {
        const result = await Entrevista.getAllPaginated(page, limit);
        res.status(200).json(result);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error interno del servidor' });
    }
};
