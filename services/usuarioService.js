const pool = require('../db/connection');

async function login(nome, senha) {
  const [usuarios] = await pool.query(
    `
    SELECT id, nome
    FROM usuarios
    WHERE nome = ? AND senha = ?
    `,
    [nome, senha]
  );

  return usuarios[0];
}

async function cadastrar(nome, senha) {
  const [result] = await pool.query(
    `
    INSERT INTO usuarios (nome, senha)
    VALUES (?, ?)
    `,
    [nome, senha]
  );

  const [usuarios] = await pool.query(
    `
    SELECT id, nome
    FROM usuarios
    WHERE id = ?
    `,
    [result.insertId]
  );

  return usuarios[0];
}

module.exports = {
  login,
  cadastrar
};
