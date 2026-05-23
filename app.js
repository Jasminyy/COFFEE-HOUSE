const express = require('express');
const cors = require('cors');
require('dotenv').config();

const produtosRoutes = require('./routes/produtos');
const pedidosRoutes = require('./routes/pedidos');
const avaliacoesRoutes = require('./routes/avaliacoes');
const usuariosRoutes = require('./routes/usuarios');

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.static('public'));

app.use('/produtos', produtosRoutes);
app.use('/pedidos', pedidosRoutes);
app.use('/avaliacoes', avaliacoesRoutes);
app.use('/usuarios', usuariosRoutes);

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Servidor rodando em http://localhost:${PORT}`);
});