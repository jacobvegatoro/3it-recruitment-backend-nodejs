const respuestaController = require('../controllers/respuestaController');
const url = require('url');

module.exports = (req, res) => {
    const parsedUrl = url.parse(req.url, true);
    const { pathname, method } = parsedUrl;


    if (req.method === 'GET') {
        //GET X ID http://localhost:5000/respuestas/1
        if (pathname.startsWith('/respuestas/')) {
            const id = pathname.split('/')[2];
            req.params = { id };
            respuestaController.getById(req, res);
        }
        //GET TODOS http://localhost:5000/respuestas
        else {
            respuestaController.getAll(req, res);
        }
    }
    else if (req.method === 'POST') {
        // POST CREAR Multiples http://localhost:5000/respuestas/multiples
        if (pathname.startsWith('/respuestas/') && pathname.endsWith('/multiples')) {
            respuestaController.createMultiple(req, res);
            
        }
        //POST CREAR http://localhost:5000/respuestas
        else {
            let body = '';

            req.on('data', (chunk) => {
                body += chunk;
            });

            req.on('end', () => {
                req.body = JSON.parse(body);
                respuestaController.create(req, res);
            });
        }
    }
    //PUT EDITAR http://localhost:5000/respuestas/4
    else if (req.method === 'PUT' && pathname.startsWith('/respuestas/')) {
        const id = pathname.split('/')[2];
        req.params = { id };
        let body = '';

        req.on('data', (chunk) => {
            body += chunk;
        });

        req.on('end', () => {
            req.body = JSON.parse(body);
            respuestaController.update(req, res);
        });
    }
    //DELETE BORRAR http://localhost:5000/respuestas/4
    else if (req.method === 'DELETE' && pathname.startsWith('/respuestas/')) {
        const id = pathname.split('/')[2];
        req.params = { id };
        respuestaController.delete(req, res);
    }
    else {
        res.end(JSON.stringify({ message: 'Ruta no encontrada' }));
    }

};
