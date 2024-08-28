const mongoose = require('mongoose')
const mongoosePaginate = require("mongoose-paginate-v2")

const productCollection = 'products'

const productSchema = new mongoose.Schema({
    title: String,
    description: String,
    code: {
        type: Number, 
        unique: true
    },
    price: Number,
    status: {
        type: String,
        enum: ['available', 'unavailable'],
        default: 'available'
    },
    stock: Number,
    categories: {
        type: Array,
        default: []
    },
    thumbnails: String
})

productSchema.plugin(mongoosePaginate)

const productModel = mongoose.model(productCollection, productSchema)

module.exports = productModel;