const express = require('express');
const router = express.Router();
const produtoService = require('../services/produtoService');

router.get('/', async (req, res) => {
  try {
    const { categoria, pagina, limite } = req.query;

    const resultado = await produtoService.listarProdutos(
      categoria,
      Number(pagina) || 1,
      Number(limite) || 2
    );

    res.json(resultado);
  } catch (error) {
    console.error(error);
    res.status(500).json({ erro: 'Erro ao listar produtos' });
  }
});

module.exports = router;