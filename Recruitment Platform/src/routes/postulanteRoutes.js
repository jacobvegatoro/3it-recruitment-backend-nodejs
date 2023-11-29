const postulanteController = require('../controllers/postulanteController');
const url = require('url');

module.exports = (req, res) => {
    const parsedUrl = url.parse(req.url, true);
    const { pathname, method } = parsedUrl;

    if (pathname === '/postulantes') {
        //GET http://localhost:5000/postulantes
        if (req.method === 'GET') {
            postulanteController.getAll(req, res);
        }
        //POST http://localhost:5000/postulantes
        else if (req.method === 'POST') {
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


        }
        else {
            res.writeHead(404, { 'Content-Type': 'application/json' });
            res.end(JSON.stringify({ message: 'Ruta no encontrada (en /postulante)' }));
        }
    }
    //GET http://localhost:5000/postulantes/1
    else if (pathname.startsWith('/postulantes/') && req.method === 'GET' && !pathname.endsWith('/buscar')) {
        const id = pathname.split('/')[2];
        req.params = { id };
        postulanteController.getById(req, res);
    }
    //PUT http://localhost:5000/postulantes/4
    else if (pathname.startsWith('/postulantes/') && req.method === 'PUT') {
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
    }
    //DELETE http://localhost:5000/postulantes/4
    else if (pathname.startsWith('/postulantes/') && req.method === 'DELETE') {
        const id = pathname.split('/')[2];
        req.params = { id };
        postulanteController.delete(req, res);
    }
    //GET http://localhost:5000/postulantes/buscar?keyword=juan
    else if (pathname === '/postulantes/buscar' && req.method === 'GET') {
        const queryParameters = parsedUrl.query;
        const keyword = queryParameters.keyword;

        if (!keyword) {
            res.writeHead(400, { 'Content-Type': 'application/json' });
            res.end(JSON.stringify({ message: 'Palabra clave no proporcionada' }));
            return;
        }

        postulanteController.searchByKeyword(keyword, (err, result) => {
            if (err) {
                console.error(err);
                res.writeHead(500, { 'Content-Type': 'application/json' });
                res.end(JSON.stringify({ message: 'Error interno del servidor' }));
            } else {
                res.writeHead(200, { 'Content-Type': 'application/json' });
                res.end(JSON.stringify(result));
            }
        });
    }
    //MANEJO DE ERRORES
    else {
        res.writeHead(404, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({ message: 'Ruta no encontrada' }));
    }
};
