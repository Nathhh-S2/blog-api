require("dotenv").config();

const mongoose = require("mongoose");

const conectarBanco = async () => {
    try {
        await mongoose.connect(process.env.MONGODB_URI);

        console.log("MongoDB conectado!");

    } catch (erro) {
        console.log("Erro ao conectar no MongoDB:", erro);
    }
};

module.exports = conectarBanco;