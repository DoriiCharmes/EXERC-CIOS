const form = document.getElementById("formCadastro");
const nome = document.getElementById("nome");
const cep = document.getElementById("cep");
const rua = document.getElementById("rua");
const bairro = document.getElementById("bairro");
const cidade = document.getElementById("cidade");
const estado = document.getElementById("estado");

window.addEventListener("load", () => {
    const dadosSalvos = JSON.parse(localStorage.getItem("usuario"));

    if (dadosSalvos) {
        nome.value = dadosSalvos.nome;
        cep.value = dadosSalvos.cep;
        rua.value = dadosSalvos.rua;
        bairro.value = dadosSalvos.bairro;
        cidade.value = dadosSalvos.cidade;
        estado.value = dadosSalvos.estado;
    }
});

cep.addEventListener("blur", () => {
    const cepLimpo = cep.value.replace(/\D/g, "");

    if (cepLimpo.length === 8) {
        fetch(`https://viacep.com.br/ws/${cepLimpo}/json/`)
            .then(response => response.json())
            .then(dados => {
                if (!dados.erro) {
                    rua.value = dados.logradouro;
                    bairro.value = dados.bairro;
                    cidade.value = dados.localidade;
                    estado.value = dados.uf;
                }
            });
    }
});

form.addEventListener("submit", (event) => {
    event.preventDefault();

    const usuario = {
        nome: nome.value,
        cep: cep.value,
        rua: rua.value,
        bairro: bairro.value,
        cidade: cidade.value,
        estado: estado.value
    };

    localStorage.setItem("usuario", JSON.stringify(usuario));

    alert("Dados salvos com sucesso!");
});
