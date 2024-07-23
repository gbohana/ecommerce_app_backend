const express = require("express")
const { engine } = require("express-handlebars");
const productRouter = require("./routes/products.router")
const cartRouter = require("./routes/carts.router")
const viewRouter = require("./routes/views.router")

const app = express()

app.use(express.json())
app.use(express.urlencoded({ extended: true }))

app.engine("handlebars", engine())
app.set("view engine", "handlebars")
app.set("views", `${__dirname}/views`)

app.use("/views", viewRouter)
app.use("/api/products", productRouter)
app.use("/api/carts", cartRouter)

module.exports = app