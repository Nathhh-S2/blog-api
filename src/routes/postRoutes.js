const express = require("express");

const router = express.Router();

const autenticar = require("../middlewares/authMiddleware");

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
router.get("/posts/:id", buscarPost);

router.post("/posts", autenticar, criarPost);
router.put("/posts/:id", autenticar, atualizarPost);
router.delete("/posts/:id", autenticar, deletarPost);

module.exports = router;