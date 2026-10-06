const express = require("express");
const router = express.Router();

const emprestimosController = require("../controllers/emprestimosController");

router.get("/emprestimos", emprestimosController.buscarEmprestimos);
router.get("/emprestimos/:id", emprestimosController.buscarEmprestimoPorId);
router.post("/emprestimos", emprestimosController.criarEmprestimo);
router.put("/emprestimos/:id", emprestimosController.editarEmprestimo);
router.delete("/emprestimos/:id", emprestimosController.excluirEmprestimo);

module.exports = router;
