# 📚 API Biblioteca

## 📌 Sobre o projeto

Este projeto consiste em uma API REST para gerenciamento de uma biblioteca.

A API permite realizar operações de cadastro, consulta, atualização e exclusão de:

- Autores
- Livros
- Gêneros
- Usuários
- Empréstimos

O projeto utiliza uma arquitetura organizada em **Models, Controllers e Routes**.

Também são utilizados relacionamentos entre as tabelas do banco de dados por meio de `INNER JOIN`.

---

## 🛠️ Tecnologias

- Node.js
- vscode
- Express
- MySQL
- MySQL2
- JavaScript
- dotenv
    dotenv": "^18.0.5",
        "express": "^5.2.1",
        "mysql2": "^3.24.5",
        "node": "^22.23.3",
        "nodemon": "^3.1.14"
- Postman ou Insomnia

---

## 📦 Instalação

### 1. Clonar o projeto
bash
git clone URL_DO_REPOSITORIO
### 2. Entrar na pasta do projeto
cd biblioteca
### 3. Instalar as dependências
npm install

## Caso seja necessário instalar manualmente:
npm install express mysql2 dotenv

---

## ⚙️ Configuração
Na raiz do projeto, crie um arquivo chamado:
.env

Adicione as configurações do banco de dados:

DB_HOST=localhost
DB_USER=root
DB_PASSWORD=sua_senha
DB_NAME=biblioteca
DB_PORT=3306

Altere os valores de acordo com a configuração do MySQL da sua máquina.

O arquivo .env não deve ser enviado para o GitHub.

Adicione ao .gitignore:

.env
node_modules/

## 🗄️ Banco de dados

O projeto utiliza o banco de dados MySQL.

Nome do banco:

biblioteca

Para criar o banco, execute o arquivo SQL disponibilizado no projeto.

O banco possui as seguintes tabelas:

autores
livros
generos
usuarios
emprestimos
autores_has_livros
livros_has_generos

### Relacionamento entre autores e livros
autores
    ↓
autores_has_livros
    ↓
livros

Relacionamento entre livros e gêneros
livros
    ↓
livros_has_generos
    ↓
generos

Relacionamento entre usuários, empréstimos e livros
usuarios
    ↓
emprestimos
    ↓
livros

## 🔗 INNER JOIN

O projeto utiliza INNER JOIN para consultar informações relacionadas entre as tabelas.

Livros, autores e gêneros

Exemplo:

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
    ON generos.id = livros_has_generos.GENEROS_id;

Empréstimos, usuários e livros

Exemplo:

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
    ON emprestimos.LIVROS_id = livros.id;

## ▶️ Execução

Após instalar as dependências e configurar o banco de dados, execute a aplicação.

Caso o projeto utilize server.js:

node server.js


Ou, caso exista o script start no package.json:

npm start


A API estará disponível em:

http://localhost:3000

🚀 Endpoints
👨‍💼 Autores
Listar autores

GET
/autores

Retorna todos os autores cadastrados.
Buscar autor por ID

GET
/autores/:id

Parâmetro:
id - ID do autor


Exemplo:
GET /autores/1


Exemplo de resposta:
{
    "id": 1,
    "nome_completo": "Machado de Assis",
    "nacionalidade": "Brasileira",
    "data_nascimento": "1839-06-21"
}

Criar autor

POST
/autores

Corpo da requisição:

{
    "nome_completo": "Machado de Assis",
    "nacionalidade": "Brasileira",
    "data_nascimento": "1839-06-21"
}

Atualizar autor

PUT
/autores/:id


Exemplo:
PUT /autores/1


Corpo:
{
    "nome_completo": "Machado de Assis",
    "nacionalidade": "Brasileira",
    "data_nascimento": "1839-06-21"
}

Excluir autor

DELETE
/autores/:id


Exemplo:
DELETE /autores/1

## 📖 Livros
Listar livros

GET
/livros

Retorna os livros cadastrados, juntamente com informações relacionadas aos autores e gêneros utilizando INNER JOIN.

Exemplo de resposta:
{
    "id": 1,
    "titulo": "Dom Casmurro",
    "isbn": "9788535910663",
    "ano_publicacao": 1899,
    "numero_paginas": 256,
    "sinopse": "Romance que narra a história de Bentinho e Capitu.",
    "autor": "Machado de Assis",
    "genero": "Romance"
}

Buscar livro por ID

GET
/livros/:id


Parâmetro:
id - ID do livro


Exemplo:
GET /livros/1

Criar livro

POST
/livros


Corpo da requisição:

{
    "titulo": "Dom Casmurro",
    "isbn": "9788535910663",
    "ano_publicacao": 1899,
    "numero_paginas": 256,
    "sinopse": "Romance que narra a história de Bentinho e Capitu."
}

Atualizar livro

PUT
/livros/:id


Exemplo:
PUT /livros/1


Corpo:
{
    "titulo": "Dom Casmurro",
    "isbn": "9788535910663",
    "ano_publicacao": 1899,
    "numero_paginas": 256,
    "sinopse": "Romance brasileiro."
}

Excluir livro

DELETE
/livros/:id


Exemplo:
DELETE /livros/1

## 🏷️ Gêneros
Listar gêneros

GET
/generos


Retorna todos os gêneros cadastrados.

Buscar gênero por ID

GET
/generos/:id


Exemplo:
GET /generos/1

Criar gênero

POST
/generos


Corpo da requisição:
{
    "nome": "Romance"
}

Atualizar gênero

PUT
/generos/:id


Exemplo:
PUT /generos/1


Corpo:
{
    "nome": "Romance"
}

Excluir gênero

DELETE
/generos/:id


Exemplo:
DELETE /generos/1

## 👤 Usuários
Listar usuários

GET
/usuarios

Retorna todos os usuários cadastrados.

Buscar usuário por ID

GET
/usuarios/:id


Parâmetro:
id - ID do usuário


Exemplo:
GET /usuarios/1

Exemplo de resposta:
{
    "id": 1,
    "nome_completo": "João da Silva",
    "cpf": "123.456.789-00",
    "email": "joao@gmail.com",
    "telefone": "47999999999",
    "data_nascimento": "1998-05-15"
}

Criar usuário

POST
/usuarios


Corpo da requisição:
{
    "nome_completo": "Carlos Silva",
    "cpf": "111.222.333-44",
    "email": "carlos@gmail.com",
    "telefone": "47955555555",
    "data_nascimento": "1999-10-15"
}

Atualizar usuário

PUT
/usuarios/:id


Exemplo:
PUT /usuarios/1


Corpo:
{
    "nome_completo": "João da Silva Santos",
    "cpf": "123.456.789-00",
    "email": "joao@gmail.com",
    "telefone": "47999999999",
    "data_nascimento": "1998-05-15"
}

Excluir usuário

DELETE
/usuarios/:id


Exemplo:
DELETE /usuarios/1

## 📚 Empréstimos
Listar empréstimos

GET
/emprestimos


Retorna os empréstimos cadastrados.

A consulta utiliza INNER JOIN para mostrar o nome do usuário e o título do livro.

Exemplo de resposta:
{
    "id": 2,
    "data_emprestimos": "2026-03-10",
    "data_devolucao": null,
    "nome_completo": "Maria Oliveira",
    "titulo": "1984"
}

Buscar empréstimo por ID

GET
/emprestimos/:id


Parâmetro:
id - ID do empréstimo


Exemplo:
GET /emprestimos/1

Criar empréstimo

POST
/emprestimos


Corpo da requisição:
{
    "data_emprestimos": "2026-10-06",
    "data_devolucao": null,
    "USUARIOS_id": 1,
    "LIVROS_id": 4
}

Atualizar empréstimo

PUT
/emprestimos/:id


Exemplo:
PUT /emprestimos/2

Corpo:
{
    "data_emprestimos": "2026-10-06",
    "data_devolucao": "2026-10-20",
    "USUARIOS_id": 2,
    "LIVROS_id": 5
}

Excluir empréstimo

DELETE
/emprestimos/:id


Exemplo:
DELETE /emprestimos/1

## 📋 Resumo dos endpoints
Método	Endpoint	Finalidade
GET	/autores	Listar autores
GET	/autores/:id	Buscar autor por ID
POST	/autores	Criar autor
PUT	/autores/:id	Atualizar autor
DELETE	/autores/:id	Excluir autor
GET	/livros	Listar livros
GET	/livros/:id	Buscar livro por ID
POST	/livros	Criar livro
PUT	/livros/:id	Atualizar livro
DELETE	/livros/:id	Excluir livro
GET	/generos	Listar gêneros
GET	/generos/:id	Buscar gênero por ID
POST	/generos	Criar gênero
PUT	/generos/:id	Atualizar gênero
DELETE	/generos/:id	Excluir gênero
GET	/usuarios	Listar usuários
GET	/usuarios/:id	Buscar usuário por ID
POST	/usuarios	Criar usuário
PUT	/usuarios/:id	Atualizar usuário
DELETE	/usuarios/:id	Excluir usuário
GET	/emprestimos	Listar empréstimos
GET	/emprestimos/:id	Buscar empréstimo por ID
POST	/emprestimos	Criar empréstimo
PUT	/emprestimos/:id	Atualizar empréstimo
DELETE	/emprestimos/:id	Excluir empréstimo

## 👨‍💻 Estrutura do projeto
biblioteca/
│
├── config/
│   └── database.js
│
├── controllers/
│   ├── autoresController.js
│   ├── emprestimosController.js
│   ├── generosController.js
│   ├── livrosController.js
│   └── usuariosController.js
│
├── models/
│   ├── autoresModel.js
│   ├── emprestimosModel.js
│   ├── generosModel.js
│   ├── livrosModel.js
│   └── usuariosModel.js
│
├── routes/
│   ├── autoresRoutes.js
│   ├── emprestimosRoutes.js
│   ├── generosRoutes.js
│   ├── livrosRoutes.js
│   └── usuariosRoutes.js
│
├── .env
├── .gitignore
├── package.json
├── server.js
└── README.md

## ✅ Status do projeto

Projeto desenvolvido para fins acadêmicos, com implementação de uma API REST para gerenciamento de uma biblioteca utilizando Node.js, Express e MySQL.