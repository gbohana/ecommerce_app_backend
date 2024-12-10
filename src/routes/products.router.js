const { Router } = require("express")
const { getProducts, getProductById, updateProduct, deleteProduct, addProduct } = require("../controllers/products.controllers")
const passportCall = require("../utils/passport.utils")
const { authorization } = require("../utils/utils")

const productRouter = Router()

productRouter.get("/", getProducts)

productRouter.get("/:pid", getProductById)

productRouter.post("/", 
    passportCall("jwt"),
    authorization("admin"), 
    addProduct
)

productRouter.put("/:pid", 
    passportCall("jwt"),
    authorization("admin"), 
    updateProduct
)

productRouter.delete("/:pid",
    passportCall("jwt"),
    authorization("admin"), 
    deleteProduct
)

module.exports = productRouter