const express=require("express");
const route=express.Router();

const messageController = require("../controllers/messageController");

route.post("/addmsg",messageController.addMessage);
route.post("/getmsg",messageController.getMessages);

module.exports=route;
