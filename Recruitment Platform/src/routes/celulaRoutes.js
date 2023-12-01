const celulaController = require('../controllers/celulaController');
const url = require('url');

module.exports = (req, res) => {
    const parsedUrl = url.parse(req.url, true);
    const { pathname, method } = parsedUrl;

    if (pathname === '/celulas') {
        if (req.method === 'GET') {
            celulaController.getAll(req, res);
        } 
        else {
            res.end(JSON.stringify({ message: 'Ruta no encontrada' }));
        }
    }
    else if (pathname.startsWith('/celulas/') && req.method === 'GET') {
        const id = pathname.split('/')[2];
        req.params = { id };
        celulaController.getById(req, res);
    }
    else {
        res.end(JSON.stringify({ message: 'Ruta no encontrada' }));
    }
}
