const cartModel = require("../models/carts.model");

const createCart = async (products) => {
    const newCart = {
        products: products ? products : []
    }
    const addedCart = await cartModel.create(newCart);
    return addedCart;
};

const getCartById = async (cid) => {
    const cart = await cartModel.findById(cid);

    return [cart];
};

//for debugging
const getCarts = async () => {
    const cart = await cartModel.find();

    return [cart];
}

//delete all products inside a cart
const emptyCart = async (cid) => {
    const cart = await cartModel.updateOne({ _id: cid , products: []})
    return cart;
};

// Add new product to cart
const addNewProductToCart = async (cid, pid) => {
    const cartUpdated =  await cartModel.updateOne(
            { _id: cid },
            { $push: {pid, quantity: 1}  }
    )

    return cartUpdated;
}

// Add new existing product
const addExistingProductToCart = async (cid, pid) => {
    const cart = await cartModel.getCartById(cid)

    let cartUpdated =  cart.products.find(p => p._id === pid)
    cartUpdated = await cartModel.updateOne(
        { _id: cid },
        { $push: {pid, quantity: p.quantity + 1}  }
    )

    return cartUpdated;
}

const addProductToCart = async (cid, pid) => {
    const cart = await cartModel.getCartById(cid)

    const isAlready = cart.products.includes(pid)

    if (isAlready)
        await addExistingProductToCart(cid, pid)
    else
        await addNewProductToCart(cid, pid)
}

module.exports = { createCart, getCartById, addProductToCart, getCarts, emptyCart };