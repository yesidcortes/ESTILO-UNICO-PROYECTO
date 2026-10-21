require('dotenv').config();
const express = require('express');
const cors = require('cors');
const connectMongo = require('./src/config/dbMongo');

const app = express();

// Middlewares
app.use(cors());
app.use(express.json());

// Conectar a la base de datos MongoDB
connectMongo();

// Ruta de prueba
app.get('/', (req, res) => {
  res.send('🚀 Servidor de Estilo Único corriendo correctamente');
});

// Puerto del servidor
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`🚀 Servidor iniciado en el puerto ${PORT}`);
});