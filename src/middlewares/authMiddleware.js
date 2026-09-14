require("dotenv").config();

const jwt = require("jsonwebtoken");

const SECRET_KEY = process.env.JWT_SECRET;

function autenticar(req, res, next) {
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith("Bearer ")) {
        return res.status(401).json({
            mensagem: "Token não informado"
        });
    }

    const token = authHeader.split(" ")[1];

    try {
        const usuario = jwt.verify(token, SECRET_KEY);

        if (usuario.tipo !== "professor") {
            return res.status(403).json({
                mensagem: "Acesso permitido apenas para professores"
            });
        }

        req.usuario = usuario;

        next();
    } catch (erro) {
        return res.status(401).json({
            mensagem: "Token inválido ou expirado"
        });
    }
}

module.exports = autenticar;