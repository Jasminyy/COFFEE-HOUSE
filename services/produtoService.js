const pool = require('../db/connection');

async function listarProdutos(categoria, pagina = 1, limite = 2) {
  const offset = (pagina - 1) * limite;

  let query = 'SELECT * FROM produtos';
  let countQuery = 'SELECT COUNT(*) FROM produtos';
  const params = [];

  if (categoria) {
    query += ' WHERE categoria = ?';
    countQuery += ' WHERE categoria = ?';
    params.push(categoria);
  }

  query += ' ORDER BY id LIMIT ? OFFSET ?';

  const [produtos] = await pool.query(query, [...params, limite, offset]);
  const [total] = await pool.query(countQuery, params);

  return {
    produtos,
    total: Number(total[0]['COUNT(*)']),
    pagina,
    limite
  };
}

module.exports = {
  listarProdutos
};
