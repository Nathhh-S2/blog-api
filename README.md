# 📚 Blog Escolar - Back-end

## 📌 Sobre o projeto

Projeto desenvolvido para o **Tech Challenge da FIAP - Full Stack Development**.

O back-end fornece uma API REST para gerenciamento das publicações do Blog Escolar.

A aplicação foi desenvolvida utilizando **Node.js**, **Express** e **MongoDB**.

## 🚀 Tecnologias

- Node.js
- Express
- MongoDB
- Mongoose
- JWT
- bcryptjs
- Jest
- Supertest
- Docker
- GitHub Actions

## ✨ Funcionalidades

### Posts

- Listar posts
- Buscar um post
- Criar post
- Editar post
- Excluir post
- Pesquisar posts

### Autenticação

- Cadastro de professor
- Login
- Autenticação com JWT
- Proteção das operações administrativas

## 🔗 Principais endpoints

| Método | Rota | Função |
|---|---|---|
| GET | /posts | Listar posts |
| GET | /posts/:id | Buscar post |
| POST | /posts | Criar post |
| PUT | /posts/:id | Editar post |
| DELETE | /posts/:id | Excluir post |
| POST | /auth/cadastro | Cadastrar professor |
| POST | /auth/login | Fazer login |

As operações de criação, edição e exclusão de posts exigem autenticação.

## 🗂️ Estrutura

blog-api/

- src/
  - config/
  - controllers/
  - middlewares/
  - models/
  - routes/
  - app.js
  - server.js
- tests/
- Dockerfile
- package.json
- README.md

## 🔐 Variáveis de ambiente

O projeto utiliza um arquivo `.env` para armazenar configurações privadas.

Exemplo:

MONGODB_URI=sua_url_do_mongodb

JWT_SECRET=sua_chave_secreta

O arquivo `.env` não deve ser enviado para o GitHub.

## ▶️ Executar localmente

Instalar as dependências:

npm install

Iniciar o servidor:

node src/server.js

A API ficará disponível em:

http://localhost:3000

## 🧪 Testes

Para executar os testes:

npm test

## 🐳 Docker

Para criar a imagem:

docker build -t blog-api .

Para executar:

docker run --env-file .env -p 3000:3000 blog-api

## 🔗 Repositórios

**Back-end:**

https://github.com/Nathhh-S2/blog-api

**Front-end:**

https://github.com/Nathhh-S2/blog-frontend

## 👩‍💻 Autoria

**Natália**

Tech Challenge — FIAP  
Full Stack Development