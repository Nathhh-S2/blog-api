let idPost;

const request = require("supertest");
const mongoose = require("mongoose");
const { MongoMemoryServer } = require("mongodb-memory-server");

const app = require("../src/app");

let mongoServer;


beforeAll(async () => {

    mongoServer = await MongoMemoryServer.create();

    const uri = mongoServer.getUri();

    await mongoose.connect(uri);

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

});

test("POST /posts deve criar um post", async () => {

    const resposta = await request(app)
        .post("/posts")
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
        .delete(`/posts/${idPost}`);


    expect(resposta.statusCode).toBe(200);

    expect(resposta.body.mensagem)
        .toBe("Post removido com sucesso");

});