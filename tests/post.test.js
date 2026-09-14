let idPost;
let token;

const request = require("supertest");
const mongoose = require("mongoose");
const { MongoMemoryServer } = require("mongodb-memory-server");

const app = require("../src/app");

let mongoServer;

beforeAll(async () => {
    mongoServer = await MongoMemoryServer.create();

    const uri = mongoServer.getUri();

    await mongoose.connect(uri);

    // Cria um professor para realizar os testes de autenticação
    await request(app)
        .post("/auth/cadastro")
        .send({
            nome: "Professor Teste",
            email: "professor@teste.com",
            senha: "123456"
        });

    // Faz login para obter o token JWT
    const respostaLogin = await request(app)
        .post("/auth/login")
        .send({
            email: "professor@teste.com",
            senha: "123456"
        });

    token = respostaLogin.body.token;
});

afterAll(async () => {
    await mongoose.connection.close();
    await mongoServer.stop();
});

describe("Testes da API de Posts", () => {

    test("GET /posts deve retornar lista de posts", async () => {
        const resposta = await request(app)
            .get("/posts");

        expect(resposta.statusCode).toBe(200);
        expect(Array.isArray(resposta.body)).toBe(true);
    });

    test("POST /posts deve criar um post", async () => {
        const resposta = await request(app)
            .post("/posts")
            .set("Authorization", `Bearer ${token}`)
            .send({
                titulo: "Teste de criação",
                conteudo: "Criando post pelo teste",
                autor: "Natália"
            });

        expect(resposta.statusCode).toBe(201);

        idPost = resposta.body._id;

        expect(resposta.body.titulo)
            .toBe("Teste de criação");
    });

    test("GET /posts/:id deve buscar um post", async () => {
        const resposta = await request(app)
            .get(`/posts/${idPost}`);

        expect(resposta.statusCode).toBe(200);

        expect(resposta.body._id)
            .toBe(idPost);
    });

    test("DELETE /posts/:id deve remover um post", async () => {
        const resposta = await request(app)
            .delete(`/posts/${idPost}`)
            .set("Authorization", `Bearer ${token}`);

        expect(resposta.statusCode).toBe(200);

        expect(resposta.body.mensagem)
            .toBe("Post removido com sucesso");
    });
});