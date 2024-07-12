const Tools = require("./service/tools")

class ManageCart {
    #path = `${__dirname}/data/cart.json`

    constructor(){
        this.tools = new Tools(this.#path)
    }

    createCart = async (products) => {
        const parsedResult = await this.tools.readFile()
        //change to uuid later
        const id = parsedResult.length === 0 ? 1 : parsedResult.at(-1).id + 1
        const newCart = {
            id: id,
            products: products ? products : []
        }
        parsedResult.push(newCart)
        await this.tools.writeFile(parsedResult)
        
        return newCart
    }

    getCartById = async (id) => {
        const results = await this.tools.readFile()
        const cart = results.find(cart => cart.id === +id)

        if(!cart)
            throw new Error("Cart not found")

        return cart
    }

    addProducttoCart = async (cid, pid) => {
        const parsedResult = await this.tools.readFile()
        const cart = parsedResult.find(cart => cart.id === +cid)

        if(!cart)
            throw new Error("Cart not found")

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
        await this.tools.writeFile(parsedResult)
    }
}

module.exports = ManageCart