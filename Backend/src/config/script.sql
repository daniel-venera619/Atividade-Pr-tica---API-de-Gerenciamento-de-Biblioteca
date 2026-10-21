DROP DATABASE IF EXISTS biblioteca;
CREATE DATABASE biblioteca;
USE biblioteca;

-- =========================================
-- CREATION OF TABLES
-- =========================================

CREATE TABLE autores (
    id INT AUTO_INCREMENT PRIMARY KEY,
    nome_completo VARCHAR(150) NOT NULL,
    nacionalidade VARCHAR(80),
    data_nascimento DATE
);

CREATE TABLE livros (
    id INT AUTO_INCREMENT PRIMARY KEY,
    titulo VARCHAR(200) NOT NULL,
    isbn VARCHAR(20) NOT NULL,
    ano_publicacao INT, -- Alterado de SMALLINT para INT conforme o diagrama
    numero_paginas INT,
    sinopse TEXT,
    CONSTRAINT isbn_UNIQUE UNIQUE (isbn)
);

CREATE TABLE generos (
    id INT AUTO_INCREMENT PRIMARY KEY,
    nome VARCHAR(80) NOT NULL
);

CREATE TABLE usuarios (
    id INT AUTO_INCREMENT PRIMARY KEY, -- Adicionado conforme o diagrama
	
    -- Campos estruturados para criptografia do CPF (ex: AES-GCM)
    cpf VARBINARY(32) NOT NULL,
    cpf_iv BINARY(12) NOT NULL,
    cpf_tag BINARY(16) NOT NULL,
	 
     -- Dados cadastrais do usuário
	nome_completo VARCHAR(150) NOT NULL,
    data_aniversario DATE NOT NULL,
    email VARCHAR(200) NOT NULL UNIQUE,
    phone_number BIGINT NOT NULL UNIQUE,
	
    -- Campos estruturados para segurança de senha (Hashing + Salt)
    senha_hash BINARY(64) NOT NULL,
    senha_salt BINARY(16) NOT NULL
    
   
);

-- =========================================
-- TABLES OF RELATIONSHIPS (N:M and 1:N)
-- =========================================

CREATE TABLE autores_has_livros (
    AUTORES_id INT NOT NULL,
    LIVROS_id INT NOT NULL,
    PRIMARY KEY (AUTORES_id, LIVROS_id),
    FOREIGN KEY (AUTORES_id) REFERENCES autores(id) ON DELETE CASCADE,
    FOREIGN KEY (LIVROS_id) REFERENCES livros(id) ON DELETE CASCADE
);

CREATE TABLE livros_has_generos (
    LIVROS_id INT NOT NULL,
    GENEROS_id INT NOT NULL,
    PRIMARY KEY (LIVROS_id, GENEROS_id),
    FOREIGN KEY (LIVROS_id) REFERENCES livros(id) ON DELETE CASCADE,
    FOREIGN KEY (GENEROS_id) REFERENCES generos(id) ON DELETE CASCADE
);

CREATE TABLE emprestimos (
    id INT AUTO_INCREMENT PRIMARY KEY,
    data_emprestimos DATE NOT NULL,
    data_devolucao DATE,
    USUARIOS_id INT NOT NULL,
    LIVROS_id INT NOT NULL,
    FOREIGN KEY (USUARIOS_id) REFERENCES usuarios(id),
    FOREIGN KEY (LIVROS_id) REFERENCES livros(id)
);

-- =========================================
-- INSERINDO AUTORES
-- =========================================

INSERT INTO autores (nome_completo, nacionalidade, data_nascimento) VALUES
('Machado de Assis', 'Brasileira', '1839-06-21'),  -- ID 1
('Jorge Amado', 'Brasileira', '1912-08-10'),      -- ID 2
('Clarice Lispector', 'Brasileira', '1920-12-10'),  -- ID 3
('J. K. Rowling', 'Britânica', '1965-07-31'),      -- ID 4
('George Orwell', 'Britânica', '1903-06-25');      -- ID 5

-- =========================================
-- INSERINDO LIVROS
-- =========================================

INSERT INTO livros (titulo, isbn, ano_publicacao, numero_paginas, sinopse) VALUES
('Dom Casmurro', '9788535910663', 1899, 256, 'Romance que narra a história de Bentinho e Capitu.'), -- ID 1
('Capitães da Areia', '9788535911691', 1937, 280, 'História de um grupo de meninos que vivem nas ruas de Salvador.'), -- ID 2
('A Hora da Estrela', '9788532508126', 1977, 96, 'Narrativa sobre a vida de Macabéa, uma jovem nordestina no Rio de Janeiro.'), -- ID 3
('Harry Potter e a Pedra Filosofal', '9788532511010', 1997, 264, 'Primeiro livro da série Harry Potter.'), -- ID 4
('1984', '9780451524935', 1949, 328, 'Romance distópico sobre uma sociedade controlada por um governo totalitário.'); -- ID 5

-- =========================================
-- INSERINDO GÊNEROS
-- =========================================

INSERT INTO generos (nome) VALUES
('Romance'),             -- ID 1
('Drama'),               -- ID 2
('Fantasia'),            -- ID 3
('Ficção científica'),   -- ID 4
('Distopia'),            -- ID 5
('Literatura brasileira'),-- ID 6
('Aventura');            -- ID 7

-- =========================================
-- INSERINDO USUÁRIOS
-- =========================================

-- INSERT INTO usuarios (nome_completo, cpf, email, telefone, data_nascimento) VALUES
-- ('João da Silva', '123.456.789-00', 'joao@gmail.com', '47999999999', '1998-05-15'), -- ID 1
-- ('Maria Oliveira', '987.654.321-00', 'maria@gmail.com', '47988888888', '2000-08-20'), -- ID 2
-- ('Pedro Santos', '456.789.123-00', 'pedro@gmail.com', '47977777777', '1995-03-10'), -- ID 3
-- ('Ana Souza', '321.654.987-00', 'ana@gmail.com', '47966666666', '2002-11-25'); -- ID 4

-- =========================================
-- VÍNCULO: AUTORES E LIVROS (autores_has_livros)
-- =========================================

INSERT INTO autores_has_livros (AUTORES_id, LIVROS_id) VALUES
(1, 1), -- Machado de Assis -> Dom Casmurro
(2, 2), -- Jorge Amado -> Capitães da Areia
(3, 3), -- Clarice Lispector -> A Hora da Estrela
(4, 4), -- J. K. Rowling -> Harry Potter
(5, 5); -- George Orwell -> 1984

-- =========================================
-- VÍNCULO: LIVROS E GÊNEROS (livros_has_generos)
-- =========================================

INSERT INTO livros_has_generos (LIVROS_id, GENEROS_id) VALUES
(1, 1), (1, 6), -- Dom Casmurro -> Romance, Literatura brasileira
(2, 2), (2, 6), -- Capitães da Areia -> Drama, Literatura brasileira
(3, 2), (3, 6), -- A Hora da Estrela -> Drama, Literatura brasileira
(4, 3), (4, 7), -- Harry Potter -> Fantasia, Aventura
(5, 4), (5, 5); -- 1984 -> Ficção científica, Distopia

-- =========================================
-- SIMULAÇÃO DE EMPRÉSTIMOS (emprestimos)
-- =========================================

INSERT INTO emprestimos (data_emprestimos, data_devolucao, USUARIOS_id, LIVROS_id) VALUES
('2026-03-01', '2026-03-15', 1, 4), -- João pegou Harry Potter (Já devolvido)
('2026-03-10', NULL, 2, 5),         -- Maria pegou 1984 (Ainda não devolveu)
('2026-03-12', NULL, 3, 1);         -- Pedro pegou Dom Casmurro (Ainda não devolveu)

-- Exemplos para adicionar usuarios no postman

-- Exemplo 1

{
  "nomeCompleto": "Daniel Venera",
  "dataAniversario": "1995-10-19",
  "email": "daniel.venera@email.com",
  "telefone": 47999999999,
  "cpf": "12345678901",
  "senha": "MinhaSenha123"
}

-- Exemplo 2

{
  "nomeCompleto": "Mariana Costa",
  "dataAniversario": "1998-04-12",
  "email": "mariana.costa@example.com",
  "telefone": 47988887777,
  "cpf": "52984173620",
  "senha": "MarianaTeste456!"
}

-- Exemplo 3

{
  "nomeCompleto": "Lucas Ferreira",
  "dataAniversario": "2001-07-23",
  "email": "lucas.ferreira@example.com",
  "telefone": 48977776666,
  "cpf": "68421957305",
  "senha": "LucasTeste789!"
}

-- Exemplo 4

{
  "nomeCompleto": "Beatriz Almeida",
  "dataAniversario": "1996-11-08",
  "email": "beatriz.almeida@example.com",
  "telefone": 47966665555,
  "cpf": "31758294601",
  "senha": "BeatrizTeste321!"
}

-- Exemplo de Criação de emprestimo com validação de senha

{
  "data_emprestimos": "2026-10-20",
  "data_devolucao": null,
  "USUARIOS_id": 1,
  "LIVROS_id": 4,
  "senha": "MinhaSenha123"
}