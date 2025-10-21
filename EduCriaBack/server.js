const express = require('express');
const app = express();
const cors = require('cors');
app.use(cors());
const usuariosRoutes = require('./routes/usuarios');
require('dotenv').config();

app.use(express.json()); // Body parser
app.use('/usuarios', usuariosRoutes);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Servidor rodando em http://localhost:3000${PORT}`);
});
