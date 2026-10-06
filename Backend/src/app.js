const express = require("express");
const app = express();

app.use(express.json());

const autoresRoutes = require("./routes/autoresRouts");
const emprestimosRoutes = require("./routes/emprestimomosRouts");
const generosRoutes = require("./routes/generosRouts");
const livrosRoutes = require("./routes/livrosRouts");


app.use(autoresRoutes);
app.use(emprestimosRoutes);
app.use(generosRoutes);
app.use(livrosRoutes);

module.exports = app;