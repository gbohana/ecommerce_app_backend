const mongoose = require('mongoose')
const cartCollection = 'carts'

const cartSchema = new mongoose.Schema({
    products: {
        type: [
            {
                pid: { type: mongoose.Schema.Types.ObjectId, ref: 'products' },
                quantity: Number
            }
        ],
        default: []
    },
})

// cartSchema.pre("find", function () {
//     this.populate("products.pid");
//   });

const cartModel = mongoose.model(cartCollection, cartSchema);

module.exports = cartModel;