# 📚 Blog API - Tech Challenge FIAP

## 📌 Sobre o projeto

Este projeto foi desenvolvido como parte do **Tech Challenge da FIAP**, no curso de **Full Stack Development**.

O desafio consiste na criação de uma aplicação de blogging para auxiliar professores e professoras da rede pública de educação a compartilharem aulas e conteúdos de forma prática, centralizada e tecnológica.

A aplicação foi refatorada utilizando **Node.js** no back-end, com persistência de dados em banco **MongoDB**, disponibilizando uma API REST completa para gerenciamento de postagens.

---

# 🚀 Tecnologias utilizadas

## Back-end

- Node.js
- Express.js
- Mongoose

## Banco de dados

- MongoDB Atlas

## Testes

- Jest
- Supertest

## DevOps

- Docker
- GitHub Actions

---

# 🏗️ Arquitetura da aplicação

A aplicação foi organizada utilizando separação de responsabilidades:

```
blog-api
│
├── src
│   │
│   ├── config
│   │   └── database.js
│   │
│   ├── controllers
│   │   └── postController.js
│   │
│   ├── models
│   │   └── Post.js
│   │
│   ├── routes
│   │   └── postRoutes.js
│   │
│   ├── app.js
│   └── server.js
│
├── tests
│   └── post.test.js
│
├── Dockerfile
├── package.json
└── README.md
```

### Camadas da aplicação

**Routes**
- Responsáveis pela definição dos endpoints da API.

**Controllers**
- Contêm as regras de negócio e processamento das requisições.

**Models**
- Definem a estrutura dos dados armazenados no MongoDB.

**Config**
- Responsável pela configuração da conexão com o banco de dados.

---

# ⚙️ Funcionalidades da API

A aplicação permite o gerenciamento completo de posts.

## 📄 Listar todas as postagens

### GET `/posts`

Retorna todos os posts cadastrados.

---

## 🔎 Buscar postagem por ID

### GET `/posts/:id`

Retorna uma postagem específica através do seu identificador.

---

## ✏️ Criar uma postagem

### POST `/posts`

Permite que professores criem novas postagens.

Exemplo de requisição:

```json
{
  "titulo": "Aula de Node.js",
  "conteudo": "Aprendendo criação de APIs REST",
  "autor": "Natália"
}
```

---

## 📝 Atualizar uma postagem

### PUT `/posts/:id`

Permite editar uma postagem existente.

---

## 🗑️ Excluir uma postagem

### DELETE `/posts/:id`

Remove uma postagem utilizando seu ID.

---

## 🔍 Buscar posts por palavra-chave

### GET `/posts/search?termo=node`

Permite buscar conteúdos pelo título ou texto da postagem.

Exemplo:

```
GET /posts/search?termo=node
```

---

# 🔐 Configuração do ambiente

Crie um arquivo chamado:

```
.env
```

Na raiz do projeto.

Adicione sua conexão com o MongoDB:

```env
MONGO_URI=sua_string_de_conexao_mongodb
```

---

# 💻 Como executar o projeto localmente

## 1. Clonar o repositório

```bash
git clone https://github.com/Nathhh-S2/blog-api.git
```

## 2. Entrar na pasta do projeto

```bash
cd blog-api
```

## 3. Instalar dependências

```bash
npm install
```

## 4. Executar a aplicação

```bash
node src/server.js
```

A API estará disponível em:

```
http://localhost:3000
```

---

# 🐳 Executando com Docker

## Criar a imagem

```bash
docker build -t blog-api .
```

## Executar o container

```bash
docker run -p 3000:3000 blog-api
```

A aplicação ficará disponível em:

```
http://localhost:3000
```

---

# 🧪 Testes automatizados

O projeto possui testes automatizados utilizando Jest e Supertest.

Executar testes:

```bash
npm test
```

Executar testes com relatório de cobertura:

```bash
npm test -- --coverage
```

## Cobertura de testes

A aplicação possui cobertura superior ao requisito mínimo solicitado:

```
Cobertura atual: 66%
```

Foram testados endpoints como:

- GET /posts
- POST /posts
- GET /posts/:id
- DELETE /posts/:id

---

# 🔄 Integração Contínua (CI/CD)

O projeto utiliza **GitHub Actions** para automatizar processos de validação.

A cada atualização enviada para a branch principal:

- O código é baixado;
- O ambiente Node.js é configurado;
- As dependências são instaladas;
- Os testes automatizados são executados.

O pipeline garante maior segurança e qualidade nas alterações realizadas.

---

# 🧩 Desafios encontrados

Durante o desenvolvimento do projeto, alguns desafios foram enfrentados:

- Configuração da conexão com MongoDB Atlas;
- Organização da arquitetura da API;
- Implementação do CRUD completo;
- Criação dos testes automatizados;
- Configuração do ambiente Docker;
- Implementação do workflow de integração contínua com GitHub Actions.

---

# 🎯 Objetivos alcançados

Com este projeto foi possível aplicar conhecimentos de:

- Desenvolvimento de APIs REST;
- Node.js e Express;
- Banco de dados NoSQL;
- Arquitetura de aplicações backend;
- Testes automatizados;
- Containerização com Docker;
- Automação de processos com CI/CD.

---

# 👩‍💻 Autora

**Natália**

Projeto desenvolvido para o **Tech Challenge FIAP - Full Stack Development**.