const rolController = require('../controllers/rolController')
const url = require('url')

module.exports = (req, res) => {
    const parsedUrl = url.parse(req.url, true)
    const { pathname, method } = parsedUrl;

    if (pathname === '/roles') {
        //GET http://localhost:5000/roles
        if (req.method === 'GET') {
            rolController.getAll(req, res);
        }
        //POST http://localhost:5000/roles
        else if (req.method === 'POST') {
            const id = pathname.split('/')[2];
            req.params = { id };
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
            res.writeHead(404, { 'Content-Type': 'application/json' });
            res.end(JSON.stringify({ message: 'Ruta no encontrada' }));
        }
    }
}