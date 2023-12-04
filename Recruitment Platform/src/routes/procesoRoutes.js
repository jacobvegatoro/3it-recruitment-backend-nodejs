const procesoController = require('../controllers/procesoController');
const url = require('url');

module.exports = (req, res) => {
    const parsedUrl = url.parse(req.url, true);
    const { pathname, method } = parsedUrl;


    if (req.method === 'GET') {
        //GET http://localhost:5000/procesos/1
        if (pathname.startsWith('/procesos/')) {
            const id = pathname.split('/')[2];
            req.params = { id };
            procesoController.getById(req, res);
        }
        //GET http://localhost:5000/procesos
        else {
            procesoController.getAll(req, res);
        }
    }
    //POST http://localhost:5000/procesos
    else if (req.method === 'POST') {
        let body = '';

        req.on('data', (chunk) => {
            body += chunk;
        });

        req.on('end', () => {
            req.body = JSON.parse(body);
            procesoController.create(req, res);
        });
    }
    //PUT http://localhost:5000/procesos/4
    else if (req.method === 'PUT' && pathname.startsWith('/procesos/')) {
        const id = pathname.split('/')[2];
        req.params = { id };
        let body = '';

        req.on('data', (chunk) => {
            body += chunk;
        });

        req.on('end', () => {
            req.body = JSON.parse(body);
            procesoController.update(req, res);
        });
    }
    //DELETE http://localhost:5000/procesos/4
    else if (req.method === 'DELETE' && pathname.startsWith('/procesos/')) {
        const id = pathname.split('/')[2];
        req.params = { id };
        procesoController.delete(req, res);
    }
    else {
        res.end(JSON.stringify({ message: 'Ruta no encontrada' }));
    }

};
