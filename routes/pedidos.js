const express = require('express');
const router = express.Router();
const pedidoService = require('../services/pedidoService.js');

router.get('/', async (req, res) => {
  try {
    const pedidos = await pedidoService.listarPedidos();
    res.json(pedidos);
  } catch (error) {
    console.error(error);
    res.status(500).json({ erro: 'Erro ao listar pedidos' });
  }
});

router.get('/resumo', async (req, res) => {
  try {
    const resumo = await pedidoService.resumoPedidos();
    res.json(resumo);
  } catch (error) {
    console.error(error);
    res.status(500).json({ erro: 'Erro ao buscar resumo dos pedidos' });
  }
});

router.post('/', async (req, res) => {
  try {
    const { produtoId, quantidade } = req.body;

    const pedido = await pedidoService.criarPedido(produtoId, quantidade);
    res.status(201).json(pedido);
  } catch (error) {
    console.error(error);
    res.status(500).json({ erro: 'Erro ao criar pedido' });
  }
});

router.delete('/:id', async (req, res) => {
  try {
    await pedidoService.deletarPedido(req.params.id);
    res.json({ mensagem: 'Pedido removido com sucesso' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ erro: 'Erro ao remover pedido' });
  }
});

module.exports = router;