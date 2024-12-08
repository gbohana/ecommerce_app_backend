const app = require("./src/App")

const port = process.env.PORT
app.listen(port, () => {
    console.log(`Servidor iniciado na porta ${port}`)
})