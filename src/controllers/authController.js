require("dotenv").config();

const User = require("../models/User");

const bcrypt = require("bcryptjs");

const jwt = require("jsonwebtoken");

const SECRET_KEY = process.env.JWT_SECRET;

// CADASTRAR PROFESSOR
const cadastrar = async (req, res) => {
    try {
        const { nome, email, senha } = req.body;

        if (!nome || !email || !senha) {
            return res.status(400).json({
                mensagem: "Nome, email e senha são obrigatórios"
            });
        }

        const usuarioExistente = await User.findOne({ email });

        if (usuarioExistente) {
            return res.status(400).json({
                mensagem: "Este email já está cadastrado"
            });
        }

        const senhaCriptografada = await bcrypt.hash(senha, 10);

        const novoUsuario = await User.create({
            nome,
            email,
            senha: senhaCriptografada,
            tipo: "professor"
        });

        res.status(201).json({
            mensagem: "Professor cadastrado com sucesso",
            usuario: {
                id: novoUsuario._id,
                nome: novoUsuario.nome,
                email: novoUsuario.email,
                tipo: novoUsuario.tipo
            }
        });

    } catch (erro) {
        console.log(erro);

        res.status(500).json({
            mensagem: "Erro ao cadastrar professor",
            erro: erro.message
        });
    }
};


// LOGIN
const login = async (req, res) => {
    try {
        const { email, senha } = req.body;

        if (!email || !senha) {
            return res.status(400).json({
                mensagem: "Email e senha são obrigatórios"
            });
        }

        const usuario = await User.findOne({ email });

        if (!usuario) {
            return res.status(401).json({
                mensagem: "Email ou senha inválidos"
            });
        }

        const senhaCorreta = await bcrypt.compare(senha, usuario.senha);

        if (!senhaCorreta) {
            return res.status(401).json({
                mensagem: "Email ou senha inválidos"
            });
        }

        const token = jwt.sign(
            {
                id: usuario._id,
                email: usuario.email,
                tipo: usuario.tipo
            },
            SECRET_KEY,
            {
                expiresIn: "2h"
            }
        );

        res.json({
            mensagem: "Login realizado com sucesso",
            token,
            usuario: {
                id: usuario._id,
                nome: usuario.nome,
                email: usuario.email,
                tipo: usuario.tipo
            }
        });

    } catch (erro) {
        console.log(erro);

        res.status(500).json({
            mensagem: "Erro ao realizar login",
            erro: erro.message
        });
    }
};


module.exports = {
    cadastrar,
    login
};