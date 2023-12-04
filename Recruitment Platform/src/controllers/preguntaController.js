const Pregunta = require('../models/preguntaModel');

module.exports = {
    getAll: (req, res) => {
        Pregunta.getAll((err, result) => {
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
        Pregunta.getById(id, (err, result) => {
            if (err) {
                console.error(err);
                res.end(JSON.stringify({ message: 'Error interno del servidor' }));
            } else if (!result || result.length === 0) {
                res.end(JSON.stringify({ message: 'Pregunta no encontrada' }));
            } else {
                res.end(JSON.stringify(result));
            }
        });
    },

    create: (req, res) => {
        const newPregunta = req.body;
        Pregunta.create(newPregunta, (err, result) => {
            if (err) {
                console.error(err);
                res.end(JSON.stringify({ message: 'Error interno del servidor' }));
            } else {
                res.end(JSON.stringify({ message: 'Pregunta creada', id: result.insertId }));
            }
        });
    },

    update: (req, res) => {
        const id = req.params.id;
        const updatedPregunta = req.body;
        Pregunta.update(id, updatedPregunta, (err) => {
            if (err) {
                console.error(err);
                res.end(JSON.stringify({ message: 'Error interno del servidor' }));
            } else {
                res.end(JSON.stringify({ message: 'Pregunta actualizada' }));
            }
        });
    },

    delete: (req, res) => {
        const id = req.params.id;
        Pregunta.delete(id, (err) => {
            if (err) {
                console.error(err);
                res.end(JSON.stringify({ message: 'Error interno del servidor' }));
            } else {
                res.end(JSON.stringify({ message: 'Pregunta eliminada' }));
            }
        });
    },

    createMultiple: (req, res) => {
        let body = '';
    
        req.on('data', (chunk) => {
            body += chunk;
        });
    
        req.on('end', () => {
            const newPreguntas = JSON.parse(body);
    
            newPreguntas.forEach((pregunta) => {
                Pregunta.create(pregunta, (err, result) => {
                    if (err) {
                        console.error(err);
                        res.end(JSON.stringify({ message: 'Error interno del servidor' }));
                    } else {
                        console.log(`Pregunta creada con ID: ${result.insertId}`);
                    }
                });
            });
    
            res.end(JSON.stringify({ message: 'Preguntas creadas exitosamente' }));
        });
    }

};
