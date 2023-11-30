const entrevistaController = require('../controllers/entrevistaController');
const url = require('url');

module.exports = (req, res) => {
    const parsedUrl = url.parse(req.url, true);
    const { pathname, method } = parsedUrl;

    if (pathname === '/entrevistas') {
        //GET TODOS http://localhost:5000/entrevistas
        if (req.method === 'GET') {
            entrevistaController.getAll(req, res);
        }
        //POST CREAR http://localhost:5000/entrevistas
        else if (req.method === 'POST') {
            const id = pathname.split('/')[2];
            req.params = { id };
            let body = '';

            req.on('data', (chunk) => {
                body += chunk;
            });

            req.on('end', () => {
                req.body = JSON.parse(body);
                entrevistaController.create(req, res);
            });


        }
        else {
            res.writeHead(404, { 'Content-Type': 'application/json' });
            res.end(JSON.stringify({ message: 'Ruta no encontrada' }));
        }
    }
    //GET X ID http://localhost:5000/entrevistas/1
    else if (pathname.startsWith('/entrevistas/') && req.method === 'GET' && !pathname.endsWith('/buscar') && !pathname.endsWith('/paginacion')) {
        const id = pathname.split('/')[2];
        req.params = { id };
        entrevistaController.getById(req, res);
    }
    //PUT EDITAR http://localhost:5000/entrevistas/4
    else if (pathname.startsWith('/entrevistas/') && req.method === 'PUT') {
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
    else if (pathname.startsWith('/entrevistas/') && req.method === 'DELETE') {
        const id = pathname.split('/')[2];
        req.params = { id };
        entrevistaController.delete(req, res);
    }
    //GET PAGINACIÓN http://localhost:5000/entrevistas/paginacion
    else if (pathname.startsWith('/entrevistas') && req.method === 'GET' && pathname.endsWith('/paginacion')) {
        entrevistaController.getAllPaginated(req, res);
    }
    //MANEJO DE ERRORES
    else {
        res.writeHead(404, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({ message: 'Ruta no encontrada' }));
    }
};
