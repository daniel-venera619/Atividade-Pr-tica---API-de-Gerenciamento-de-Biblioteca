const express = require("express");
const usuariosController = require("../controllers/usuariosController");
const router = express.Router ();

router.get("/usuarios", usuariosController.buscarUsuarios);

router.get("/usuarios/:id", usuariosController.buscarUsuarioPorId);

router.post("/usuarios", usuariosController.criarUsuario);

router.put("/usuarios/:id", usuariosController.editarUsuario);

router.delete("/usuarios/:id", usuariosController.excluirUsuario);

module.exports = router;