const productModel = require("../models/products.model")


const addProduct = async (product) => {
    const newProduct = await productModel.create(product);
    return newProduct;
}

const getProducts = async (limit, page, sort, categories, status) => {
    const options = {
        page: page ?? 1,
        limit: limit ?? 10,
        sort: sort ? {price: sort} : {}, //sort = asc or desc
        customLabels: {
            docs: 'payload'
        }
    }

    let query = categories ? {categories: categories} : {}
    query = status ? {status: status, ...query} : query
    //query && {"categories": query}
    //let products = await productModel.paginate({categories: {$in: ["casa"]}}, {status: "available"}, options)
    let products = await productModel.paginate(query, options) 

    return products
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