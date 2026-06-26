import express from 'express';
import { deleteMessage, getAllMessages, sendMessage } from '../controller/messageController.js';
import {isAuthenticatedUser} from "../middlewares/auth.js";

const router = express.Router();

router.post("/send",sendMessage);
router.get("/getall",getAllMessages);
router.delete("/delete/:id",isAuthenticatedUser,deleteMessage);

export default router;