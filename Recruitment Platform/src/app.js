const http = require('http');
const postulanteRoutes = require('./routes/postulanteRoutes');
const clienteRoutes = require('./routes/clienteRoutes')
const PORT = process.env.PORT || 5000;

const server = http.createServer((req, res) => {
    if (req.url.startsWith('/postulantes')) {
        postulanteRoutes(req, res);
    }
    else if (req.url.startsWith('/clientes')) { 
        clienteRoutes(req, res);
    }
    else {
        res.writeHead(404, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({ message: 'Ruta no encontrada' }));
    }
});


server.listen(PORT, () => {
    console.log(`Servidor en ejecución en el puerto ${PORT}`);
});
