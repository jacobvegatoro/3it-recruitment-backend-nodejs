const clienteController = require('../controllers/clienteController');
const url = require('url');

module.exports = (req, res) => {
    const parsedUrl = url.parse(req.url, true);
    const { pathname, method } = parsedUrl;

    if (pathname === '/clientes') {
        if (req.method === 'GET') {
            clienteController.getAll(req, res);
        } else {
            res.writeHead(404, { 'Content-Type': 'application/json' });
            res.end(JSON.stringify({ message: 'Ruta no encontrada (en /cliente)' }));
        }
    } else if (pathname.startsWith('/clientes/') && req.method === 'GET') {
        const id = pathname.split('/')[2];
        req.params = { id };
        clienteController.getById(req, res);
    } else if (pathname.startsWith('/clientes/') && req.method === 'GET' && pathname.endsWith('/celulas')) {
        const idCliente = pathname.split('/')[2];
        req.params = { idCliente };
        clienteController.getCelulas(req, res);
    }
    else {
        res.writeHead(404, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({ message: 'Ruta no encontrada' }));
    }
};
