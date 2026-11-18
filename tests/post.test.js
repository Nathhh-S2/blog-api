
const request = require("supertest");
const mongoose = require("mongoose");
const { MongoMemoryServer } = require("mongodb-memory-server");
const bcrypt = require("bcryptjs");

process.env.JWT_SECRET = "chave-exclusiva-para-testes";

const app = require("../src/app");
const User = require("../src/models/User");

let mongoServer;
let idPost;
let token;

beforeAll(async () => {
    mongoServer = await MongoMemoryServer.create();

    await mongoose.connect(mongoServer.getUri());

    // Cria um professor diretamente no banco de testes
    const senhaCriptografada = await bcrypt.hash("123456", 10);

    await User.create({
        nome: "Professor Teste",
        email: "professor@teste.com",
        senha: senhaCriptografada,
        tipo: "professor"
    });

    // Realiza o login para obter um token JWT válido
    const respostaLogin = await request(app)
        .post("/auth/login")
        .send({
            email: "professor@teste.com",
            senha: "123456"
        });

    expect(respostaLogin.statusCode).toBe(200);
    expect(respostaLogin.body.token).toBeDefined();

    token = respostaLogin.body.token;
});

afterAll(async () => {
    await mongoose.disconnect();

    if (mongoServer) {
        await mongoServer.stop();
    }
});

describe("Testes da API de Posts", () => {

    test("GET /posts deve retornar posts com paginação", async () => {
        const resposta = await request(app)
            .get("/posts");

        expect(resposta.statusCode).toBe(200);

        expect(Array.isArray(resposta.body.posts)).toBe(true);
        expect(resposta.body.pagina).toBe(1);
        expect(resposta.body.limite).toBe(10);
        expect(resposta.body.total).toBeDefined();
        expect(resposta.body.totalPaginas).toBeDefined();
    });

    test("POST /posts deve criar um post", async () => {
        const resposta = await request(app)
            .post("/posts")
            .set("Authorization", `Bearer ${token}`)
            .send({
                titulo: "Teste de criacao",
                conteudo: "Criando post pelo teste",
                autor: "Professor Teste"
            });

        expect(resposta.statusCode).toBe(201);

        expect(resposta.body.titulo).toBe("Teste de criacao");

        idPost = resposta.body._id;
        expect(idPost).toBeDefined();
    });

    test("GET /posts/:id deve buscar um post", async () => {
        const resposta = await request(app)
            .get(`/posts/${idPost}`);

        expect(resposta.statusCode).toBe(200);
        expect(resposta.body._id).toBe(idPost);
    });

    test("DELETE /posts/:id deve remover um post", async () => {
        const resposta = await request(app)
            .delete(`/posts/${idPost}`)
            .set("Authorization", `Bearer ${token}`);

        expect(resposta.statusCode).toBe(200);

        expect(resposta.body.mensagem)
            .toBe("Post removido com sucesso");
    });

    test("POST /posts sem token deve ser bloqueado", async () => {
        const resposta = await request(app)
            .post("/posts")
            .send({
                titulo: "Post nao autorizado",
                conteudo: "Teste de seguranca",
                autor: "Visitante"
            });

        expect(resposta.statusCode).toBe(401);
    });
});
