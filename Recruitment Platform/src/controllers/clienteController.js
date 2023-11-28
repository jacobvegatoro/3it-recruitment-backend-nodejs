const Cliente = require('../models/clienteModel');

module.exports = {
    getAll: (req, res) => {
        Cliente.getAll((err, result) => {
            if (err) {
                console.error(err);
                res.writeHead(500, { 'Content-Type': 'application/json' });
                res.end(JSON.stringify({ message: 'Error interno del servidor (getAll cliente)' }));
            }
            else {
                res.writeHead(200, { 'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*','Access-Control-Allow-Methods': '*',});
                res.end(JSON.stringify(result));
            }
        })
    },

    getById: (req, res) => {
        let id = req.params.id;
        Cliente.getById(id, (err, result) => {
            if (err) {
                console.error(err);
                res.writeHead(500, { 'Content-Type': 'application/json' });
                res.end(JSON.stringify({ message: 'Error interno del servidor (getById cliente)' }));
            }
            else if (!result || result.length === 0) {
                res.writeHead(404, { 'Content-Type': 'application/json' });
                res.end(JSON.stringify({ message: 'Cliente no encontrado' }));
            }
            else {
                res.writeHead(200, { 'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*','Access-Control-Allow-Methods': '*',});
                res.end(JSON.stringify(result));
            }
        })
    },

    getCelulas: (req, res) => {
        const id = req.params.id;
        Cliente.getCelulasByClienteId(id, (err, result) => {
            if (err) {
                console.error(err);
                res.writeHead(500, { 'Content-Type': 'application/json' });
                res.end(JSON.stringify({ message: 'Error interno del servidor (getCelulas clientes)' }));
            } else {
                res.writeHead(200, { 'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*','Access-Control-Allow-Methods': '*',});
                res.end(JSON.stringify(result));
            }
        });
    }

}
