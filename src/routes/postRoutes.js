
const express = require("express");
const router = express.Router();

const autenticar = require("../middlewares/authMiddleware");
const verificarProfessor = require("../middlewares/professorMiddleware");

const {
    listarPosts,
    criarPost,
    buscarPost,
    buscarPorTermo,
    atualizarPost,
    deletarPost
} = require("../controllers/postController");

console.log("ROTAS CARREGADAS");

// LISTAGEM E BUSCA
router.get("/posts", listarPosts);
router.get("/posts/buscar", buscarPorTermo);
router.get("/posts/:id", buscarPost);

// SOMENTE PROFESSORES
router.post("/posts", autenticar, verificarProfessor, criarPost);
router.put("/posts/:id", autenticar, verificarProfessor, atualizarPost);
router.delete("/posts/:id", autenticar, verificarProfessor, deletarPost);

module.exports = router;
