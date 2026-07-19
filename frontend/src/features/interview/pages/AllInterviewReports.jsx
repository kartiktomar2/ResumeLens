import React from 'react'
import { useInterview } from '../hooks/useInterview.js'
import { Link } from 'react-router'
import '../styles/allReports.scss'

const AllInterviewReports = () => {
  const { reports } = useInterview()

  return (
    <section className='reports-section'>
      <div className='reports-section__header'>
        <div>
          <p className='reports-section__eyebrow'>Saved Strategies</p>
          <h2>Your interview reports</h2>
        </div>
        {reports?.length > 0 && (
          <span className='reports-section__count'>{reports.length} report{reports.length > 1 ? 's' : ''}</span>
        )}
      </div>

      {reports?.length ? (
        <div className='reports-section__grid'>
          {reports.map((item, index) => (
            <article className='report-card' key={item._id}>
              <div className='report-card__top'>
                <span className='report-card__index'>Report #{index + 1}</span>
                <span className='report-card__score'>{item.matchScore}% Match</span>
              </div>

              <h3>{item.title || 'Untitled interview report'}</h3>
              <p className='report-card__meta'>A tailored interview strategy based on your resume and target role.</p>

              <Link className='report-card__link' to={`/interview/${item._id}`}>
                <svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='none' stroke='currentColor' strokeWidth='2' strokeLinecap='round' strokeLinejoin='round'>
                  <path d='M5 12h14' />
                  <path d='m12 5 7 7-7 7' />
                </svg>
                View Full Report
              </Link>
            </article>
          ))}
        </div>
      ) : (
        <div className='reports-section__empty'>
          <div className='reports-section__empty-icon'>✦</div>
          <p>No interview reports yet. Generate your first strategy to see it appear here.</p>
        </div>
      )}
    </section>
  )
}

export default AllInterviewReports
