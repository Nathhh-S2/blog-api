const express = require("express");

const router = express.Router();

const { 
    listarPosts,
    criarPost,
    buscarPost,
    buscarPorTermo,
    atualizarPost,
    deletarPost
} = require("../controllers/postController");

console.log("ROTAS CARREGADAS");

router.get("/posts", listarPosts);

router.get("/posts/search", buscarPorTermo);

router.post("/posts", criarPost);

router.get("/posts/:id", buscarPost);

router.put("/posts/:id", atualizarPost);

router.delete("/posts/:id", deletarPost);

module.exports = router;