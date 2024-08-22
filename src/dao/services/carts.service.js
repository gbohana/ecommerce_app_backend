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
    const cart = await cartModel.findById(cid);

    return cart;
};

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
const incrementProductInCart = async (cid, pid) => {
    let cart = await getCartById(cid)
    const _pid = mongoose.Types.ObjectId.createFromHexString(pid)

    console.log(cart.products, typeof(pid), _pid, typeof(_pid))

    let product =  cart.products.find(p => p._id.equals(_pid))
    cart = await cartModel.updateOne(
        { _id: cid },
        { $set: {products: { pid, quantity: product.quantity + 1}}  }
    )

    return cart;
}

const addProductToCart = async (cid, pid) => {
    const cart = await getCartById(cid)

    cart.products = cart.products ?? []

    cartUpdated = await cartModel.updateOne(
        { _id: cid },
        { $push: {products: {_id: pid, quantity: 1}}  }
    )
    return cartUpdated;
}

module.exports = { createCart, getCartById, addProductToCart, incrementProductInCart, getCarts, emptyCart, deleteCart };