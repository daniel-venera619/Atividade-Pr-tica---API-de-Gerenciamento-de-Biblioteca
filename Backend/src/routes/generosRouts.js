const express = require("express");
const router = express.Router();

const generosController = require("../controllers/generosController");

router.get("/", generosController.buscarGeneros);
router.get("/:id", generosController.buscarGeneroPorId);
router.post("/", generosController.criarGenero);
router.put("/:id", generosController.editarGenero);
router.delete("/:id",generosController.excluirGenero);

module.exports = router;
