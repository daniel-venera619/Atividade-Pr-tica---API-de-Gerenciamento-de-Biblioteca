const express = require("express");
const router = express.Router();
const autoresController = require("../controllers/autoresController");

router.get("/autores", autoresController.buscarAutores);
router.get("/autores/:id", autoresController.buscarAutorPorId);
router.post("/autores", autoresController.criarAutor);
router.put("/autores/:id", autoresController.editarAutor);
router.delete("/autores/:id", autoresController.excluirAutor);

module.exports = router;