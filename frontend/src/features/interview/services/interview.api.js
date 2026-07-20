import api from "../../../services/apiClient.js";

const generateInterviewReport = async ({ jobDescription, selfDescription, resume }) => {
      try {
            const formData = new FormData();
            formData.append("resume", resume);
            formData.append("jobDescription", jobDescription)
            formData.append("selfDescription", selfDescription)
            const response = await api.post("/api/interview/", formData, {
                  headers: {
                        "Content-Type": "multipart/form-data"
                  }
            })
            return response.data

      } catch (error) {
            console.log("error recevied in frontend while generating interview report: ", error?.response?.data);
            throw error
      }
}

const getInterviewReportById = async (id) => {
      try {
            const response = await api.get(`/api/interview/report/${id}`)
            return response.data
      } catch (error) {
            console.log("error received in frontend while fetching interview report by id: ", error?.response?.data)
            throw error
      }
}

const getAllInterviewReports = async () => {
      try {
            const response = await api.get("/api/interview/");
            return response.data;
      } catch (error) {
            console.log("error received in frontend while fetching all interview reports: ", error?.response?.data)
            throw error
      }
}

const generateResumePdf = async (interViewReportid) => {
      try {
            const response = await api.post(`/api/interview/resume/pdf/${interViewReportid}`, null,
                  {
                        responseType: "blob"
                  })
            return response.data
      } catch (error) {
            console.log("error received in frontend while generating resume pdf ", error?.response?.data)
            throw error
      }
}



export { generateInterviewReport, getInterviewReportById, getAllInterviewReports, generateResumePdf }