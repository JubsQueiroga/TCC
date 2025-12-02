const mysql = require('mysql2');
const { processEnv } = require('./config');

// Support multiple env var naming conventions (DB_PASSWORD vs DB_PASS, DB_NAME vs DB_DATABASE)
const dbConfig = {
  host: processEnv.DB_HOST,
  user: processEnv.DB_USER,
  password: processEnv.DB_PASSWORD,
  database: processEnv.DB_NAME,
};

const db = mysql.createConnection(dbConfig);

db.connect((err) => {
  if (err) {
    console.error('Erro ao conectar ao banco de dados:', err);
    console.error('Config usada:', {
      host: dbConfig.host,
      user: dbConfig.user,
      database: dbConfig.database
    });
    return;
  }
  console.log('Conectado ao banco de dados MySQL');
});

module.exports = db;
