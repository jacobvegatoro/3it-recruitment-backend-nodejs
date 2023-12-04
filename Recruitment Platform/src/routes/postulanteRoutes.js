const postulanteController = require('../controllers/postulanteController');
const url = require('url');

module.exports = (req, res) => {
    const parsedUrl = url.parse(req.url, true);
    const { pathname, method } = parsedUrl;


    if (req.method === 'GET') {
        //GET X ID http://localhost:5000/postulantes/1
        if (pathname.startsWith('/postulantes/') && !pathname.endsWith('/buscar') && !pathname.endsWith('/paginacion')) {
            const id = pathname.split('/')[2];
            req.params = { id };
            postulanteController.getById(req, res);
        }
        //GET PAGINACIÓN http://localhost:5000/postulantes/paginacion
        else if (pathname.startsWith('/postulantes') && pathname.endsWith('/paginacion')) {
            postulanteController.getAllPaginated(req, res);
        }
        //GET BUSCAR PALABRA http://localhost:5000/postulantes/buscar?keyword=juan
        else if (pathname === '/postulantes/buscar') {
            const queryParameters = parsedUrl.query;
            const keyword = queryParameters.keyword;

            if (!keyword) {
                res.end(JSON.stringify({ message: 'Palabra a buscar no proporcionada' }));
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
        else {
            //GET TODOS http://localhost:5000/postulantes
            postulanteController.getAll(req, res);
        }
    }
    else if (req.method === 'POST') {
        //POST CREAR http://localhost:5000/postulantes
        let body = '';

        req.on('data', (chunk) => {
            body += chunk;
        });

        req.on('end', () => {
            req.body = JSON.parse(body);
            postulanteController.create(req, res);
        });
    }
    else if (req.method === 'PUT' && pathname.startsWith('/postulantes/')) {
        //PUT EDITAR http://localhost:5000/postulantes/4
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
    else if (req.method === 'DELETE' && pathname.startsWith('/postulantes/')) {
        //DELETE BORRAR http://localhost:5000/postulantes/4
        const id = pathname.split('/')[2];
        req.params = { id };
        postulanteController.delete(req, res);
    }
    else {
        res.end(JSON.stringify({ message: 'Ruta no encontrada' }));
    }

};
