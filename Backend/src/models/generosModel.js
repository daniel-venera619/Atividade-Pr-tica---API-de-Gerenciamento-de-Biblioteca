const db = require("../config/database");

const buscarTodos = async () =>{
    const[generos] = await db.query(
        "SELECT * FROM generos"
    );

    return generos;
}


const buscarPorId = async (id) => {
    const [generos] = await db.query(
        "SELECT * FROM generos WHERE id = ?",
        [id]
    );

    return generos[0];
};

const criar = async (nome) => {
    const [genero] = await db.query(
        "INSERT INTO generos (nome) VALUES (?)",
        [nome]
    );

    return {
        id: genero.insertId,
        nome
    };
};

const editar = async (id, nome) => {
    await db.query(
        "UPDATE generos SET nome = ? WHERE id = ?",
        [nome, id]
    );

    return {
        id,
        nome
    };
};

const excluir = async (id) => {
    const [resultado] = await db.query(
        "DELETE FROM generos WHERE id = ?",
        [id]
    );

    return resultado.affectedRows;
};

module.exports = {
    buscarTodos,
    buscarPorId,
    criar,
    editar,
    excluir
};
