const db = require("../config/database");
const buscarTodos = async () => {
    const [livros] = await db.query(`
        SELECT
            livros.id,
            livros.titulo,
            livros.isbn,
            livros.ano_publicacao,
            livros.numero_paginas,
            livros.sinopse,
            autores.nome_completo AS autor,
            generos.nome AS genero
        FROM livros
        INNER JOIN autores_has_livros
            ON livros.id = autores_has_livros.LIVROS_id
        INNER JOIN autores
            ON autores.id = autores_has_livros.AUTORES_id
        INNER JOIN livros_has_generos
            ON livros.id = livros_has_generos.LIVROS_id
        INNER JOIN generos
            ON generos.id = livros_has_generos.GENEROS_id
    `);

    return livros;
};

const buscarPorId = async (id) => {
    const [livros] = await db.query(`
        SELECT
            livros.id,
            livros.titulo,
            livros.isbn,
            livros.ano_publicacao,
            livros.numero_paginas,
            livros.sinopse,
            autores.nome_completo AS autor,
            generos.nome AS genero
        FROM livros
        JOIN autores_has_livros
            ON livros.id = autores_has_livros.LIVROS_id
        JOIN autores
            ON autores.id = autores_has_livros.AUTORES_id
        JOIN livros_has_generos
            ON livros.id = livros_has_generos.LIVROS_id
        JOIN generos
            ON generos.id = livros_has_generos.GENEROS_id
        WHERE livros.id = ?
    `,[id]);

    return livros[0];
};

const criar = async (
    titulo,
    isbn,
    ano_publicacao,
    numero_paginas,
    sinopse
) => {
    const [livro] = await db.query(
        `INSERT INTO livros 
        (titulo, isbn, ano_publicacao, numero_paginas, sinopse)
        VALUES (?, ?, ?, ?, ?)`,
        [
            titulo,
            isbn,
            ano_publicacao,
            numero_paginas,
            sinopse
        ]
    );

    return {
        id: livro.insertId,
        titulo,
        isbn,
        ano_publicacao,
        numero_paginas,
        sinopse
    };
};

const editar = async (
    id,
    titulo,
    isbn,
    ano_publicacao,
    numero_paginas,
    sinopse
) => {
    await db.query(
        `UPDATE livros 
        SET titulo = ?,
            isbn = ?,
            ano_publicacao = ?,
            numero_paginas = ?,
            sinopse = ?
        WHERE id = ?`,
        [
            titulo,
            isbn,
            ano_publicacao,
            numero_paginas,
            sinopse,
            id
        ]
    );

    return {
        id,
        titulo,
        isbn,
        ano_publicacao,
        numero_paginas,
        sinopse
    };
};

const excluir = async (id) => {
    const [resultado] = await db.query(
        "DELETE FROM livros WHERE id = ?",
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

