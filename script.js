function addPersonal() {
    const codigo = document.getElementById('addCodigo').value;
    const nome = document.getElementById('addNome').value;
    const email = document.getElementById('addEmail').value;

    fetch('http://localhost:50090/addPersonal', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ codigoPersonal: codigo, nomePersonal: nome, emailPersonal: email })
    })
    .then(response => response.text())
    .then(data => alert(data))
    .catch(error => console.error('Error:', error));
}

function readPersonal() {
    const codigo = document.getElementById('readCodigo').value;

    fetch(`http://localhost:50090/readPersonal?codigoPersonal=${codigo}`)
    .then(response => response.json())
    .then(data => {
        document.getElementById('readResult').textContent = JSON.stringify(data, null, 2);
    })
    .catch(error => console.error('Error:', error));
}

function deletePersonal() {
    const codigo = document.getElementById('deleteCodigo').value;

    fetch(`http://localhost:50090/delPersonal?codigoPersonal=${codigo}`, {
        method: 'DELETE'
    })
    .then(response => response.text())
    .then(data => alert(data))
    .catch(error => console.error('Error:', error));
}

function listPersonal() {
    fetch('http://localhost:50090/listPersonal')
    .then(response => response.json())
    .then(data => {
        document.getElementById('listResult').textContent = JSON.stringify(data, null, 2);
    })
    .catch(error => console.error('Error:', error));
}