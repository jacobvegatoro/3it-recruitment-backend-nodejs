const http = require('http');
const postulanteRoutes = require('./routes/postulanteRoutes');
const PORT = process.env.PORT || 5000;

const server = http.createServer((req, res) => {
    postulanteRoutes(req, res);
});


server.listen(PORT, () => {
    console.log(`Servidor en ejecución en el puerto ${PORT}`);
});
