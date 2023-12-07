const estadoProcesoController = require('../controllers/estadoProcesoController');
const url = require('url');

module.exports = (req, res) => {
    const parsedUrl = url.parse(req.url, true);
    const { pathname, method } = parsedUrl;


    if (req.method === 'GET') {
        //GET X ID http://localhost:5000/eprocesos/1
        if (pathname.startsWith('/eprocesos/') && !pathname.endsWith('/detalles')) {
            const id = pathname.split('/')[2];
            req.params = { id };
            estadoProcesoController.getById(req, res);
        }
        //GET X TODOS CON DETALLES http://localhost:5000/eprocesos/detalles
        else if (pathname.startsWith('/eprocesos') && pathname.endsWith('/detalles')) {
            estadoProcesoController.getAllWithDetails(req, res);
        }
        else {
            //GET TODOS http://localhost:5000/eprocesos
            estadoProcesoController.getAll(req, res);
        }
    }
    else {
        res.end(JSON.stringify({ message: 'Ruta no encontrada' }));
    }

};
