const RolUsuario = require('../models/rolUsuarioModel');

module.exports = {
    getAll: (req, res) => {
        RolUsuario.getAll((err, result) => {
            if (err) {
                console.error(err);
                res.end(JSON.stringify({ message: 'Error interno del servidor' }));
            }
            else {
                res.end(JSON.stringify(result));
            }
        })
    }

}