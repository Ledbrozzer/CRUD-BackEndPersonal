const express = require('express');
const bodyParser = require('body-parser');
const mysql = require('mysql2');
const cors = require('cors');  

const app = express();

app.use(cors());
app.use(bodyParser.json());


const pool = mysql.createPool( {
    host: 'localhost',
    user: 'root',
    database: 'personal',
    password: 'Mariobross09',
    port: 3306
});
 

app.get('/', (req,res) => {
    res.send ("API Personal em execução!  Endpoints: /addPersonal, /readPersonal, /delPersonal, /listPersonal");
});


app.post('/addPersonal', (req, res) => {
    const { codigoPersonal, nomePersonal, emailPersonal } = req.body;

    pool.query(
        'INSERT INTO personal (codigoPersonal, nomePersonal, emailPersonal) VALUES (?, ?, ?)',
        [codigoPersonal, nomePersonal, emailPersonal],
        (err, results) => {
            if (err) {
                return res.status(500).send(err);
            }
            res.status(200).send('Personal adicionado com sucesso!');
        }
    );
});


app.get('/readPersonal', (req, res) => {
    

    const { codigoPersonal } = req.query;  
    
    pool.query(
        'SELECT * FROM personal WHERE codigoPersonal = ?',
        [codigoPersonal],
        (err, results) => {
            if (err) {
                return res.status(500).send(err);
            }
            if (results.length > 0) {
                res.status(200).json(results);
            } else {
                res.status(404).send('Personal não encontrado');
            }
        }
    );
});


app.delete('/delPersonal', (req, res) => {
    const { codigoPersonal } = req.query;

    pool.query(
        'DELETE FROM personal WHERE codigoPersonal = ?',
        [codigoPersonal],
        (err, results) => {
            if (err) {
                return res.status(500).send(err);
            }
            if (results.affectedRows > 0) {
                res.status(200).send('Personal deletado com sucesso!');
            } else {
                res.status(404).send('Personal não encontrado');
            }
        }
    );
});


app.get('/listPersonal', (req, res) => {
    console.log('Iniciando API com endpoint: /listPersonal');
    pool.query(
        'SELECT * FROM personal',
        (err, results) => {
            if (err) {
                return res.status(500).send(err);
            }
            res.status(200).json(results);
        }
    );
    console.log('Finalizando API com endpoint: /listPersonal');
});


app.listen(50090, () => {
    console.log('Servidor está rodando na porta 3000');
});