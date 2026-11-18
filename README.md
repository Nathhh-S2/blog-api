# 📚 Blog Escolar — API REST

## Tech Challenge | FIAP Pós-Tech — Full Stack Development

### Sobre o projeto

O Blog Escolar é uma plataforma educacional desenvolvida para facilitar o compartilhamento de conteúdos entre professores e estudantes.

O backend disponibiliza uma API REST para gerenciamento de postagens, autenticação e administração de usuários.

O projeto foi desenvolvido utilizando **Node.js, Express e MongoDB**, sendo posteriormente integrado a um aplicativo mobile desenvolvido com React Native e Expo durante o Tech Challenge da Fase 4.

## 1. Tecnologias utilizadas

- Node.js
- Express
- MongoDB Atlas
- Mongoose
- JSON Web Token (JWT)
- bcryptjs
- dotenv
- CORS
- Jest
- Supertest
- Docker
- Git e GitHub
- GitHub Actions

## 2. Funcionalidades

### Postagens

- Listar postagens.
- Pesquisar postagens.
- Consultar uma postagem completa.
- Criar postagens.
- Editar postagens.
- Excluir postagens.

### Autenticação

- Login de professores.
- Autenticação utilizando JWT.
- Validação de tokens.
- Controle de permissões.
- Proteção das operações administrativas.

### Gerenciamento de professores

- Cadastrar professores.
- Consultar professores cadastrados.
- Editar dados dos professores.
- Excluir professores.
- Listar professores com paginação.

### Gerenciamento de estudantes

- Cadastrar estudantes.
- Consultar estudantes cadastrados.
- Editar dados dos estudantes.
- Excluir estudantes.
- Listar estudantes com paginação.

## 3. Arquitetura

O sistema utiliza uma arquitetura cliente-servidor.

O aplicativo React Native realiza requisições HTTP à API REST.

A API Node.js/Express processa as requisições, aplica as regras de autenticação e autorização e utiliza o MongoDB para persistir os dados.

**Fluxo da aplicação:**

Aplicativo React Native → API REST Node.js/Express → MongoDB Atlas

O backend também pode ser utilizado por outros clientes HTTP, como o frontend web desenvolvido nas fases anteriores.

## 4. Estrutura do projeto

```text
blog-api/
├── src/
│   ├── config/
│   ├── controllers/
│   │   ├── postController.js
│   │   ├── authController.js
│   │   └── userController.js
│   ├── middlewares/
│   │   ├── authMiddleware.js
│   │   └── professorMiddleware.js
│   ├── models/
│   ├── routes/
│   │   ├── postRoutes.js
│   │   ├── authRoutes.js
│   │   └── userRoutes.js
│   ├── app.js
│   └── server.js
├── tests/
├── Dockerfile
├── package.json
└── README.md
```

## 5. Endpoints da API

### Postagens

| Método | Endpoint | Descrição |
|---|---|---|
| GET | `/posts` | Listar postagens |
| GET | `/posts/buscar` | Pesquisar postagens |
| GET | `/posts/:id` | Consultar uma postagem |
| POST | `/posts` | Criar postagem |
| PUT | `/posts/:id` | Atualizar postagem |
| DELETE | `/posts/:id` | Excluir postagem |

As operações POST, PUT e DELETE exigem autenticação e permissão de professor.

### Autenticação

| Método | Endpoint | Descrição |
|---|---|---|
| POST | `/auth/login` | Autenticar usuário |
| POST | `/auth/cadastro` | Cadastrar professor autenticado |

### Gerenciamento de usuários

| Método | Endpoint | Descrição |
|---|---|---|
| GET | `/api/usuarios?tipo=professor` | Listar professores |
| GET | `/api/usuarios?tipo=estudante` | Listar estudantes |
| POST | `/api/usuarios/:tipo` | Cadastrar usuário |
| PUT | `/api/usuarios/:tipo/:id` | Atualizar usuário |
| DELETE | `/api/usuarios/:tipo/:id` | Excluir usuário |

O parâmetro `:tipo` identifica o tipo de usuário, podendo ser `professor` ou `estudante`.

Todas as rotas `/api/usuarios` exigem autenticação JWT e permissão de professor.

### Paginação

As listagens de professores e estudantes aceitam os parâmetros:

- `tipo`: tipo de usuário.
- `pagina`: número da página.
- `limite`: quantidade de registros por página.

Exemplo:

```http
GET /api/usuarios?tipo=estudante&pagina=1&limite=20
```

A resposta inclui os usuários encontrados e informações como página atual, total de registros e total de páginas.

## 6. Segurança

A autenticação é implementada utilizando JSON Web Token (JWT).

O arquivo `authMiddleware.js` valida o token enviado nas requisições.

O arquivo `professorMiddleware.js` verifica se o usuário autenticado possui permissão de professor.

As rotas administrativas utilizam esses middlewares para impedir operações não autorizadas.

As senhas dos usuários são protegidas utilizando bcryptjs.

## 7. Como executar localmente

### Pré-requisitos

- Node.js e npm.
- Git.
- Acesso a uma instância MongoDB Atlas.
- Variáveis de ambiente configuradas.

### Clonar o repositório

```bash
git clone https://github.com/Nathhh-S2/blog-api.git
```

Acesse a pasta:

```bash
cd blog-api
```

### Instalar as dependências

```bash
npm install
```

### Configurar as variáveis de ambiente

Crie um arquivo `.env` na raiz do projeto, contendo:

```dotenv
MONGODB_URI=sua_string_de_conexao_mongodb
JWT_SECRET=sua_chave_secreta
```

Substitua os valores de exemplo pelas suas próprias configurações.

**Nunca publique o arquivo `.env` no GitHub.**

### Iniciar o servidor

```bash
node src/server.js
```

A API estará disponível em:

`http://localhost:3000`

Para testar a rota principal, acesse esse endereço no navegador.

## 8. Integração com o aplicativo mobile

O aplicativo React Native utiliza a API para:

- Consultar e pesquisar postagens.
- Exibir o conteúdo completo das aulas.
- Autenticar professores.
- Criar, editar e excluir postagens.
- Gerenciar professores e estudantes.
- Consultar listagens paginadas de usuários.

Durante os testes com Expo Go, o aplicativo acessa o backend pelo endereço IP local do computador.

O computador e o celular devem estar conectados à mesma rede e a API precisa estar em execução.

## 9. Testes

O projeto inclui uma estrutura de testes com Jest e Supertest.

Para executar os testes configurados:

```bash
npm test
```

## 10. Docker

Para construir a imagem:

```bash
docker build -t blog-api .
```

Para executar o contêiner:

```bash
docker run --env-file .env -p 3000:3000 blog-api
```

## 11. Desafios do desenvolvimento

Durante a evolução do projeto, foram trabalhados:

- Integração com MongoDB Atlas.
- Desenvolvimento de endpoints REST.
- Autenticação JWT.
- Controle de acesso por tipo de usuário.
- Operações CRUD.
- Paginação de registros.
- Integração entre backend e aplicativo mobile.
- Configuração de comunicação em rede local.
- Organização do código em controllers, models, routes e middlewares.

## 12. Repositórios

**Backend:**

https://github.com/Nathhh-S2/blog-api

**Frontend web:**

https://github.com/Nathhh-S2/blog-frontend

**Aplicativo mobile — Fase 4:**

https://github.com/Nathhh-S2/blog-mobile-

## 13. Autoria

**Natália**

Tech Challenge — FIAP Pós-Tech  
Full Stack Development