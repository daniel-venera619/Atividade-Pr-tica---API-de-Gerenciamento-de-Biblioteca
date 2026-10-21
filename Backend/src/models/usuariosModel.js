const conection = require("../config/database");
const bd = require("../config/database");

async function buscarTodos() {
    const sql = `SELECT id, nome_completo, data_aniversario, email, phone_number 
    FROM usuarios`;
    const [resultado] = await bd.execute(sql);

    return resultado;
};

async function buscarPorId(id) {
    const sql = `SELECT * FROM usuarios WHERE id = ?`;
    const [resultado] = await bd.execute(sql, [id]);

    return resultado[0];
};

async function criar({ cpf, cpfIv, cpfTag, nomeCompleto, dataAniversario, email, telefone, senhaHash, senhaSalt }) {
    const sql = `INSERT INTO usuarios( 
    cpf, 
    cpf_iv, 
    cpf_tag, 
    nome_completo, 
    data_aniversario, 
    email, 
    phone_number,
    senha_hash,
    senha_salt )
    VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)`;

    const [resultado] = await bd.execute(sql, [
        cpf,
        cpfIv,
        cpfTag,
        nomeCompleto,
        dataAniversario,
        email,
        telefone,
        senhaHash,
        senhaSalt
    ]);

    return resultado;
};

async function editar(){
};

async function excluir(id) {
    const sql = `DELETE FROM usuarios WHERE id = ?`;
    const [resultado] = await bd.execute(sql, [id]);

    return resultado.affectedRows;
};

async function buscarHashSenhaPorId(id) {
    const sql = `SELECT senha_hash, senha_salt FROM usuarios WHERE id = ?`;
    const [resultado] = await conection.execute(sql, [id]);

        if (resultado.length === 0){
            return null;
        }
    return{
        saltArmazenado: resultado[0].senha_salt,
        hashSenhaArmazenada: resultado[0].senha_hash
    };    
};

module.exports = {
    buscarTodos,
    buscarPorId,
    criar,
    editar,
    excluir,
    buscarHashSenhaPorId
};