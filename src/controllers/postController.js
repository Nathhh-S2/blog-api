const Post = require("../models/Post");

const listarPosts = async (req, res) => {

    try {

        const posts = await Post.find();

        res.json(posts);

    } catch (erro) {

        res.status(500).json({
            mensagem: "Erro ao buscar posts"
        });

    }

};


const criarPost = async (req, res) => {

    try {

        const novoPost = await Post.create({
            titulo: req.body.titulo,
            conteudo: req.body.conteudo,
            autor: req.body.autor
        });

        res.status(201).json(novoPost);

    } catch (erro) {

        res.status(500).json({
            mensagem: "Erro ao criar post",
            erro: erro.message
        });

    }

};

const buscarPost = async (req, res) => {

    try {

        const post = await Post.findById(req.params.id);


        if (!post) {
            return res.status(404).json({
                mensagem: "Post não encontrado"
            });
        }


        res.json(post);


    } catch (erro) {

        res.status(500).json({
            mensagem: "Erro ao buscar post"
        });

    }

};

const buscarPorTermo = async (req, res) => {

    try {

        const termo = req.query.termo;


        if (!termo) {
            return res.status(400).json({
                mensagem: "Informe um termo de busca"
            });
        }


        const posts = await Post.find({
            $or: [
                {
                    titulo: {
                        $regex: termo,
                        $options: "i"
                    }
                },
                {
                    conteudo: {
                        $regex: termo,
                        $options: "i"
                    }
                }
            ]
        });


        res.json(posts);


    } catch (erro) {

        console.log(erro);

        res.status(500).json({
            mensagem: "Erro ao buscar posts",
            erro: erro.message
        });

    }

};

const atualizarPost = async (req, res) => {

    try {

        const postAtualizado = await Post.findByIdAndUpdate(
            req.params.id,
            {
                titulo: req.body.titulo,
                conteudo: req.body.conteudo,
                autor: req.body.autor
            },
            {
                new: true
            }
        );


        if (!postAtualizado) {
            return res.status(404).json({
                mensagem: "Post não encontrado"
            });
        }


        res.json(postAtualizado);


    } catch (erro) {

    console.log(erro);

    res.status(500).json({
        mensagem: "Erro ao atualizar post",
        erro: erro.message
    });

}
};

const deletarPost = async (req, res) => {

    try {

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

        res.status(500).json({
            mensagem: "Erro ao remover post",
            erro: erro.message
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