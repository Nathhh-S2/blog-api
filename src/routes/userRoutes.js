
const express = require("express");
const router = express.Router();

const {
    listarUsuarios,
    cadastrarUsuario,
    atualizarUsuario,
    deletarUsuario
} = require("../controllers/userController");

const autenticar = require("../middlewares/authMiddleware");
const verificarProfessor = require("../middlewares/professorMiddleware");

// PROTEGER TODAS AS ROTAS DE USUÁRIOS
router.use(autenticar);
router.use(verificarProfessor);

// LISTAR PROFESSORES E ESTUDANTES
router.get("/", listarUsuarios);

// CADASTRAR PROFESSORES E ESTUDANTES
router.post("/:tipo", cadastrarUsuario);

// EDITAR PROFESSORES E ESTUDANTES
router.put("/:tipo/:id", atualizarUsuario);

// EXCLUIR PROFESSORES E ESTUDANTES
router.delete("/:tipo/:id", deletarUsuario);

module.exports = router;

