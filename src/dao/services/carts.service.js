const cartModel = require("../models/carts.model");
const mongoose = require('mongoose')

const createCart = async () => {
    const newCart = {
        products: []
    }
    const addedCart = await cartModel.create(newCart);
    return addedCart;
};

const getCartById = async (cid) => {
    let cart = await cartModel.findOne({_id: cid})
    .populate({
        path: 'products.product',
        model: 'products'
    })
    
    return cart
}

//for debugging
const getCarts = async () => {
    const carts = await cartModel.find();

    return carts;
}

//delete all products inside a cart
const emptyCart = async (cid) => {
    const cart = await cartModel.updateOne({ _id: cid} , {products: []})
    return cart;
};

const deleteCart = async (cid) => {
    const cart = await cartModel.deleteOne({_id: cid})
    return cart
}

// Increment product quantity
// https://www.mongodb.com/docs/manual/reference/operator/update/positional-filtered/#mongodb-update-up.---identifier--
const incrementProductInCart = async (cid, pid) => {
    let cart = await getCartById(cid)
    const _pid = mongoose.Types.ObjectId.createFromHexString(pid)

    let products = cart.products
    let productIndex =  products.findIndex(p => p.product.equals(_pid))
    
    let quantity = products[productIndex].quantity
    products[productIndex].quantity = quantity + 1

    cart = await cartModel.updateOne({_id: cid}, {products})
    
    // or using MongoDB:
    //
    // let product =  cart.products.find(p => p._id.equals(_pid))
    // cart = await cartModel.updateOne(
    //     { _id: cid },
    //     { $set: {'products.$[elem].quantity': product.quantity + 1}  },
    //     { arrayFilters: [{'elem._id': _pid}], upsert: true }
    // )

    return cart;
}

const addProductToCart = async (cid, pid) => {
    const cart = await getCartById(cid)

    cart.products = cart.products ?? []

    cartUpdated = await cartModel.updateOne(
        { _id: cid },
        { $push: {products: {product: pid, quantity: 1}}  }
    )
    return cartUpdated;
}

module.exports = { createCart, getCartById, addProductToCart, incrementProductInCart, getCarts, emptyCart, deleteCart };