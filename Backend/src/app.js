const express = require("express");
const app = express();

app.use(express.json());

const autoresRoutes = require("./routes/autoresRouts");
const emprestimosRoutes = require("./routes/emprestimomosRouts");
const generosRoutes = require("./routes/generosRouts");
const livrosRoutes = require("./routes/livrosRouts");
const usuariosRoutes = require("./routes/usuariosRouts");

app.use(autoresRoutes);
app.use(emprestimosRoutes);
app.use(generosRoutes);
app.use(livrosRoutes);
app.use(usuariosRoutes);

module.exports = app;