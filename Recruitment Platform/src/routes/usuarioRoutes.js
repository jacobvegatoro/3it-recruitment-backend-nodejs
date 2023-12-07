const usuarioController = require('../controllers/usuarioController');
const url = require('url');

module.exports = (req, res) => {
    const parsedUrl = url.parse(req.url, true);
    const { pathname, method } = parsedUrl;

    if (req.method === 'GET') {
        //GET X ID http://localhost:5000/usuarios/1
        if (pathname.startsWith('/usuarios/')) {
            const id = pathname.split('/')[2];
            req.params = { id };
            usuarioController.getById(req, res);
        }
        else {
            //GET TODOS http://localhost:5000/usuarios
            usuarioController.getAll(req, res);
        }
    }
    //POST CREAR http://localhost:5000/usuarios
    else if (req.method === 'POST') {
        let body = '';

        req.on('data', (chunk) => {
            body += chunk;
        });

        req.on('end', () => {
            req.body = JSON.parse(body);
            usuarioController.create(req, res);
        });
    }
    //PUT EDITAR http://localhost:5000/usuarios/4
    else if (req.method === 'PUT' && pathname.startsWith('/usuarios/')) {
        const id = pathname.split('/')[2];
        req.params = { id };
        let body = '';

        req.on('data', (chunk) => {
            body += chunk;
        });

        req.on('end', () => {
            req.body = JSON.parse(body);
            usuarioController.update(req, res);
        });
    }
    //DELETE BORRAR http://localhost:5000/usuarios/4
    else if (req.method === 'DELETE' && pathname.startsWith('/usuarios/')) {
        const id = pathname.split('/')[2];
        req.params = { id };
        usuarioController.delete(req, res);
    }
    else {
        res.end(JSON.stringify({ message: 'Ruta no encontrada' }));
    }

};
