import mongoose from "mongoose";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import crypto from "crypto";

const userSchema = new mongoose.Schema({
    fullName:{
        type:String,
        required:[true, "Name is required!"]
    },
    email:{
        type:String,
        unique:true,
        required:[true, "Email is required!"]
    },
    phone:{
        type:String,
        unique:true,
        required:[true, "Phone Number is required!"]
    },
    aboutMe:{
        type:String,
        required:[true, "About Me Field is required!"]
    },
    password:{
        type:String,
        required:[true, "Password is required!"],
        minLength:[6, "Password must be at least 6 characters long!"],
        select:false //Not to getting the password when we get the user details
    },
    avatar:{
        public_id:{
            type:String,
            required:true
        },
        url:{
            type:String,
            required:true
        }
    },
    resume:{
        public_id:{
            type:String,
            required:true
        },
        url:{
            type:String,
            required:true
        }
    },
    portfolioURL:String,
    githubURL:String,
    instagramURL:String,
    facebookURL:String,
    twitterURL:String,
    linkedInURL:String,
    codingPlatformURL:String,
    resetPasswordToken:String,
    resetPasswordExpire:Date
})

//For hashing password
userSchema.pre("save", async function () {
    if (!this.isModified("password") || !this.password) {
        return;
    }

    this.password = await bcrypt.hash(this.password, 10);
});

//For comparing password with hased password
userSchema.methods.comparePassword = async function(enteredPassword){
    return await bcrypt.compare(enteredPassword, this.password);
}

//Generating JSON Web Token
userSchema.methods.generateJWT = function(){
    return jwt.sign({id:this._id}, process.env.JWT_SECRET_KEY, {
        expiresIn:process.env.JWT_EXPIRES
    })
}

//Generating Reset Password Token
userSchema.methods.getResetPasswordToken = function(){
    const resetToken = crypto.randomBytes(20).toString("hex");

    this.resetPasswordToken = crypto.createHash("sha256").update(resetToken).digest("hex");
    this.resetPasswordExpire = Date.now() + 10 * 60 * 1000; // 10 minutes
    return resetToken;
}

export const User = mongoose.model("User", userSchema);