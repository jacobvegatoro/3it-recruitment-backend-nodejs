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
        const nuevasPreguntas = req.body;

        // Crear un array para almacenar los ID de las nuevas preguntas
        const nuevosIds = [];

        // Iterar sobre cada nueva pregunta y realizar la inserción
        nuevasPreguntas.forEach((nuevaPregunta, index) => {
            Pregunta.create(nuevaPregunta, (err, result) => {
                if (err) {
                    console.error(err);
                    res.end(JSON.stringify({ message: 'Error interno del servidor' }));
                } else {
                    // Almacenar el ID de la nueva pregunta
                    nuevosIds.push(result.insertId);

                    // Verificar si hemos terminado de procesar todas las preguntas
                    if (index === nuevasPreguntas.length - 1) {
                        // Obtener todas las preguntas después de la inserción
                        Pregunta.getAll((err, preguntasActualizadas) => {
                            if (err) {
                                console.error(err);
                                res.end(JSON.stringify({ message: 'Error interno del servidor' }));
                            } else {
                                res.end(JSON.stringify(preguntasActualizadas));
                            }
                        });
                    }
                }
            });
        });
    }

};
