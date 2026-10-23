const usuariosModel = require("../models/usuariosModel");
const {gerarHashSenha, verificarHashSenha} = require("../utils/crypto/hash");
const {criptografar, descriptografar} = require("../utils/crypto/criptografia");

async function buscarTodos(req, res) {
    try {
        const usuarios = await usuariosModel.buscarTodos();
        return res.json(usuarios);
    } catch(error) {
        console.log(error);
        return res.status(500).json({error: "Erro ao buscar usuários"});
    };
};

async function buscarPorId(req, res) {
    try {
        const id = req.params.id;
        const usuario = await usuariosModel.buscarPorId(id);

        if(!usuario) {
            return res.status(404).json({error: "Usuário não encontrado"});
        };

        const cpf = descriptografar({
            ivArmazenado: usuario.cpf_iv,
            tagArmazenado: usuario.cpf_tag,
            valorArmazenado: usuario.cpf
        });

        return res.json({
            id: usuario.id,
            cpf: cpf,
            nomeCompleto: usuario.nome_completo,
            dataAniversario: usuario.data_aniversario,
            email: usuario.email,
            phoneNumber: usuario.phone_number
        });
    } catch(error) {
        console.log(error);
        return res.status(500).json({error: "Erro ao buscar usuário"});
    };
};

async function editar(req, res) {
    try {
        const id = req.params.id;
        const usuario = await usuariosModel.buscarPorId(id);

        if(!usuario){
            return res.status(404).json({
                mensagem: "Usuario não encontrado"
            });
        };

        const {cpf, nomeCompleto, dataAniversario, email, telefone, senha} = req.body;
        const dadosAtualizados = {};

        if(nomeCompleto !== undefined){
            dadosAtualizados.nomeCompleto = nomeCompleto;
        };
        if(dataAniversario !== undefined){
            dadosAtualizados.dataAniversario = dataAniversario;
        };
        if(email !== undefined){
            dadosAtualizados.email = email;
        };
        
        if (telefone !== undefined){
            dadosAtualizados.telefone = telefone;
        };
        if (cpf !== undefined){
            const {iv: cpfiv, tag: cpftag, valorCriptografado: cpfCriptografado} = criptografar(cpf);
            dadosAtualizados.cpf = cpfCriptografado;
            dadosAtualizados.cpf_iv = cpfiv;
            dadosAtualizados.cpf_tag = cpftag
        };
        if(senha !== undefined){
            const { salt: senhaSalt, hash: senhaHash} = await gerarHashSenha(senha);
            dadosAtualizados.senha_salt = senhaSalt;
            dadosAtualizados.senha_hash = senhaHash;
        };

        await usuariosModel.editar(id, dadosAtualizados);
        
        return res.json({
            mensagem: "Usuario editado com sucesso"
        });

        
    } catch(error){
        console.error(error);
        return res.status(500).json({
            mensagem: "Erro ao editar usuario"
        });
    };
};

async function criar(req, res) {
    try {
        const {cpf, nomeCompleto, dataAniversario, email, telefone, senha} = req.body;
        const {salt, hash} = await gerarHashSenha(senha);
        const {iv, tag, valorCriptografado:cpfCriptografado} = criptografar(cpf);
            

        await usuariosModel.criar({
            cpf: cpfCriptografado,
            cpfIv: iv,
            cpfTag: tag,
            nomeCompleto,
            dataAniversario,
            email,
            telefone,
            senhaHash: hash,
            senhaSalt: salt
        });

        return res.status(201).json({
            mensagem: "Usuário criado com sucesso"
        });
    } catch(error) {
        console.log(error);
        return res.status(500).json({error: "Erro ao criar usuário"});
    };
};

async function excluir(req, res) {
    try {
        const id = req.params.id;
        const usuario = await usuariosModel.buscarPorId(id);

        if(!usuario) {
            return res.status(404).json({error: "Usuário não encontrado"});
        };

        await usuariosModel.excluir(id);

        return res.json({
            mensagem: "Usuário excluído com sucesso"
        });
    } catch(error) {
        console.log(error);
        return res.status(500).json({error: "Erro ao excluir usuário"});
    };
};

module.exports = {
    buscarTodos,
    buscarPorId,
    editar,
    criar,
    excluir
};
