const emprestimosModel = require("../models/emprestimosModel");
const usuariosModel = require("../models/usuariosModel");
const { verificarHashSenha} = require("../utils/crypto/hash");

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
        LIVROS_id,
        senha
    } = req.body;

    try {
        const dadosSenha = await usuariosModel.buscarHashSenhaPorId(USUARIOS_id);

            if (!dadosSenha){
                return res.status(404).json({
                    mensagem: "Usuário não encontrado"
                });
            }

            const senhaValida = await verificarHashSenha(
                senha,
                dadosSenha
            );

            if (!senhaValida) {
                return res.status(401).json({
                    mensagem: "Senha incorreta" 
                });
            }
        const emprestimo = await emprestimosModel.criar(
            data_emprestimos,
            data_devolucao,
            USUARIOS_id,
            LIVROS_id
        );

        res.status(201).json(emprestimo);    
    } catch (error) {
        console.error("Erro ao criar empréstimo:", error.message);

        return res.status(500).json({
            mensagem: "Erro ao criar empréstimo"
        });
    }

   
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