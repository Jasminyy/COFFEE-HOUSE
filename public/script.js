let categoriaAtual = 'cafe';
let paginaAtual = 1;
const limite = 2;

let usuarioLogado = JSON.parse(localStorage.getItem('usuarioLogado')) || null;

function abrirLogin() {
  document.getElementById('modal-login').style.display = 'flex';
}

function fecharLogin() {
  document.getElementById('modal-login').style.display = 'none';
}

function verificarLogin() {
  const usuarioTexto = document.getElementById('usuario-logado');
  const acoesUsuario = document.getElementById('acoes-usuario');

  if (usuarioLogado) {
    usuarioTexto.textContent = `Ola, ${usuarioLogado.nome}`;
    acoesUsuario.innerHTML = '<button onclick="logout()" class="btn-sair">Sair</button>';
    return;
  }

  usuarioTexto.textContent = 'Visitante';
  acoesUsuario.innerHTML = `
    <a class="btn-auth" href="login.html">Entrar</a>
    <a class="btn-auth btn-auth-secundario" href="cadastro.html">Cadastrar</a>
  `;
}

function exigirLogin() {
  if (usuarioLogado) {
    return true;
  }

  alert('Voce precisa fazer login para continuar.');
  window.location.href = 'login.html';
  return false;
}

function logout() {
  usuarioLogado = null;
  localStorage.removeItem('usuarioLogado');
  verificarLogin();
}

async function carregarProdutos() {
  const response = await fetch(
    `/produtos?categoria=${categoriaAtual}&pagina=${paginaAtual}&limite=${limite}`
  );

  const data = await response.json();

  const container = document.getElementById('produtos');
  container.innerHTML = '';

  data.produtos.forEach(produto => {
    const card = document.createElement('div');
    card.className = 'produto-card';

    card.innerHTML = `
      <h2>${produto.emoji} ${produto.nome}</h2>

      <p>
        Quantidade: 1 |
        Tempo: ${produto.tempo_preparo} min |
        Preco: R$ ${Number(produto.preco).toFixed(2)}
      </p>

      <button onclick="favoritarProduto('${produto.nome}')">Favoritar</button>
      <button onclick="mostrarComentario(${produto.id})">Avaliar</button>
      <button onclick="adicionarPedido(${produto.id})">Pedir</button>

      <div class="input-comentario" id="comentarios-${produto.id}" style="display:none">
        <input
          id="input-${produto.id}"
          type="text"
          placeholder="Deixe sua avaliacao..."
        />

        <select id="nota-${produto.id}">
          <option value="5">5 estrelas</option>
          <option value="4">4 estrelas</option>
          <option value="3">3 estrelas</option>
          <option value="2">2 estrelas</option>
          <option value="1">1 estrela</option>
        </select>

        <button onclick="enviarAvaliacao(${produto.id})">Enviar</button>
      </div>
    `;

    container.appendChild(card);
  });
}

async function carregarResumo() {
  const response = await fetch('/pedidos/resumo');
  const resumo = await response.json();

  document.getElementById('totalPedidos').textContent = resumo.total_pedidos;
  document.getElementById('totalValor').textContent = Number(resumo.total_valor).toFixed(2);
}

async function carregarPedidos() {
  const response = await fetch('/pedidos');
  const pedidos = await response.json();

  const container = document.getElementById('lista-pedidos');
  container.innerHTML = '';

  pedidos.forEach(p => {
    const item = document.createElement('div');
    item.className = 'pedido-item';

    item.innerHTML = `
      <p>
        ${p.emoji} ${p.nome} - R$ ${Number(p.preco).toFixed(2)}
      </p>

      <button onclick="removerPedido(${p.id})">Remover</button>
    `;

    container.appendChild(item);
  });
}

function trocarCategoria(categoria) {
  categoriaAtual = categoria;
  paginaAtual = 1;
  carregarProdutos();
}

function irParaPagina(pagina) {
  paginaAtual = pagina;
  carregarProdutos();
}

function paginaAnterior() {
  if (paginaAtual > 1) {
    paginaAtual--;
    carregarProdutos();
  }
}

function proximaPagina() {
  paginaAtual++;
  carregarProdutos();
}

function favoritarProduto(nome) {
  if (!exigirLogin()) {
    return;
  }

  alert(`${nome} foi favoritado!`);
}

function mostrarComentario(produtoId) {
  if (!exigirLogin()) {
    return;
  }

  const el = document.getElementById(`comentarios-${produtoId}`);

  if (el.style.display === 'none') {
    el.style.display = 'flex';
  } else {
    el.style.display = 'none';
  }
}

async function enviarAvaliacao(produtoId) {
  if (!exigirLogin()) {
    return;
  }

  const input = document.getElementById(`input-${produtoId}`);
  const selectNota = document.getElementById(`nota-${produtoId}`);

  const comentario = input.value;
  const nota = Number(selectNota.value);

  if (!comentario.trim()) {
    alert('Digite uma avaliacao!');
    return;
  }

  await fetch('/avaliacoes', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      produtoId,
      nota,
      comentario
    })
  });

  input.value = '';
  selectNota.value = '5';

  document.getElementById(`comentarios-${produtoId}`).style.display = 'none';

  alert('Avaliacao enviada com sucesso!');
}

async function adicionarPedido(produtoId) {
  if (!exigirLogin()) {
    return;
  }

  await fetch('/pedidos', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      produtoId,
      quantidade: 1
    })
  });

  await carregarResumo();
  await carregarPedidos();

  alert('Pedido adicionado!');
}

async function removerPedido(id) {
  if (!exigirLogin()) {
    return;
  }

  await fetch(`/pedidos/${id}`, {
    method: 'DELETE'
  });

  await carregarPedidos();
  await carregarResumo();

  alert('Pedido removido!');
}

carregarProdutos();
carregarResumo();
carregarPedidos();
verificarLogin();
