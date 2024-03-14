const express=require("express");
const mongoose=require("mongoose");
const socket=require("socket.io");
cors=require("cors");
app=express();
app.use(cors());
app.use(express.json());
require('dotenv').config();

const userRoutes=require("./routes/auth");
const messageRoutes=require("./routes/messages");


mongoose.connect(process.env.MONGO_URL)
.then((res)=>{
    console.log("connected to db");
})

app.use("/api/auth",userRoutes);
app.use("/api/messages", messageRoutes);

    


app.use((error,req,res,next)=>{ 
    const status=error.status||500;
    const msg=error.msg;
    res.status(status).json(msg);
})




const server=app.listen(process.env.PORT,()=>{
    console.log("in server");
})

const io=socket(server,{
    cors:{
        origin:"http://localhost:3000",
        credentials:true,
    }
})

global.onlineUsers=new Map();
io.on("connection",(socket)=>{
    global.chatSocket=socket;
    socket.on("add-user",(userId)=>{
        onlineUsers.set(userId,socket.id);
    })
    socket.on("send-msg",(data)=>{
        const sendUserSocket=onlineUsers.get(data.to);
        if (sendUserSocket) {
            socket.to(sendUserSocket).emit("msg-recieve", data.msg);
        }
    })
})