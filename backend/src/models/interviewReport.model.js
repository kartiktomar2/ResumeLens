import mongoose from 'mongoose';



const technicalQuestionSchema = new mongoose.Schema({
    question: {
        type: String,
        required:[true, "Technical question is required"]
    },
    intention: {
        type: String,
        required:[true, "intention is required"]

    },
    answer: {
        type: String,
        required:[true, "answer is required"]

    }
},{
       _id:false
})


const behavioralQuestionSchema = new mongoose.Schema({
    question: {
        type: String,
        required:[true, "behavioral question is required"]
    },
    intention: {
        type: String,
        required:[true, "intention is required"]

    },
    answer: {
        type: String,
        required:[true, "answer is required"]

    }
},{
       _id:false
})

const skillGapSchema= new mongoose.Schema({
       skill:{
          type:String,
          required:[true," skill is required"]
       },
       severity:{
          type: String,
          enum:["low", "medium", "high"],
          required:[true,"severity is required"]
       }
},{
      _id:false 
})

const preparationPlanSchema= new mongoose.Schema({
         day:{
              type:Number,
              required:[true, "Day is required"]
         },
         focus:{
             type:String,
             required:[true, "Focus is required "]
         },
         tasks:[
               {
                 type:String,
                 required:[true, "task is required "]
               }
         ]
},{
       _id:false
})

const interviewReportSchema = new mongoose.Schema({
    jobDescription: {
        type: String,
        required: [true, "without job description I cannot provide anything"]
    },
    resume: {
        type: String
    },
    selfDescription: {
        type: String
    },
    matchScore: {
        type: Number,
        min: 0,
        max: 100
    },
    technicalQuestion: [technicalQuestionSchema],
    behavioralQuestion:[behavioralQuestionSchema],
    skillGap:[skillGapSchema],
    preparationPlan:[preparationPlanSchema],
    user:{
         type: mongoose.Schema.Types.ObjectId,
         ref:"User",
         required:[true, "user id is required"]
    }
}, {
       timestamps:true
})


export const InterviewReport= mongoose.model("InterviewReport", interviewReportSchema)