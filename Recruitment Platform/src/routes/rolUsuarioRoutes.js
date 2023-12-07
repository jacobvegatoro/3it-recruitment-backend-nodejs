const rolUsuarioController = require('../controllers/rolUsuarioController')
const url = require('url')

module.exports = (req, res) => {
    const parsedUrl = url.parse(req.url, true)
    const { pathname, method } = parsedUrl;

    //GET http://localhost:5000/rolesUsuario
    if (req.method === 'GET') {
        rolUsuarioController.getAll(req, res);
    }
    else {
        res.end(JSON.stringify({ message: 'Ruta no encontrada' }));
    }

}