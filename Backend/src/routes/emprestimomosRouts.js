const express = require("express");
const router = express.Router();

const emprestimosController = require("../controllers/emprestimosController");

router.get("/", emprestimosController.buscarEmprestimos);
router.get("/:id", emprestimosController.buscarEmprestimoPorId);
router.post("/", emprestimosController.criarEmprestimo);
router.put("/:id", emprestimosController.editarEmprestimo);
router.delete("/:id", emprestimosController.excluirEmprestimo);

module.exports = router;
