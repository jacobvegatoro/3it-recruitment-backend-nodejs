const celulaController = require('../controllers/celulaController');
const url = require('url');

module.exports = (req, res) => {
    const parsedUrl = url.parse(req.url, true);
    const { pathname, method } = parsedUrl;

    //GET X ID http://localhost:5000/celulas/1
    if (req.method === 'GET' && pathname.startsWith('/celulas/')) {
        const id = pathname.split('/')[2];
        req.params = { id };
        celulaController.getById(req, res);
    }
    //GET TODOS http://localhost:5000/celulas
    else if (req.method === 'GET') {
        celulaController.getAll(req, res);
    }
    else {
        res.end(JSON.stringify({ message: 'Ruta no encontrada' }));
    }
}
