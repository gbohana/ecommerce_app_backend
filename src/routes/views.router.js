const { Router } = require("express")
const { getProducts } = require("../dao/services/products.service")

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
        res.render("allproducts", {style: "index.css" })
    } catch (error) {
        res.status(500).json({ error: error.message })
    }
})

module.exports = viewRouter;