import express from 'express';
import { addNewLanguage, deleteLanguage, getAllLanguages, updateLanguage } from "../controller/languageController.js";
import {isAuthenticatedUser} from "../middlewares/auth.js";

const router = express.Router();

router.post("/add",isAuthenticatedUser, addNewLanguage);
router.delete("/delete/:id",isAuthenticatedUser,deleteLanguage);
router.put("/update/:id",isAuthenticatedUser,updateLanguage);
router.get("/getall",getAllLanguages);

export default router;