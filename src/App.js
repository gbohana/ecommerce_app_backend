const express = require("express")
const ManageCart = require("./ManageCart")
const productRouter = require("./routes/products.router")

const app = express()

const cartManager = new ManageCart()

app.use(express.json())
app.use(express.urlencoded({ extended: true }))

app.use("/products", productRouter)

app.get("/carts/:cid", async (req, res) => {
    try {
        const { cid } = req.params

        const product = await cartManager.getProductById(cid)
        
        res.status(200).json({ product })

    } catch (error) {
        res.status(500).json({ error: error.message })
    }
})

module.exports = app