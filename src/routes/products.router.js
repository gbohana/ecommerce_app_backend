const { Router } = require("express")
const ManageProducts = require('../ManageProducts')

const productRouter = Router()

const productManager = new ManageProducts()

productRouter.get("/", async (req, res) => {
    try {
        const { limit } = req.query

        const products = await productManager.getProducts(limit)

        res.status(200).json({ products })

    } catch (error) {
        res.status(500).json({ error: error.message })
    }
})

productRouter.get("/:pid", async (req, res) => {
    try {
        const { pid } = req.params

        const product = await productManager.getProductById(pid)

        res.status(200).json({ product })

    } catch (error) {
        res.status(500).json({ error: error.message })
    }
})

productRouter.post("/", async (req, res) => {
    const product = req.body

    try {
        await productManager.addProduct(product)
        res.status(201).json({ message: "Produto cadastrado" })
    } catch (error) {
        console.log(error)
        res.status(500).json({ error: "Erro ao cadastrar produto." })
    }
})

productRouter.put("/:pid", async (req, res) => {
    const { pid } = req.params
    const { category, value } = req.body

    try {
        await productManager.updateProduct(pid, category, value)
        res.status(200).json({ message: "Produto atualizado" })
    } catch (error) {
        console.log(error)
        res.status(500).json({ error: "Erro ao atualizar produto." })
    }
})

productRouter.delete("/:pid", async (req, res) => {
    const { pid } = req.params
    try {
        await productManager.deleteProduct(pid)
        res.status(200).json({ message: "Produto excluído" })
    } catch (error) {
        console.log(error)
        res.status(500).json({ error: "Erro ao excluir produto." })
    }
})

module.exports = productRouter