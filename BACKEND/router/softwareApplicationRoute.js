import express from 'express';
import {addNewApplication,deleteApplications,getAllApplications} from "../controller/softwareApplicationController.js"
import {isAuthenticatedUser} from "../middlewares/auth.js";

const router = express.Router();

router.post("/add",isAuthenticatedUser, addNewApplication);
router.delete("/delete/:id",isAuthenticatedUser,deleteApplications);
router.get("/getall",getAllApplications);

export default router;