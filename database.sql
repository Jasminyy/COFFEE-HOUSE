CREATE DATABASE IF NOT EXISTS coffee_house;

USE coffee_house;

CREATE TABLE IF NOT EXISTS produtos (
    id INT AUTO_INCREMENT PRIMARY KEY,
    nome VARCHAR(100) NOT NULL,
    categoria VARCHAR(50) NOT NULL,
    preco DECIMAL(10,2) NOT NULL,
    tempo_preparo INT NOT NULL,
    emoji VARCHAR(10) NOT NULL
);

CREATE TABLE IF NOT EXISTS pedidos (
    id INT AUTO_INCREMENT PRIMARY KEY,
    produto_id INT NOT NULL,
    quantidade INT NOT NULL DEFAULT 1,
    data_pedido TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT fk_pedidos_produtos
        FOREIGN KEY (produto_id) REFERENCES produtos(id)
        ON DELETE CASCADE
);

CREATE TABLE IF NOT EXISTS avaliacoes (
    id INT AUTO_INCREMENT PRIMARY KEY,
    produto_id INT NOT NULL,
    nota INT NOT NULL,
    comentario TEXT,
    data_avaliacao TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT chk_avaliacoes_nota CHECK (nota BETWEEN 1 AND 5),
    CONSTRAINT fk_avaliacoes_produtos
        FOREIGN KEY (produto_id) REFERENCES produtos(id)
        ON DELETE CASCADE
);

CREATE TABLE IF NOT EXISTS usuarios (
    id INT AUTO_INCREMENT PRIMARY KEY,
    nome VARCHAR(100) NOT NULL UNIQUE,
    senha VARCHAR(100) NOT NULL
);

INSERT INTO produtos (id, nome, categoria, preco, tempo_preparo, emoji) VALUES
(1, 'Cappuccino', 'cafe', 12.00, 5, '☕'),
(2, 'Cafe Expresso', 'cafe', 8.00, 3, '☕'),
(3, 'Mocha', 'cafe', 15.00, 6, '☕'),
(4, 'Croissant', 'lanches', 14.00, 4, '🥐'),
(5, 'Pao de Queijo', 'lanches', 9.00, 3, '🥐'),
(6, 'Sanduiche Natural', 'lanches', 18.00, 7, '🥐'),
(7, 'Bolo de Chocolate', 'sobremesas', 10.00, 3, '🍰'),
(8, 'Cheesecake', 'sobremesas', 16.00, 4, '🍰'),
(9, 'Brownie', 'sobremesas', 11.00, 3, '🍰')
ON DUPLICATE KEY UPDATE
    nome = VALUES(nome),
    categoria = VALUES(categoria),
    preco = VALUES(preco),
    tempo_preparo = VALUES(tempo_preparo),
    emoji = VALUES(emoji);

INSERT INTO pedidos (id, produto_id, quantidade) VALUES
(1, 1, 1),
(2, 4, 1),
(3, 7, 1)
ON DUPLICATE KEY UPDATE
    produto_id = VALUES(produto_id),
    quantidade = VALUES(quantidade);

INSERT INTO usuarios (nome, senha) VALUES
('admin', '123456')
ON DUPLICATE KEY UPDATE
    senha = VALUES(senha);
