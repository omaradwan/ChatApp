const mongoose=require("mongoose");
const schema=mongoose.Schema;

const MessageSchema=new schema({
    message:{
        text:{type:String,required:true}
    },
    users:Array,
    sender:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User",
        required:true,
    }
})

module.exports=mongoose.model("Messages",MessageSchema);