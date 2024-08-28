const express = require("express");
const validationUser = require("../middleware/user.middleware");
const userService = require("../dao/services/users.service");
const userRouter = express.Router();

userRouter.get("/", async (req, res) => {
    const users = await userService.getUsers()
    return res.status(200).json(users)
})

userRouter.post("/login", async (req, res) => {
    const user = req.body
    const userFound = await userService.getUsersByEmail(user.email)
    
    if (!userFound) {
        return res.render("loginFail", { email: user.email })
    }
    console.log(req.session)
    // if (userFound.password === user.password) {
    //     req.session.user = userFound
    //     req.session.logged = true

    //     if (userFound.role === "admin") {
    //         req.session.admin = true
    //     } else {
    //         req.session.admin = false
    //     }
    // }

    res.render("allproducts", { name: userFound.first_name });
});

userRouter.post("/", validationUser, async (req, res) => {
    const user = req.body;
    const userCreated = await userService.createUser(user);
    res.render("userCreated", { name: userCreated.first_name });
});

userRouter.delete("/:email", async (req, res) => {
    const { email } = req.params;
    const user = await userService.deleteUser(email);
    res.status(200).json(user)
});

userRouter.put("/:uid", validationUser, async (req, res) => {
    try {
        const user = req.body;
        const { uid } = req.params;

        const newUser = await userService.updateUser(user, uid);
        res.status(201).json(newUser);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

module.exports = userRouter;