import express from "express"
import {  generateInterviewReportController, getAllInterviewReportsController, getInterviewReportByIdController, generateResumePdfController } from "../controller/interview.controller.js";
import { verifyJWT } from "../middleware/auth.middleware.js";
import { upload } from "../middleware/multer.middleware.js";


const interviewRouter= express.Router();

/**
 * @route POST /api/interview/ 
 * @access private 
 */
interviewRouter.route("/").post(verifyJWT, upload.single("resume") ,  generateInterviewReportController)


/**
 *  @route GET /api/interview/report/:interviewId
 *  @description get interview report by interview id
 *  @access private 
 */
interviewRouter.route("/report/:interviewId").get(verifyJWT, getInterviewReportByIdController)


/**
 *  @route GET /api/interview/
 *  @description fetch all interview reports of a user
 *  @access private 
 */
// The combination of the HTTP method and the path determines which route is matched. So you can have multiple handlers with the same endpoint as long as their HTTP methods differ.

interviewRouter.route("/").get(verifyJWT, getAllInterviewReportsController)


/**
 *  @route POST /api/interview/resume/pdf/:interviewReportid
 *  @description Create a resume for user on basis of uploaded resume, job description, self description 
 *  @access private
 */
interviewRouter.route("/resume/pdf/:interviewReportId").post(verifyJWT, generateResumePdfController)

export default interviewRouter