const postulanteController = require('../controllers/postulanteController');
const url = require('url');

module.exports = (req, res) => {
    const parsedUrl = url.parse(req.url, true);
    const { pathname, method } = parsedUrl;

    // Rutas principales
    if (pathname === '/postulantes') {
        if (req.method === 'GET') {
            postulanteController.getAll(req, res);
        } else if (req.method === 'POST') {
            const id = pathname.split('/')[2];
            req.params = { id };
            let body = '';

            req.on('data', (chunk) => {
                body += chunk;
            });

            req.on('end', () => {
                req.body = JSON.parse(body);
                postulanteController.create(req, res);
            });

            
        } else {
            res.writeHead(404, { 'Content-Type': 'application/json' });
            res.end(JSON.stringify({ message: 'Ruta no encontrada' }));
        }
    } else if (pathname.startsWith('/postulantes/') && req.method === 'GET') {
        const id = pathname.split('/')[2];
        req.params = { id };
        postulanteController.getById(req, res);
    } else if (pathname.startsWith('/postulantes/') && req.method === 'PUT') {
        const id = pathname.split('/')[2];
        req.params = { id };
        let body = '';

        req.on('data', (chunk) => {
            body += chunk;
        });

        req.on('end', () => {
            req.body = JSON.parse(body);
            postulanteController.update(req, res);
        });
    } else if (pathname.startsWith('/postulantes/') && req.method === 'DELETE') {
        const id = pathname.split('/')[2];
        req.params = { id };
        postulanteController.delete(req, res);
    } else {
        res.writeHead(404, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({ message: 'Ruta no encontrada' }));
    }
};



/*
const postulanteController = require('../controllers/postulanteController');

module.exports = (server) => {
    server.on('request', (req, res) => {
        const url = new URL(req.url, `http://${req.headers.host}`);

        // Router
        if (url.pathname === '/postulantes' && req.method === 'GET') {
            postulanteController.getAll(req, res);
        } else if (url.pathname === '/postulantes' && req.method === 'POST') {
            postulanteController.create(req, res);
        } else if (url.pathname === '/postulantes/:id' && req.method === 'GET') {
            postulanteController.getById(req, res);
        } else if (url.pathname === '/postulantes/:id' && req.method === 'PUT') {
            postulanteController.update(req, res);
        } else if (url.pathname === '/postulantes/:id' && req.method === 'DELETE') {
            postulanteController.delete(req, res);
        } else {
            res.writeHead(404, { 'Content-Type': 'application/json' });
            res.end(JSON.stringify({ message: 'Ruta no encontrada' }));
        }
    });
};
*/