const entrevistaController = require('../controllers/entrevistaController');
const url = require('url');

module.exports = (req, res) => {
    const parsedUrl = url.parse(req.url, true);
    const { pathname, method } = parsedUrl;

    if (req.method === 'GET') {
        //GET X ID http://localhost:5000/entrevistas/1
        if (pathname.startsWith('/entrevistas/') && !pathname.endsWith('/paginacion')) {
            const id = pathname.split('/')[2];
            req.params = { id };
            entrevistaController.getById(req, res);
        }
        //GET PAGINACIÓN http://localhost:5000/entrevistas/paginacion
        else if (pathname.startsWith('/entrevistas') && pathname.endsWith('/paginacion')) {
            entrevistaController.getAllPaginated(req, res);
        }
        //GET TODOS http://localhost:5000/entrevistas
        else {
            entrevistaController.getAll(req, res);
        }
    }
    //POST CREAR http://localhost:5000/entrevistas
    else if (req.method === 'POST') {
        let body = '';

        req.on('data', (chunk) => {
            body += chunk;
        });

        req.on('end', () => {
            req.body = JSON.parse(body);
            entrevistaController.create(req, res);
        });
    }
    //PUT EDITAR http://localhost:5000/entrevistas/4
    else if (req.method === 'PUT' && pathname.startsWith('/entrevistas/')) {
        const id = pathname.split('/')[2];
        req.params = { id };
        let body = '';

        req.on('data', (chunk) => {
            body += chunk;
        });

        req.on('end', () => {
            req.body = JSON.parse(body);
            entrevistaController.update(req, res);
        });
    }
    //DELETE BORRAR http://localhost:5000/entrevistas/4
    else if (req.method === 'DELETE' && pathname.startsWith('/entrevistas/')) {
        const id = pathname.split('/')[2];
        req.params = { id };
        entrevistaController.delete(req, res);
    }
    else {
        res.end(JSON.stringify({ message: 'Ruta no encontrada' }));
    }

};
