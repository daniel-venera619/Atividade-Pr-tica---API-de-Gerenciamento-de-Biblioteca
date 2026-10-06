const db = require("../config/database");

const buscarTodos = async () =>{
    const[autores] = await db.query(
        "SELECT * FROM autores"
    );

    return autores;
}

const buscarPorID = async (id) => {
    const[autores] = await db.query(
        "SELECT * FROM autores WHERE id = ?",
        [id]
    );

    return autores[0];
} 

const criar = async(nome_completo, nacionalidade, data_nascimento) => {
    const [autor] = await db.query(
        "INSERT INTO autores (nome_completo, nacionalidade, data_nascimento) VALUES (?,?,?)",
        [nome_completo, nacionalidade, data_nascimento]
    );

    return{
        id: autor.insertId,
        nome_completo,
        nacionalidade,
        data_nascimento
    };
}

const editar = async(id, nome_completo, nacionalidade, data_nascimento) => {
    await db.query(
        "UPDATE autores SET nome_completo=?, nacionalidade=?, data_nascimento=? WHERE id=?",
        [ nome_completo, nacionalidade, data_nascimento, id] 
    );

    return{
        id,
        nome_completo,
        nacionalidade,
        data_nascimento
    };
}

const excluir = async (id) => {
    const [resultado] = await db.query(
        "DELETE FROM autores WHERE id=?",
        [id]
    )
    
    return resultado.affectedRows;
}

module.exports = {
    buscarTodos,
    buscarPorID,
    criar,
    editar,
    excluir
};