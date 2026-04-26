const express = require("express");
const Router = express.Router();
const {registerUser, loginUser}  = require("../controllers/userController");

Router.post("/register" , registerUser);
Router.post("/login" , loginUser)

module.exports = Router;