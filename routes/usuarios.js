const express = require('express');
const router = express.Router();
const usuarioService = require('../services/usuarioService');

router.post('/', async (req, res) => {
  try {
    const { nome, senha } = req.body;

    if (!nome || !senha) {
      return res.status(400).json({ erro: 'Nome e senha sao obrigatorios' });
    }

    if (senha.length < 4) {
      return res.status(400).json({ erro: 'A senha precisa ter pelo menos 4 caracteres' });
    }

    const usuario = await usuarioService.cadastrar(nome, senha);

    res.status(201).json({
      mensagem: 'Usuario cadastrado com sucesso',
      usuario
    });
  } catch (error) {
    if (error.code === 'ER_DUP_ENTRY') {
      return res.status(409).json({ erro: 'Esse nome de usuario ja existe' });
    }

    console.error(error);
    res.status(500).json({ erro: 'Erro ao cadastrar usuario' });
  }
});

router.post('/login', async (req, res) => {
  try {
    const { nome, senha } = req.body;

    if (!nome || !senha) {
      return res.status(400).json({ erro: 'Nome e senha sao obrigatorios' });
    }

    const usuario = await usuarioService.login(nome, senha);

    if (!usuario) {
      return res.status(401).json({ erro: 'Nome ou senha invalidos' });
    }

    res.json({
      mensagem: 'Login realizado com sucesso',
      usuario
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ erro: 'Erro ao realizar login' });
  }
});

module.exports = router;
