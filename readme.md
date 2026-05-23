# ☕ CoffeeHouse

Sistema web completo para gerenciamento de pedidos em uma cafeteria, com integração entre front-end, back-end e banco de dados PostgreSQL.

---

## 🚀 Funcionalidades

- 📋 Listagem de produtos por categoria (Café, Lanches, Sobremesas)
- 🛒 Realização de pedidos
- ❌ Remoção de pedidos
- 💬 Avaliação de produtos (comentário + nota)
- 🔐 Sistema de login com nome e senha
- 📊 Resumo de pedidos (quantidade e valor total)
- 📄 Paginação de produtos
- 🎨 Interface moderna com modal e interação dinâmica

---

## 🧱 Tecnologias utilizadas

### Front-end
- HTML5
- CSS3
- JavaScript (DOM e Fetch API)

### Back-end
- Node.js
- Express

### Banco de dados
- PostgreSQL

---

## 📁 Estrutura do Projeto
coffee-house/
├── db/
│ └── connection.js
├── services/
│ ├── produtoService.js
│ ├── pedidoService.js
│ ├── avaliacaoService.js
│ └── usuarioService.js
├── routes/
│ ├── produtos.js
│ ├── pedidos.js
│ ├── avaliacoes.js
│ └── usuarios.js
├── public/
│ ├── index.html
│ ├── style.css
│ ├── script.js
│ ├── Instagram.svg
│ ├── Twitter.svg
│ └── TikTok.svg
├── database.sql
├── app.js
├── package.json
└── .env


---

## ⚙️ Como executar o projeto

### 1. Clone ou baixe o projeto

```bash
git clone <url-do-repositorio>
2. Instale as dependências
npm install
3. Configure o banco de dados

Crie o banco no PostgreSQL:

CREATE DATABASE coffee_house;

Execute o arquivo:

database.sql
4. Configure o .env
PORT=3000

DB_HOST=localhost
DB_PORT=5432
DB_USER=postgres
DB_PASSWORD=123456
DB_DATABASE=coffee_house
5. Execute o projeto
npm run dev

Acesse no navegador:

http://localhost:3000
🔐 Login para teste
Usuário: admin  
Senha: 123456