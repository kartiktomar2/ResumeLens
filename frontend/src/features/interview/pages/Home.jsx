import React, { useEffect, useState } from 'react'
import "../styles/home.scss"
import { useInterview } from '../hooks/useInterview.js'
import { useNavigate } from "react-router"
import AllInterviewReports from './AllInterviewReports.jsx'
import HomeSkeleton from '../components/HomeSkeleton.jsx'
import InterviewSkeleton from '../components/InterviewSkeleton.jsx'

const Home = () => {

    const [jobDescription, setJobDescription] = useState("")
    const [selfDescription, setSelfDescription] = useState("")
    const [resume, setResume] = useState(null)
    const [uploadError, setUploadError] = useState("")
    const [fileUploadTime, setFileUploadTime] = useState(null)
    const {loading, interviewReportLoading, generateReport, getAllReports,  } = useInterview()
    const navigate = useNavigate()

    const MAX_FILE_SIZE = 1 * 1024 * 1024

    function handleFile(e) {
        const selectedFile = e.target.files?.[0]

        if (!selectedFile) return

        if (selectedFile.size > MAX_FILE_SIZE) {
            setUploadError("File size must be 1MB or less. Please choose a smaller PDF.")
            setResume(null)
            e.target.value = ""
            return
        }

        setUploadError("")
        setResume(selectedFile)
        setFileUploadTime(new Date())
        console.log("selected file is: ", selectedFile)
        console.log(selectedFile.size)
    }

    function handleRemoveFile() {
        setResume(null)
        setFileUploadTime(null)
        setUploadError("")
        document.getElementById('resume').value = ""
    }

    function formatUploadTime(date) {
        const options = { year: 'numeric', month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit' }
        return date.toLocaleDateString('en-US', options)
    }

    async function handleGenerateReport() {
        try {
            if ((!selfDescription?.trim()) || (!jobDescription?.trim()) || !resume) {
                console.log("job description, self description and resume all are required")
                return;
            }
            const result = await generateReport({ jobDescription, selfDescription, resume })
            // console.log("log after await: ", result)
            navigate(`/interview/${result._id}`);

        } catch (error) {
            console.log("failed to generate interview report: ", error)
        }
    }
     
      useEffect(()=>{
          getAllReports()
     },[])

    return (
        <div className='home-page'>

            {/* Page Header */}
            {  interviewReportLoading ? (<InterviewSkeleton />) :
                loading ?(<main> 
                       <HomeSkeleton />
                     </main>) :
                    <>
                        <header className='page-header'>
                            <h1>Create Your Custom <span className='highlight'>Interview Plan</span></h1>
                            <p>Let our AI analyze the job requirements and your unique profile to build a winning strategy.</p>
                        </header>

                        {/* Main Card */}
                        <div className='interview-card'>
                            <div className='interview-card__body'>

                                {/* Left Panel - Job Description */}
                                <div className='panel panel--left'>
                                    <div className='panel__header'>
                                        <span className='panel__icon'>
                                            <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="7" width="20" height="14" rx="2" ry="2" /><path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16" /></svg>
                                        </span>
                                        <h2>Target Job Description</h2>
                                        <span className='badge badge--required'>Required</span>
                                    </div>
                                    <textarea
                                        className='panel__textarea'
                                        placeholder={`Paste the full job description here...\ne.g. 'Senior Frontend Engineer at Google requires proficiency in React, TypeScript, and large-scale system design...'`}
                                        maxLength={1500}
                                        value={jobDescription}
                                        onChange={(e) => setJobDescription(e.target.value)}
                                    />
                                    <div className='char-counter'>{jobDescription.length} / 1500 chars</div>
                                </div>

                                {/* Vertical Divider */}
                                <div className='panel-divider' />

                                {/* Right Panel - Profile */}
                                <div className='panel panel--right'>
                                    <div className='panel__header'>
                                        <span className='panel__icon'>
                                            <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" /><circle cx="12" cy="7" r="4" /></svg>
                                        </span>
                                        <h2>Your Profile</h2>
                                    </div>

                                    {/* Upload Resume */}
                                    <div className='upload-section'>
                                        <label className='section-label'>
                                            Upload Resume
                                            <span className='badge badge--best'>Best Results</span>
                                        </label>
                                        {!resume ? (
                                            <>
                                                <label className='dropzone' htmlFor='resume'>
                                                    <span className='dropzone__icon'>
                                                        <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="16 16 12 12 8 16" /><line x1="12" y1="12" x2="12" y2="21" /><path d="M20.39 18.39A5 5 0 0 0 18 9h-1.26A8 8 0 1 0 3 16.3" /></svg>
                                                    </span>
                                                    <p className='dropzone__title'>Click to upload or drag &amp; drop</p>
                                                    <p className='dropzone__subtitle'>PDF  (Max 1MB)</p>
                                                    <input hidden type='file' id='resume' name='resume' accept='.pdf' onChange={handleFile} />
                                                </label>
                                                {uploadError && <p style={{ color: '#ff6b6b', marginTop: '0.75rem', fontSize: '0.95rem' }}>{uploadError}</p>}
                                            </>
                                        ) : (
                                            <div className='file-preview'>
                                                <div className='file-preview__content'>
                                                    <svg className='file-preview__icon' xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="currentColor">
                                                        <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
                                                        <polyline points="14 2 14 8 20 8" fill="none" stroke="currentColor" strokeWidth="2" />
                                                    </svg>
                                                    <div className='file-preview__info'>
                                                        <p className='file-preview__name'>{resume.name}</p>
                                                        <p className='file-preview__time'>Last updated on {formatUploadTime(fileUploadTime)}</p>
                                                    </div>
                                                </div>
                                                <button className='file-preview__remove' onClick={handleRemoveFile} title='Remove file'>
                                                    <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="3 6 5 6 21 6" /><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2" /><line x1="10" y1="11" x2="10" y2="17" /><line x1="14" y1="11" x2="14" y2="17" /></svg>
                                                </button>
                                                <input hidden type='file' id='resume' name='resume' accept='.pdf' onChange={handleFile} />
                                            </div>
                                        )}
                                    </div>

                                    {/* AND Divider */}
                                    {resume && <div className='or-divider'><span>AND</span></div>}

                                    {/* Quick Self-Description */}
                                    <div className='self-description'>
                                        <label className='section-label' htmlFor='selfDescription'>Quick Self-Description</label>
                                        <textarea
                                            id='selfDescription'
                                            name='selfDescription'
                                            className='panel__textarea panel__textarea--short'
                                            placeholder="Briefly describe your experience, key skills, and years of experience."
                                            maxLength={300}
                                            value={selfDescription}
                                            onChange={(e) => setSelfDescription(e.target.value)}
                                        />
                                        <div className='char-counter'>{selfDescription.length} / 300 chars</div>
                                    </div>

                                    {/* Info Box */}
                                    <div className='info-box'>
                                        <span className='info-box__icon'>
                                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><circle cx="12" cy="12" r="10" /><line x1="12" y1="8" x2="12" y2="12" stroke="#1a1f27" strokeWidth="2" /><line x1="12" y1="16" x2="12.01" y2="16" stroke="#1a1f27" strokeWidth="2" /></svg>
                                        </span>

                                        <p>Both a <strong>Resume</strong> and a <strong>Self Description</strong> are required to generate a personalized plan.</p>

                                    </div>
                                </div>
                            </div>

                            {/* Card Footer */}
                            <div className='interview-card__footer'>
                                <span className='footer-info'>AI-Powered Strategy Generation &bull; Approx 30s</span>
                                <button
                                    className='generate-btn'
                                    onClick={handleGenerateReport}
                                >
                                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2l2.4 7.4H22l-6.2 4.5 2.4 7.4L12 17l-6.2 4.3 2.4-7.4L2 9.4h7.6z" /></svg>
                                    Generate My Interview Strategy
                                </button>
                            </div>
                        </div>


                        {/* all interview reports */}
                         <AllInterviewReports/>
                    </>
            }



        </div>
    )
}

export default Home

