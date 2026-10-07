const db = require("../config/database");

const buscarTodos = async () => {
    const [emprestimos] = await db.query(`
        SELECT
            emprestimos.id,
            emprestimos.data_emprestimos,
            emprestimos.data_devolucao,
            usuarios.nome_completo,
            livros.titulo
        FROM emprestimos
        INNER JOIN usuarios
            ON emprestimos.USUARIOS_id = usuarios.id
        INNER JOIN livros
            ON emprestimos.LIVROS_id = livros.id
    `);

    return emprestimos;
};

const buscarPorID = async (id) => {
    const [emprestimos] = await db.query(`
        SELECT
            emprestimos.id,
            emprestimos.data_emprestimos,
            emprestimos.data_devolucao,
            emprestimos.USUARIOS_id,
            emprestimos.LIVROS_id,
            usuarios.nome_completo,
            livros.titulo
        FROM emprestimos
        INNER JOIN usuarios
            ON emprestimos.USUARIOS_id = usuarios.id
        INNER JOIN livros
            ON emprestimos.LIVROS_id = livros.id
        WHERE emprestimos.id = ?
    `, [id]);

    return emprestimos[0];
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