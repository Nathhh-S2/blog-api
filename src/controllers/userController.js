
const User = require("../models/User");
const bcrypt = require("bcryptjs");

// LISTAR USUÁRIOS COM PAGINAÇÃO
const listarUsuarios = async (req, res) => {
    try {
        const tipo = req.query.tipo;

        if (!["professor", "estudante"].includes(tipo)) {
            return res.status(400).json({
                mensagem: "Tipo de usuário inválido"
            });
        }

        const pagina = Math.max(1, parseInt(req.query.pagina) || 1);
        const limite = Math.min(100, Math.max(1, parseInt(req.query.limite) || 10));

        const filtro = { tipo };

        const total = await User.countDocuments(filtro);

        const usuarios = await User.find(filtro)
            .select("-senha")
            .sort({ nome: 1 })
            .skip((pagina - 1) * limite)
            .limit(limite);

        res.json({
            usuarios,
            pagina,
            limite,
            total,
            totalPaginas: Math.ceil(total / limite)
        });

    } catch (erro) {
        res.status(500).json({
            mensagem: "Erro ao listar usuários"
        });
    }
};

// CADASTRAR USUÁRIO
const cadastrarUsuario = async (req, res) => {
    try {
        const { nome, email, senha } = req.body;
        const tipo = req.params.tipo;

        if (!["professor", "estudante"].includes(tipo)) {
            return res.status(400).json({
                mensagem: "Tipo de usuário inválido"
            });
        }

        if (!nome || !email || !senha) {
            return res.status(400).json({
                mensagem: "Preencha nome, email e senha"
            });
        }

        if (senha.length < 6) {
            return res.status(400).json({
                mensagem: "A senha deve ter pelo menos 6 caracteres"
            });
        }

        const emailNormalizado = email.trim().toLowerCase();

        const existente = await User.findOne({
            email: emailNormalizado
        });

        if (existente) {
            return res.status(400).json({
                mensagem: "Este email já está cadastrado"
            });
        }

        const senhaCriptografada = await bcrypt.hash(senha, 10);

        const usuario = await User.create({
            nome: nome.trim(),
            email: emailNormalizado,
            senha: senhaCriptografada,
            tipo
        });

        res.status(201).json({
            mensagem: "Usuário cadastrado com sucesso",
            usuario: {
                id: usuario._id,
                nome: usuario.nome,
                email: usuario.email,
                tipo: usuario.tipo
            }
        });

    } catch (erro) {
        res.status(500).json({
            mensagem: "Erro ao cadastrar usuário"
        });
    }
};

// EDITAR USUÁRIO
const atualizarUsuario = async (req, res) => {
    try {
        const { nome, email, senha } = req.body;
        const tipo = req.params.tipo;

        if (!["professor", "estudante"].includes(tipo)) {
            return res.status(400).json({
                mensagem: "Tipo de usuário inválido"
            });
        }

        const usuario = await User.findOne({
            _id: req.params.id,
            tipo
        });

        if (!usuario) {
            return res.status(404).json({
                mensagem: "Usuário não encontrado"
            });
        }

        if (nome !== undefined) {
            if (!nome.trim()) {
                return res.status(400).json({
                    mensagem: "O nome não pode ficar vazio"
                });
            }

            usuario.nome = nome.trim();
        }

        if (email !== undefined) {
            const emailNormalizado = email.trim().toLowerCase();

            const emailExistente = await User.findOne({
                email: emailNormalizado,
                _id: { $ne: usuario._id }
            });

            if (emailExistente) {
                return res.status(400).json({
                    mensagem: "Este email já está cadastrado"
                });
            }

            usuario.email = emailNormalizado;
        }

        if (senha !== undefined) {
            if (senha.length < 6) {
                return res.status(400).json({
                    mensagem: "A senha deve ter pelo menos 6 caracteres"
                });
            }

            usuario.senha = await bcrypt.hash(senha, 10);
        }

        await usuario.save();

        res.json({
            mensagem: "Usuário atualizado com sucesso",
            usuario: {
                id: usuario._id,
                nome: usuario.nome,
                email: usuario.email,
                tipo: usuario.tipo
            }
        });

    } catch (erro) {
        res.status(500).json({
            mensagem: "Erro ao atualizar usuário"
        });
    }
};

// EXCLUIR USUÁRIO
const deletarUsuario = async (req, res) => {
    try {
        const usuario = await User.findOneAndDelete({
            _id: req.params.id,
            tipo: req.params.tipo
        });

        if (!usuario) {
            return res.status(404).json({
                mensagem: "Usuário não encontrado"
            });
        }

        res.json({
            mensagem: "Usuário excluído com sucesso"
        });

    } catch (erro) {
        res.status(500).json({
            mensagem: "Erro ao excluir usuário"
        });
    }
};

module.exports = {
    listarUsuarios,
    cadastrarUsuario,
    atualizarUsuario,
    deletarUsuario
};
