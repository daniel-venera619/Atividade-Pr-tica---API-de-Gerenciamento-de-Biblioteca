const autoresModel = require("../models/autoresModel");

const buscarAutores = async (req, res) => {
    const autores = await autoresModel.buscarTodos();
    console.log(autores);

    res.json(autores);
};

const buscarAutorPorId = async (req, res) =>{
    const id = req.params.id;
    const autor = await autoresModel.buscarPorID(id);

    if(!autor){
        return res.status(404).json({
           mensagem: "Autor não encontrado" 
        })
       
    }
     res.json(autor);
};

const criarAutor = async (req, res) =>{
    const {nome_completo, nacionalidade, data_nascimento} = req.body
    const criarAutor = await autoresModel.criar (nome_completo, nacionalidade, data_nascimento);

    res.status(201).json(criarAutor)

};

const editarAutor = async (req, res) =>{
    const id = req.params.id;
    const {nome_completo, nacionalidade, data_nascimento} = req.body;
    const autor = await autoresModel.buscarPorID(id);

        if(!autor){
            return res.status(404).json({
                mensagem: "Autor não encontrado"
            });
        }

        const autorAtualizado = await autoresModel.editar(id, nome_completo, nacionalidade, data_nascimento);
        res.json(autorAtualizado);
}

const excluirAutor = async (req, res) =>{
    const id = req.params.id;
    const autor = await autoresModel.buscarPorID(id);

        if(!autor){
            return res.status(404).json({
                mensagem: "Autor não encontrado"
            });

        }

        await autoresModel.excluir(id);

        res.json({
                  mensagem: "Autor Removido com sucefu"
        });
}

module.exports = {
    buscarAutores,
    buscarAutorPorId,
    criarAutor,
    editarAutor,
    excluirAutor
};