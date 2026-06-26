
import { catchAsyncErrors } from "../middlewares/catchAsyncErrors.js";
import { Language } from "../models/languageSchema.js"
import ErrorHandler from "../middlewares/error.js";
import {v2 as cloudinary} from "cloudinary";

export const addNewLanguage = catchAsyncErrors(async (req, res,next) => {
    if(!req.files || Object.keys(req.files).length === 0) {
        return next(new ErrorHandler("Language Image is required!", 400));
    }
    const {svg} = req.files;
    const {title, proficiency} = req.body;

    if(!title){
        return next(new ErrorHandler("Language Title is required!", 400));
    }
    if(!proficiency){
        return next(new ErrorHandler("Language Proficiency is required!", 400));
    }
    const cloudinaryresponse = await cloudinary.uploader.upload(
        svg.tempFilePath,
        {folder: "LANGUAGES"}
    )
    
    if(!cloudinaryresponse || cloudinaryresponse.error) {
        console.error(
            "cloudinary Error:",
            cloudinaryresponse.error || "Unknown error occurred during Languages Image upload."
        )
    }

    const language = await Language.create({
        title,
        proficiency,
        svg: {
            public_id: cloudinaryresponse.public_id,
            url: cloudinaryresponse.secure_url
        }
    });
    res.status(201).json({
        success:true,
        message:"Language added successfully",
        language
    })
})

export const deleteLanguage = catchAsyncErrors(async (req, res,next) => {
    const {id} = req.params;
    const language = await Language.findById(id);
    if(!language){
        return next(new ErrorHandler("Language not found!", 404));
    }
    const languageImageId = language.svg.public_id;
    await cloudinary.uploader.destroy(languageImageId);
    await language.deleteOne();
    res.status(200).json({
        success:true,
        message:"Language deleted successfully"
    });
})

export const updateLanguage = catchAsyncErrors(async (req, res,next) => {
    const {id} = req.params;
    let language = await Language.findById(id);
    if(!language){
        return next(new ErrorHandler("Language not found!", 404));
    }
    const {proficiency} = req.body;
    language = await Language.findByIdAndUpdate(id, {proficiency}, {new: true, runValidators: true, useFindAndModify: false});
    res.status(200).json({
        success:true,
        message:"Language updated successfully",
        language
    })
})

export const getAllLanguages = catchAsyncErrors(async (req, res,next) => {
    const languages = await Language.find();
        res.status(200).json({
            success:true,
            languages
        })
})