const User=require("../models/userModel");
const bcrypt=require("bcrypt");
const validate=require("validator");
const { use } = require("../routes/auth");
const userModel = require("../models/userModel");
const asyncHandler = require('async-handler');

module.exports.login=(async(req,res,next)=>{
  try {
    const { username, password } = req.body;
    const user = await User.findOne({ username:username });
  
    if (!user)
      return res.json({ msg: "Incorrect Username or Password", status: false });
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid)
      return res.json({ msg: "Incorrect Username or Password", status: false });
    delete user.password;
    return res.json({ status: true, user });
  } catch (ex) {
    next(ex);
  }

})

module.exports.signUp=(async(req,res,next)=>{

   const {username,email,password}=req.body;
   if(!email||!username||!password){
    return res.json({ msg: "please fill all fields", status: false });
   }
   if(!validate.isEmail(email)){
    return res.json({ msg: "email format is wrong", status: false });
   }
   const usernameCheck = await User.findOne({ username:username });
   if (usernameCheck)
     return res.json({ msg: "Username already used", status: false });
   const emailCheck = await User.findOne({ email:email });
   if (emailCheck)
     return res.json({ msg: "Email already used", status: false });
   
   const hashedPassword=await bcrypt.hash(password,10);  
 
   const user=new userModel({
    username,
    email,
    password:hashedPassword
   })
    
   await user.save();
   delete user.password;
   return res.json({status: true,user});
})


module.exports.getAllUsers=(async(req,res,next)=>{
   const userID=req.params.id;
   const Users=await User.find({_id:{$ne:userID}}).select(
    [
      "email",
      "username",
      "avatarImage",
      "_id",
    ]
   )
   res.status(200).json(Users);
})

module.exports.setAvatar=(async(req,res,next)=>{
  const userId=req.params.id;
  const avatarImage=req.body.image;

  const userData=await User.findByIdAndUpdate(
    {
      _id:userId
    },
    {
      avatarImage:avatarImage,
      isAvatarImageSet:true
    },
    {
      new:true
    }
  )
  res.json({
    isSet: userData.isAvatarImageSet,
    image: userData.avatarImage,
  })
})


module.exports.logOut=(req,res,next)=> {
    try {
      if (!req.params.id) return res.json({ msg: "User id is required " });
      onlineUsers.delete(req.params.id);
      return res.status(200).send();
    } catch (ex) {
      next(ex);
    }
  };
