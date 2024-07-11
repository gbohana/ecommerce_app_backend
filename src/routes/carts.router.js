const { Router } = require("express")
const ManageCart = require("../ManageCart")

const cartRouter = Router()
const cartManager = new ManageCart()

cartRouter.get("/:cid", async (req, res) => {
    try {
        const { cid } = req.params

        const cart = await cartManager.getCartById(cid)
        
        res.status(200).json({ cart })

    } catch (error) {
        res.status(500).json({ error: error.message })
    }
})

cartRouter.post("/", async (req, res) => {
    try {
        const { products } = req.body
        const newCart = await cartManager.createCart(products)
        
        res.status(201).json({ message: newCart })

    } catch (error) {
        res.status(500).json({ error: error.message })
    }
})

cartRouter.post("/:cid/product/:pid", async (req, res) => {
    try {
        const { cid, pid } = req.params
        const newProduct = await cartManager.addProducttoCart(cid, pid)
        
        res.status(201).json({ message: newProduct })

    } catch (error) {
        res.status(500).json({ error: error.message })
    }
})

module.exports = cartRouter