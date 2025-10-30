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

  // evento do botão → troca para home
  loginButton.addEventListener("click", () => {
    renderScreen("home");
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
  
    const livros = [
      { id: 120, titulo: "A Volta ao Mundo em 80 Dias" },
      { id: 456, titulo: "O velho e o menino" },
      { id: 987, titulo: "As coisas que você só vê quando desacelera" },
      { id: 321, titulo: "O Homem que Calculava" },
    ];
  
    livros.forEach((livro) => {
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

      btnEdit.addEventListener("click", () => alert(`Editar ${livro.titulo}`));

      const btnDelete = document.createElement("button");
      btnDelete.classList.add("btnIcon", "delete");

      
      const imgDelete = document.createElement("img");
      imgDelete.src = "./img/lixeira.png";  
      imgDelete.alt = "Excluir";
      imgDelete.style.width = "20px";
      imgDelete.style.height = "20px";
      btnDelete.appendChild(imgDelete);

      btnDelete.addEventListener("click", () => alert(`Excluir ${livro.titulo}`));

      tdAction.appendChild(btnEdit);
      tdAction.appendChild(btnDelete);

  
      row.appendChild(tdId);
      row.appendChild(tdTitle);
      row.appendChild(tdAction);
      tbody.appendChild(row);
    });
  
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
    logoText.textContent = "LionBook";
    logoText.classList.add("logoTitle");
  
    logoGroup.appendChild(logoImg);
    logoGroup.appendChild(logoText);
    header.appendChild(logoGroup);
  
    // Main content
    const main = document.createElement("main");
    main.classList.add("mainSection");
  
    const formContainer = document.createElement("div");
    formContainer.classList.add("formContainer");
  
    const form = document.createElement("form");
    form.classList.add("bookForm");
  
    // Input fields
    const fields = [
      { label: "ID", type: "number", name: "id" },
      { label: "Título", type: "text", name: "titulo" },
      { label: "Autor", type: "text", name: "autor" },
      { label: "Quantidade", type: "number", name: "quantidade" }
    ];
  
    fields.forEach(field => {
      const inputGroup = document.createElement("div");
      inputGroup.classList.add("inputGroup");
  
      const label = document.createElement("label");
      label.textContent = field.label;
      label.htmlFor = field.name;
  
      const input = document.createElement("input");
      input.type = field.type;
      input.id = field.name;
      input.name = field.name;
      input.classList.add("formInput");
  
      inputGroup.appendChild(label);
      inputGroup.appendChild(input);
      form.appendChild(inputGroup);
    });
  
    // Buttons
    const buttonGroup = document.createElement("div");
    buttonGroup.classList.add("buttonGroup");
  
    const saveBtn = document.createElement("button");
    saveBtn.textContent = "SALVAR";
    saveBtn.classList.add("primaryBtn");
    saveBtn.type = "button";
    saveBtn.addEventListener("click", () => {
      alert("Salvando livro...");
      // Aqui você implementará a lógica de salvamento com a API
    });
  
    const cancelBtn = document.createElement("button");
    cancelBtn.textContent = "CANCELAR";
    cancelBtn.classList.add("secondaryBtn");
    cancelBtn.type = "button";
    cancelBtn.addEventListener("click", () => {
      renderScreen("home");
    });
  
    buttonGroup.appendChild(saveBtn);
    buttonGroup.appendChild(cancelBtn);
    form.appendChild(buttonGroup);
  
    formContainer.appendChild(form);
    main.appendChild(formContainer);
    container.appendChild(header);
    container.appendChild(main);
  
    return container;
}
  
  
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
  
    // Input fields
    const fields = [
      { label: "TÍTULO", type: "text", name: "titulo" },
      { label: "QUANTIDADE", type: "number", name: "quantidade" },
      { label: "ISBN", type: "text", name: "isbn" },
      { label: "DATA DE PUBLICAÇÃO", type: "date", name: "dataPublicacao" }
    ];
  
    fields.forEach(field => {
      const input = document.createElement("input");
      input.type = field.type;
      input.placeholder = field.label;
      input.name = field.name;
      input.classList.add("cadastroInput");
      form.appendChild(input);
    });
  
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
    cadastrarBtn.addEventListener("click", () => {
      alert("Cadastrando livro...");
      // Implementar lógica de cadastro com API
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
  


  
  

// =============================
// ⚡ FUNÇÃO CONTROLADORA DE TELA
// =============================
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
