import React, { useState, useLayoutEffect } from 'react'
import "../styles/interview.scss"
import { useInterview } from '../hooks/useInterview.js'
import { Link, useParams } from 'react-router'
import InterviewSkeleton from '../components/InterviewSkeleton.jsx'

const NAV_ITEMS = [
    { id: 'technical', label: 'Technical Questions', shortLabel: 'Technical', icon: (<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="16 18 22 12 16 6" /><polyline points="8 6 2 12 8 18" /></svg>) },
    { id: 'behavioral', label: 'Behavioral Questions', shortLabel: 'Behavioral', icon: (<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" /></svg>) },
    { id: 'roadmap', label: 'Road Map', shortLabel: 'Road Map', icon: (<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polygon points="3 11 22 2 13 21 11 13 3 11" /></svg>) },
]

// ── Sub-components ────────────────────────────────────────────────────────────
const QuestionCard = ({ item, index }) => {
    const [open, setOpen] = useState(false)
    return (
        <div className='q-card'>
            <div className='q-card__header' onClick={() => setOpen(o => !o)}>
                <span className='q-card__index'>Q{index + 1}</span>
                <p className='q-card__question'>{item.question}</p>
                <span className={`q-card__chevron ${open ? 'q-card__chevron--open' : ''}`}>
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="6 9 12 15 18 9" /></svg>
                </span>
            </div>
            {open && (
                <div className='q-card__body'>
                    <div className='q-card__section'>
                        <span className='q-card__tag q-card__tag--intention'>Intention</span>
                        <p>{item.intention}</p>
                    </div>
                    <div className='q-card__section'>
                        <span className='q-card__tag q-card__tag--answer'>Model Answer</span>
                        <p>{item.answer}</p>
                    </div>
                </div>
            )}
        </div>
    )
}

const RoadMapDay = ({ day }) => (
    <div className='roadmap-day'>
        <div className='roadmap-day__header'>
            <span className='roadmap-day__badge'>Day {day.day}</span>
            <h3 className='roadmap-day__focus'>{day.focus}</h3>
        </div>
        <ul className='roadmap-day__tasks'>
            {day.tasks.map((task, i) => (
                <li key={i}>
                    <span className='roadmap-day__bullet' />
                    {task}
                </li>
            ))}
        </ul>
    </div>
)

// ── Main Component ────────────────────────────────────────────────────────────
const Interview = () => {
    const [activeNav, setActiveNav] = useState('technical')
    const { interviewId } = useParams()
    const { report, getReportById, getResumePdf } = useInterview()
    const [loadingGeneratedResume, setLoadingGeneratedResume]= useState(false)
    const activeNavItem = NAV_ITEMS.find(item => item.id === activeNav)

    useLayoutEffect(() => {

        if (interviewId) {
            console.log("condtion called")
            getReportById(interviewId)
        }

    }, [interviewId])

      async function downloadResume(id){
             setLoadingGeneratedResume(true)
             await getResumePdf(id)
             setLoadingGeneratedResume(false)
      }

    return (
        <div className='interview-page'>
            {report && !loadingGeneratedResume && (
                <header className='interview-mobile-header'>
                    <h1>Interview Report</h1>
                   
                </header>
            )}

            <div className='interview-layout'>

                {  loadingGeneratedResume? (
                    <main>   <InterviewSkeleton/> </main>
                ):
                    report ? (
                        <>
                            {/* ── Left Nav ── */}
                            <nav className='interview-nav'>
                                <div className='interview-nav__menu'>
                                    <p className='interview-nav__label'>Sections</p>
                                    {NAV_ITEMS.map(item => (
                                        <button
                                            key={item.id}
                                        className={`interview-nav__item ${activeNav === item.id ? 'interview-nav__item--active' : ''}`}
                                        onClick={() => setActiveNav(item.id)}
                                    >
                                        <span className='interview-nav__icon'>{item.icon}</span>
                                        <span className='interview-nav__text interview-nav__text--desktop'>{item.label}</span>
                                        <span className='interview-nav__text interview-nav__text--mobile'>{item.shortLabel}</span>
                                    </button>
                                ))}
                            </div>
                                <div 
                                className='interview-nav__cta'
                                onClick={()=>{
                                     downloadResume(interviewId)
                                }}
                                >
                                    <button className='interview-nav__cta-button'>
                                        <svg className='interview-nav__cta-icon' xmlns="http://www.w3.org/2000/svg" viewBox="0 0 30 30" fill="currentColor" aria-hidden="true">
                                            <path d="M14.217,19.707l-1.112,2.547c-0.427,0.979-1.782,0.979-2.21,0l-1.112-2.547c-0.99-2.267-2.771-4.071-4.993-5.057L1.73,13.292c-0.973-0.432-0.973-1.848,0-2.28l2.965-1.316C6.974,8.684,8.787,6.813,9.76,4.47l1.126-2.714c0.418-1.007,1.81-1.007,2.228,0L14.24,4.47c0.973,2.344,2.786,4.215,5.065,5.226l2.965,1.316c0.973,0.432,0.973,1.848,0,2.28l-3.061,1.359C16.988,15.637,15.206,17.441,14.217,19.707z" />
                                            <path d="M24.481,27.796l-0.339,0.777c-0.248,0.569-1.036,0.569-1.284,0l-0.339-0.777c-0.604-1.385-1.693-2.488-3.051-3.092l-1.044-0.464c-0.565-0.251-0.565-1.072,0-1.323l0.986-0.438c1.393-0.619,2.501-1.763,3.095-3.195l0.348-0.84c0.243-0.585,1.052-0.585,1.294,0l0.348,0.84c0.594,1.432,1.702,2.576,3.095,3.195l0.986,0.438c0.565,0.251,0.565,1.072,0,1.323l-1.044,0.464C26.174,25.308,25.085,26.411,24.481,27.796z" />
                                        </svg>
                                        <span>Generate Resume</span>
                                    </button>
                                </div>
                            </nav>

                            <div className='interview-divider' />

                            {/* ── Center Content ── */}
                            <main className='interview-content'>
                                {activeNav === 'technical' && (
                                    <section className='content-panel'>
                                        <div className='content-header'>
                                            <h2>{activeNavItem?.label || 'Technical Questions'}</h2>
                                            <span className='content-header__count'>{report.technicalQuestion.length} questions</span>
                                        </div>
                                        <div className='content-body'>
                                            <div className='q-list'>
                                                {report.technicalQuestion.map((q, i) => (
                                                    <QuestionCard key={i} item={q} index={i} />
                                                ))}
                                            </div>
                                        </div>
                                    </section>
                                )}

                                {activeNav === 'behavioral' && (
                                    <section className='content-panel'>
                                        <div className='content-header'>
                                            <h2>{activeNavItem?.label || 'Behavioral Questions'}</h2>
                                            <span className='content-header__count'>{report.behavioralQuestion.length} questions</span>
                                        </div>
                                        <div className='content-body'>
                                            <div className='q-list'>
                                                {report.behavioralQuestion.map((q, i) => (
                                                    <QuestionCard key={i} item={q} index={i} />
                                                ))}
                                            </div>
                                        </div>
                                    </section>
                                )}

                                {activeNav === 'roadmap' && (
                                    <section className='content-panel'>
                                        <div className='content-header'>
                                            <h2>Preparation Road Map</h2>
                                            <span className='content-header__count'>{report.preparationPlan.length}-day plan</span>
                                        </div>
                                        <div className='content-body'>
                                            <div className='roadmap-list'>
                                                {report.preparationPlan.map((day) => (
                                                    <RoadMapDay key={day.day} day={day} />
                                                ))}
                                            </div>
                                        </div>
                                    </section>
                                )}
                            </main>

                            <div className='interview-divider' />

                            {/* ── Right Sidebar ── */}
                            <aside className='interview-sidebar'>

                                {/* Match Score */}
                                <div className='match-score'>
                                    <p className='match-score__label'>Match Score</p>
                                    <div className={`match-score__ring ${report.matchScore >= 80 ? 'score--high' :
                                        report.matchScore >= 60 ? 'score--mid' : 'score--low'}`}>
                                        <span className='match-score__value'>{report.matchScore}</span>
                                        <span className='match-score__pct'>%</span>
                                    </div>
                                    <p className='match-score__sub'>Strong match for this role</p>
                                    <p className='match-score__detail'>Your technical background aligns perfectly with the senior requirements.</p>
                                </div>

                                <div className='sidebar-divider' />

                                {/* Skill Gaps */}
                                <div className='skill-gaps'>
                                    <p className='skill-gaps__label skill-gaps__label--desktop'>Skill Gaps</p>
                                    <p className='skill-gaps__label skill-gaps__label--mobile'>Skill Gaps &amp; Strengths</p>
                                    <div className='skill-gaps__list'>
                                        {report.skillGap.map((gap, i) => (
                                            <span key={i} className={`skill-tag skill-tag--${gap.severity}`}>
                                                {gap.skill}
                                            </span>
                                        ))}
                                    </div>
                                </div>

                            </aside>
                            
                        </>
                    ) : (
                      <main>
                        <InterviewSkeleton/>
                      </main>
                    )
                }


            </div>

            {report && !loadingGeneratedResume && (
                <div className='interview-mobile-actions'>
                    <button
                        className='interview-mobile-actions__primary'
                        onClick={() => {
                            downloadResume(interviewId)
                        }}
                    >
                        <svg className='interview-nav__cta-icon' xmlns="http://www.w3.org/2000/svg" viewBox="0 0 30 30" fill="currentColor" aria-hidden="true">
                            <path d="M14.217,19.707l-1.112,2.547c-0.427,0.979-1.782,0.979-2.21,0l-1.112-2.547c-0.99-2.267-2.771-4.071-4.993-5.057L1.73,13.292c-0.973-0.432-0.973-1.848,0-2.28l2.965-1.316C6.974,8.684,8.787,6.813,9.76,4.47l1.126-2.714c0.418-1.007,1.81-1.007,2.228,0L14.24,4.47c0.973,2.344,2.786,4.215,5.065,5.226l2.965,1.316c0.973,0.432,0.973,1.848,0,2.28l-3.061,1.359C16.988,15.637,15.206,17.441,14.217,19.707z" />
                            <path d="M24.481,27.796l-0.339,0.777c-0.248,0.569-1.036,0.569-1.284,0l-0.339-0.777c-0.604-1.385-1.693-2.488-3.051-3.092l-1.044-0.464c-0.565-0.251-0.565-1.072,0-1.323l0.986-0.438c1.393-0.619,2.501-1.763,3.095-3.195l0.348-0.84c0.243-0.585,1.052-0.585,1.294,0l0.348,0.84c0.594,1.432,1.702,2.576,3.095,3.195l0.986,0.438c0.565,0.251,0.565,1.072,0,1.323l-1.044,0.464C26.174,25.308,25.085,26.411,24.481,27.796z" />
                        </svg>
                        <span>Generate Resume</span>
                    </button>

                    <Link className='interview-mobile-actions__home' to='/'>
                        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                            <path d="M3 10.5 12 3l9 7.5" />
                            <path d="M5 10.5V21h5v-6h4v6h5V10.5" />
                        </svg>
                    </Link>
                </div>
            )}

            <div className='interview-footer'>
              {!loadingGeneratedResume && <Link className='home-btn' to='/'>
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M3 10.5 12 3l9 7.5" />
                        <path d="M5 10.5V21h5v-6h4v6h5V10.5" />
                    </svg>
                    Back to Home
                </Link>}
            </div>
        </div>
    )
}

export default Interview
