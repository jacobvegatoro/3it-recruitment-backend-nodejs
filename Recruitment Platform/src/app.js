const http = require('http');
const postulanteRoutes = require('./routes/postulanteRoutes');
const clienteRoutes = require('./routes/clienteRoutes');
const celulaRoutes = require('./routes/celulaRoutes');
const PORT = process.env.PORT || 5000;

const server = http.createServer((req, res) => {
    const parsedUrl = new URL(`http://localhost:${PORT}${req.url}`);
    
    if (parsedUrl.pathname.startsWith('/postulantes')) {
        postulanteRoutes(req, res);
    } 
    else if (parsedUrl.pathname.startsWith('/clientes')) {
        clienteRoutes(req, res);
    } 
    else if (parsedUrl.pathname.startsWith('/celulas')) {
        celulaRoutes(req, res);
    } 
    else {
        res.writeHead(404, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({ message: 'Ruta no encontrada' }));
    }
});


server.listen(PORT, () => {
    console.log(`Servidor en ejecución en el puerto ${PORT}`);
});
