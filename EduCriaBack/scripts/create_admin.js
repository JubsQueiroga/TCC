const bcrypt = require('bcrypt');
const mysql = require('mysql2/promise');
const argv = require('yargs').argv;
require('dotenv').config();

async function main() {
  const email = argv.email || argv.e;
  const name = argv.name || argv.n || 'Admin';
  const password = argv.password || argv.p;
  if (!email || !password) {
    console.error('Uso: node scripts/create_admin.js --email admin@exemplo.com --password senha');
    process.exit(1);
  }

  const dbConfig = {
    host: process.env.DB_HOST || 'localhost',
    user: process.env.DB_USER || 'root',
    password: process.env.DB_PASSWORD || '',
    database: process.env.DB_NAME || 'educriadb'
  };

  try {
    const conn = await mysql.createConnection(dbConfig);
    const hash = await bcrypt.hash(password, 10);

    const [rows] = await conn.execute('INSERT INTO usuarios (nome, email, senha, telefone, role) VALUES (?, ?, ?, ?, ?)', [name, email, hash, '', 'admin']);
    console.log('Administrador criado com id:', rows.insertId);
    await conn.end();
  } catch (err) {
    console.error('Erro ao criar admin:', err.message);
    process.exit(1);
  }
}

main();
