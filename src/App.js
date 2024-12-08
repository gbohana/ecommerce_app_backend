const express = require("express")
const mongoose = require("mongoose")
const MongoStore = require("connect-mongo")
const { engine } = require("express-handlebars")
const passport = require("passport")
const initializePassport = require("./config/passport.config")
const cookieParser = require("cookie-parser");
const session = require("express-session")
const cors = require("cors")
const path = require("path")
require('dotenv').config()

const socketIO = require("socket.io")
const http = require("node:http")

const productRouter = require("./routes/products.router")
const cartRouter = require("./routes/carts.router")
const viewRouter = require("./routes/views.router")
const sessionRouter = require("./routes/session.router")
const userRouter = require("./routes/user.router")
const cookieRouter = require("./routes/cookie.router")

const FileStore = require("session-file-store")(session)
const app = express()

const server = http.createServer(app)
const io = socketIO(server)

app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(cookieParser("newcookie"));
app.use(cors())

app.use(
  session({
    store:
      new FileStore({ path: "../sessions", ttl: 1000, retries: 0 }),
      // MongoStore.create({
      //   mongoUrl:
      //     "mongodb+srv://gbohana:i5LZnrTtbumA1jQT@coderhouse.q50ez.mongodb.net/?retryWrites=true&w=majority&appName=CoderHouse",
      //   mongoOptions: { useNewUrlParser: true, useUnifiedTopology: true },
      //   ttl: 600,
      // }),
    secret: "supersecret",
    resave: false,
    saveUninitialized: false,
  })
)

const staticPath = path.join(`${__dirname}/public`)
app.use("/static", express.static(staticPath))

app.engine("handlebars", engine())
app.set("view engine", "handlebars")
app.set("views", `${__dirname}/views`)

app.use("/views", viewRouter)
app.use("/api/products", productRouter)
app.use("/api/carts", cartRouter)
app.use("/api/session", sessionRouter)
app.use("/api/cookies", cookieRouter)
app.use("/api/user", userRouter)

mongoose
  .connect(process.env.MONGO_URL)
  .then(() => {
    console.log("Mongo conectado");
  })
  .catch((error) => {
    console.log(error);
    process.exit(1);
  });

initializePassport()
app.use(passport.initialize())
app.use(passport.session())

/**
io.on("connection", async (socket) => {
    console.log("Usuário conectado", socket.id)
    const products = await productManager.getProducts()
    io.emit("newproduct", products)
})

app.post("/socketprod", async (req, res) => {
    const product = req.body

    try {
        const products = await productManager.addProduct(product)
        io.emit("newproduct", products)

        res.status(201).json({ message: "Produto cadastrado" })
    } catch (error) {
        console.log(error)
        res.status(500).json({ error: "Erro ao cadastrar produto." })
    }
})

app.delete("/socketprod/:pid", async (req, res) => {
    const { pid } = req.params
    try {
        const products = await productManager.deleteProduct(pid)
        io.emit("newproduct", products)

        res.status(200).json({ message: "Produto excluído" })
    } catch (error) {
        console.log(error)
        res.status(500).json({ error: "Erro ao excluir produto." })
    }
})
**/

module.exports = server