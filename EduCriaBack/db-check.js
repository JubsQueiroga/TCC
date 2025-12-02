const mysql = require('mysql2/promise');
const { processEnv } = require('./config');

async function check() {
  console.log('ProcessEnv (sensitive values hidden):');
  console.log({
    host: processEnv.DB_HOST,
    user: processEnv.DB_USER,
    database: processEnv.DB_NAME
  });

  if (!processEnv.DB_HOST || !processEnv.DB_USER || !processEnv.DB_PASSWORD || !processEnv.DB_NAME) {
    console.error('\n❌ Falta um ou mais parâmetros de conexão no arquivo .env. Atualize DB_HOST, DB_USER, DB_PASSWORD e DB_NAME.');
    process.exit(1);
  }

  try {
    const conn = await mysql.createConnection({
      host: processEnv.DB_HOST,
      user: processEnv.DB_USER,
      password: processEnv.DB_PASSWORD,
      database: processEnv.DB_NAME,
      connectTimeout: 5000
    });

    console.log('\n✅ Conexão com MySQL: OK');
    const [rows] = await conn.query('SELECT 1 AS ok');
    console.log('Consulta de teste:', rows);
    await conn.end();
    process.exit(0);
  } catch (err) {
    console.error('\n❌ Erro ao conectar ao MySQL:', err.message);
    process.exit(2);
  }
}

check();
