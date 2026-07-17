import {createContext, useState} from "react"


export const InterviewContext= createContext(null);



const InterviewContextProvider=({children})=>{
        const [loading, setLoading]= useState(false)
        const [report, setReport]= useState(null)
        const [reports, setReports]= useState([])
   return (
        <InterviewContext value={{loading,setLoading, report,setReport, reports, setReports}}>
            {children}
        </InterviewContext>
   )

}


export default InterviewContextProvider