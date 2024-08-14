const cartModel = require("../model/carts.model");

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

const addProducttoCart = async (cid, pid) => {
    const cartUpdated = await cartModel.updateOne(
        { _id: cid },
        //{  }
    );
    return cartUpdated;
};

module.exports = { createCart, getCartById, addProducttoCart };