const Messages=require("../models/messageModel");
const asyncHandler=require("async-handler");

module.exports.getMessages=(async(req,res,next)=>{
    try {
        const { from, to } = req.body;
    
        const messages = await Messages.find({
          users: {
            $all: [from, to],
          },
        }).sort({ updatedAt: 1 });
    
        const projectedMessages = messages.map((msg) => {
          return {
            fromSelf: msg.sender.toString() === from,
            message: msg.message.text,
          };
        });
        res.json(projectedMessages);
      } catch (ex) {
        next(ex);
      }
})

module.exports.addMessage=(async(req,res,next)=>{
    const{from,to,message}=req.body;

    const data=new Messages({
        message: { text: message },
        sender:from,
        users:[from,to]
    })
    if(data){
        await data.save()
        return res.json({ msg: "Message added successfully." });
    }
    else{
        return res.json({ msg: "Failed to add message to the database" });
    }   

})