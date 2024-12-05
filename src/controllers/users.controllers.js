const userService = require("../dao/services/users.service");
const { getProducts } = require("../dao/services/products.service");

const getAllUsers = async (req, res) => {
    const users = await userService.getUsers()
    return res.status(200).json(users)
}

const userLogin = async (req, res) => {
    console.log("to no login rota");
    if (!req.user)
        return res.status(400).json({ status: "error", message: "Unauthorized" });
    req.session.user = {
        first_name: req.user.first_name,
        last_name: req.user.last_name,
        email: req.user.email,
        role: req.user.role,
    }
    const result = await getProducts()
    const products = result.payload.map((product) => product.toJSON())
    //return res.status(200).json(products)
    return res.redirect("/views/allproducts", { products: products, result: result, style: "index.css", name: userFound.first_name });
};

const createUser = async (req, res) => {
    const user = req.body;
    const userCreated = await userService.createUser(user);
    res.render("userCreated", { name: userCreated.first_name });
};

const deleteUser = async (req, res) => {
    const { email } = req.params;
    const user = await userService.deleteUser(email);
    res.status(200).json(user)
};

const updateUser = async (req, res) => {
    try {
        const user = req.body;
        const { uid } = req.params;

        const newUser = await userService.updateUser(user, uid);
        res.status(201).json(newUser);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

module.exports = { getAllUsers, userLogin, createUser, deleteUser, updateUser };