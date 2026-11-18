
const express = require("express");

const router = express.Router();

const {
    cadastrar,
    login
} = require("../controllers/authController");

const autenticar = require("../middlewares/authMiddleware");
const verificarProfessor = require("../middlewares/professorMiddleware");

// CADASTRO - SOMENTE PROFESSORES AUTENTICADOS
router.post(
    "/auth/cadastro",
    autenticar,
    verificarProfessor,
    cadastrar
);

// LOGIN - ACESSO PUBLICO
router.post("/auth/login", login);

module.exports = router;
