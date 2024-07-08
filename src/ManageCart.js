const fs = require("fs");

class ManageCart {
    #path

    constructor(){
        this.#path = `${__dirname}/data/cart.json`
        this.createCart()
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

    createCart = () => {

    }
    
    getProducts = async (limit) => {
        const parsedResult = await this.#readFile()
        if (limit > 0 && limit <= parsedResult.length) {
            return parsedResult.slice(0, limit)

        } else {
            return parsedResult
        }
    }

    getProductById = async (id) => {
        const results = await this.#readFile()
        const product = results.find(product => product.id === +id)
        return product ?? "Não encontrado\n"
    }
}

module.exports = ManageCart