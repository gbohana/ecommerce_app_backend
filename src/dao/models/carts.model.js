const mongoose = require('mongoose')
const cartCollection = 'carts'

const cartSchema = new mongoose.Schema({
    id: String,
    products: {
        type: Array,
        default: []
    }
});

const cartModel = mongoose.model(cartCollection, cartSchema);

module.exports = cartModel;