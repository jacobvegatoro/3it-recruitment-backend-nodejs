require('dotenv').config();

const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(bodyParser.json());

console.log(new Date().toString());
process.env.TZ = "Chile/Continental";
console.log(new Date().toString());

const postulanteRoutes = require('./routes/postulanteRoutes');
const clienteRoutes = require('./routes/clienteRoutes');
const celulaRoutes = require('./routes/celulaRoutes');
const rolRoutes = require('./routes/rolRoutes');
const procesoRoutes = require('./routes/procesoRoutes');
const entrevistaRoutes = require('./routes/entrevistaRoutes');
const preguntaRoutes = require('./routes/preguntaRoutes');
const respuestaRoutes = require('./routes/respuestaRoutes');
const rolUsuarioRoutes = require('./routes/rolUsuarioRoutes');
const usuarioRoutes = require('./routes/usuarioRoutes');
const etapaRoutes = require('./routes/etapaRoutes');
const etapaProcesoRoutes = require('./routes/etapaProcesoRoutes');
const loginRoutes = require('./routes/authRoutes');
const estadisticaRoute = require('./routes/estadisticaRoutes');

app.use('/postulantes', postulanteRoutes);
app.use('/clientes', clienteRoutes);
app.use('/celulas', celulaRoutes);
app.use('/roles', rolRoutes);
app.use('/procesos', procesoRoutes);
app.use('/entrevistas', entrevistaRoutes);
app.use('/preguntas', preguntaRoutes);
app.use('/respuestas', respuestaRoutes);
app.use('/rolesusuarios', rolUsuarioRoutes);
app.use('/usuarios', usuarioRoutes);
app.use('/etapas', etapaRoutes);
app.use('/etapasprocesos', etapaProcesoRoutes);
app.use('/login', loginRoutes);
app.use('/estadisticas', estadisticaRoute )

app.use((req, res) => {
    res.status(404).json({ message: 'Ruta no encontrada' });
});

app.use((err, req, res, next) => {
    console.error('Error inesperado:', err);
    res.status(500).json({ message: 'Error interno del servidor' });
});

app.listen(PORT, () => {
    console.log(`Servidor en ejecución en el puerto ${process.env.PORT}`);
    console.log(`Secreto: ${process.env.JWT_SECRET_KEY}`)
});