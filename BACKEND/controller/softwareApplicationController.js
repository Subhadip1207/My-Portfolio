import { catchAsyncErrors } from "../middlewares/catchAsyncErrors.js";
import { SoftwareApplication } from "../models/softwareApplicationSchema.js"
import ErrorHandler from "../middlewares/error.js";
import {v2 as cloudinary} from "cloudinary";

export const addNewApplication = catchAsyncErrors(async (req, res,next) => {
    if(!req.files || Object.keys(req.files).length === 0) {
        return next(new ErrorHandler("Software Application Image is required!", 400));
    }
    const {svg} = req.files;
    const {name} = req.body;

    if(!name){
        return next(new ErrorHandler("Software Application Name is required!", 400));
    }
    const cloudinaryresponse = await cloudinary.uploader.upload(
        svg.tempFilePath,
        {folder: "SOFTWARE_APPLICATIONS"}
    )
    
    if(!cloudinaryresponse || cloudinaryresponse.error) {
        console.error(
            "cloudinary Error:",
            cloudinaryresponse.error || "Unknown error occurred during Software Application Image upload."
        )
    }

    const softwareApplication = await SoftwareApplication.create({
        name,
        svg:{
            public_id: cloudinaryresponse.public_id,
            url: cloudinaryresponse.secure_url
        }
    })
    res.status(201).json({
        success:true,
        message:"Software Application added successfully",
        softwareApplication
    })
})

export const deleteApplications = catchAsyncErrors(async (req, res,next) => {
    const {id} = req.params;
    const softwareApplication = await SoftwareApplication.findById(id);
    if(!softwareApplication){
        return next(new ErrorHandler("Software Application not found!", 404));
    }
    const softwareApplicationImageId = softwareApplication.svg.public_id;
    await cloudinary.uploader.destroy(softwareApplicationImageId);
    await softwareApplication.deleteOne();
    res.status(200).json({
        success:true,
        message:"Software Application deleted successfully"
    });
})

export const getAllApplications = catchAsyncErrors(async (req, res,next) => {
    const softwareApplications = await SoftwareApplication.find();
        res.status(200).json({
            success:true,
            softwareApplications
        })
})