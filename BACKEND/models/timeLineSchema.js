import mongoose from "mongoose";

const timeLineSchema = new mongoose.Schema({
    title:{
        type:String,
        required:[true,"Title is required"],
    },
    description:{
        type:String,
        required:[true,"Description is required"],
    },
    timeLine:{
        from:{
            type:String,
             required:[true,"Starting Date is required"],
        },
        to: String,
    }
})

export const TimeLine = mongoose.model("TimeLine", timeLineSchema);