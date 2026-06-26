import express from 'express';
import { login, register, logout, getUser, updateProfile, updatePassword, getUserForPortfolio, forgotPassword, resetPassword} from '../controller/userController.js';
import {isAuthenticatedUser} from "../middlewares/auth.js";

const router = express.Router();

router.post("/register",register);
router.post("/login",login);
router.get("/logout",isAuthenticatedUser, logout);
router.get("/me",isAuthenticatedUser, getUser);
router.put("/update/me",isAuthenticatedUser, updateProfile);
router.put("/update/password",isAuthenticatedUser, updatePassword);
router.get("/me/portfolio", getUserForPortfolio);
router.post("/forgot/password", forgotPassword);
router.put("/password/reset/:token", resetPassword);

export default router;