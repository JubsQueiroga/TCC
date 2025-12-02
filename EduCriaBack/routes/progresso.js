const express = require('express');
const router = express.Router();
const db = require('../db');
const usuarios = require('./usuarios');
const verifyToken = usuarios.verifyToken;
const jwt = require('jsonwebtoken');
const SECRET_KEY = process.env.SECRET_KEY || process.env.JWT_SECRET || 'troque_essa_chave_em_prod';

// 🔹 SALVAR OU ATUALIZAR PROGRESSO
// agora rota protegida opcionalmente: se enviar token, usaremos id do token ao invés de usuario_id enviado
router.post('/salvar', (req, res) => {
  // aceita payloads novos (materia, progresso, pontos, faltas, boletim)
  // e também preserva compatibilidade com payload antigo (tipo, atividade_id, fase, pontuacao)
  const { usuario_id, materia, progresso, pontos, faltas, boletim, tipo, atividade_id, fase, pontuacao } = req.body;

  // se houver token (Authorization header), tentamos extrair o id do payload
  let tokenUserId = null;
  const authHeader = req.headers['authorization'] || req.headers['Authorization'];
  if (authHeader) {
    const parts = authHeader.split(' ');
    if (parts.length === 2 && parts[0] === 'Bearer') {
      const token = parts[1];
      try {
        const decoded = jwt.verify(token, SECRET_KEY);
        if (decoded && decoded.id) tokenUserId = decoded.id;
      } catch (err) {
        // invalid token - ignore and fallback to body usuario_id
      }
    }
  }
  const realUserId = tokenUserId || usuario_id;

  if (!realUserId) {
    return res.status(400).json({ erro: 'usuario_id é obrigatório (ou envie um token válido)' });
  }

  // Se foi enviado 'materia' usamos upsert por (usuario_id, materia)
  if (materia) {
    const findSql = 'SELECT id FROM progresso WHERE usuario_id = ? AND materia = ? LIMIT 1';
    db.query(findSql, [realUserId, materia], (findErr, results) => {
      if (findErr) {
        console.error('Erro DB find progresso:', findErr);
        return res.status(500).json({ erro: 'Erro no banco ao buscar progresso' });
      }

      if (results && results.length > 0) {
        const id = results[0].id;
        const updateSql = `UPDATE progresso SET progresso = ?, pontos = ?, faltas = ?, boletim = ?, data_atualizacao = CURRENT_TIMESTAMP WHERE id = ?`;
        db.query(updateSql, [progresso || 0, pontos || 0, faltas || 0, boletim || null, id], (updErr) => {
          if (updErr) {
            console.error('Erro ao atualizar progresso:', updErr);
            return res.status(500).json({ erro: 'Erro ao atualizar progresso' });
          }
          return res.json({ msg: 'Progresso atualizado com sucesso', id });
        });
      } else {
        const insertSql = `INSERT INTO progresso (usuario_id, materia, progresso, pontos, faltas, boletim) VALUES (?, ?, ?, ?, ?, ?)`;
        db.query(insertSql, [realUserId, materia, progresso || 0, pontos || 0, faltas || 0, boletim || null], (insErr, insRes) => {
          if (insErr) {
            console.error('Erro ao inserir progresso:', insErr);
            return res.status(500).json({ erro: 'Erro ao inserir progresso' });
          }
          return res.json({ msg: 'Progresso registrado com sucesso', id: insRes.insertId });
        });
      }
    });

    return; // já processamos
  }

  // caso contrário, mantém compatibilidade com payloads antigos (tipo, atividade_id...)
  const sql = `
    INSERT INTO progresso (usuario_id, tipo, atividade_id, fase, pontuacao)
    VALUES (?, ?, ?, ?, ?)
  `;

  db.query(sql, [realUserId, tipo, atividade_id, fase, pontuacao], (err) => {
    if (err) {
      console.log('❌ ERRO AO SALVAR PROGRESSO:', err);
      return res.status(500).json({ erro: err });
    }
    res.json({ msg: 'Progresso registrado com sucesso!' });
  });
});

// 🔹 BUSCAR TODO PROGRESSO DO USUÁRIO
router.get('/:usuario_id', (req, res) => {
  const sql = "SELECT * FROM progresso WHERE usuario_id = ?";
  db.query(sql, [req.params.usuario_id], (err, rows) => {
    if (err) {
      console.log("❌ ERRO AO BUSCAR PROGRESSO:", err);
      return res.status(500).json({ erro: err });
    }
    res.json(rows);
  });
});

// ---------------------------
// ROTA PROTEGIDA: retorna resumo do progresso do usuário identificado pelo token
// - devolve progressos por matéria, boletim por matéria, totais de pontos e faltas,
//   e um cálculo simples de desempenho geral
// ---------------------------
router.get('/me', verifyToken, (req, res) => {
  const usuarioId = req.user && req.user.id;
  if (!usuarioId) return res.status(401).json({ erro: 'Usuário inválido no token' });

  const sql = 'SELECT materia, progresso, pontos, faltas, boletim FROM progresso WHERE usuario_id = ?';
  db.query(sql, [usuarioId], (err, rows) => {
    if (err) {
      console.log('❌ ERRO AO BUSCAR PROGRESSO (me):', err);
      return res.status(500).json({ erro: err });
    }

    // Agrupar por matéria
    const materiasMap = {};
    let totalPontos = 0;
    let totalFaltas = 0;
    let somaProgresso = 0;
    let contadorProgresso = 0;

    rows.forEach(r => {
      const m = r.materia || 'Geral';

      if (!materiasMap[m]) {
        materiasMap[m] = { materia: m, registros: [], progressoMedia: 0, pontos: 0, faltas: 0, boletimMedia: 0 };
      }

      materiasMap[m].registros.push(r);

      // Alguns campos podem ser null/undefined -> normalizar
      const p = Number(r.progresso) || 0;
      const pts = Number(r.pontos) || 0;
      const f = Number(r.faltas) || 0;
      const b = Number(r.boletim) || 0;

      materiasMap[m].pontos += pts;
      materiasMap[m].faltas += f;
      materiasMap[m].progressoMedia += p; // somaremos e depois dividiremos por quantidade
      materiasMap[m].boletimMedia += b;

      totalPontos += pts;
      totalFaltas += f;
      somaProgresso += p;
      contadorProgresso += 1;
    });

    // finalize médias por matéria
    const materias = Object.values(materiasMap).map(m => {
      const qtd = m.registros.length || 1;
      return {
        materia: m.materia,
        registros: m.registros,
        progressoMedia: Math.round((m.progressoMedia / qtd) * 100) / 100,
        pontos: m.pontos,
        faltas: m.faltas,
        boletimMedia: Math.round((m.boletimMedia / qtd) * 100) / 100
      };
    });

    const mediaProgressoGeral = contadorProgresso ? Math.round((somaProgresso / contadorProgresso) * 100) / 100 : 0;
    const mediaBoletimGeral = rows.length
      ? Math.round((rows.reduce((s, r) => s + (Number(r.boletim) || 0), 0) / rows.length) * 100) / 100
      : 0;

    // cálculo simples de desempenho (ajustável): 70% progresso + 30% boletim
    const desempenhoGeral = Math.round(((mediaProgressoGeral * 0.7) + (mediaBoletimGeral * 0.3)) * 100) / 100;

    res.json({
      usuario_id: usuarioId,
      materias,
      totais: { pontos: totalPontos, faltas: totalFaltas },
      mediaProgressoGeral,
      mediaBoletimGeral,
      desempenhoGeral,
      raw: rows
    });
  });
});

module.exports = router;
