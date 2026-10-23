const express = require("express");
const router = express.Router();
const autoresController = require("../controllers/autoresController");

router.get("/", autoresController.buscarAutores);
router.get("/:id", autoresController.buscarAutorPorId);
router.post("/", autoresController.criarAutor);
router.put("/:id", autoresController.editarAutor);
router.delete("/:id", autoresController.excluirAutor);

module.exports = router;