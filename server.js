const express = require('express');
const sqlite3 = require('sqlite3').verbose();
const bodyParser = require('body-parser');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3000; // Render usa su propio puerto automáticamente
const db = new sqlite3.Database('./registro_medico.db');

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(__dirname));

db.serialize(() => {
    db.run(`CREATE TABLE IF NOT EXISTS especialistas (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        nombre TEXT, numero TEXT, correo TEXT, rama TEXT, cliente TEXT, mundial TEXT
    )`);
});

app.get('/', (req, res) => { res.sendFile(path.join(__dirname, 'index.html')); });

app.post('/registrar', (req, res) => {
    const { nombre, numero, correo, rama, cliente, mundial } = req.body;
    const query = `INSERT INTO especialistas (nombre, numero, correo, rama, cliente, mundial) VALUES (?, ?, ?, ?, ?, ?)`;
    db.run(query, [nombre, numero, correo, rama, cliente, mundial], (err) => {
        if (err) return res.send("Error");
        res.send(`<div style="text-align:center;font-family:sans-serif;"><h2>✅ Registro Exitoso</h2><a href="/">Volver</a></div>`);
    });
});

app.listen(PORT, '0.0.0.0', () => {
    console.log(`Servidor activo en puerto ${PORT}`);
});