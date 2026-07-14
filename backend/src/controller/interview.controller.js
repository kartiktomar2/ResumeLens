import { InterviewReport } from "../models/interviewReport.model.js";
import generateInterviewReport from "../services/ai.service.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import { PDFParse } from "pdf-parse"

const generateInterviewReportController = asyncHandler(async (req, res) => {
    const file = req.file;
    const { selfDescription, jobDescription } = req.body

    if ((!selfDescription?.trim()) || (!jobDescription?.trim())) {
        throw new ApiError(400, "selfDescription, jobDescription are required")
    }


    if (!file) {
        throw new ApiError(400, "file not uploaded")
    }
    const buffer = req.file.buffer;
    if (!buffer) {
        throw new ApiError(400, "buffer not found")
    }
    const parser = new PDFParse({
        data: buffer,
        stopAtErrors: true
    })
    const resumeText = await parser.getText();
    console.log("resume text is: ", resumeText.text);
    if (!(resumeText.text)) {
        throw new ApiError(500, "failed to parse text from resume")
    }
    const interviewReportByAi = await generateInterviewReport({ resume: resumeText.text, selfDescription, jobDescription })

    const interview = await InterviewReport.create({
        user: req.user._id,
        resume: resumeText.text,
        selfDescription,
        jobDescription,
        ...interviewReportByAi


    })


    res
        .status(201)
        .json(new ApiResponse("interview report generated successfully", 201, interview))


})



export { generateInterviewReportController }