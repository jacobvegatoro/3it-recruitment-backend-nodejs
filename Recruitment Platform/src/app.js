const http = require('http');
const { parse } = require('url');
const postulanteRoutes = require('./routes/postulanteRoutes');
const clienteRoutes = require('./routes/clienteRoutes');
const celulaRoutes = require('./routes/celulaRoutes');
const rolRoutes = require('./routes/rolRoutes');
const procesoRoutes = require('./routes/procesoRoutes');
const entrevistaRoutes = require('./routes/entrevistaRoutes');
const preguntaRoutes = require('./routes/preguntaRoutes');
const respuestaRoutes = require('./routes/respuestaRoutes');

const PORT = process.env.PORT || 5000;

const corsHeaders = {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Methods': '*',
    'Access-Control-Allow-Headers': 'Content-Type',
    'Content-Type': 'application/json'
};

const router = (req, res) => {
    const { pathname } = parse(req.url, true);

    res.writeHead(200, corsHeaders);

    if (pathname.startsWith('/postulantes')) {
        postulanteRoutes(req, res);
    }
    else if (pathname.startsWith('/clientes')) {
        clienteRoutes(req, res);
    }
    else if (pathname.startsWith('/celulas')) {
        celulaRoutes(req, res);
    }
    else if (pathname.startsWith('/roles')) {
        rolRoutes(req, res);
    }
    else if (pathname.startsWith('/procesos')) {
        procesoRoutes(req, res);
    }
    else if (pathname.startsWith('/entrevistas')) {
        entrevistaRoutes(req, res);
    }
    else if (pathname.startsWith('/preguntas')) {
        preguntaRoutes(req, res);
    }
    else if (pathname.startsWith('/respuestas')) {
        respuestaRoutes(req, res);
    }
    else {
        res.end(JSON.stringify({ message: 'Ruta no encontrada' }));
    }
};

const server = http.createServer((req, res) => {
    try {
        router(req, res);
    } catch (error) {
        console.error('Error inesperado:', error);
        res.writeHead(500, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({ message: 'Error interno del servidor' }));
    }
});

server.listen(PORT, () => {
    console.log(`Servidor en ejecución en el puerto ${PORT}`);
});
