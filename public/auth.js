const mensagemAuth = document.getElementById('mensagem-auth');
const formLogin = document.getElementById('form-login');
const formCadastro = document.getElementById('form-cadastro');

function mostrarMensagem(texto, tipo = 'erro') {
  mensagemAuth.textContent = texto;
  mensagemAuth.className = `mensagem-auth ${tipo}`;
}

function salvarUsuarioERedirecionar(usuario) {
  localStorage.setItem('usuarioLogado', JSON.stringify(usuario));
  window.location.href = 'index.html';
}

if (formLogin) {
  formLogin.addEventListener('submit', async (event) => {
    event.preventDefault();

    const nome = document.getElementById('loginNome').value.trim();
    const senha = document.getElementById('loginSenha').value.trim();

    const response = await fetch('/usuarios/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ nome, senha })
    });

    const data = await response.json();

    if (!response.ok) {
      mostrarMensagem(data.erro || 'Erro ao fazer login');
      return;
    }

    salvarUsuarioERedirecionar(data.usuario);
  });
}

if (formCadastro) {
  formCadastro.addEventListener('submit', async (event) => {
    event.preventDefault();

    const nome = document.getElementById('cadastroNome').value.trim();
    const senha = document.getElementById('cadastroSenha').value.trim();

    const response = await fetch('/usuarios', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ nome, senha })
    });

    const data = await response.json();

    if (!response.ok) {
      mostrarMensagem(data.erro || 'Erro ao cadastrar usuario');
      return;
    }

    mostrarMensagem('Cadastro realizado com sucesso', 'sucesso');
    salvarUsuarioERedirecionar(data.usuario);
  });
}
