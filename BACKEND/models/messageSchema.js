import mongoose from "mongoose";

const messageSchema = new mongoose.Schema({
    senderName:{
        type:String,
        minLength:[3,"Name should be atleast 3 characters"],
    },
    subject:{
        type:String,
        minLength:[2,"Subject should be atleast 2 characters"],
    },
    message:{
        type:String,
        minLength:[2,"Message should be atleast 2 characters"],
    },
    createdAt:{
        type:Date,
        default:Date.now(),
    }
})

export const Message = mongoose.model("Message", messageSchema);