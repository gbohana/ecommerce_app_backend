const express = require("express");
const validationUser = require("../middleware/user.middleware");
const { getAllUsers, userLogin, createUser, deleteUser, updateUser } = require("../controllers/users.controllers")
const userRouter = express.Router();

userRouter.get("/", getAllUsers);

userRouter.post("/login", userLogin);

userRouter.post("/", validationUser, createUser);

userRouter.delete("/:email", deleteUser);

userRouter.put("/:uid", validationUser, updateUser);

module.exports = userRouter;