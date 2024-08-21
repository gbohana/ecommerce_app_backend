const { Router } = require("express")
const { getProducts } = require("../dao/services/products.service")
const { getCartById } = require("../dao/services/carts.service")

const viewRouter = Router()

viewRouter.get("/home", async(req, res) => {
    try {
        const products = await getProducts()
      
        res.render("home", { products: products })
    } catch (error) {
        res.status(500).json({ error: error.message })
    }
})

viewRouter.get("/realtimeproducts", async(req, res) => {
    try {      
        res.render("realTimeProducts", {style: "index.css" })
    } catch (error) {
        res.status(500).json({ error: error.message })
    }
})

viewRouter.get("/allproducts", async(req, res) => {
    try {        
        const result = await getProducts()
        const products = result.payload.map((product) => product.toJSON())
            
        res.render("allproducts", {products: products, result: result, style: "index.css" })
    } catch (error) {
        res.status(500).json({ error: error.message })
    }
})

viewRouter.get("/carts/:cid", async(req, res) => {
    try {        
        const result = await getCartById()
        const products = result.products.map((product) => product.toJSON())
        console.log(result)
        res.render("cart", {products: products, result: result, style: "index.css" })
    } catch (error) {
        res.status(500).json({ error: error.message })
    }
})

module.exports = viewRouter;