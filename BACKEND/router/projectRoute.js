import express from 'express';
import {addNewProject,deleteProject,updateProject,getAllProjects,getSingleProject} from '../controller/projectController.js';
import {isAuthenticatedUser} from "../middlewares/auth.js";

const router = express.Router();

router.post("/add",isAuthenticatedUser, addNewProject);
router.delete("/delete/:id",isAuthenticatedUser,deleteProject);
router.put("/update/:id",isAuthenticatedUser,updateProject);
router.get("/getall",getAllProjects);
router.get("/get/:id",getSingleProject);

export default router;