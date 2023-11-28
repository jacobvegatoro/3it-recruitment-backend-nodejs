const Rol = require('../models/rolModel');

module.exports = {
    getAll: (req, res) => {
        Rol.getAll((err, result) => {
            if (err) {
                console.error(err);
                res.writeHead(500, { 'Content-Type': 'application/json' });
                res.end(JSON.stringify({ message: 'Error interno del servidor' }));
            }
            else {
                res.writeHead(200, { 'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*', 'Access-Control-Allow-Methods': '*', });
                res.end(JSON.stringify(result));
            }
        })
    }
}