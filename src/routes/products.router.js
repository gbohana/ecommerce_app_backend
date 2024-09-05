const { Router } = require("express")
const { getProducts, addProduct, deleteProduct, getProductById, updateProduct } = require('../dao/services/products.service')

const productRouter = Router()

productRouter.get("/", async (req, res) => {
    try {
        const { limit, page, sort, categories, status } = req.query

        const products = await getProducts(limit, page, sort, categories, status )

        res.status(200).json({ products })

    } catch (error) {
        res.status(500).json({ error: error.message })
    }
})

productRouter.get("/:pid", async (req, res) => {
    try {
        const { pid } = req.params

        const product = await getProductById(pid)

        res.status(200).json({ product })

    } catch (error) {
        res.status(500).json({ error: error.message })
    }
})

productRouter.post("/", async (req, res) => {
    const product = req.body

    try {
        await addProduct(product)
        res.status(201).json({ message: "Produto cadastrado" })
    } catch (error) {
        console.log(error)
        res.status(500).json({ error: "Erro ao cadastrar produto." })
    }
})

productRouter.put("/:pid", async (req, res) => {
    const { pid } = req.params
    const { product } = req.body

    try {
        await updateProduct(pid, product)
        res.status(200).json({ message: "Produto atualizado" })
    } catch (error) {
        console.log(error)
        res.status(500).json({ error: "Erro ao atualizar produto." })
    }
})

productRouter.delete("/:pid", async (req, res) => {
    const { pid } = req.params
    try {
        await deleteProduct(pid)
        res.status(200).json({ message: "Produto excluído" })
    } catch (error) {
        console.log(error)
        res.status(500).json({ error: "Erro ao excluir produto." })
    }
})

module.exports = productRouter