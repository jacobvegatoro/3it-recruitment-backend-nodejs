const Postulante = require('../models/postulanteModel');
const url = require('url');
const PAGE_SIZE = 10;

module.exports = {
    getAll: (req, res) => {
        Postulante.getAll((err, result) => {
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
        Postulante.getById(id, (err, result) => {
            if (err) {
                console.error(err);
                res.end(JSON.stringify({ message: 'Error interno del servidor' }));
            } else if (!result || result.length === 0) {
                res.end(JSON.stringify({ message: 'Postulante no encontrado' }));
            } else {
                res.end(JSON.stringify(result));
            }
        });
    },

    create: (req, res) => {
        const newPostulante = req.body;
        Postulante.create(newPostulante, (err, result) => {
            if (err) {
                console.error(err);
                res.end(JSON.stringify({ message: 'Error interno del servidor' }));
            } else {
                res.end(JSON.stringify({ message: 'Postulante creado', id: result.insertId }));
            }
        });
    },

    update: (req, res) => {
        const id = req.params.id;
        const updatedPostulante = req.body;
        Postulante.update(id, updatedPostulante, (err) => {
            if (err) {
                console.error(err);
                res.end(JSON.stringify({ message: 'Error interno del servidor' }));
            } else {
                res.end(JSON.stringify({ message: 'Postulante actualizado' }));
            }
        });
    },

    delete: (req, res) => {
        const id = req.params.id;
        Postulante.delete(id, (err) => {
            if (err) {
                console.error(err);
                res.end(JSON.stringify({ message: 'Error interno del servidor' }));
            } else {
                res.end(JSON.stringify({ message: 'Postulante eliminado' }));
            }
        });
    },

    searchByKeyword: (keyword, callback) => {
        Postulante.searchByKeyword(keyword, (err, result) => {
            if (err) {
                callback(err, null);
            } else {
                callback(null, result);
            }
        });
    },

    getAllPaginated: (req, res) => {
        const parsedUrl = url.parse(req.url, true);
        const page = parseInt(parsedUrl.query.page) || 1;

        Postulante.getAllPaginated(page, PAGE_SIZE, (err, result) => {
            if (err) {
                console.error(err);
                res.end(JSON.stringify({ message: 'Error interno del servidor' }));
            } else {
                res.end(JSON.stringify(result));
            }
        });
    }

};
