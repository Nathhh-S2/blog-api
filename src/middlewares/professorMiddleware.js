
function verificarProfessor(req, res, next) {

    if (!req.usuario || req.usuario.tipo !== "professor") {
        return res.status(403).json({
            mensagem: "Acesso permitido apenas para professores"
        });
    }

    next();
}

module.exports = verificarProfessor;
