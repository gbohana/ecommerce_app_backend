const { Router } = require("express")
const { createCart, getCartById, addProductToCart, incrementProductInCart, getCarts, emptyCart, deleteCart } = require("../dao/services/carts.service")

const cartRouter = Router()

//Get cart by id
cartRouter.get("/:cid", async (req, res) => {
    try {
        const { cid } = req.params

        const cart = await getCartById(cid)
        
        res.status(200).json({ cart })

    } catch (error) {
        res.status(500).json({ error: error.message })
    }
})

//Get all carts - for debugging
cartRouter.get("/", async (req, res) => {
    try {
        const carts = await getCarts()
        
        res.status(200).json({ carts })

    } catch (error) {
        res.status(500).json({ error: error.message })
    }
})

//Create new cart
cartRouter.post("/", async (req, res) => {
    try {
        const newCart = await createCart()
        
        res.status(201).json({ message: newCart })

    } catch (error) {
        res.status(500).json({ error: error.message })
    }
})

//localhost:8080/api/carts/66c5592a64be9d1bf04b3eb5/product/66c4f7bc8286cf8554fb8ca1
//Add existing product to cart
cartRouter.put("/:cid/product/:pid", async (req, res) => {
    try {
        const { cid, pid } = req.params
        const newProduct = await incrementProductInCart(cid, pid)
        
        res.status(201).json({ message: newProduct })

    } catch (error) {
        res.status(500).json({ error: error.message })
    }
})

//Add new product to cart
cartRouter.put("/:cid/", async (req, res) => {
    try {
        const { cid } = req.params
        const { pid } = req.body
        const newProduct = await addProductToCart(cid, pid)
        
        res.status(201).json({ message: newProduct })

    } catch (error) {
        res.status(500).json({ error: error.message })
    }
})

//Empty cart
cartRouter.delete("/:cid", async (req, res) => {
    const { cid } = req.params
    try {
        const cart = await emptyCart(cid)
        res.status(200).json({ message: cart })
    } catch (error) {
        res.status(500).json({ error: error.message })
    }
})

//Delete cart - for debugging
cartRouter.delete("/all/:cid", async (req, res) => {
    const { cid } = req.params
    try {
        const cart = await deleteCart(cid)
        res.status(200).json({ message: cart })
    } catch (error) {
        res.status(500).json({ error: error.message })
    }
})

module.exports = cartRouter