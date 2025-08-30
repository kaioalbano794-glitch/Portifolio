// Seleciona todos os elementos com fade-up
const fadeElements = document.querySelectorAll(".fade-up");

function revealOnScroll() {
    const windowHeight = window.innerHeight;

    fadeElements.forEach(el => {
        const elTop = el.getBoundingClientRect().top;

        if (elTop < windowHeight - 100) {
            el.classList.add("show");
        }
    });
}

window.addEventListener("scroll", revealOnScroll);
window.addEventListener("load", revealOnScroll);

// ---- LOGIN ADMIN ----
const senhaCorreta = "1234"; // Defina sua senha aqui
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

// Carregar dados da aba Contato
const tituloContato = document.querySelector("#contato h2");
const textoContato = document.querySelector("#contato form ~ p"); // Se tiver parágrafo introdutório
const mensagemSucesso = document.getElementById("mensagem-sucesso");

function carregarContato() {
    const contatoSalvo = JSON.parse(localStorage.getItem("contato"));
    if (contatoSalvo) {
        tituloContato.textContent = contatoSalvo.titulo;
        
        // Se houver um parágrafo de introdução na seção contato
        if (textoContato) {
            textoContato.textContent = contatoSalvo.texto;
        }

        mensagemSucesso.textContent = contatoSalvo.mensagemSucesso;
    }
}

window.addEventListener("load", carregarContato);
