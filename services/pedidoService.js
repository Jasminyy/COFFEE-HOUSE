const pool = require('../db/connection');

async function listarPedidos() {
  const [pedidos] = await pool.query(`
    SELECT 
      pedidos.id,
      pedidos.quantidade,
      produtos.nome,
      produtos.preco,
      produtos.tempo_preparo,
      produtos.emoji,
      produtos.categoria,
      pedidos.data_pedido
    FROM pedidos
    INNER JOIN produtos ON produtos.id = pedidos.produto_id
    ORDER BY pedidos.id DESC
  `);

  return pedidos;
}

async function resumoPedidos() {
  const [resumo] = await pool.query(`
    SELECT 
      COUNT(pedidos.id) AS total_pedidos,
      COALESCE(SUM(produtos.preco * pedidos.quantidade), 0) AS total_valor
    FROM pedidos
    INNER JOIN produtos ON produtos.id = pedidos.produto_id
  `);

  return resumo[0];
}

async function criarPedido(produtoId, quantidade) {
  const [result] = await pool.query(
    `
    INSERT INTO pedidos (produto_id, quantidade)
    VALUES (?, ?)
    `,
    [produtoId, quantidade]
  );

  const [pedido] = await pool.query('SELECT * FROM pedidos WHERE id = ?', [result.insertId]);
  return pedido[0];
}

async function deletarPedido(id) {
  await pool.query('DELETE FROM pedidos WHERE id = ?', [id]);
}

module.exports = {
  listarPedidos,
  resumoPedidos,
  criarPedido,
  deletarPedido
};

