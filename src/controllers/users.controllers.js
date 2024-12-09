const userService = require("../dao/services/users.service");
const { generateToken } = require("../utils/jwt.utils")
const { isValidPassword } = require("../utils/utils");

const getAllUsers = async (req, res) => {
    const users = await userService.getUsers()
    return res.status(200).json(users)
}

const userLogin = async (req, res) => {
    const { email, password } = req.body;
    let userFound = await userService.getUsersByEmail(email);

    if (!userFound) {
        return res
            .status(400)
            .send({ status: "error", error: "Invalid credentials" });
    }

    const isPasswordValidTest = await isValidPassword(password, userFound);
    if (isPasswordValidTest) {
        let user = userFound.toJSON(); // Convert to plain object 
        //.toJSON() is used to strip additional metadata or serialize the object into a plain structure
        delete user.password;

        const accessToken = generateToken(user);
        user.token = accessToken;

        return res.status(200)
            .cookie('accessToken', accessToken, {
                maxAge: 60 * 60 * 1000,
                httpOnly: true
            })
            .send({ message: "Sent" })
    } else {
        return res
            .status(400)
            .send({ status: "error", error: "Invalid credentials" });
    }
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

const getCurrentUser = (req, res) => {
    try {
        res.status(200).json(req.user);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

module.exports = { getAllUsers, userLogin, createUser, deleteUser, updateUser, getCurrentUser };