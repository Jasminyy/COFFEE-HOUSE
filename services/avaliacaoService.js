const pool = require('../db/connection');

async function criarAvaliacao(produtoId, nota, comentario) {
  const [result] = await pool.query(
    `
    INSERT INTO avaliacoes (produto_id, nota, comentario)
    VALUES (?, ?, ?)
    `,
    [produtoId, nota, comentario]
  );

  const [avaliacao] = await pool.query('SELECT * FROM avaliacoes WHERE id = ?', [result.insertId]);
  return avaliacao[0];
}

module.exports = {
  criarAvaliacao
};
