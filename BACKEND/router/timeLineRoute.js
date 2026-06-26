import express from 'express';
import { postTimeLine, deleteTimeLine, getAllTimeLines } from '../controller/timeLineController.js';
import {isAuthenticatedUser} from "../middlewares/auth.js";

const router = express.Router();

router.post("/add",isAuthenticatedUser, postTimeLine);
router.delete("/delete/:id",isAuthenticatedUser,deleteTimeLine);
router.get("/getall",getAllTimeLines);

export default router;