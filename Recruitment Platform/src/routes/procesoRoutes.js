const procesoController = require('../controllers/procesoController');
const url = require('url');

module.exports = (req, res) => {
    const parsedUrl = url.parse(req.url, true);
    const { pathname, method } = parsedUrl;

    //GET http://localhost:5000/procesos
    if (pathname === '/procesos') {
        if (req.method === 'GET') {
            procesoController.getAll(req, res);
        }
        //POST http://localhost:5000/procesos
        else if (req.method === 'POST') {
            const id = pathname.split('/')[2];
            req.params = { id };
            let body = '';

            req.on('data', (chunk) => {
                body += chunk;
            });

            req.on('end', () => {
                req.body = JSON.parse(body);
                procesoController.create(req, res);
            });


        }
        else {
            res.writeHead(404, { 'Content-Type': 'application/json' });
            res.end(JSON.stringify({ message: 'Ruta no encontrada' }));
        }
    }
    //GET http://localhost:5000/procesos/1
    else if (pathname.startsWith('/procesos/') && req.method === 'GET') {
        const id = pathname.split('/')[2];
        req.params = { id };
        procesoController.getById(req, res);
    }
    //PUT http://localhost:5000/procesos/4
    else if (pathname.startsWith('/procesos/') && req.method === 'PUT') {
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
    else if (pathname.startsWith('/procesos/') && req.method === 'DELETE') {
        const id = pathname.split('/')[2];
        req.params = { id };
        procesoController.delete(req, res);
    }
    //MANEJO DE ERRORES
    else {
        res.writeHead(404, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({ message: 'Ruta no encontrada' }));
    }
};
