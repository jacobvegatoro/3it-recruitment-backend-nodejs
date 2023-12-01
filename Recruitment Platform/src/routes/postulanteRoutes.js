const postulanteController = require('../controllers/postulanteController');
const url = require('url');

module.exports = (req, res) => {
    const parsedUrl = url.parse(req.url, true);
    const { pathname, method } = parsedUrl;

    if (pathname === '/postulantes') {
        //GET TODOS http://localhost:5000/postulantes
        if (req.method === 'GET') {
            postulanteController.getAll(req, res);
        }
        //POST CREAR http://localhost:5000/postulantes
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
            res.end(JSON.stringify({ message: 'Ruta no encontrada (en /postulante)' }));
        }
    }
    //GET X ID http://localhost:5000/postulantes/1
    else if (pathname.startsWith('/postulantes/') && req.method === 'GET' && !pathname.endsWith('/buscar') && !pathname.endsWith('/paginacion')) {
        const id = pathname.split('/')[2];
        req.params = { id };
        postulanteController.getById(req, res);
    }
    //PUT EDITAR http://localhost:5000/postulantes/4
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
    //DELETE BORRAR http://localhost:5000/postulantes/4
    else if (pathname.startsWith('/postulantes/') && req.method === 'DELETE') {
        const id = pathname.split('/')[2];
        req.params = { id };
        postulanteController.delete(req, res);
    }
    //GET BUSCAR PALABRA http://localhost:5000/postulantes/buscar?keyword=juan
    else if (pathname === '/postulantes/buscar' && req.method === 'GET') {
        const queryParameters = parsedUrl.query;
        const keyword = queryParameters.keyword;

        if (!keyword) {
            res.end(JSON.stringify({ message: 'Palabra clave no proporcionada' }));
            return;
        }

        postulanteController.searchByKeyword(keyword, (err, result) => {
            if (err) {
                console.error(err);
                res.end(JSON.stringify({ message: 'Error interno del servidor' }));
            } else {
                res.end(JSON.stringify(result));
            }
        });
    }
    //GET PAGINACIÓN http://localhost:5000/postulantes/paginacion
    else if (pathname.startsWith('/postulantes') && req.method === 'GET' && pathname.endsWith('/paginacion')) {
        postulanteController.getAllPaginated(req, res);
    }
    //MANEJO DE ERRORES
    else {
        res.end(JSON.stringify({ message: 'Ruta no encontrada' }));
    }
};
