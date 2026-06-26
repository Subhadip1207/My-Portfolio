import {catchAsyncErrors} from "../middlewares/catchAsyncErrors.js";
import ErrorHandler from "../middlewares/error.js";
import {User} from "../models/userSchema.js";
import { v2 as cloudinary } from 'cloudinary';
import { generateToken } from "../utils/jwtTokens.js";
import { sendEmail } from "../utils/sendEmail.js";
import crypto from "crypto";

export const register = catchAsyncErrors(async (req, res, next) => {
    if(!req.files || Object.keys(req.files).length === 0) {
        return next(new ErrorHandler("Avatar and Resume are required!", 400));
    }
    const {avatar, resume} = req.files;
    const {fullName, email, phone, aboutMe, password, portfolioURL, githubURL, instagramURL, facebookURL, twitterURL, linkedInURL,
    codingPlatformURL} = req.body;

    if(!fullName){
        return next(new ErrorHandler("Full Name is required!", 400));
    }
    if(!email){
        return next(new ErrorHandler("Email is required!", 400));
    }
    if(!phone){
        return next(new ErrorHandler("Phone Number is required!", 400));
    }
    if(!password){
        return next(new ErrorHandler("Password is required!", 400));
    }

    const existingUser = await User.findOne({
        $or: [{ email }, { phone }]
    });

    if (existingUser) {
        return next(
            new ErrorHandler("User with this email or phone already exists!", 400)
        );
    }

    const cloudinaryresponseForAvatar = await cloudinary.uploader.upload(
        avatar.tempFilePath,
        {folder: "AVATAR"}
    )

    if(!cloudinaryresponseForAvatar || cloudinaryresponseForAvatar.error) {
        console.error(
            "cloudinary Error:",
            cloudinaryresponseForAvatar.error || "Unknown error occurred during avatar upload."
        )
    }

    const cloudinaryresponseForResume = await cloudinary.uploader.upload(
        resume.tempFilePath,
        {folder: "RESUME"}
    )

    if(!cloudinaryresponseForResume || cloudinaryresponseForResume.error) {
        console.error(
            "cloudinary Error:",
            cloudinaryresponseForResume.error || "Unknown error occurred during resume upload."
        )
    }

    

    const user  = await User.create({
        fullName, email, phone, aboutMe, password, portfolioURL, githubURL, instagramURL, facebookURL, twitterURL, linkedInURL,
    codingPlatformURL,
        avatar:{
            public_id: cloudinaryresponseForAvatar.public_id,
            url: cloudinaryresponseForAvatar.secure_url
        },
        resume:{
            public_id: cloudinaryresponseForResume.public_id,
            url: cloudinaryresponseForResume.secure_url
        }
    })
    
    generateToken(user, "User Registered", 201, res);
})

export const login = catchAsyncErrors(async (req, res, next) => {
    const {email, password} = req.body;
    console.log(email, password);

    if(!email || !password){
        return next(new ErrorHandler("Please provide email and password!", 400));
    }

    
    const user = await User.findOne({email}).select("+password");

    if(!user){
        return next(new ErrorHandler("No user found with this email!", 401));
    }

    const isPasswordMatch = await user.comparePassword(password);

    if(!isPasswordMatch){
        return next(new ErrorHandler("Invalid email or password!", 401));
    }

    generateToken(user, "User Logged In", 200, res);
})

export const logout = catchAsyncErrors(async (req, res, next) => {
    res.status(200).cookie("token", "", {
        httpOnly: true,
        expires: new Date(Date.now())
    }).json({
        success: true,
        message: "User Logged Out"
    });
});

export const getUser = catchAsyncErrors(async (req, res, next) => {
    const user = await User.findById(req.user.id);
    res.status(200).json({
        success: true,
        user
    })
})

export const updateProfile = catchAsyncErrors(async (req, res, next) => {
    const newUserData = {
        fullName: req.body.fullName,
        email: req.body.email,
        phone: req.body.phone,
        aboutMe: req.body.aboutMe,
        portfolioURL: req.body.portfolioURL,
        githubURL: req.body.githubURL,
        instagramURL: req.body.instagramURL,
        facebookURL: req.body.facebookURL,
        twitterURL: req.body.twitterURL,
        linkedInURL: req.body.linkedInURL,
        codingPlatformURL: req.body.codingPlatformURL
    }

    if(req.files && req.files.avatar){
        const avatar = req.files.avatar;
        const user = await User.findById(req.user.id);
        const profileImageId = user.avatar.public_id;
        await cloudinary.uploader.destroy(profileImageId);

        const cloudinaryresponse = await cloudinary.uploader.upload(
            avatar.tempFilePath,
            {folder: "AVATAR"}
        )
        newUserData.avatar = {
            public_id: cloudinaryresponse.public_id,
            url: cloudinaryresponse.secure_url
        }
    }

    if(req.files && req.files.resume){
        const resume = req.files.resume;
        const user = await User.findById(req.user.id);
        const resumeId = user.resume.public_id;
        await cloudinary.uploader.destroy(resumeId);

        const cloudinaryresponse = await cloudinary.uploader.upload(
            resume.tempFilePath,
            {folder: "RESUME"}
        )
        newUserData.resume = {
            public_id: cloudinaryresponse.public_id,
            url: cloudinaryresponse.secure_url
        }
    }
    const user = await User.findByIdAndUpdate(req.user.id, newUserData, {
        new: true,
        runValidators: true,
        useFindAndModify: false
    })
    res.status(200).json({
        success: true,
        message: "Profile Updated Successfully",
        user
    })
})

export const updatePassword = catchAsyncErrors(async (req, res, next) => {
    const {currentPassword, newPassword, confirmNewPassword} = req.body;

    if(!currentPassword || !newPassword || !confirmNewPassword){
        return next(new ErrorHandler("Please provide all password fields!", 400));
    }

    if(newPassword !== confirmNewPassword){
        return next(new ErrorHandler("New Password and Confirm New Password do not match!", 400));
    }

    const user = await User.findById(req.user.id).select("+password");
    const isPasswordMatch = await user.comparePassword(currentPassword);

    if(!isPasswordMatch){
        return next(new ErrorHandler("Current password is incorrect!", 400));
    }
    

    user.password = newPassword;
    await user.save();

    res.status(200).json({
        success: true,
        message: "Password Updated Successfully"
    });
});

export const getUserForPortfolio = catchAsyncErrors(async (req, res, next) => {
    const id = "69d1f8997e2945636e41112c";
    const user = await User.findById(id);
    res.status(200).json({
        success: true,
        user
    })
})

export const forgotPassword = catchAsyncErrors(async (req, res, next) => {
    const {email} = req.body;
    if(!email){
        return next(new ErrorHandler("Please provide email!", 400));
    }
    const user = await User.findOne({email});
    if(!user){
        return next(new ErrorHandler("No user found with this email!", 404));
    }
    const resetToken = user.getResetPasswordToken();
    try {
        await user.save({ validateBeforeSave: false });
        console.log("SAVE SUCCESS");
    } catch (err) {
        console.log("SAVE ERROR:", err); 
    }
    const resetPasswordURL = `${process.env.DASHBOARD_URL}/password/reset/${resetToken}`;

    const message = `Your reset password link is: \n\n ${resetPasswordURL} \n\n
    If you have not requested for this email, then please ignore it.`;

    try {
        await sendEmail({
            email: user.email,
            subject: " Portfolio Recovery password reset token",
            message
        })
        res.status(200).json({
            success: true,
            message: `Email sent to ${user.email} successfully!`
        })
    } catch (error) {
        user.resetPasswordToken = undefined;
        user.resetPasswordExpire = undefined;
        await user.save({validateBeforeSave: false});
        return next(new ErrorHandler(error.message, 500));
    }
})

export const resetPassword = catchAsyncErrors(async (req, res, next) => {
    const {token} = req.params;
    const {password, confirmPassword} = req.body;

    if(!password || !confirmPassword){
        return next(new ErrorHandler("Please provide all password fields!", 400));
    }
    const resetPasswordToken = crypto.createHash("sha256").update(token).digest("hex");
    const user = await User.findOne({
        resetPasswordToken,
        resetPasswordExpire: {$gt: Date.now()}
    })
    if(!user){
        return next(new ErrorHandler("Invalid or expired reset token!", 400));
    }
    if(password !== confirmPassword){
        return next(new ErrorHandler("New Password and Confirm Password do not match!", 400));
    }
    user.password = password;
    user.resetPasswordToken = undefined;
    user.resetPasswordExpire = undefined;
    await user.save();
    generateToken(user, "Password Reset Successfully", 200, res);
})