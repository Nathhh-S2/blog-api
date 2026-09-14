const express = require("express");

const cors = require("cors");

const app = express();

console.log("APP.JS CARREGADO");

const postRoutes = require("./routes/postRoutes");

const authRoutes = require("./routes/authRoutes");

app.use(cors());

app.use(express.json());

app.use("/", postRoutes);

app.use("/", authRoutes);

app.get("/", (req, res) => {
    res.send("Minha API está funcionando!");
});

app.get("/teste", (req, res) => {
    res.send("TESTE OK");
});

module.exports = app;