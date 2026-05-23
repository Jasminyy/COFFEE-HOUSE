const express = require('express');
const router = express.Router();
const avaliacaoService = require('../services/avaliacaoService');

router.post('/', async (req, res) => {
  try {
    const { produtoId, nota, comentario } = req.body;

    if (!produtoId || !nota) {
      return res.status(400).json({ erro: 'Produto e nota são obrigatórios' });
    }

    const avaliacao = await avaliacaoService.criarAvaliacao(produtoId, nota, comentario);
    res.status(201).json(avaliacao);
  } catch (error) {
    res.status(500).json({ erro: 'Erro ao avaliar produto' });
  }
});

module.exports = router;