const Respuesta = require('../models/respuestaModel');

module.exports = {
    getAll: (req, res) => {
        Respuesta.getAll((err, result) => {
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
        Respuesta.getById(id, (err, result) => {
            if (err) {
                console.error(err);
                res.end(JSON.stringify({ message: 'Error interno del servidor' }));
            } else if (!result || result.length === 0) {
                res.end(JSON.stringify({ message: 'Respuesta no encontrada' }));
            } else {
                res.end(JSON.stringify(result));
            }
        });
    },

    create: (req, res) => {
        const newRespuesta = req.body;
        Respuesta.create(newRespuesta, (err, result) => {
            if (err) {
                console.error(err);
                res.end(JSON.stringify({ message: 'Error interno del servidor' }));
            } else {
                res.end(JSON.stringify({ message: 'Respuesta creada', id: result.insertId }));
            }
        });
    },

    update: (req, res) => {
        const id = req.params.id;
        const updatedRespuesta = req.body;
        Respuesta.update(id, updatedRespuesta, (err) => {
            if (err) {
                console.error(err);
                res.end(JSON.stringify({ message: 'Error interno del servidor' }));
            } else {
                res.end(JSON.stringify({ message: 'Respuesta actualizada' }));
            }
        });
    },

    delete: (req, res) => {
        const id = req.params.id;
        Respuesta.delete(id, (err) => {
            if (err) {
                console.error(err);
                res.end(JSON.stringify({ message: 'Error interno del servidor' }));
            } else {
                res.end(JSON.stringify({ message: 'Respuesta eliminada' }));
            }
        });
    },

    
    createMultiple: (req, res) => {
        let body = '';
    
        req.on('data', (chunk) => {
            body += chunk;
        });
    
        req.on('end', () => {
            const newRespuestas = JSON.parse(body);
    
            newRespuestas.forEach((respuesta) => {
                Respuesta.create(respuesta, (err, result) => {
                    if (err) {
                        console.error(err);
                        res.end(JSON.stringify({ message: 'Error interno del servidor' }));
                    } else {
                        console.log(`Respuesta creada con ID: ${result.insertId}`);
                    }
                });
            });
    
            res.end(JSON.stringify({ message: 'Respuestas creadas exitosamente' }));
        });
    }

};
