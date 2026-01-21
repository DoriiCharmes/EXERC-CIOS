const apiUrl = "https://crudcrud.com/api/d39dd5a86eef41a0b7495fb6dbfbc9a1/clientes";

const form = document.getElementById('form-cliente');
const listaClientes = document.getElementById('lista-clientes');

form.addEventListener('submit', function (event) {
    event.preventDefault();

    const nome = document.getElementById('nome').value;
    const email = document.getElementById('email').value;

    const cliente = {
        nome: nome,
        email: email
    };

    fetch(apiUrl, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(cliente)
    })
    .then(() => {
        form.reset();
        listarClientes();
    });
});

function listarClientes() {
    fetch(apiUrl)
        .then(response => response.json())
        .then(clientes => {
            listaClientes.innerHTML = '';

            clientes.forEach(cliente => {
                const li = document.createElement('li');
                li.textContent = `${cliente.nome} - ${cliente.email}`;

                const botaoExcluir = document.createElement('button');
                botaoExcluir.textContent = 'Excluir';

                botaoExcluir.addEventListener('click', () => {
                    excluirCliente(cliente._id);
                });

                li.appendChild(botaoExcluir);
                listaClientes.appendChild(li);
            });
        });
}

function excluirCliente(id) {
    fetch(`${apiUrl}/${id}`, {
        method: 'DELETE'
    })
    .then(() => {
        listarClientes();
    });
}

listarClientes();
