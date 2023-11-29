const Proceso = require('../models/procesoModel');

module.exports = {
    getAll: (req, res) => {
        Proceso.getAll((err, result) => {
            if (err) {
                console.error(err);
                res.writeHead(500, { 'Content-Type': 'application/json' });
                res.end(JSON.stringify({ message: 'Error interno del servidor' }));
            } else {
                res.writeHead(200, { 'Content-Type': 'application/json'});
                res.end(JSON.stringify(result));
            }
        });
    },

    getById: (req, res) => {
        const id = req.params.id;
        Proceso.getById(id, (err, result) => {
            if (err) {
                console.error(err);
                res.writeHead(500, { 'Content-Type': 'application/json' });
                res.end(JSON.stringify({ message: 'Error interno del servidor' }));
            } else if (!result || result.length === 0) {
                res.writeHead(404, { 'Content-Type': 'application/json' });
                res.end(JSON.stringify({ message: 'Proceso no encontrado' }));
            } else {
                res.writeHead(200, { 'Content-Type': 'application/json'});
                res.end(JSON.stringify(result));
            }
        });
    },

    create: (req, res) => {
        const newProceso = req.body;
        Proceso.create(newProceso, (err, result) => {
            if (err) {
                console.error(err);
                res.writeHead(500, { 'Content-Type': 'application/json' });
                res.end(JSON.stringify({ message: 'Error interno del servidor (create)' }));
            } else {
                res.writeHead(201, { 'Content-Type': 'application/json'});
                res.end(JSON.stringify({ message: 'Proceso creado', id: result.insertId }));
            }
        });
    },

    update: (req, res) => {
        const id = req.params.id;
        const updatedProceso = req.body;
        Proceso.update(id, updatedProceso, (err) => {
            if (err) {
                console.error(err);
                res.writeHead(500, { 'Content-Type': 'application/json' });
                res.end(JSON.stringify({ message: 'Error interno del servidor' }));
            } else {
                res.writeHead(200, { 'Content-Type': 'application/json'});
                res.end(JSON.stringify({ message: 'Proceso actualizado' }));
            }
        });
    },

    delete: (req, res) => {
        const id = req.params.id;
        Proceso.delete(id, (err) => {
            if (err) {
                console.error(err);
                res.writeHead(500, { 'Content-Type': 'application/json' });
                res.end(JSON.stringify({ message: 'Error interno del servidor' }));
            } else {
                res.writeHead(200, { 'Content-Type': 'application/json'});
                res.end(JSON.stringify({ message: 'Proceso eliminado' }));
            }
        });
    }

};
