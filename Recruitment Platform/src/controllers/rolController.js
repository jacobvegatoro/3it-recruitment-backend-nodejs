const Rol = require('../models/rolModel');

module.exports = {
    getAll: (req, res) => {
        Rol.getAll((err, result) => {
            if (err) {
                console.error(err);
                res.end(JSON.stringify({ message: 'Error interno del servidor' }));
            }
            else {
                res.end(JSON.stringify(result));
            }
        })
    },

    create: (req, res) => {
        const newRol = req.body;
        Rol.create(newRol, (err, result) => {
            if (err) {
                console.error(err);
                res.end(JSON.stringify({ message: 'Error interno del servidor' }));
            } else {
                res.end(JSON.stringify({ message: 'Rol creado', id: result.insertId }));
            }
        });
    }
}