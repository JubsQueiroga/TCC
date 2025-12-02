const express = require('express');
const app = express();
const cors = require('cors');
require('dotenv').config();

// Explicitar headers permitidos para facilitar uso de Authorization no front-end
app.use(cors({ origin: true, allowedHeaders: ['Content-Type', 'Authorization'] }));
app.use(express.json());

// ROTAS EXISTENTES
const usuariosRoutes = require('./routes/usuarios');
app.use('/usuarios', usuariosRoutes);

// ROTA DE PROGRESSO (somente UMA vez)
const progressoRoutes = require('./routes/progresso');
app.use('/progresso', progressoRoutes);

// INICIAR SERVIDOR
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Servidor rodando em http://localhost:${PORT}`);
});
