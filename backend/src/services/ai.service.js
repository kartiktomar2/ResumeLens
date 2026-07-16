import { GoogleGenAI } from "@google/genai"
import * as z from "zod";
import { ApiError } from "../utils/ApiError.js";

const ai = new GoogleGenAI({
    apiKey: process.env.ApiKey
})






const interviewReportJSONSchema = {
    type: "object",
    properties: {
        matchScore: {
            type: "integer",
            minimum: 0,
            maximum: 100,
            description: "A score between 0 and 100 indicating how well the candidate's profile matches the job description"
        },
        technicalQuestion: {
            type: "array",
            minItems: 2,
            maxItems: 8,
            description: "Technical questions that can be asked in the interview along with their intention and how to answer them",
            items: {
                type: "object",
                properties: {
                    question: {
                        type: "string",
                        description: "The technical question can be asked in the interview"
                    },
                    intention: {
                        type: "string",
                        description: "The intention of interviewer behind asking this question"

                    },
                    answer: {
                        type: "string",
                        description: "How to answer this question, what points to cover, what approach to take etc."

                    }
                },
                required: ["question", "intention", "answer"],
                additionalProperties: false
            }
        },
        behavioralQuestion: {
            type: "array",
            minItems: 3,
            maxItems: 8,
            description: "Behavioral questions that can be asked in the interview along with their intention and how to answer them",
            items: {
                type: "object",
                properties: {
                    question: {
                        type: "string",
                        description: "The behavioral question can be asked in the interview"
                    },
                    intention: {
                        type: "string",
                        description: "The intention of interviewer behind asking this question"

                    },
                    answer: {
                        type: "string",
                        description: "How to answer this question, what points to cover, what approach to take etc."

                    }
                },
                required: ["question", "intention", "answer"],
                additionalProperties: false
            }
        },
        skillGap: {
            type: "array",
            minItems: 5,
            maxItems: 8,
            description: "List of skill gaps in the candidate's profile along with their severity",
            items: {
                type: "object",
                properties: {
                    skill: {
                        type: "string",
                        description: "The skill which the candidate is lacking"
                    },
                    severity: {
                        type: "string",
                        enum: ["low", "medium", "high"],
                        description: "The severity of this skill gap, i.e. how important is this skill for the job and how much it can impact the candidate's chances"

                    }
                },
                required: ["skill", "severity"],
                additionalProperties: false
            }
        },
        preparationPlan: {
            type: "array",
            minItems: 5,
            maxItems: 8,
            description: "A day-wise preparation plan for the candidate to follow in order to prepare for the interview effectively",
            items: {
                type: "object",
                properties: {
                    day: {
                        type: "integer",
                        description: "The day number in the preparation plan, starting from 1"
                    },
                    focus: {
                        type: "string",
                        description: "The main focus of this day in the preparation plan, e.g. data structures, system design, mock interviews etc."

                    },
                    tasks: {
                        type: "array",
                        description: "List of tasks to be done on this day to follow the preparation plan, e.g. read a specific book or article, solve a set of problems, watch a video etc.",
                        items: {
                            type: "string"
                        },
                        minItems: 3,
                        maxItems: 6

                    }
                },
                required: ["day", "focus", "tasks"],
                additionalProperties: false
            }
        },
        title:{
           type:"string",
           description:"The job title extracted from the provided job description." 
        }

    },
    required: ["matchScore", "technicalQuestion", "behavioralQuestion", "skillGap", "preparationPlan","title"],
    additionalProperties: false
}

const interviewReportValidator = z.fromJSONSchema(interviewReportJSONSchema);


async function generateInterviewReport({ resume, selfDescription, jobDescription }) {

    let prompt = `Generate a comprehensive interview report for the candidate using the information provided below.

Candidate Resume:
${resume}

Candidate Self Description:
${selfDescription}

Job Description:
${jobDescription}

Instructions:

- Analyze the candidate's resume, self-description, and the job description together before generating the report.
- Assign a realistic match score between 0 and 100 based on how well the candidate's skills, experience, and projects align with the job requirements.
- Generate technical interview questions that are directly relevant to the technologies, concepts, and responsibilities mentioned in the job description.
- For every technical question:
  - Explain why the interviewer would ask it.
  - Provide a detailed, high-quality answer that demonstrates what an ideal candidate should say.
- Generate realistic behavioral interview questions that are appropriate for the role and company.
- For every behavioral question:
  - Explain the interviewer's intention.
  - Provide a strong sample answer using a structured approach such as STAR whenever appropriate.
- Identify the candidate's actual skill gaps by comparing their profile with the job description. Do not invent unnecessary weaknesses.
- Assign an appropriate severity (low, medium, or high) for every identified skill gap.
- Create a practical day-wise interview preparation plan that prioritizes the most important topics first.
- The preparation plan must start with Day 1 and continue sequentially without skipping any day.
- Every preparation day should have a clear focus area and between 3 and 6 actionable tasks.
- Keep all recommendations personalized to the candidate instead of giving generic interview advice.
- Do not include any information that is not supported by the candidate's profile or the job description.`
    try {
        const interaction = await ai.interactions.create({
            model: "gemini-3.1-flash-lite",
            input: prompt,
            response_format: {
                type: 'text',
                mime_type: 'application/json',
                schema: interviewReportJSONSchema
            },
        });
        const interviewReport = interviewReportValidator.parse(JSON.parse(interaction.output_text));
        console.dir(interviewReport, {
            depth: null
        });
        return interviewReport;
    } catch (error) {
        console.log("failed generating interview report due to: ", error)
        throw new ApiError(500,"Failed to generate interview Report",error)
    }

}

export default generateInterviewReport;