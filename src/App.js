const express = require("express")
const mongoose = require("mongoose")
const { engine } = require("express-handlebars")

// const ManageProducts = require('./ManageProducts')
// const productManager = new ManageProducts()

const productRouter = require("./routes/products.router")
const cartRouter = require("./routes/carts.router")
const viewRouter = require("./routes/views.router")
const sessionRouter = require("./routes/session.router")
const userRouter = require("./routes/user.router")
const path = require("path")

const session = require("express-session")
//const FileStore = require("session-file-store")(session)
const MongoStore = require("connect-mongo")

const socketIO = require("socket.io")
const http = require("node:http")

const app = express()

const server = http.createServer(app)
const io = socketIO(server)

app.use(express.json())
app.use(express.urlencoded({ extended: true }))

const staticPath = path.join(`${__dirname}/public`)
app.use("/static", express.static(staticPath))

app.engine("handlebars", engine())
app.set("view engine", "handlebars")
app.set("views", `${__dirname}/views`)

app.use("/views", viewRouter)
app.use("/api/products", productRouter)
app.use("/api/carts", cartRouter)
app.use("/session", sessionRouter)
app.use("/api/user", userRouter)

app.use(
  session({
    store:
      //new FileStore({ path: "../sessions", ttl: 100, retries: 0 }),
      MongoStore.create({
        mongoUrl:
          "mongodb+srv://gbohana:i5LZnrTtbumA1jQT@coderhouse.q50ez.mongodb.net/?retryWrites=true&w=majority&appName=CoderHouse",
        //mongoOptions: { useNewUrlParser: true, useUnifiedTopology: true },
        ttl:600,
      }),
    secret: "supersecret",
    resave: false,
    saveUninitialized: false,
  })
);

mongoose
  .connect(
    "mongodb+srv://gbohana:i5LZnrTtbumA1jQT@coderhouse.q50ez.mongodb.net/?retryWrites=true&w=majority&appName=CoderHouse"
  )
  .then(() => {
    console.log("Mongo conectado");
  })
  .catch((error) => {
    console.log(error);
    process.exit(1);
  });

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