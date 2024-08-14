const mongoose = require('mongoose')
const productCollection = 'products'

const productSchema = new mongoose.Schema({
    id: String,
    title: String,
    description: String,
    code: Number,
    price: Number,
    status: String,
    stock: Number,
    categories: {
        type: Array,
        default: []
    },
    thumbnails: String
});

const productModel = mongoose.model(productCollection, productSchema);

module.exports = productModel;