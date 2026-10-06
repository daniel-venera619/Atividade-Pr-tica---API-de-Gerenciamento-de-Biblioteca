const generosModel = require("../models/generosModel");

const buscarGeneros = async (req, res) => {
    const generos = await generosModel.buscarTodos();

    res.json(generos);
};

const buscarGeneroPorId = async (req, res) => {
    const id = req.params.id;

    const genero = await generosModel.buscarPorId(id);

    if (!genero) {
        return res.status(404).json({
            mensagem: "Gênero não encontrado"
        });
    }

    res.json(genero);
};

const criarGenero = async (req, res) => {
    const { nome } = req.body;

    const genero = await generosModel.criar(nome);

    res.status(201).json(genero);
};

const editarGenero = async (req, res) => {
    const id = req.params.id;
    const { nome } = req.body;

    const genero = await generosModel.buscarPorId(id);

    if (!genero) {
        return res.status(404).json({
            mensagem: "Gênero não encontrado"
        });
    }

    const generoAtualizado = await generosModel.editar(id, nome);

    res.json(generoAtualizado);
};

const excluirGenero = async (req, res) => {
    const id = req.params.id;

    const genero = await generosModel.buscarPorId(id);

    if (!genero) {
        return res.status(404).json({
            mensagem: "Gênero não encontrado"
        });
    }

    await generosModel.excluir(id);

    res.json({
        mensagem: "Gênero removido com sucesso"
    });
};

module.exports = {
    buscarGeneros,
    buscarGeneroPorId,
    criarGenero,
    editarGenero,
    excluirGenero
};
