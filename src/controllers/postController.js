
const Post = require("../models/Post");

// LISTAR POSTS COM PAGINAÇÃO E BUSCA
const listarPosts = async (req, res) => {
    try {
        const pagina = Math.max(1, parseInt(req.query.pagina) || 1);
        const limite = Math.min(100, Math.max(1, parseInt(req.query.limite) || 10));
        const termo = req.query.termo?.trim();

        const filtro = {};

        if (termo) {
            const termoSeguro = termo.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");

            filtro.$or = [
                { titulo: { $regex: termoSeguro, $options: "i" } },
                { conteudo: { $regex: termoSeguro, $options: "i" } },
                { autor: { $regex: termoSeguro, $options: "i" } }
            ];
        }

        const total = await Post.countDocuments(filtro);

        const posts = await Post.find(filtro)
            .sort({ createdAt: -1 })
            .skip((pagina - 1) * limite)
            .limit(limite);

        res.json({
            posts,
            pagina,
            limite,
            total,
            totalPaginas: Math.ceil(total / limite)
        });

    } catch (erro) {
        console.log(erro);

        res.status(500).json({
            mensagem: "Erro ao buscar posts"
        });
    }
};

// CRIAR POST
const criarPost = async (req, res) => {
    try {
        const { titulo, conteudo, autor } = req.body;

        if (
            typeof titulo !== "string" ||
            typeof conteudo !== "string" ||
            typeof autor !== "string" ||
            !titulo.trim() ||
            !conteudo.trim() ||
            !autor.trim()
        ) {
            return res.status(400).json({
                mensagem: "Preencha título, conteúdo e autor"
            });
        }

        const novoPost = await Post.create({
            titulo: titulo.trim(),
            conteudo: conteudo.trim(),
            autor: autor.trim()
        });

        res.status(201).json(novoPost);

    } catch (erro) {
        console.log(erro);

        res.status(500).json({
            mensagem: "Erro ao criar post"
        });
    }
};

// BUSCAR POST POR ID
const buscarPost = async (req, res) => {
    try {
        if (!/^[0-9a-fA-F]{24}$/.test(req.params.id)) {
            return res.status(400).json({
                mensagem: "ID do post inválido"
            });
        }

        const post = await Post.findById(req.params.id);

        if (!post) {
            return res.status(404).json({
                mensagem: "Post não encontrado"
            });
        }

        res.json(post);

    } catch (erro) {
        console.log(erro);

        res.status(500).json({
            mensagem: "Erro ao buscar post"
        });
    }
};

// BUSCAR POR TERMO
const buscarPorTermo = async (req, res) => {
    try {
        const termo = req.query.termo?.trim();

        if (!termo) {
            return res.status(400).json({
                mensagem: "Informe um termo de busca"
            });
        }

        const termoSeguro = termo.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");

        const posts = await Post.find({
            $or: [
                { titulo: { $regex: termoSeguro, $options: "i" } },
                { conteudo: { $regex: termoSeguro, $options: "i" } },
                { autor: { $regex: termoSeguro, $options: "i" } }
            ]
        }).sort({ createdAt: -1 });

        res.json(posts);

    } catch (erro) {
        console.log(erro);

        res.status(500).json({
            mensagem: "Erro ao buscar posts"
        });
    }
};

// ATUALIZAR POST
const atualizarPost = async (req, res) => {
    try {
        if (!/^[0-9a-fA-F]{24}$/.test(req.params.id)) {
            return res.status(400).json({
                mensagem: "ID do post inválido"
            });
        }

        const { titulo, conteudo, autor } = req.body;

        if (
            typeof titulo !== "string" ||
            typeof conteudo !== "string" ||
            typeof autor !== "string" ||
            !titulo.trim() ||
            !conteudo.trim() ||
            !autor.trim()
        ) {
            return res.status(400).json({
                mensagem: "Preencha título, conteúdo e autor"
            });
        }

        const postAtualizado = await Post.findByIdAndUpdate(
            req.params.id,
            {
                titulo: titulo.trim(),
                conteudo: conteudo.trim(),
                autor: autor.trim()
            },
            {
                new: true,
                runValidators: true
            }
        );

        if (!postAtualizado) {
            return res.status(404).json({
                mensagem: "Post não encontrado"
            });
        }

        res.json({
            mensagem: "Post atualizado com sucesso",
            post: postAtualizado
        });

    } catch (erro) {
        console.log(erro);

        res.status(500).json({
            mensagem: "Erro ao atualizar post"
        });
    }
};

// EXCLUIR POST
const deletarPost = async (req, res) => {
    try {
        if (!/^[0-9a-fA-F]{24}$/.test(req.params.id)) {
            return res.status(400).json({
                mensagem: "ID do post inválido"
            });
        }

        const postDeletado = await Post.findByIdAndDelete(req.params.id);

        if (!postDeletado) {
            return res.status(404).json({
                mensagem: "Post não encontrado"
            });
        }

        res.json({
            mensagem: "Post removido com sucesso"
        });

    } catch (erro) {
        console.log(erro);

        res.status(500).json({
            mensagem: "Erro ao remover post"
        });
    }
};

module.exports = {
    listarPosts,
    criarPost,
    buscarPost,
    buscarPorTermo,
    atualizarPost,
    deletarPost
};
