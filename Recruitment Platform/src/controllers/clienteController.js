const Cliente = require('../models/clienteModel');

module.exports = {
    getAll: (req, res) => {
        Cliente.getAll((err, result) => {
            if (err) {
                console.error(err);
                res.end(JSON.stringify({ message: 'Error interno del servidor' }));
            }
            else {
                res.end(JSON.stringify(result));
            }
        })
    },

    getById: (req, res) => {
        let id = req.params.id;
        Cliente.getById(id, (err, result) => {
            if (err) {
                console.error(err);
                res.end(JSON.stringify({ message: 'Error interno del servidor' }));
            }
            else if (!result || result.length === 0) {
                res.end(JSON.stringify({ message: 'Cliente no encontrado' }));
            }
            else {
                res.end(JSON.stringify(result));
            }
        })
    },

    getCelulas: (req, res) => {
        const id = req.params.id;
        Cliente.getCelulasByClienteId(id, (err, result) => {
            if (err) {
                console.error(err);
                res.end(JSON.stringify({ message: 'Error interno del servidor' }));
            } else {
                const formattedResult = result.map(celula => ({
                    id: celula.id,
                    nombre: celula.nombre
                }));
                res.end(JSON.stringify(formattedResult));
            }
        });
    }

}
