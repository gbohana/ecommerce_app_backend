const fs = require("fs");

class ManageProducts {
    #path

    constructor(){
        this.#path = `${__dirname}/data/products.json`
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

    addProduct = async (product) => {
        //create function to validate product format
        const parsedResult = await this.#readFile()
        const id = parsedResult.length === 0 ? 1 : parsedResult.at(-1).id + 1
        const newProduct = {
            id: id, 
            ...product
        }
        parsedResult.push(newProduct)
  
        await this.#writeFile(parsedResult)

    }

    updateProduct = async (id, category, value) => {
        //create function to validate category and variable type of value
        const parsedResult = await this.#readFile()
  
        const product = parsedResult.find((product) => product.id === +id)
        let index = parsedResult.indexOf(product)

        if (index !== -1) {
            parsedResult[index][category] = value

            await this.#writeFile(parsedResult)
        }
        return product

    }

    deleteProduct = async (id) => {
        const parsedResult = await this.#readFile()
        const product = parsedResult.find(product => product.id === +id) 
        console.log(parsedResult, id, product)
        let index = parsedResult.indexOf(product)

        if (index !== -1) {
            console.log(parsedResult)
            parsedResult.splice(index, 1)
            console.log(parsedResult)
            await this.#writeFile(parsedResult)
        }
        return product
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

module.exports = ManageProducts