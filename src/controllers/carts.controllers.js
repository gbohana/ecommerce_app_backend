const cartService = require("../dao/services/carts.service")

//Get cart by id
const getCartById = async (req, res) => {
    try {
        const { cid } = req.params

        const cart = await cartService.getCartById(cid)
        
        res.status(200).json({ cart })

    } catch (error) {
        res.status(500).json({ error: error.message })
    }
}

//Get all carts - for debugging
const getCarts = async (req, res) => {
    try {
        const carts = await cartService.getCarts()
        
        res.status(200).json({ carts })

    } catch (error) {
        res.status(500).json({ error: error.message })
    }
}

//Create new cart
const createCart = async (req, res) => {
    try {
        const newCart = await cartService.createCart()
        
        res.status(201).json({ message: newCart })

    } catch (error) {
        res.status(500).json({ error: error.message })
    }
}

//ex.: localhost:8080/api/carts/66c5592a64be9d1bf04b3eb5/product/66c4f7bc8286cf8554fb8ca1
//Add existing product to cart
const incrementProductInCart = async (req, res) => {
    try {
        const { cid, pid } = req.params
        const newProduct = await cartService.incrementProductInCart(cid, pid)
        
        res.status(201).json({ message: newProduct })

    } catch (error) {
        res.status(500).json({ error: error.message })
    }
}

//Add new product to cart
const addProductToCart = async (req, res) => {
    try {
        const { cid } = req.params
        const { pid } = req.body
        const newProduct = await cartService.addProductToCart(cid, pid)
        
        res.status(201).json({ message: newProduct })

    } catch (error) {
        res.status(500).json({ error: error.message })
    }
}

//Empty cart
const emptyCart = async (req, res) => {
    const { cid } = req.params
    try {
        const cart = await cartService.emptyCart(cid)
        res.status(200).json({ message: cart })
    } catch (error) {
        res.status(500).json({ error: error.message })
    }
}

//Delete cart - for debugging
const deleteCart = async (req, res) => {
    const { cid } = req.params
    try {
        const cart = await cartService.deleteCart(cid)
        res.status(200).json({ message: cart })
    } catch (error) {
        res.status(500).json({ error: error.message })
    }
}

module.exports = {
    getCartById,
    getCarts,
    addProductToCart,
    incrementProductInCart,
    createCart,
    emptyCart,
    deleteCart
}