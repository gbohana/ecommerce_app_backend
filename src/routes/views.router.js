const { Router } = require("express")
const ManageProducts = require("../ManageProducts")

const viewRouter = Router()
const productManager = new ManageProducts()

viewRouter.get("/home", async(req, res) => {
    try {
        const products = await productManager.getProducts()
      
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

module.exports = viewRouter;