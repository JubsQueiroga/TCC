CREATE DATABASE educriadb;
USE educriadb;

CREATE TABLE usuarios (
    id INT AUTO_INCREMENT PRIMARY KEY,
    nome VARCHAR(100) NOT NULL,
    email VARCHAR(100) UNIQUE NOT NULL,
    senha VARCHAR(255) NOT NULL,
    telefone VARCHAR(30) NOT NULL,
    data_nascimento DATE DEFAULT NULL,
    escola VARCHAR(150) DEFAULT NULL,
    matricula VARCHAR(50) DEFAULT NULL,
    serie VARCHAR(50) DEFAULT NULL,
    turma VARCHAR(10) DEFAULT NULL,
    role VARCHAR(20) NOT NULL DEFAULT 'user',
    data_criacao TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    data_atualizacao TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);


-- Exemplo de inserção (senhas no exemplo NÃO estão com hash; em produção use bcrypt hash)
INSERT INTO usuarios (nome, email, senha, telefone, data_nascimento, escola, matricula, serie, turma)
VALUES 
  ('Julia', 'julia@teste.com', '123', '11999990000', '2000-01-01', 'Escola Exemplo', 'MAT001', '3º ano', 'A'),
  ('Maria', 'maria@teste.com', '123', '21988880000', '2001-02-02', 'Outra Escola', 'MAT002', '2º ano', 'B');

-- Example admin user (passwords in plain text here for example only).
-- It's recommended to create admins using the provided script which hashes the password:
-- node scripts/create_admin.js --email admin@educria.com --name "Admin" --password "admin123"
INSERT INTO usuarios (nome, email, senha, telefone, data_nascimento, escola, matricula, serie, turma, role)
VALUES ('Admin', 'admin@educria.com', 'admin123', '11999990001', NULL, 'Escola Admin', 'ADM001', NULL, NULL, 'admin');