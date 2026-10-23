const express = require("express");
const router = express.Router();

const livrosController = require("../controllers/livrosController");

router.get("/", livrosController.buscarLivros);
router.get("/:id", livrosController.buscarLivroPorId);
router.post("/", livrosController.criarLivro);
router.put("/:id", livrosController.editarLivro);
router.delete("/:id", livrosController.excluirLivro);

module.exports = router;
