const rolController = require('../controllers/rolController')
const url = require('url')

module.exports = (req, res) => {
    const parsedUrl = url.parse(req.url, true)
    const { pathname, method } = parsedUrl;

    //GET http://localhost:5000/roles
    if (req.method === 'GET') {
        rolController.getAll(req, res);
    }
    //POST http://localhost:5000/roles
    else if (req.method === 'POST') {
        let body = '';

        req.on('data', (chunk) => {
            body += chunk;
        });

        req.on('end', () => {
            req.body = JSON.parse(body);
            rolController.create(req, res);
        });
    }
    else {
        res.end(JSON.stringify({ message: 'Ruta no encontrada' }));
    }

}