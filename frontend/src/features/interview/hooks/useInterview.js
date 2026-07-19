import {useContext} from "react"
import { InterviewContext } from "../interview.context.jsx"
import {generateInterviewReport,getAllInterviewReports,getInterviewReportById} from "../services/interview.api.js"



export const useInterview=()=>{
         const {loading,setLoading, interviewReportLoading, setInterviewReportLoading, report,setReport, reports, setReports}= useContext(InterviewContext)
         
         const generateReport= async({ jobDescription, selfDescription, resume })=>{
                     setInterviewReportLoading(true)
                     let result;
                 try {
                        result= await generateInterviewReport({jobDescription, selfDescription, resume})
                        // console.dir(result,{
                        //      depth:null
                        // })
                       setReport(result.data)
                       return result.data
                       
                 } catch (error) {
                         throw error
                 }
                 finally{
                     setInterviewReportLoading(false)
                 }
         }
         
         const getReportById= async(id)=>{
               setLoading(true)
               try {
                       const result= await getInterviewReportById(id);
                       setReport(result.data)
               } catch (error) {
                   throw error
               }
               finally{
                   setLoading(false)
               }
         }

         const getAllReports= async()=>{
            setLoading(true)
              try {
                   const result= await getAllInterviewReports();
                   setReports(result.data)
              } catch (error) {
                  throw error
              }
              finally{
                  setLoading(false)
              }
         }
         return {loading,interviewReportLoading, report, reports, generateReport, getReportById, getAllReports}
}