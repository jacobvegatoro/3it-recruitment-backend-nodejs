const clienteController = require('../controllers/clienteController');
const url = require('url');

module.exports = (req, res) => {
    const parsedUrl = url.parse(req.url, true);
    const { pathname, method } = parsedUrl;

    if (req.method === 'GET') {
        //GET X ID http://localhost:5000/clientes/1
        if (pathname.startsWith('/clientes/') && !pathname.endsWith('/celulas')) {
            const id = pathname.split('/')[2];
            req.params = { id };
            clienteController.getById(req, res);
        }
        //GET http://localhost:5000/clientes/1/celulas
        else if (pathname.startsWith('/clientes/') && pathname.endsWith('/celulas')) {
            const id = pathname.split('/')[2];
            req.params = { id };
            clienteController.getCelulas(req, res);
        }
        //GET http://localhost:5000/clientes
        else {
            clienteController.getAll(req, res);
        }
    }
    else {
        res.end(JSON.stringify({ message: 'Ruta no encontrada' }));
    }

};
