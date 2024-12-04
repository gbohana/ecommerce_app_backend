const { Router } = require("express")
const { getProducts, getProductById, updateProduct, deleteProduct, addProduct } = require("../controllers/products.controllers")

const productRouter = Router()

productRouter.get("/", getProducts)

productRouter.get("/:pid", getProductById)

productRouter.post("/", addProduct)

productRouter.put("/:pid", updateProduct)

productRouter.delete("/:pid", deleteProduct)

module.exports = productRouter