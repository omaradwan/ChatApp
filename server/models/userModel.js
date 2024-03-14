const mongoose=require("mongoose");

const schema=mongoose.Schema;

const userModel=new schema({

    username:{
       type:String,
       required:true,
       min:3,
       max:20,
       unique:true,
    },
    password:{
        type: String,
        required: true,
        min: 8,
    },
    email:{
        type: String,
        required: true,
        unique: true,
        max: 50,
    },
    isAvatarImageSet:{
        type:Boolean,
        default:false,
    },
    avatarImage:{
       type:String,
       default:"",
    }
})

module.exports=mongoose.model("Users",userModel);