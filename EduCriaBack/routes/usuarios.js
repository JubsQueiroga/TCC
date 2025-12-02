// routes/usuarios.js
const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const db = require('../db');
require('dotenv').config();

const SECRET_KEY = process.env.SECRET_KEY || process.env.JWT_SECRET || 'troque_essa_chave_em_prod';

// ---------------------------
// UTIL: middleware para verificar JWT (extraído aqui pra uso futuro)
// ---------------------------
function verifyToken(req, res, next) {
  const authHeader = req.headers['authorization'] || req.headers['Authorization'];
  if (!authHeader) {
    return res.status(401).json({ error: 'Token ausente' });
  }

  const parts = authHeader.split(' ');
  if (parts.length !== 2 || parts[0] !== 'Bearer') {
    return res.status(401).json({ error: 'Formato de token inválido' });
  }

  const token = parts[1];

  jwt.verify(token, SECRET_KEY, (err, decoded) => {
    if (err) {
      return res.status(401).json({ error: 'Token inválido ou expirado' });
    }
    // adiciona dados do token na requisição
    req.user = decoded;
    next();
  });
}

// ---------------------------
// ROTAS EXISTENTES (SEU CÓDIGO, com pequenas melhorias de segurança/retorno)
// ---------------------------

router.get('/', (req, res) => {
  db.query('SELECT id, nome, email, data_criacao, data_atualizacao FROM usuarios', (err, results) => {
    if (err) return res.status(500).json({ error: err });
    res.json(results);
  });
});

router.get('/:id', (req, res) => {
  const { id } = req.params;
  db.query('SELECT id, nome, email, data_criacao, data_atualizacao FROM usuarios WHERE id = ?', [id], (err, results) => {
    if (err) return res.status(500).json({ error: err });
    if (results.length === 0) return res.status(404).json({ message: 'Usuário não encontrado' });
    res.json(results[0]);
  });
});

router.post('/', async (req, res) => {
  const { nome, email, senha } = req.body;

  // Validação dos campos
  if (!nome || !email || !senha) {
    return res.status(400).json({ 
      error: 'Todos os campos são obrigatórios',
      campos_recebidos: { nome, email, senha: senha ? '***' : undefined }
    });
  }

  try {
    const hash = await bcrypt.hash(senha, 10);

    db.query(
      'INSERT INTO usuarios (nome, email, senha) VALUES (?, ?, ?)',
      [nome, email, hash],
      (err, result) => {
        if (err) {
          console.error('Erro ao inserir usuário:', err);
          
          // Verifica se é erro de email duplicado
          if (err.code === 'ER_DUP_ENTRY') {
            return res.status(400).json({ error: 'Email já cadastrado' });
          }
          
          return res.status(500).json({ 
            error: 'Erro ao salvar usuário',
            detalhes: err.message 
          });
        }
        res.status(201).json({ id: result.insertId, nome, email });
      }
    );
  } catch (err) {
    console.error('Erro no bcrypt:', err);
    res.status(500).json({ error: 'Erro ao processar senha' });
  }
});

router.post('/login', (req, res) => {
  const { email, senha } = req.body;
  console.log('Tentativa de login:', email);

  if (!email || !senha) {
    return res.status(400).json({ message: 'Email e senha são obrigatórios' });
  }

  db.query('SELECT * FROM usuarios WHERE email = ?', [email], async (err, results) => {
    if (err) {
      console.error('Erro DB login:', err);
      return res.status(500).json({ error: 'Erro no banco de dados' });
    }
    if (results.length === 0) return res.status(401).json({ message: 'Usuário não encontrado' });

    const usuario = results[0];

    try {
      const senhaValida = await bcrypt.compare(senha, usuario.senha);
      if (!senhaValida) {
        return res.status(401).json({ message: 'Senha inválida' });
      }

      // Gera token JWT
      const token = jwt.sign(
        { id: usuario.id, email: usuario.email, nome: usuario.nome },
        SECRET_KEY,
        { expiresIn: '1h' }
      );

      res.json({
        token,
        usuario: {
          id: usuario.id,
          nome: usuario.nome,
          email: usuario.email
        }
      });
    } catch (bcryptErr) {
      console.error('Erro ao comparar senha:', bcryptErr);
      return res.status(500).json({ error: 'Erro ao verificar senha' });
    }
  });
});

router.put('/:id', async (req, res) => {
  const { id } = req.params;
  const { nome, email, senha } = req.body;

  // Validação dos campos
  if (!nome || !email || !senha) {
    return res.status(400).json({ error: 'Todos os campos são obrigatórios' });
  }

  try {
    const hash = await bcrypt.hash(senha, 10);

    db.query(
      'UPDATE usuarios SET nome = ?, email = ?, senha = ?, data_atualizacao = CURRENT_TIMESTAMP WHERE id = ?',
      [nome, email, hash, id],
      (err, result) => {
        if (err) {
          console.error('Erro ao atualizar usuário:', err);
          
          if (err.code === 'ER_DUP_ENTRY') {
            return res.status(400).json({ error: 'Email já cadastrado' });
          }
          
          return res.status(500).json({ 
            error: 'Erro ao atualizar usuário',
            detalhes: err.message 
          });
        }
        
        if (result.affectedRows === 0) {
          return res.status(404).json({ message: 'Usuário não encontrado' });
        }
        
        res.json({ message: 'Usuário atualizado com sucesso' });
      }
    );
  } catch (err) {
    console.error('Erro no bcrypt:', err);
    res.status(500).json({ error: 'Erro ao processar senha' });
  }
});

router.delete('/:id', (req, res) => {
  const { id } = req.params;
  db.query('DELETE FROM usuarios WHERE id = ?', [id], (err, result) => {
    if (err) return res.status(500).json({ error: err });
    res.json({ message: 'Usuário deletado com sucesso' });
  });
});

// ---------------------------
// ROTA PROTEGIDA DE EXEMPLO: retorna info do usuário a partir do token
// Use essa rota para validar token vindo do Front (Authorization: Bearer <token>)
// ---------------------------
router.get('/me', verifyToken, (req, res) => {
  // req.user foi preenchido pelo verifyToken
  const { id, email, nome } = req.user;
  // Você pode, se quiser, buscar dados adicionais do banco por id
  res.json({ id, email, nome });
});

// ---------------------------
// ROTA: Recuperar senha (simplificada)
// - Verifica se o email existe;
// - Gera um token de recuperação com exp curto (ex.: 15min);
// - Aqui não enviamos email real: retorna uma mensagem e o token para teste.
// Em produção você envia o link por e-mail (não retornar token na resposta).
// ---------------------------
router.post('/recuperar-senha', (req, res) => {
  const { email } = req.body;
  if (!email) return res.status(400).json({ error: 'Email é obrigatório' });

  db.query('SELECT id, nome, email FROM usuarios WHERE email = ?', [email], (err, results) => {
    if (err) {
      console.error('Erro DB recuperar-senha:', err);
      return res.status(500).json({ error: 'Erro no banco' });
    }
    if (results.length === 0) {
      // Para não vazar se o e-mail existe, retornamos mensagem genérica (boa prática)
      return res.status(200).json({ message: 'Se o e-mail existir, você receberá instruções.' });
    }

    const usuario = results[0];

    // Token curto para reset (em prod use token único salvo no DB ou link com hash)
    const resetToken = jwt.sign(
      { id: usuario.id, email: usuario.email },
      SECRET_KEY,
      { expiresIn: '15m' }
    );

    // AQUI: em produção -> enviar e-mail com link contendo resetToken, por exemplo:
    // https://seusite.com/reset-password?token=<resetToken>
    // Para facilitar testes locais, retornamos uma resposta com mensagem (sem expor token em produção)
    return res.status(200).json({
      message: 'Instruções para recuperação de senha enviadas (simulado).',
      // REMOVA a linha abaixo em produção. Está aqui apenas para facilitar testes locais.
      debug_reset_token: resetToken
    });
  });
});

// ---------------------------
// Exporta router e middleware (caso queira usar verifyToken em outros arquivos sem criar arquivo separado)
// Ex.: const { verifyToken } = require('./routes/usuarios');
// app.use('/progresso', verifyToken, progressoRoutes);
// ---------------------------
module.exports = router;
module.exports.verifyToken = verifyToken;
