const fs = require("fs")

class Tools {
    #path

    constructor(path) {
        this.#path = path
    }

    readFile = async () => {
        let result = await fs.promises.readFile(this.#path, "utf-8")
        const parsedResult = await JSON.parse(result)
        return parsedResult
    }

    writeFile = async (data) => {
        const dataToSave = await JSON.stringify(data)
        await fs.promises.writeFile(this.#path, dataToSave)
    }
}

module.exports = Tools