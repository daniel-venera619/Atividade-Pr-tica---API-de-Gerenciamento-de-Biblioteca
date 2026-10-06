const express = require("express");
const router = express.Router();

const generosController = require("../controllers/generosController");

router.get("/generos", generosController.buscarGeneros);
router.get("/generos/:id", generosController.buscarGeneroPorId);
router.post("/generos", generosController.criarGenero);
router.put("/generos/:id", generosController.editarGenero);
router.delete("/generos/:id",generosController.excluirGenero);

module.exports = router;
