const Celula = require('../models/celulaModel');

module.exports = {
    getAll: (req, res) => {
        Celula.getAll((err, result) => {
            if (err) {
                console.error(err);
                res.writeHead(500, { 'Content-Type': 'application/json' });
                res.end(JSON.stringify({ message: 'Error interno del servidor (getAll célula)' }));
            }
            else {
                res.writeHead(200, { 'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*','Access-Control-Allow-Methods': '*',});
                res.end(JSON.stringify(result));
            }
        })
    },

    getById: (req, res) => {
        let id = req.params.id;
        Celula.getById(id, (err, result) => {
            if (err) {
                console.error(err);
                res.writeHead(500, { 'Content-Type': 'application/json' });
                res.end(JSON.stringify({ message: 'Error interno del servidor (getById célula)' }));
            } 
            else if (!result || result.length === 0) {
                res.writeHead(404, { 'Content-Type': 'application/json' });
                res.end(JSON.stringify({ message: 'Célula no encontrada' }));
            } 
            else {
                res.writeHead(200, { 'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*','Access-Control-Allow-Methods': '*',});
                res.end(JSON.stringify(result));
            }
        })
    }

    /*getCelulaWithCliente: (req, res) => {
        const id = req.params.id;
        Celula.getCelulaWithCliente(id, (err, result) => {
            if (err) {
                console.error(err);
                res.writeHead(500, { 'Content-Type': 'application/json' });
                res.end(JSON.stringify({ message: 'Error interno del servidor (getCelulaWithCliente)' }));
            } 
            else {
                res.writeHead(200, { 'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*','Access-Control-Allow-Methods': '*',});
                res.end(JSON.stringify(result));
            }
        });
    }*/
}
