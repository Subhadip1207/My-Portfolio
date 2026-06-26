
import { catchAsyncErrors } from "../middlewares/catchAsyncErrors.js";
import { Project } from "../models/projectSchema.js"
import ErrorHandler from "../middlewares/error.js";
import {v2 as cloudinary} from "cloudinary";

export const addNewProject = catchAsyncErrors(async (req, res,next) => {
    if(!req.files || Object.keys(req.files).length === 0) {
        return next(new ErrorHandler("Project Image is required!", 400));
    }
    const {projectimage} = req.files;
    let {title, description, githubLink, projectLink, technologies, stack} = req.body;
    if (typeof technologies === "string") {
        try {
            technologies = JSON.parse(technologies);
        } catch {
            technologies = technologies.split(",");
        }
    }
    if (
        !title ||
        !description ||
        !githubLink ||
        !projectLink ||
        !stack ||
        !Array.isArray(technologies) ||
        technologies.length === 0
    ) {
        return next(new ErrorHandler("All fields are required and technologies must be a non-empty array!", 400));
    }
    const cloudinaryresponse = await cloudinary.uploader.upload(
        projectimage.tempFilePath,
        {folder: "PROJECTS"}
    )
    if(!cloudinaryresponse || cloudinaryresponse.error) {
        console.error(
            "cloudinary Error:",
            cloudinaryresponse.error || "Unknown error occurred during Projects Image upload."
        )
        return next(
        new ErrorHandler("Failed to upload project image to Cloudinary!", 500)
        )
    }
    const project = await Project.create({
        title,
        description,
        githubLink,
        projectLink,
        technologies,
        stack,
        projectimage: {
            public_id: cloudinaryresponse.public_id,
            url: cloudinaryresponse.secure_url
        }
    });
    res.status(201).json({
        success:true,
        message:"Project added successfully",
        project
    })
})

export const deleteProject = catchAsyncErrors(async (req, res,next) => {
    const {id} = req.params;
    const project = await Project.findById(id);
    if(!project){
        return next(new ErrorHandler("Project not found!", 404));
    }
    const projectImageId = project.projectimage.public_id;
    await cloudinary.uploader.destroy(projectImageId);
    await project.deleteOne();
    res.status(200).json({
        success:true,
        message:"Project deleted successfully"
    });
})

export const updateProject = catchAsyncErrors(async (req, res,next) => {
    let technologies = req.body.technologies;
    // Convert to array safely
    if (typeof technologies === "string") {
        try {
            technologies = JSON.parse(technologies);
        } catch {
            technologies = technologies.split(",");
        }
    }
    // Validate
    if (technologies && (!Array.isArray(technologies) || technologies.length === 0)) {
        return next(new ErrorHandler("Technologies must be a non-empty array!", 400));
    }
    const newProjectData = {
        title:req.body.title,
        description:req.body.description,
        githubLink:req.body.githubLink,
        projectLink:req.body.projectLink,
        stack:req.body.stack
    };
    if (technologies) {
        newProjectData.technologies = technologies;
    }
    if(req.files && req.files.projectimage){
        const projectimage = req.files.projectimage;
        const project = await Project.findById(req.params.id);
        const profileImageId = project.projectimage.public_id;
        await cloudinary.uploader.destroy(profileImageId);

        const cloudinaryresponse = await cloudinary.uploader.upload(
            projectimage.tempFilePath,
            {folder: "PROJECTS"}
        )
        newProjectData.projectimage = {
            public_id: cloudinaryresponse.public_id,
            url: cloudinaryresponse.secure_url
        }
    }
    const project = await Project.findByIdAndUpdate(req.params.id, newProjectData, {
        new: true,
        runValidators: true,
        useFindAndModify: false
    })
    res.status(200).json({
        success: true,
        message: "Project Updated Successfully",
        project
    })
})

export const getAllProjects = catchAsyncErrors(async (req, res,next) => {
    const projects = await Project.find();
    res.status(200).json({
        success:true,
        projects
    })
})

export const getSingleProject = catchAsyncErrors(async (req, res,next) => {
    const {id} = req.params;
    const project = await Project.findById(id);
    if(!project){
        return next(new ErrorHandler("Project not found!", 404));
    }
    res.status(200).json({
        success:true,
        project
    })
})