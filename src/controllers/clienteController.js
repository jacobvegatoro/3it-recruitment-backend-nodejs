const Cliente = require('../models/clienteModel');

exports.getAll = async (req, res) => {
    try {
        const result = await Cliente.getAll();
        res.status(200).json(result);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error interno del servidor' });
    }
};

exports.getById = async (req, res) => {
    const id = req.params.id;

    try {
        const result = await Cliente.getById(id);

        if (!result || result.length === 0) {
            res.status(404).json({ message: 'Cliente no encontrado' });
        } else {
            res.status(200).json(result);
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error interno del servidor' });
    }
};

exports.getCelulasByClienteId = async (req, res) => {
    const id = req.params.id;

    try {
        const result = await Cliente.getCelulasByClienteId(id);
        /*const formattedResult = result.map(celula => ({
            id: celula.id,
            nombre: celula.nombre
        }));
        res.status(200).json(formattedResult);
        */
        res.status(200).json(result);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error interno del servidor' });
    }
};

exports.createCliente = async (req, res) => {
    const newCliente = req.body;

    try {
        const clienteId = await Cliente.createCliente(newCliente);
        res.status(201).json({ message: 'Cliente creado', id: clienteId });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error interno del servidor' });
    }
};

exports.updateCliente = async (req, res) => {
    const id = req.params.id;
    const updatedCliente = req.body;

    try {
        await Cliente.updateCliente(id, updatedCliente);
        res.status(200).json({ message: 'Cliente actualizado' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error interno del servidor' });
    }
};

exports.deleteCliente = async (req, res) => {
    const id = req.params.id;

    try {
        await Cliente.deleteCliente(id);
        res.status(200).json({ message: 'Cliente eliminado' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error interno del servidor' });
    }
};
