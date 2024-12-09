const express = require("express");
const userRouter = express.Router();
const passport = require("passport")

const { getAllUsers, userLogin, createUser, deleteUser, updateUser, getCurrentUser } = require("../controllers/users.controllers")
const validationUser = require("../middleware/user.middleware");

const passportCall = require("../utils/passport.utils")
const { authorization } = require("../utils/utils")

userRouter.get("/", getAllUsers);

userRouter.post("/login", 
    //passport.authenticate("login", { failureRedirect: "/login" }), 
    userLogin
);

userRouter.post("/", 
    //passport.authenticate("register", { failureRedirect: "/register" }), 
    validationUser, 
    createUser
);

userRouter.delete("/:email", deleteUser);

userRouter.put("/:uid", validationUser, updateUser);

userRouter.get("/current", 
    passportCall("jwt"), 
    authorization("admin"),
    getCurrentUser
);

module.exports = userRouter;