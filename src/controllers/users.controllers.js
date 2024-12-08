const userService = require("../dao/services/users.service");
const {generateToken, authToken } = require("../service/jwt.utils")

const getAllUsers = async (req, res) => {
    const users = await userService.getUsers()
    return res.status(200).json(users)
}

const userLogin = async (req, res) => {
    //const result = await getProducts()
    ///const products = result.payload.map((product) => product.toJSON())
    const accessToken = generateToken(req.body)
    return res.status(200).send(accessToken)
};

const createUser = async (req, res) => {
    const user = req.body;
    const userCreated = await userService.createUser(user);
    return res.status(200).json(userCreated)
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