// ---- LOGIN ADMIN ----
const senhaCorreta = "1234"; // Defina sua senha
const btnLogin = document.getElementById("btn-login");
const senhaInput = document.getElementById("senha-admin");
const painelAdmin = document.getElementById("painel-admin");

btnLogin.addEventListener("click", () => {
    if (senhaInput.value === senhaCorreta) {
        painelAdmin.style.display = "block";
        alert("Acesso concedido!");
    } else {
        alert("Senha incorreta!");
    }
});

// ---- ADICIONAR PROJETOS ----
const formProjeto = document.getElementById("form-projeto");

formProjeto.addEventListener("submit", function(e) {
    e.preventDefault();

    const titulo = document.getElementById("titulo").value;
    const descricao = document.getElementById("descricao").value;
    const link = document.getElementById("link").value;
    const arquivo = document.getElementById("imagem").files[0];

    if (!arquivo) return alert("Selecione uma imagem.");

    const reader = new FileReader();
    reader.onload = function(event) {
        // Salvar no localStorage para que a página principal possa ler
        const projetosSalvos = JSON.parse(localStorage.getItem("projetos")) || [];
        projetosSalvos.push({
            titulo,
            descricao,
            link,
            imagem: event.target.result
        });
        localStorage.setItem("projetos", JSON.stringify(projetosSalvos));

        alert("Projeto adicionado com sucesso!");
        formProjeto.reset();
    };

    reader.readAsDataURL(arquivo);
});

const previewContainer = document.getElementById("preview-projeto");
const inputTitulo = document.getElementById("titulo");
const inputDescricao = document.getElementById("descricao");
const inputImagem = document.getElementById("imagem");
const inputLink = document.getElementById("link");

// Função para atualizar a pré-visualização
function atualizarPreview() {
    const titulo = inputTitulo.value;
    const descricao = inputDescricao.value;
    const link = inputLink.value;
    const arquivo = inputImagem.files[0];

    previewContainer.innerHTML = ""; // limpa preview

    if (!titulo && !descricao && !arquivo && !link) return;

    const card = document.createElement("div");
    card.classList.add("projeto-card");

    if (arquivo) {
        const reader = new FileReader();
        reader.onload = function(event) {
            card.innerHTML = `
                <img src="${event.target.result}" alt="${titulo}">
                <h3>${titulo}</h3>
                <p>${descricao}</p>
                <a href="${link}" target="_blank" class="btn-primary">Ver no GitHub</a>
            `;
            previewContainer.appendChild(card);
        };
        reader.readAsDataURL(arquivo);
    } else {
        card.innerHTML = `
            <h3>${titulo}</h3>
            <p>${descricao}</p>
            <a href="${link}" target="_blank" class="btn-primary">Ver no GitHub</a>
        `;
        previewContainer.appendChild(card);
    }
}

// Eventos para atualizar preview em tempo real
inputTitulo.addEventListener("input", atualizarPreview);
inputDescricao.addEventListener("input", atualizarPreview);
inputLink.addEventListener("input", atualizarPreview);
inputImagem.addEventListener("change", atualizarPreview);

const formContatoAdmin = document.getElementById("form-contato-admin");
const tituloContatoInput = document.getElementById("contato-titulo");
const textoContatoInput = document.getElementById("contato-texto");
const mensagemSucessoInput = document.getElementById("mensagem-sucesso-texto");
const contatoMsgSucesso = document.getElementById("contato-msg-sucesso");

// Carregar dados salvos
window.addEventListener("load", () => {
    const contatoSalvo = JSON.parse(localStorage.getItem("contato")) || {
        titulo: "Contato",
        texto: "Entre em contato comigo preenchendo o formulário abaixo.",
        mensagemSucesso: "Mensagem enviada com sucesso!"
    };

    tituloContatoInput.value = contatoSalvo.titulo;
    textoContatoInput.value = contatoSalvo.texto;
    mensagemSucessoInput.value = contatoSalvo.mensagemSucesso;
});

// Salvar alterações
formContatoAdmin.addEventListener("submit", function(e){
    e.preventDefault();

    const dadosContato = {
        titulo: tituloContatoInput.value,
        texto: textoContatoInput.value,
        mensagemSucesso: mensagemSucessoInput.value
    };

    localStorage.setItem("contato", JSON.stringify(dadosContato));
    contatoMsgSucesso.style.display = "block";
    setTimeout(() => contatoMsgSucesso.style.display = "none", 3000);
});
