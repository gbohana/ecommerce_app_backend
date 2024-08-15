const productModel = require("../models/products.model")


const addProduct = async (product) => {
    const newProduct = await productModel.create(product);
    return newProduct;
}

const getProducts = async () => {
    let products = await productModel.find()
    products = products.map((product) => product.toJSON());
    return products;
}

const getProductById = async (pid) => {
    const product = await productModel.findById(pid);

    return [product];
}

const deleteProduct = async (pid) => {
    const product = await productModel.deleteOne({ id: pid });
    return product;
};


const updateProduct = async (pid, product) => {

    const productUpdated = await productModel.updateOne(
        { _id: pid },
        product
    );
    return productUpdated;
};

module.exports = { getProducts, addProduct, deleteProduct, getProductById, updateProduct };