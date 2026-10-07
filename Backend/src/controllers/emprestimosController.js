const emprestimosModel = require("../models/emprestimosModel");

const buscarEmprestimos = async (req, res) => {
    const emprestimos = await emprestimosModel.buscarTodos();

    res.json(emprestimos);
};

const buscarEmprestimoPorId = async (req, res) => {
    const id = req.params.id;
    const emprestimo = await emprestimosModel.buscarPorID(id);

    if (!emprestimo) {
        return res.status(404).json({
            mensagem: "Empréstimo não encontrado"
        });
    }

    res.json(emprestimo);
};

const criarEmprestimo = async (req, res) => {
    const {
        data_emprestimos,
        data_devolucao,
        USUARIOS_id,
        LIVROS_id
    } = req.body;

   const emprestimo = await emprestimosModel.criar(
        data_emprestimos,
        data_devolucao,
        USUARIOS_id,
        LIVROS_id
    );

    res.status(201).json(emprestimo);
};

const editarEmprestimo = async (req, res) => {
    const id = req.params.id;

    const {
        data_emprestimos,
        data_devolucao,
        USUARIOS_id,
        LIVROS_id
    } = req.body;

    const emprestimo = await emprestimosModel.buscarPorId(id);

    if (!emprestimo) {
        return res.status(404).json({
            mensagem: "Empréstimo não encontrado"
        });
    }

    const emprestimoAtualizado = await emprestimosModel.editar(
        id,
        data_emprestimos,
        data_devolucao,
        USUARIOS_id,
        LIVROS_id
    );

    res.json(emprestimoAtualizado);
};

const excluirEmprestimo = async (req, res) => {
    const id = req.params.id;

    const emprestimo = await emprestimosModel.buscarPorId(id);

    if (!emprestimo) {
        return res.status(404).json({
            mensagem: "Empréstimo não encontrado"
        });
    }

    await emprestimosModel.excluir(id);

    res.json({
        mensagem: "Empréstimo removido com sucesso"
    });
};

module.exports = {
    buscarEmprestimos,
    buscarEmprestimoPorId,
    criarEmprestimo,
    editarEmprestimo,
    excluirEmprestimo
};