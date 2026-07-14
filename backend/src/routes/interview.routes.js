import express from "express"
import {  generateInterviewReportController } from "../controller/interview.controller.js";
import { verifyJWT } from "../middleware/auth.middleware.js";
import { upload } from "../middleware/multer.middleware.js";


const interviewRouter= express.Router();

/**
 * @route POST /api/interview/ 
 * @access private 
 */
interviewRouter.route("/").post(verifyJWT, upload.single("resume") ,  generateInterviewReportController)



export default interviewRouter