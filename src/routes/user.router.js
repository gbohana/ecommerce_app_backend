const express = require("express");
const validationUser = require("../middleware/user.middleware");
const { getAllUsers, userLogin, createUser, deleteUser, updateUser } = require("../controllers/users.controllers")
const userRouter = express.Router();
const passport = require("passport")

userRouter.get("/", getAllUsers);

userRouter.post("/login", passport.authenticate("login", { failureRedirect: "/login" }), userLogin);

userRouter.post("/", passport.authenticate("register", { failureRedirect: "/register" }), validationUser, createUser);

userRouter.delete("/:email", deleteUser);

userRouter.put("/:uid", validationUser, updateUser);

module.exports = userRouter;