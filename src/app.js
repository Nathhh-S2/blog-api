
const express = require("express");
const cors = require("cors");

const app = express();

console.log("APP.JS CARREGADO");

// IMPORTAÇÃO DAS ROTAS
const postRoutes = require("./routes/postRoutes");
const authRoutes = require("./routes/authRoutes");
const userRoutes = require("./routes/userRoutes");

// MIDDLEWARES GERAIS
app.use(cors());
app.use(express.json());

// ROTAS DA API
app.use("/", postRoutes);
app.use("/", authRoutes);
app.use("/api/usuarios", userRoutes);

// ROTA PRINCIPAL
app.get("/", (req, res) => {
    res.send("Minha API está funcionando!");
});

app.get("/teste", (req, res) => {
    res.send("TESTE OK");
});

module.exports = app;
