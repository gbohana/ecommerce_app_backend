const productService = require('../dao/services/products.service')

const getProducts = async (req, res) => {
    try {
        const { limit, page, sort, categories, status } = req.query

        const products = await productService.getProducts(limit, page, sort, categories, status )

        res.status(200).json({ products })

    } catch (error) {
        res.status(500).json({ error: error.message })
    }
}

const getProductById = async (req, res) => {
    try {
        const { pid } = req.params

        const product = await productService.getProductById(pid)

        res.status(200).json({ product })

    } catch (error) {
        res.status(500).json({ error: error.message })
    }
}

const addProduct = async (req, res) => {
    const product = req.body

    try {
        await productService.addProduct(product)
        res.status(201).json({ message: "Produto cadastrado" })
    } catch (error) {
        console.log(error)
        res.status(500).json({ error: "Erro ao cadastrar produto." })
    }
}

const updateProduct = async (req, res) => {
    const { pid } = req.params
    const { product } = req.body

    try {
        await productService.updateProduct(pid, product)
        res.status(200).json({ message: "Produto atualizado" })
    } catch (error) {
        console.log(error)
        res.status(500).json({ error: "Erro ao atualizar produto." })
    }
}

const deleteProduct =  async (req, res) => {
    const { pid } = req.params
    try {
        await productService.deleteProduct(pid)
        res.status(200).json({ message: "Produto excluído" })
    } catch (error) {
        console.log(error)
        res.status(500).json({ error: "Erro ao excluir produto." })
    }
}

module.exports = {
    getProducts,
    getProductById,
    addProduct,
    updateProduct,
    deleteProduct
}