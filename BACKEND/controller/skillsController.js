
import { catchAsyncErrors } from "../middlewares/catchAsyncErrors.js";
import { Skill } from "../models/skillSchema.js"
import ErrorHandler from "../middlewares/error.js";
import {v2 as cloudinary} from "cloudinary";

export const addNewSkill = catchAsyncErrors(async (req, res,next) => {
    if(!req.files || Object.keys(req.files).length === 0) {
        return next(new ErrorHandler("Skill Image is required!", 400));
    }
    const {svg} = req.files;
    const {title, proficiency} = req.body;

    if(!title){
        return next(new ErrorHandler("Skill Title is required!", 400));
    }
    if(!proficiency){
        return next(new ErrorHandler("Skill Proficiency is required!", 400));
    }
    const cloudinaryresponse = await cloudinary.uploader.upload(
        svg.tempFilePath,
        {folder: "SKILLS"}
    )
    
    if(!cloudinaryresponse || cloudinaryresponse.error) {
        console.error(
            "cloudinary Error:",
            cloudinaryresponse.error || "Unknown error occurred during Skills Image upload."
        )
    }

    const skill = await Skill.create({
        title,
        proficiency,
        svg: {
            public_id: cloudinaryresponse.public_id,
            url: cloudinaryresponse.secure_url
        }
    });
    res.status(201).json({
        success:true,
        message:"Skill added successfully",
        skill
    })
})

export const deleteSkill = catchAsyncErrors(async (req, res,next) => {
    const {id} = req.params;
    const skill = await Skill.findById(id);
    if(!skill){
        return next(new ErrorHandler("Skill not found!", 404));
    }
    const skillImageId = skill.svg.public_id;
    await cloudinary.uploader.destroy(skillImageId);
    await skill.deleteOne();
    res.status(200).json({
        success:true,
        message:"Skill deleted successfully"
    });
})

export const updateSkill = catchAsyncErrors(async (req, res,next) => {
    const {id} = req.params;
    let skill = await Skill.findById(id);
    if(!skill){
        return next(new ErrorHandler("Skill not found!", 404));
    }
    const {proficiency} = req.body;
    skill = await Skill.findByIdAndUpdate(id, {proficiency}, {new: true, runValidators: true, useFindAndModify: false});
    res.status(200).json({
        success:true,
        message:"Skill updated successfully",
        skill
    })
})

export const getAllSkills = catchAsyncErrors(async (req, res,next) => {
    const skills = await Skill.find();
        res.status(200).json({
            success:true,
            skills
        })
})