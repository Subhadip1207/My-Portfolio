import { catchAsyncErrors } from "../middlewares/catchAsyncErrors.js";
import { TimeLine } from "../models/timeLineSchema.js"
import ErrorHandler from "../middlewares/error.js";

export const postTimeLine = catchAsyncErrors(async (req, res,next) => {
    const {title, description, from, to} = req.body;
    const newTimeLine = await TimeLine.create({
        title,
        description,
        timeLine:{from,to}
    })
    res.status(201).json({
        success:true,
        message:"TimeLine created successfully",
        timeLine:newTimeLine
    })
})

export const deleteTimeLine = catchAsyncErrors(async (req, res,next) => {
    const { id } = req.params;
    const timeLine = await TimeLine.findById(id);
    if(!timeLine){
        return next(new ErrorHandler("TimeLine not found",404));
    }
    await timeLine.deleteOne();
    res.status(200).json({
        success:true,
        message:"TimeLine deleted successfully",
    })
})

export const getAllTimeLines = catchAsyncErrors(async (req, res,next) => {
    const timeLines = await TimeLine.find();
    res.status(200).json({
        success:true,
        timeLines
    })
})