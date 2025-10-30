// ===== CONFIGURAÇÃO DA API =====
const API_BASE_URL = 'http://localhost:8080';

// Headers padrão para requisições
const headers = {
    'Content-Type': 'application/json',
    'Access-Control-Allow-Origin': '*'
};

// ===== FUNÇÕES DE API =====

// LOGIN
const login = async (username, password) => {
    try {
        console.log('Tentando login com:', { username, password });
        
        const response = await fetch(`${API_BASE_URL}/v1/login`, {
            method: 'POST',
            headers,
            body: JSON.stringify({ username, password })
        });
        
        console.log('Status da resposta:', response.status);
        
        const result = await response.json();
        console.log('Resposta completa:', result);
        
        return result;
    } catch (error) {
        console.error('Erro no login:', error);
        return { status: 500, message: 'Erro de conexão' };
    }
};

// LIVROS
const getLivros = async () => {
    try {
        const response = await fetch(`${API_BASE_URL}/v1/livros`);
        return await response.json();
    } catch (error) {
        console.error('Erro ao buscar livros:', error);
        return { status: 500, message: 'Erro de conexão' };
    }
};

const createLivro = async (livro) => {
    try {
        const response = await fetch(`${API_BASE_URL}/v1/livro`, {
            method: 'POST',
            headers,
            body: JSON.stringify(livro)
        });
        return await response.json();
    } catch (error) {
        console.error('Erro ao criar livro:', error);
        return { status: 500, message: 'Erro de conexão' };
    }
};

const deleteLivro = async (id) => {
    try {
        const response = await fetch(`${API_BASE_URL}/v1/livro/${id}`, {
            method: 'DELETE'
        });
        return await response.json();
    } catch (error) {
        console.error('Erro ao excluir livro:', error);
        return { status: 500, message: 'Erro de conexão' };
    }
};

// ESTOQUE
const getLivrosEstoque = async () => {
    try {
        const response = await fetch(`${API_BASE_URL}/v1/livros-estoque`);
        return await response.json();
    } catch (error) {
        console.error('Erro ao buscar livros do estoque:', error);
        return { status: 500, message: 'Erro de conexão' };
    }
};

const updateEstoque = async (id, quantidade) => {
    try {
        const response = await fetch(`${API_BASE_URL}/v1/estoque/${id}`, {
            method: 'PUT',
            headers,
            body: JSON.stringify({ quantidade })
        });
        return await response.json();
    } catch (error) {
        console.error('Erro ao atualizar estoque:', error);
        return { status: 500, message: 'Erro de conexão' };
    }
};

// ===== FUNÇÕES AUXILIARES =====

// Função para mostrar mensagens de sucesso/erro
const showMessage = (message, isError = false) => {
    const messageDiv = document.createElement('div');
    messageDiv.textContent = message;
    messageDiv.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        padding: 15px 20px;
        border-radius: 5px;
        color: white;
        font-weight: bold;
        z-index: 1000;
        background-color: ${isError ? '#dc3545' : '#28a745'};
    `;
    
    document.body.appendChild(messageDiv);
    
    setTimeout(() => {
        if (document.body.contains(messageDiv)) {
            document.body.removeChild(messageDiv);
        }
    }, 3000);
};

// Função para validar campos obrigatórios
const validateRequired = (fields) => {
    for (const [key, value] of Object.entries(fields)) {
        if (!value || value.trim() === '') {
            showMessage(`Campo ${key} é obrigatório`, true);
            return false;
        }
    }
    return true;
};

// ===== COMPONENTES DA APLICAÇÃO =====

const root = document.getElementById("root");
// Tela de Login
function createLoginScreen() {
  const container = document.createElement("div");
  container.classList.add("containerPrincipal");

  // container da imagem
  const imgContainer = document.createElement("div");
  imgContainer.classList.add("containerImg");
  const img = document.createElement("img");
  img.src = "./img/carrinho.png";
  img.alt = "carrinhoLogin";
  imgContainer.appendChild(img);

  // container dos inputs
  const inputsContainer = document.createElement("div");
  inputsContainer.classList.add("containerInputs");

  const usernameContainer = document.createElement("div");
  usernameContainer.classList.add("inputContainer");
  const userIcon = document.createElement("img");
  userIcon.src = "./img/user.png";
  userIcon.classList.add("iconInput");
  const usernameInput = document.createElement("input");
  usernameInput.classList.add("inputss");
  usernameInput.placeholder = "USERNAME";
  usernameContainer.appendChild(userIcon);
  usernameContainer.appendChild(usernameInput);

  const passwordContainer = document.createElement("div");
  passwordContainer.classList.add("inputContainer");
  const lockIcon = document.createElement("img");
  lockIcon.src = "./img/lock.png";
  lockIcon.classList.add("iconInput");
  const passwordInput = document.createElement("input");
  passwordInput.type = "password";
  passwordInput.classList.add("inputss");
  passwordInput.placeholder = "PASSWORD";
  passwordContainer.appendChild(lockIcon);
  passwordContainer.appendChild(passwordInput);

  inputsContainer.appendChild(usernameContainer);
  inputsContainer.appendChild(passwordContainer);

  // botão de login
  const buttonContainer = document.createElement("div");
  buttonContainer.classList.add("containerButton");
  const loginButton = document.createElement("button");
  loginButton.classList.add("loginButton");
  loginButton.textContent = "LOGIN";

  const forgotPassword = document.createElement("div");
  forgotPassword.classList.add("forgotPassword");
  const forgotText = document.createElement("p");
  forgotText.textContent = "Forgot password?";
  forgotPassword.appendChild(forgotText);

  buttonContainer.appendChild(loginButton);
  buttonContainer.appendChild(forgotPassword);

  // adiciona tudo ao container principal
  container.appendChild(imgContainer);
  container.appendChild(inputsContainer);
  container.appendChild(buttonContainer);

  // evento do botão → integração com API
  loginButton.addEventListener("click", async () => {
    const username = usernameInput.value;
    const password = passwordInput.value;
    
    // Validação de campos obrigatórios
    if (!validateRequired({ username, password })) {
      return;
    }
    
    // Desabilita o botão durante o login
    loginButton.disabled = true;
    loginButton.textContent = "CARREGANDO...";
    
    try {
      const result = await login(username, password);
      
      // Verifica se o login foi bem-sucedido
      if (result.status === 200 || (result.usuario && result.usuario.id)) {
        showMessage(result.message || "Login realizado com sucesso!");
        // Salva dados do usuário (opcional)
        if (result.usuario) {
          localStorage.setItem('user', JSON.stringify(result.usuario));
        }
        renderScreen("home");
      } else {
        showMessage(result.message || "Usuário ou senha incorretos", true);
        console.error('Login falhou:', result);
      }
    } catch (error) {
      showMessage("Erro de conexão com o servidor", true);
    } finally {
      // Reabilita o botão
      loginButton.disabled = false;
      loginButton.textContent = "LOGIN";
    }
  });

  return container;
}

// Tela Home
function createHomeScreen() {
    const container = document.createElement("div");
    container.classList.add("homeContainer");
  
    // ===== HEADER BRANCO =====
    const header = document.createElement("header");
    header.classList.add("headerWhite");
  
    const logoGroup = document.createElement("div");
    logoGroup.classList.add("logoGroup");
  
    const logoImg = document.createElement("img");
    logoImg.src = "./img/lion-book 1.png"; // coloque o caminho correto da sua logo
    logoImg.alt = "LionBook Logo";
  
    const logoText = document.createElement("h1");
    logoText.textContent = "LionBook";
    logoText.classList.add("logoTitle");
  
    logoGroup.appendChild(logoImg);
    logoGroup.appendChild(logoText);
    header.appendChild(logoGroup);
  
    // ===== CONTEÚDO PRINCIPAL =====
    const main = document.createElement("main");
    main.classList.add("mainSection");
  
    const nav = document.createElement("nav");
    nav.classList.add("navButtons");
  
    const btnNovo = document.createElement("button");
    btnNovo.textContent = "NOVO LIVRO";
    btnNovo.classList.add("navBtn");
  
    const btnEstoque = document.createElement("button");
    btnEstoque.textContent = "ESTOQUE";
    btnEstoque.classList.add("navBtn");

    // Adicione os event listeners aqui, dentro da função
    btnNovo.addEventListener("click", () => renderScreen("novoLivro"));
    btnEstoque.addEventListener("click", () => renderScreen("estoque"));
  
    nav.appendChild(btnNovo);
    nav.appendChild(btnEstoque);
  
    // ===== TABELA =====
    const tableContainer = document.createElement("div");
    tableContainer.classList.add("tableContainer");
  
    const table = document.createElement("table");
    table.classList.add("table");
  
    const thead = document.createElement("thead");
    const headRow = document.createElement("tr");
  
    const thId = document.createElement("th");
    thId.textContent = "ID";
    const thTitle = document.createElement("th");
    thTitle.textContent = "TÍTULO";
    const thAction = document.createElement("th");
    thAction.textContent = "AÇÃO";
  
    headRow.appendChild(thId);
    headRow.appendChild(thTitle);
    headRow.appendChild(thAction);
    thead.appendChild(headRow);
  
    const tbody = document.createElement("tbody");
  
    // Função para carregar livros da API
    const loadLivros = async () => {
      try {
        const result = await getLivros();
        
        if (result.status === 200 && result.livros) {
          tbody.innerHTML = ''; // Limpa a tabela
          
          if (result.livros.length === 0) {
            const emptyRow = document.createElement("tr");
            const emptyCell = document.createElement("td");
            emptyCell.colSpan = 3;
            emptyCell.textContent = "Nenhum livro encontrado";
            emptyCell.style.textAlign = "center";
            emptyRow.appendChild(emptyCell);
            tbody.appendChild(emptyRow);
            return;
          }
          
          result.livros.forEach((livro) => {
            createLivroRow(livro);
          });
        } else {
          showMessage(result.message || "Erro ao carregar livros", true);
        }
      } catch (error) {
        showMessage("Erro de conexão ao carregar livros", true);
      }
    };
    
    // Função para criar linha da tabela
    const createLivroRow = (livro) => {
      const row = document.createElement("tr");
  
      const tdId = document.createElement("td");
      tdId.textContent = livro.id;
  
      const tdTitle = document.createElement("td");
      tdTitle.textContent = livro.titulo;
  
      const tdAction = document.createElement("td");
      tdAction.classList.add("acoes");
  
      const btnEdit = document.createElement("button");
      btnEdit.classList.add("btnIcon", "edit");

      
      const imgEdit = document.createElement("img");
      imgEdit.src = "/img/editar.png";  
      imgEdit.alt = "Editar";
      imgEdit.style.width = "20px";  
      imgEdit.style.height = "20px";
      btnEdit.appendChild(imgEdit);

      btnEdit.addEventListener("click", () => {
        // TODO: Implementar edição
        alert(`Editar ${livro.titulo}`);
      });

      const btnDelete = document.createElement("button");
      btnDelete.classList.add("btnIcon", "delete");

      
      const imgDelete = document.createElement("img");
      imgDelete.src = "./img/lixeira.png";  
      imgDelete.alt = "Excluir";
      imgDelete.style.width = "20px";
      imgDelete.style.height = "20px";
      btnDelete.appendChild(imgDelete);

      btnDelete.addEventListener("click", async () => {
        if (confirm(`Deseja realmente excluir o livro "${livro.titulo}"?`)) {
          try {
            const result = await deleteLivro(livro.id);
            
            if (result.status === 200) {
              showMessage("Livro excluído com sucesso!");
              loadLivros(); // Recarrega a lista
            } else {
              showMessage(result.message || "Erro ao excluir livro", true);
            }
          } catch (error) {
            showMessage("Erro de conexão ao excluir livro", true);
          }
        }
      });

      tdAction.appendChild(btnEdit);
      tdAction.appendChild(btnDelete);

  
      row.appendChild(tdId);
      row.appendChild(tdTitle);
      row.appendChild(tdAction);
      tbody.appendChild(row);
    };
    
    // Carrega os livros ao criar a tela
    loadLivros();
  
    table.appendChild(thead);
    table.appendChild(tbody);
    tableContainer.appendChild(table);
  
    main.appendChild(nav);
    main.appendChild(tableContainer);
  
    container.appendChild(header);
    container.appendChild(main);
  
    return container;
}

// Add these new functions after createHomeScreen()


function createNovoLivroScreen() {
    const container = document.createElement("div");
    container.classList.add("homeContainer");
  
    // Header (reusing the same header from home)
    const header = document.createElement("header");
    header.classList.add("headerWhite");
  
    const logoGroup = document.createElement("div");
    logoGroup.classList.add("logoGroup");
  
    const logoImg = document.createElement("img");
    logoImg.src = "./img/lion-book 1.png";
    logoImg.alt = "LionBook Logo";
  
    const logoText = document.createElement("h1");
    logoText.textContent = "LionBook - CADASTRO";
    logoText.classList.add("logoTitle");
  
    logoGroup.appendChild(logoImg);
    logoGroup.appendChild(logoText);
    header.appendChild(logoGroup);
  
    // Main content
    const main = document.createElement("main");
    main.classList.add("mainSection", "cadastroSection");
  
    const form = document.createElement("form");
    form.classList.add("cadastroForm");
  
    // Input TÍTULO
    const inputTitulo = document.createElement("input");
    inputTitulo.type = "text";
    inputTitulo.placeholder = "TÍTULO";
    inputTitulo.name = "titulo";
    inputTitulo.classList.add("cadastroInput");
    form.appendChild(inputTitulo);
    
    // Dropdown CATEGORIA
    const selectCategoria = document.createElement("select");
    selectCategoria.name = "categoria";
    selectCategoria.classList.add("cadastroInput", "selectInput");
    const optionCategoria = document.createElement("option");
    optionCategoria.value = "";
    optionCategoria.textContent = "CATEGORIA";
    optionCategoria.disabled = true;
    optionCategoria.selected = true;
    selectCategoria.appendChild(optionCategoria);
    form.appendChild(selectCategoria);
    
    // Carrega categorias no dropdown
    const loadCategorias = async () => {
      try {
        const result = await getCategorias();
        
        if (result.status === 200 && result.categorias) {
          result.categorias.forEach(categoria => {
            const option = document.createElement("option");
            option.value = categoria.id;
            option.textContent = categoria.nome;
            selectCategoria.appendChild(option);
          });
        }
      } catch (error) {
        console.error('Erro ao carregar categorias:', error);
      }
    };
    
    loadCategorias();
    
    // Input QUANTIDADE
    const inputQuantidade = document.createElement("input");
    inputQuantidade.type = "number";
    inputQuantidade.placeholder = "QUANTIDADE";
    inputQuantidade.name = "quantidade";
    inputQuantidade.classList.add("cadastroInput");
    form.appendChild(inputQuantidade);
    
    // Input ISBN
    const inputIsbn = document.createElement("input");
    inputIsbn.type = "text";
    inputIsbn.placeholder = "ISBN";
    inputIsbn.name = "isbn";
    inputIsbn.classList.add("cadastroInput");
    form.appendChild(inputIsbn);
    
    // Input ANO DE PUBLICAÇÃO
    const inputAnoPublicacao = document.createElement("input");
    inputAnoPublicacao.type = "number";
    inputAnoPublicacao.placeholder = "ANO DE PUBLICAÇÃO";
    inputAnoPublicacao.name = "ano_publicacao";
    inputAnoPublicacao.classList.add("cadastroInput");
    form.appendChild(inputAnoPublicacao);
  
    // Buttons
    const buttonGroup = document.createElement("div");
    buttonGroup.classList.add("cadastroBtnGroup");
  
    const cadastrarBtn = document.createElement("button");
    cadastrarBtn.textContent = "CADASTRAR";
    cadastrarBtn.classList.add("cadastroBtn");
    cadastrarBtn.type = "button";
    
    const cancelarBtn = document.createElement("button");
    cancelarBtn.textContent = "CANCELAR";
    cancelarBtn.classList.add("cadastroBtn", "btnCancelar");
    cancelarBtn.type = "button";
    
    // Event listeners
    cadastrarBtn.addEventListener("click", async () => {
      const titulo = inputTitulo.value;
      const categoria_id = selectCategoria.value;
      const quantidade = inputQuantidade.value;
      const isbn = inputIsbn.value;
      const ano_publicacao = inputAnoPublicacao.value;
      
      // Validação - apenas título é obrigatório
      if (!validateRequired({ titulo })) {
        return;
      }
      
      // Desabilita o botão durante o cadastro
      cadastrarBtn.disabled = true;
      cadastrarBtn.textContent = "CADASTRANDO...";
      
      try {
        const livroData = {
          titulo,
          ...(categoria_id && { categoria_id: parseInt(categoria_id) }),
          ...(quantidade && { quantidade: parseInt(quantidade) }),
          ...(isbn && { isbn }),
          ...(ano_publicacao && { ano_publicacao: parseInt(ano_publicacao) })
        };
        
        const result = await createLivro(livroData);
        
        if (result.status === 200 || result.status === 201) {
          showMessage("Livro cadastrado com sucesso!");
          // Limpa o formulário
          inputTitulo.value = '';
          selectCategoria.selectedIndex = 0;
          inputQuantidade.value = '';
          inputIsbn.value = '';
          inputAnoPublicacao.value = '';
        } else {
          showMessage(result.message || "Erro ao cadastrar livro", true);
        }
      } catch (error) {
        showMessage("Erro de conexão ao cadastrar livro", true);
      } finally {
        // Reabilita o botão
        cadastrarBtn.disabled = false;
        cadastrarBtn.textContent = "CADASTRAR";
      }
    });
    
    cancelarBtn.addEventListener("click", () => {
      renderScreen("home");
    });
  
    buttonGroup.appendChild(cadastrarBtn);
    buttonGroup.appendChild(cancelarBtn);
    form.appendChild(buttonGroup);
  
    main.appendChild(form);
    container.appendChild(header);
    container.appendChild(main);
  
    return container;
}

function createEstoqueScreen() {
    const container = document.createElement("div");
    container.classList.add("homeContainer");
  
    // Header
    const header = document.createElement("header");
    header.classList.add("headerWhite");
  
    const logoGroup = document.createElement("div");
    logoGroup.classList.add("logoGroup");
  
    const logoImg = document.createElement("img");
    logoImg.src = "./img/lion-book 1.png";
    logoImg.alt = "LionBook Logo";
  
    const logoText = document.createElement("h1");
    logoText.textContent = "LionBook - ESTOQUE";
    logoText.classList.add("logoTitle");
  
    logoGroup.appendChild(logoImg);
    logoGroup.appendChild(logoText);
    header.appendChild(logoGroup);
  
    // Main content
    const main = document.createElement("main");
    main.classList.add("mainSection", "cadastroSection");
  
    const form = document.createElement("form");
    form.classList.add("cadastroForm");
  
    // Dropdown TÍTULO
    const selectTitulo = document.createElement("select");
    selectTitulo.name = "titulo";
    selectTitulo.classList.add("cadastroInput", "selectInput");
    const optionTitulo = document.createElement("option");
    optionTitulo.value = "";
    optionTitulo.textContent = "TÍTULO";
    optionTitulo.disabled = true;
    optionTitulo.selected = true;
    selectTitulo.appendChild(optionTitulo);
    form.appendChild(selectTitulo);
    
    // Carrega livros no dropdown
    const loadLivrosDropdown = async () => {
      try {
        const result = await getLivrosEstoque();
        
        if (result.status === 200 && result.livros) {
          result.livros.forEach(livro => {
            const option = document.createElement("option");
            option.value = livro.id;
            option.textContent = livro.titulo;
            selectTitulo.appendChild(option);
          });
        }
      } catch (error) {
        console.error('Erro ao carregar livros:', error);
      }
    };
    
    loadLivrosDropdown();
  
    // Dropdown TIPO DE MOVIMENTO
    const selectTipo = document.createElement("select");
    selectTipo.name = "tipoMovimento";
    selectTipo.classList.add("cadastroInput", "selectInput");
    const optionTipo = document.createElement("option");
    optionTipo.value = "";
    optionTipo.textContent = "TIPO DE MOVIMENTO";
    optionTipo.disabled = true;
    optionTipo.selected = true;
    selectTipo.appendChild(optionTipo);
    
    // Adiciona opções de movimento
    const tiposMovimento = [
      { value: "entrada", text: "ENTRADA" },
      { value: "saida", text: "SAÍDA" }
    ];
    
    tiposMovimento.forEach(tipo => {
      const option = document.createElement("option");
      option.value = tipo.value;
      option.textContent = tipo.text;
      selectTipo.appendChild(option);
    });
    
    form.appendChild(selectTipo);
  
    // Input QUANTIDADE
    const inputQuantidade = document.createElement("input");
    inputQuantidade.type = "number";
    inputQuantidade.placeholder = "QUANTIDADE";
    inputQuantidade.name = "quantidade";
    inputQuantidade.classList.add("cadastroInput");
    form.appendChild(inputQuantidade);
  
    // Buttons
    const buttonGroup = document.createElement("div");
    buttonGroup.classList.add("cadastroBtnGroup");
  
    const salvarBtn = document.createElement("button");
    salvarBtn.textContent = "SALVAR";
    salvarBtn.classList.add("cadastroBtn");
    salvarBtn.type = "button";
    
    const cancelarBtn = document.createElement("button");
    cancelarBtn.textContent = "CANCELAR";
    cancelarBtn.classList.add("cadastroBtn", "btnCancelar");
    cancelarBtn.type = "button";
    
    // Event listeners
    salvarBtn.addEventListener("click", async () => {
      const livroId = selectTitulo.value;
      const tipoMovimento = selectTipo.value;
      const quantidade = inputQuantidade.value;
      
      // Validação de campos obrigatórios
      if (!validateRequired({ 
        'Título': livroId, 
        'Tipo de Movimento': tipoMovimento, 
        'Quantidade': quantidade 
      })) {
        return;
      }
      
      // Desabilita o botão durante o salvamento
      salvarBtn.disabled = true;
      salvarBtn.textContent = "SALVANDO...";
      
      try {
        // Para simplificar, vamos assumir que a API de estoque recebe a quantidade final
        // Em uma implementação real, você pode precisar buscar a quantidade atual primeiro
        const quantidadeNum = parseInt(quantidade);
        
        const result = await updateEstoque(livroId, quantidadeNum);
        
        if (result.status === 200) {
          showMessage(`Estoque atualizado com sucesso!`);
          // Limpa o formulário
          selectTitulo.selectedIndex = 0;
          selectTipo.selectedIndex = 0;
          inputQuantidade.value = '';
        } else {
          showMessage(result.message || "Erro ao atualizar estoque", true);
        }
      } catch (error) {
        showMessage("Erro de conexão ao atualizar estoque", true);
      } finally {
        // Reabilita o botão
        salvarBtn.disabled = false;
        salvarBtn.textContent = "SALVAR";
      }
    });
    
    cancelarBtn.addEventListener("click", () => {
      renderScreen("home");
    });
  
    buttonGroup.appendChild(salvarBtn);
    buttonGroup.appendChild(cancelarBtn);
    form.appendChild(buttonGroup);
  
    main.appendChild(form);
    container.appendChild(header);
    container.appendChild(main);
  
    return container;
}


function renderScreen(screenName) {
  root.innerHTML = ""; // limpa a tela

  if (screenName === "login") {
    root.appendChild(createLoginScreen());
  } else if (screenName === "home") {
    root.appendChild(createHomeScreen());
  } else if (screenName === "novoLivro"){
    root.appendChild(createNovoLivroScreen());
  } else if (screenName === "estoque") {
    root.appendChild(createEstoqueScreen());
  }
}

// inicia na tela de login
renderScreen("login");
