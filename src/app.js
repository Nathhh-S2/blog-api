const express = require("express");

const app = express();

console.log("APP.JS CARREGADO");

const postRoutes = require("./routes/postRoutes");

app.use(express.json());

app.use("/", postRoutes);

app.get("/", (req, res) => {
    res.send("Minha API está funcionando!");
});

app.get("/teste", (req, res) => {
    res.send("TESTE OK");
});

module.exports = app;