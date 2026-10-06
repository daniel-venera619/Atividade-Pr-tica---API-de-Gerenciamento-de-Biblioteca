const express = require("express");
const router = express.Router();

const livrosController = require("../controllers/livrosController");

router.get("/livros", livrosController.buscarLivros);
router.get("/livros/:id", livrosController.buscarLivroPorId);
router.post("/livros", livrosController.criarLivro);
router.put("/livros/:id", livrosController.editarLivro);
router.delete("/livros/:id", livrosController.excluirLivro);

module.exports = router;
