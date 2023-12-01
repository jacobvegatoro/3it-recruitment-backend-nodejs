const Entrevista = require('../models/entrevistaModel')
const url = require('url');
const PAGE_SIZE = 2;

module.exports = {
    getAll: (req, res) => {
        Entrevista.getAll((err, result) => {
            if (err) {
                console.error(err);
                res.end(JSON.stringify({ message: 'Error interno del servidor' }));
            } else {
                res.end(JSON.stringify(result));
            }
        });
    },

    getById: (req, res) => {
        const id = req.params.id;
        Entrevista.getById(id, (err, result) => {
            if (err) {
                console.error(err);
                res.end(JSON.stringify({ message: 'Error interno del servidor' }));
            } else if (!result || result.length === 0) {
                res.end(JSON.stringify({ message: 'Entrevista no encontrada' }));
            } else {
                res.end(JSON.stringify(result));
            }
        });
    },

    create: (req, res) => {
        const newEntrevista = req.body;
        Entrevista.create(newEntrevista, (err, result) => {
            if (err) {
                console.error(err);
                res.end(JSON.stringify({ message: 'Error interno del servidor' }));
            } else {
                res.end(JSON.stringify({ message: 'Entrevista creada', id: result.insertId }));
            }
        });
    },

    update: (req, res) => {
        const id = req.params.id;
        const updatedEntrevista = req.body;
        Entrevista.update(id, updatedEntrevista, (err) => {
            if (err) {
                console.error(err);
                res.end(JSON.stringify({ message: 'Error interno del servidor' }));
            } else {
                res.end(JSON.stringify({ message: 'Entrevista actualizada' }));
            }
        });
    },

    delete: (req, res) => {
        const id = req.params.id;
        Entrevista.delete(id, (err) => {
            if (err) {
                console.error(err);
                res.end(JSON.stringify({ message: 'Error interno del servidor' }));
            } else {
                res.end(JSON.stringify({ message: 'Entrevista eliminada' }));
            }
        });
    },

    getAllPaginated: (req, res) => {
        const parsedUrl = url.parse(req.url, true);
        const page = parseInt(parsedUrl.query.page) || 1;

        Entrevista.getAllPaginated(page, PAGE_SIZE, (err, result) => {
            if (err) {
                console.error(err);
                res.end(JSON.stringify({ message: 'Error interno del servidor' }));
            } else {
                res.end(JSON.stringify(result));
            }
        });
    }

};
