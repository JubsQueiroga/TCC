// Centraliza o carregamento das variáveis de ambiente e exporta um objeto
require('dotenv').config();

const processEnv = {
  PORT: process.env.PORT,
  JWT_SECRET: process.env.JWT_SECRET || process.env.SECRET_KEY,

  // DB - compatibilidade com diferentes nomes
  DB_HOST: process.env.DB_HOST,
  DB_USER: process.env.DB_USER,
  DB_PASSWORD: process.env.DB_PASSWORD || process.env.DB_PASS,
  DB_NAME: process.env.DB_NAME || process.env.DB_DATABASE,
};

// exporta objeto (útil para testes/debug e para centralizar o uso)
module.exports = { processEnv };
