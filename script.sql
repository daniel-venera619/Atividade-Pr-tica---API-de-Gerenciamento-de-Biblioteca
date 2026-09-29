 DROP DATABASE IF EXISTS gerenciamentoDeBiblioteca;

CREATE DATABASE gerenciamentoDeBiblioteca;
USE gerenciamentoDeBiblioteca;

CREATE TABLE autores (
	id INT AUTO_INCREMENT PRIMARY KEY,
    nome_completo VARCHAR(150),
    nacionalidade VARCHAR(80),
    data_nascimento DATE
);


CREATE TABLE livros (
	id INT AUTO_INCREMENT PRIMARY KEY,
    titulo VARCHAR(200),
    isbn VARCHAR(20),
    ano_publicacao YEAR,
    numero_paginas INT,
    sinopse TEXT
);

CREATE TABLE generos (
	id INT AUTO_INCREMENT PRIMARY KEY,
    nome VARCHAR(80)
);

CREATE TABLE usuarios(
	nome_completo VARCHAR(150),
    cpf VARCHAR(20), 
    email VARCHAR(150), 
    telefone VARCHAR(20),
    data_nascimento DATE
);

-- =========================================
-- INSERINDO AUTORES
-- =========================================

INSERT INTO autores
(nome_completo, nacionalidade, data_nascimento)
VALUES
('Machado de Assis', 'Brasileira', '1839-06-21'),
('Jorge Amado', 'Brasileira', '1912-08-10'),
('Clarice Lispector', 'Brasileira', '1920-12-10'),
('J. K. Rowling', 'Britânica', '1965-07-31'),
('George Orwell', 'Britânica', '1903-06-25');


-- =========================================
-- INSERINDO LIVROS
-- =========================================

INSERT INTO livros
(titulo, isbn, ano_publicacao, numero_paginas, sinopse)
VALUES
(
    'Dom Casmurro',
    '9788535910663',
    1899,
    256,
    'Romance que narra a história de Bentinho e Capitu.'
),
(
    'Capitães da Areia',
    '9788535911691',
    1937,
    280,
    'História de um grupo de meninos que vivem nas ruas de Salvador.'
),
(
    'A Hora da Estrela',
    '9788532508126',
    1977,
    96,
    'Narrativa sobre a vida de Macabéa, uma jovem nordestina no Rio de Janeiro.'
),
(
    'Harry Potter e a Pedra Filosofal',
    '9788532511010',
    1997,
    264,
    'Primeiro livro da série Harry Potter.'
),
(
    '1984',
    '9780451524935',
    1949,
    328,
    'Romance distópico sobre uma sociedade controlada por um governo totalitário.'
);


-- =========================================
-- INSERINDO GÊNEROS
-- =========================================

INSERT INTO generos
(nome)
VALUES
('Romance'),
('Drama'),
('Fantasia'),
('Ficção científica'),
('Distopia'),
('Literatura brasileira'),
('Aventura');


-- =========================================
-- INSERINDO USUÁRIOS
-- =========================================

INSERT INTO usuarios
(nome_completo, cpf, email, telefone, data_nascimento)
VALUES
(
    'João da Silva',
    '123.456.789-00',
    'joao@gmail.com',
    '47999999999',
    '1998-05-15'
),
(
    'Maria Oliveira',
    '987.654.321-00',
    'maria@gmail.com',
    '47988888888',
    '2000-08-20'
),
(
    'Pedro Santos',
    '456.789.123-00',
    'pedro@gmail.com',
    '47977777777',
    '1995-03-10'
),
(
    'Ana Souza',
    '321.654.987-00',
    'ana@gmail.com',
    '47966666666',
    '2002-11-25'
);

ALTER TABLE livros
MODIFY ano_publicacao SMALLINT;

