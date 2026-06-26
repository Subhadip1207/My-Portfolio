import {User} from "../models/userSchema.js";
import {catchAsyncErrors} from "./catchAsyncErrors.js";
import ErrorHandler from "./error.js";
import jwt from "jsonwebtoken";

export const isAuthenticatedUser = catchAsyncErrors(async (req, res, next) => {
    const {token} = req.cookies;
    if(!token){
        return next(new ErrorHandler("User Not Authenticated!", 401));
    }

    const decodedData = jwt.verify(token, process.env.JWT_SECRET_KEY);
    req.user = await User.findById(decodedData.id);
    next();
});
