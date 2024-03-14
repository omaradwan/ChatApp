const express=require("express");
const route=express.Router();
const { body, validationResult } = require('express-validator');

const userController=require("../controllers/userController");

route.route("/login")
            .post(userController.login);
            
route.route("/register")
            .post(userController.signUp);

route.route("/allusers/:id")
            .get(userController.getAllUsers);

route.route("/setavatar/:id")
            .post(userController.setAvatar)
route.route("/logout/:id")
            .get(userController.logOut);
module.exports=route;  
