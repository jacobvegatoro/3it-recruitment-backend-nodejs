const preguntaController = require('../controllers/preguntaController');
const url = require('url');

module.exports = (req, res) => {
    const parsedUrl = url.parse(req.url, true);
    const { pathname, method } = parsedUrl;

    if (pathname === '/preguntas') {
        //GET TODOS http://localhost:5000/preguntas
        if (req.method === 'GET') {
            preguntaController.getAll(req, res);
        }
        //POST CREAR http://localhost:5000/preguntas
        else if (req.method === 'POST' && !pathname.endsWith('/multiples')) {
            const id = pathname.split('/')[2];
            req.params = { id };
            let body = '';

            req.on('data', (chunk) => {
                body += chunk;
            });

            req.on('end', () => {
                req.body = JSON.parse(body);
                preguntaController.create(req, res);
            });


        }
        else {
            res.end(JSON.stringify({ message: 'Ruta no encontrada' }));
        }
    }
    //GET X ID http://localhost:5000/preguntas/1
    else if (pathname.startsWith('/preguntas/') && req.method === 'GET' && !pathname.endsWith('/buscar') && !pathname.endsWith('/paginacion') && !pathname.endsWith('/multiples')) {
        const id = pathname.split('/')[2];
        req.params = { id };
        preguntaController.getById(req, res);
    }
    //PUT EDITAR http://localhost:5000/preguntas/4
    else if (pathname.startsWith('/preguntas/') && req.method === 'PUT') {
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
    else if (pathname.startsWith('/preguntas/') && req.method === 'DELETE') {
        const id = pathname.split('/')[2];
        req.params = { id };
        preguntaController.delete(req, res);
    }
    // POST CREAR Multiples http://localhost:5000/preguntas/multiples
    else if (pathname.startsWith('/preguntas/') && req.method === 'POST' && pathname.endsWith('/multiples')) {
        let body = '';

    req.on('data', (chunk) => {
        body += chunk;
    });

    req.on('end', () => {
        try {
            req.body = JSON.parse(body);
            preguntaController.create(req, res);
        } catch (error) {
            console.error('Error al analizar el cuerpo de la solicitud:', error);
            res.end(JSON.stringify({ message: 'Error en el formato de los datos enviados' }));
        }
    });
    }
    //MANEJO DE ERRORES
    else {
        res.end(JSON.stringify({ message: 'Ruta no encontrada' }));
    }
};
