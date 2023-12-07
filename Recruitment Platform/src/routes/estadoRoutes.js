const estadoController = require('../controllers/estadoController');
const url = require('url');

module.exports = (req, res) => {
    const parsedUrl = url.parse(req.url, true);
    const { pathname, method } = parsedUrl;


    if (req.method === 'GET') {
        //GET X ID http://localhost:5000/estados/1
        if (pathname.startsWith('/estados/')) {
            const id = pathname.split('/')[2];
            req.params = { id };
            estadoController.getById(req, res);
        }
        else {
            //GET TODOS http://localhost:5000/estados
            estadoController.getAll(req, res);
        }
    }
    else if (req.method === 'POST') {
        //POST CREAR http://localhost:5000/estados
        let body = '';

        req.on('data', (chunk) => {
            body += chunk;
        });

        req.on('end', () => {
            req.body = JSON.parse(body);
            estadoController.create(req, res);
        });
    }
    else {
        res.end(JSON.stringify({ message: 'Ruta no encontrada' }));
    }

};
