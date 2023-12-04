const preguntaController = require('../controllers/preguntaController');
const url = require('url');

module.exports = (req, res) => {
    const parsedUrl = url.parse(req.url, true);
    const { pathname, method } = parsedUrl;


    if (req.method === 'GET') {
        //GET X ID http://localhost:5000/preguntas/1
        if (pathname.startsWith('/preguntas/')) {
            const id = pathname.split('/')[2];
            req.params = { id };
            preguntaController.getById(req, res);
        }
        //GET TODOS http://localhost:5000/preguntas
        else {
            preguntaController.getAll(req, res);
        }
    }
    else if (req.method === 'POST') {
        // POST CREAR Multiples http://localhost:5000/preguntas/multiples
        if (pathname.startsWith('/preguntas/') && pathname.endsWith('/multiples')) {
            preguntaController.createMultiple(req, res);
            
        }
        //POST CREAR http://localhost:5000/preguntas
        else {
            let body = '';

            req.on('data', (chunk) => {
                body += chunk;
            });

            req.on('end', () => {
                req.body = JSON.parse(body);
                preguntaController.create(req, res);
            });
        }
    }
    //PUT EDITAR http://localhost:5000/preguntas/4
    else if (req.method === 'PUT' && pathname.startsWith('/preguntas/')) {
        const id = pathname.split('/')[2];
        req.params = { id };
        let body = '';

        req.on('data', (chunk) => {
            body += chunk;
        });

        req.on('end', () => {
            req.body = JSON.parse(body);
            preguntaController.update(req, res);
        });
    }
    //DELETE BORRAR http://localhost:5000/preguntas/4
    else if (req.method === 'DELETE' && pathname.startsWith('/preguntas/')) {
        const id = pathname.split('/')[2];
        req.params = { id };
        preguntaController.delete(req, res);
    }
    else {
        res.end(JSON.stringify({ message: 'Ruta no encontrada' }));
    }

};
