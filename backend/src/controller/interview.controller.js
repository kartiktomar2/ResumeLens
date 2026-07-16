import { InterviewReport } from "../models/interviewReport.model.js";
import generateInterviewReport from "../services/ai.service.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import { PDFParse } from "pdf-parse"
import mongoose from "mongoose";


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

const getInterviewReportByIdController= asyncHandler(async(req,res)=>{
       const {interviewId}= req.params;
       if(!interviewId)
       {
         throw new ApiError(400, "interview id is required")
       }
       
       if(!mongoose.Types.ObjectId.isValid(interviewId))
       {
         throw new ApiError(400,"invalid interview id")
       }
       const interviewReport= await InterviewReport.findOne({_id:interviewId, user: req.user._id})

       if(!interviewReport){
         throw new ApiError(404, "This report does not exist" )
       }

        res
       .status(200)
       .json(new ApiResponse("interview report fetched successfully",200,interviewReport))
})

const getAllInterviewReportsController= asyncHandler(async (req,res)=>{
     const {_id}= req.user;
     if(!_id)
     {
         throw new ApiError(400, "user id is required");
     }
     
     if(!mongoose.Types.ObjectId.isValid(_id))
     {
         throw new ApiError(400, "invalid user id");
     }
     
     const interviewReports= await InterviewReport.find({user:_id},{title:1, matchScore:1}).sort({createdAt:-1});
      
     res
     .status(200)
     .json(new ApiResponse("all interview reports fetched successfully", 200, interviewReports))
})

export { generateInterviewReportController, getInterviewReportByIdController, getAllInterviewReportsController }