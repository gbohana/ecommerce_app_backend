const userService = require("../dao/services/users.service");
const { getProducts } = require("../dao/services/products.service");
const { isValidPassword } = require("../service/utils");

const getAllUsers = async (req, res) => {
    const users = await userService.getUsers()
    return res.status(200).json(users)
}

const userLogin = async (req, res) => {
    const user = req.body
    const userFound = await userService.getUsersByEmail(user.email)
    
    if (!userFound) {
        return res.render("loginFail", { email: user.email })
        // return res.status(400).json("User not found")
    }
    console.log(userFound)
    const isValid = await isValidPassword(user.password, userFound)
    if (isValid) {
    //     req.session.user = userFound
    //     req.session.logged = true

    //     if (userFound.role === "admin") {
    //         req.session.admin = true
    //     } else {
    //         req.session.admin = false
    //     }
    const result = await getProducts()
    const products = result.payload.map((product) => product.toJSON())
    //return res.status(200).json(products)
    res.render("allproducts", { products: products, result: result, style: "index.css", name: userFound.first_name });

    } else {
        return res.status(401).json("Wrong password")
    }
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