const API_URL = "http://localhost:3042";

const formLogin = document.querySelector("#formLogin");
const campoUsuario = document.querySelector("#usuario");
const campoSenha = document.querySelector("#senha");
const botaoLogin = document.querySelector("#login");
const mensagemLogin = document.querySelector("#mensagemLogin");

if (formLogin) {
    formLogin.addEventListener("submit", async (evento) => {
        evento.preventDefault();

        botaoLogin.disabled = true;
        mensagemLogin.textContent = "Entrando...";

        try {
            const resposta = await fetch(`${API_URL}/usuarios/login`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    email: campoUsuario.value.trim(),
                    senha: campoSenha.value
                })
            });

            const dados = await resposta.json();

            if (!resposta.ok) {
                throw new Error(dados.error || "Não foi possível realizar o login");
            }

            mensagemLogin.textContent = `Bem-vindo(a), ${dados.usuario.nomeCompleto}!`;
            campoSenha.value = "";
        } catch (error) {
            mensagemLogin.textContent = error.message;
        } finally {
            botaoLogin.disabled = false;
        }
    });
};

