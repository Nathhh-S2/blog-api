const mongoose = require("mongoose");

const conectarBanco = async () => {

    try {

        await mongoose.connect(
            "mongodb+srv://blogadmin:1234@blog-api.xcdv7k2.mongodb.net/?appName=blog-api"
        );

        console.log("MongoDB conectado!");

    } catch (erro) {

        console.log("Erro ao conectar no MongoDB:", erro);

    }

};

module.exports = conectarBanco;