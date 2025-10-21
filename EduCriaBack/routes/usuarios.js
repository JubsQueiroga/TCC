const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const db = require('../db');
require('dotenv').config();

const SECRET_KEY = process.env.SECRET_KEY; 

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
          console.error('Erro ao inserir usuário:', err); // Log detalhado
          
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
  console.log(email, senha);

  db.query('SELECT * FROM usuarios WHERE email = ?', [email], async (err, results) => {
    if (err) return res.status(500).json({ error: err });
    if (results.length === 0) return res.status(401).json({ message: 'Usuário não encontrado' });

    const usuario = results[0];
    const senhaValida = await bcrypt.compare(senha, usuario.senha);

    if (!senhaValida) {
      return res.status(401).json({ message: 'Senha inválida' });
    }

    // Gera token JWT
    const token = jwt.sign(
      { id: usuario.id, email: usuario.email },
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

module.exports = router;