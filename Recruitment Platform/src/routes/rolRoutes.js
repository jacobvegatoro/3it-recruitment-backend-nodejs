const rolController = require('../controllers/rolController')
const url = require('url')

module.exports = (req, res) => {
    const parsedUrl = url.parse(req.url, true)
    const {pathname, method} = parsedUrl;

    if(pathname === '/roles') {
        if(req.method === 'GET') {
            rolController.getAll(req, res);
        }
    }
}