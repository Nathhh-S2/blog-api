const app = require("./app");
const conectarBanco = require("./config/database");

const PORT = 3000;

conectarBanco();

app.listen(PORT, () => {
    console.log(`Servidor rodando em http://localhost:${PORT}`);
});