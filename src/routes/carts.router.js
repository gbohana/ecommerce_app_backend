const { Router } = require("express")
const cartRouter = Router()

const { getCartById, getCarts, createCart, addProductToCart, incrementProductInCart, deleteCart, emptyCart } = require("../controllers/carts.controllers")

cartRouter.get("/:cid", getCartById)

cartRouter.get("/", getCarts)

//Create new cart
cartRouter.post("/", createCart)

//ex.: localhost:8080/api/carts/66c5592a64be9d1bf04b3eb5/product/66c4f7bc8286cf8554fb8ca1
//Add existing product to cart
cartRouter.put("/:cid/product/:pid", incrementProductInCart)

cartRouter.put("/:cid/", addProductToCart)

cartRouter.delete("/:cid", emptyCart)

cartRouter.delete("/all/:cid", deleteCart)

module.exports = cartRouter