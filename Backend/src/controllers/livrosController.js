const livrosModel = require("../models/livrosModel");
const buscarLivros = async (req, res) => {
    const livros = await livrosModel.buscarTodos();

    res.json(livros);
};

const buscarLivroPorId = async (req, res) => {
    const id = req.params.id;

    const livro = await livrosModel.buscarPorId(id);

    if (!livro) {
        return res.status(404).json({
            mensagem: "Livro não encontrado"
        });
    }

    res.json(livro);
};

const criarLivro = async (req, res) => {
    const {
        titulo,
        isbn,
        ano_publicacao,
        numero_paginas,
        sinopse
    } = req.body;

    const livro = await livrosModel.criar(
        titulo,
        isbn,
        ano_publicacao,
        numero_paginas,
        sinopse
    );

    res.status(201).json(livro);
};

const editarLivro = async (req, res) => {
    const id = req.params.id;

    const {
        titulo,
        isbn,
        ano_publicacao,
        numero_paginas,
        sinopse
    } = req.body;

    const livro = await livrosModel.buscarPorId(id);

    if (!livro) {
        return res.status(404).json({
            mensagem: "Livro não encontrado"
        });
    }

    const livroAtualizado = await livrosModel.editar(
        id,
        titulo,
        isbn,
        ano_publicacao,
        numero_paginas,
        sinopse
    );

    res.json(livroAtualizado);
};

const excluirLivro = async (req, res) => {
    const id = req.params.id;

    const livro = await livrosModel.buscarPorId(id);

    if (!livro) {
        return res.status(404).json({
            mensagem: "Livro não encontrado"
        });
    }

    await livrosModel.excluir(id);

    res.json({
        mensagem: "Livro removido com sucesso"
    });
};

module.exports = {
    buscarLivros,
    buscarLivroPorId,
    criarLivro,
    editarLivro,
    excluirLivro
};