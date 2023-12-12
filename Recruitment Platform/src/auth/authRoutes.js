const { parse } = require('url');
const authController = require('../auth/authController');

module.exports = (req, res) => {
    const { pathname } = parse(req.url, true);

    if (req.method === 'POST' && pathname === '/auth/login') {
        let body = '';

        req.on('data', (chunk) => {
            body += chunk;
        });

        req.on('end', () => {
            req.body = JSON.parse(body);
            authController.login(req, res);
        });
    } else {
        res.end(JSON.stringify({ message: 'Ruta no encontradaaaaa' }));
    }
};
