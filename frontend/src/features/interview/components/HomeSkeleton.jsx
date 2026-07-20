import React from 'react'

const reportSkeletons = Array.from({ length: 4 }, (_, index) => index)

const HomeSkeleton = () => {
    return (
        <div className='home-skeleton' aria-hidden='true'>
            <header className='page-header home-skeleton__header'>
                <span className='home-skeleton__line home-skeleton__line--title' />
                <span className='home-skeleton__line home-skeleton__line--title-accent' />
                <span className='home-skeleton__line home-skeleton__line--subtitle' />
                <span className='home-skeleton__line home-skeleton__line--subtitle-short' />
            </header>

            <section className='interview-card home-skeleton__card'>
                <div className='interview-card__body'>
                    <div className='panel panel--left home-skeleton__panel'>
                        <div className='panel__header home-skeleton__panel-header'>
                            <span className='home-skeleton__icon' />
                            <span className='home-skeleton__line home-skeleton__line--panel-title' />
                            <span className='home-skeleton__badge' />
                        </div>
                        <div className='home-skeleton__textarea home-skeleton__textarea--tall' />
                        <span className='home-skeleton__counter' />
                    </div>

                    <div className='panel-divider' />

                    <div className='panel panel--right home-skeleton__panel'>
                        <div className='panel__header home-skeleton__panel-header'>
                            <span className='home-skeleton__icon' />
                            <span className='home-skeleton__line home-skeleton__line--panel-title' />
                        </div>

                        <div className='upload-section'>
                            <div className='section-label'>
                                <span className='home-skeleton__line home-skeleton__line--label' />
                                <span className='home-skeleton__badge home-skeleton__badge--small' />
                            </div>
                            <div className='home-skeleton__upload-card'>
                                <span className='home-skeleton__upload-icon' />
                                <span className='home-skeleton__line home-skeleton__line--upload-title' />
                                <span className='home-skeleton__line home-skeleton__line--upload-subtitle' />
                            </div>
                        </div>

                        <div className='self-description'>
                            <span className='home-skeleton__line home-skeleton__line--label' />
                            <div className='home-skeleton__textarea home-skeleton__textarea--short' />
                            <span className='home-skeleton__counter' />
                        </div>

                        <div className='home-skeleton__info-box'>
                            <span className='home-skeleton__info-icon' />
                            <div className='home-skeleton__info-lines'>
                                <span className='home-skeleton__line home-skeleton__line--info' />
                                <span className='home-skeleton__line home-skeleton__line--info-short' />
                            </div>
                        </div>
                    </div>
                </div>

                <div className='interview-card__footer home-skeleton__footer'>
                    <span className='home-skeleton__line home-skeleton__line--footer' />
                    <span className='home-skeleton__button' />
                </div>
            </section>

            <section className='reports-section home-skeleton__reports'>
                <div className='reports-section__header home-skeleton__reports-header'>
                    <div className='home-skeleton__reports-copy'>
                        <span className='home-skeleton__line home-skeleton__line--eyebrow' />
                        <span className='home-skeleton__line home-skeleton__line--reports-title' />
                    </div>
                    <span className='home-skeleton__count-pill' />
                </div>

                <div className='reports-section__grid'>
                    {reportSkeletons.map((item) => (
                        <article className='report-card home-skeleton__report-card' key={item}>
                            <div className='report-card__top'>
                                <span className='home-skeleton__line home-skeleton__line--report-index' />
                                <span className='home-skeleton__score-pill' />
                            </div>
                            <span className='home-skeleton__line home-skeleton__line--report-title' />
                            <span className='home-skeleton__line home-skeleton__line--report-title-short' />
                            <span className='home-skeleton__line home-skeleton__line--report-meta' />
                            <span className='home-skeleton__line home-skeleton__line--report-meta-short' />
                            <span className='home-skeleton__report-button' />
                        </article>
                    ))}
                </div>
            </section>
        </div>
    )
}

export default HomeSkeleton
