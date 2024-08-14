const { Router } = require("express")
const { createCart, getCartById, addProducttoCart } = require("../dao/services/carts.service")

const cartRouter = Router()

cartRouter.get("/:cid", async (req, res) => {
    try {
        const { cid } = req.params

        const cart = await getCartById(cid)
        
        res.status(200).json({ cart })

    } catch (error) {
        res.status(500).json({ error: error.message })
    }
})

cartRouter.post("/", async (req, res) => {
    try {
        const { products } = req.body
        const newCart = await createCart(products)
        
        res.status(201).json({ message: newCart })

    } catch (error) {
        res.status(500).json({ error: error.message })
    }
})

cartRouter.post("/:cid/product/:pid", async (req, res) => {
    try {
        const { cid, pid } = req.params
        const newProduct = await addProducttoCart(cid, pid)
        
        res.status(201).json({ message: newProduct })

    } catch (error) {
        res.status(500).json({ error: error.message })
    }
})

module.exports = cartRouter