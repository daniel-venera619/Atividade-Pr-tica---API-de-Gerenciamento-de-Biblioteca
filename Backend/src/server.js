const dotenv = require("dotenv");
dotenv.config();

const express = require("express");
const app = express();
const PORT = process.env.API_PORT;

const autoresRoutes = require("./routes/autoresRouts");
const emprestimosRoutes = require("./routes/emprestimomosRouts");
const generosRoutes = require("./routes/generosRouts");
const livrosRoutes = require("./routes/livrosRouts");
const usuariosRoutes = require("./routes/usuariosRouts");

app.use(express.json());
app.use("/autores", autoresRoutes);
app.use("/emprestimos", emprestimosRoutes);
app.use("/generos", generosRoutes);
app.use("/livros", livrosRoutes);
app.use("/usuarios", usuariosRoutes);



app.listen(PORT, () =>{
    console.log(`Servidor rodando em http://localhost:${PORT}`)
});