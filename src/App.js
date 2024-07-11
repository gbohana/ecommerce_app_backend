const express = require("express")
const productRouter = require("./routes/products.router")
const cartRouter = require("./routes/carts.router")

const app = express()

app.use(express.json())
app.use(express.urlencoded({ extended: true }))

app.use("/products", productRouter)
app.use("/carts", cartRouter)

module.exports = app