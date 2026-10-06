const db = require("../config/database");

const buscarTodos = async () => {
    const [emprestimos] = await db.query(
        "SELECT * FROM emprestimos"
    );

    return emprestimos;
};

const buscarPorID = async (id) => {
    const [emprestimos] = await db.query(
        "SELECT * FROM emprestimos WHERE id = ?",
        [id] 
    )

    return emprestimos[id];
};

const criar = async (
    data_emprestimos,
    data_devolucao,
    USUARIOS_id,
    LIVROS_id
) => {
    const [emprestimo] = await db.query(
        `ISERT INTO emprestimos
        (data_emprestimos, data_devolucao, USUARIOS_id, LIVROS_id)
        VALUES (?, ?, ?, ?)`,
        [
            data_emprestimos,
            data_devolucao,
            USUARIOS_id,
            LIVROS_id
        ]
    );

    return {
        id:emprestimo.insertId,
        data_emprestimos,
        data_devolucao,
        USUARIOS_id,
        LIVROS_id
    }
};

const editar = async (
    id,
    data_emprestimos,
    data_devolucao,
    USUARIOS_id,
    LIVROS_id
) => {
    await db.query (
         `UPDATE emprestimos 
        SET data_emprestimos = ?,
            data_devolucao = ?,
            USUARIOS_id = ?,
            LIVROS_id = ?
        WHERE id = ?`,
        [
        data_emprestimos,
        data_devolucao,
        USUARIOS_id,
        LIVROS_id,
        id
    ]
    );

    return {
        id,
        data_emprestimos,
        data_devolucao,
        USUARIOS_id,
        LIVROS_id
    };
    
};

const excluir = async (id) => {
    const [resultado] = await db.query(
        "DELETE FROM emprestimos WHERE id = ?",
        [id]
    );

    return resultado.affectedRows;
};

module.exports = {
    buscarTodos,
    buscarPorID,
    criar,
    editar,
    excluir
};