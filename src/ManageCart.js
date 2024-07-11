const fs = require("fs");

class ManageCart {
    #path

    constructor(){
        this.#path = `${__dirname}/data/cart.json`
    }

    #readFile = async () => {
        let result = await fs.promises.readFile(this.#path, "utf-8")
        const parsedResult = await JSON.parse(result)
        return parsedResult
    }

    #writeFile = async (data) => {
        const dataToSave = await JSON.stringify(data)
        await fs.promises.writeFile(this.#path, dataToSave)
    }

    createCart = async (products) => {
        const parsedResult = await this.#readFile()
        //change to uuid later
        const id = parsedResult.length === 0 ? 1 : parsedResult.at(-1).id + 1
        const newCart = {
            id: id,
            products: products ? products : []
        }
        parsedResult.push(newCart)
        await this.#writeFile(parsedResult)
        
        return newCart
    }

    getCartById = async (id) => {
        const results = await this.#readFile()
        const cart = results.find(cart => cart.id === +id)
        return cart ?? "Não encontrado"
    }

    addProducttoCart = async (cid, pid) => {
        const parsedResult = await this.#readFile()
        const cart = parsedResult.find(cart => cart.id === +cid)

        if(!cart)
            return "Carrinho não encontrado"

        let index = parsedResult.indexOf(cart)

        const products = parsedResult[index].products
        const product = products.find(p => p.id === +pid)
        let indexProduct = products.indexOf(product)

        if(!product) {
            const quantity = 1
            const newProduct = {
                id: +pid,
                quantity: quantity
            }
            parsedResult[index].products.push(newProduct)

        } else {
            const quantity = parsedResult[index].products[indexProduct].quantity
            parsedResult[index].products[indexProduct].quantity = quantity + 1
        }
        await this.#writeFile(parsedResult)
    }
}

module.exports = ManageCart