const usuariosModel = require("../models/usuariosModel");

const buscarUsuarios = async (req, res) => {
    const usuarios = await usuariosModel.buscarTodos();

    res.json(usuarios);
};

const buscarUsuarioPorId = async (req, res) => {
    const id = req.params.id;

    const usuario = await usuariosModel.buscarPorId(id);

    if (!usuario) {
        return res.status(404).json({
            mensagem: "Usuário não encontrado"
        });
    }

    res.json(usuario);
};

const criarUsuario = async (req, res) => {
    const {
        nome_completo,
        cpf,
        email,
        telefone,
        data_nascimento
    } = req.body;

    const usuario = await usuariosModel.criar(
        nome_completo,
        cpf,
        email,
        telefone,
        data_nascimento
    );

    res.status(201).json(usuario);
};

const editarUsuario = async (req, res) => {
    const id = req.params.id;

    const {
        nome_completo,
        cpf,
        email,
        telefone,
        data_nascimento
    } = req.body;

    const usuario = await usuariosModel.buscarPorId(id);

    if (!usuario) {
        return res.status(404).json({
            mensagem: "Usuário não encontrado"
        });
    }

    const usuarioAtualizado = await usuariosModel.editar(
        id,
        nome_completo,
        cpf,
        email,
        telefone,
        data_nascimento
    );

    res.json(usuarioAtualizado);
};

const excluirUsuario = async (req, res) => {
    const id = req.params.id;

    const usuario = await usuariosModel.buscarPorId(id);

    if (!usuario) {
        return res.status(404).json({
            mensagem: "Usuário não encontrado"
        });
    }

    await usuariosModel.excluir(id);

    res.json({
        mensagem: "Usuário removido com sucesso"
    });
};

module.exports = {
    buscarUsuarios,
    buscarUsuarioPorId,
    criarUsuario,
    editarUsuario,
    excluirUsuario
};