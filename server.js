const app = require("./src/App")
const config = require("./src/config/config")

const port = config.port
app.listen(port, () => {
    console.log(`Servidor iniciado na porta ${port}`)
})