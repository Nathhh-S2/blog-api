const express = require("express");

const router = express.Router();

const {
    cadastrar,
    login
} = require("../controllers/authController");

router.post("/auth/cadastro", cadastrar);

router.post("/auth/login", login);

module.exports = router;