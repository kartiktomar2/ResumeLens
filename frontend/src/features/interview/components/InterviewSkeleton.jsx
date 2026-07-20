import React from 'react'
import "../styles/interview.scss"

const NAV_ITEMS = [
    { id: 'technical', labelWidth: '9.8rem', active: true },
    { id: 'behavioral', labelWidth: '10.9rem', active: false },
    { id: 'roadmap', labelWidth: '6.1rem', active: false },
]

const QUESTION_CARDS = Array.from({ length: 5 }, (_, index) => ({
    id: index,
    lines: [
        index % 2 === 0 ? '93%' : '88%',
        index % 3 === 0 ? '82%' : '86%',
        index % 2 === 0 ? '74%' : '69%',
        index === 4 ? '58%' : '63%',
    ],
}))

const SKILL_TAG_WIDTHS = ['5.25rem', '9.25rem', '12rem', '10.75rem', '11.25rem', '8.5rem']

const InterviewSkeleton = () => {
    return (
        <div className='interview-page interview-skeleton' aria-hidden='true'>
            <style>{`
                .interview-skeleton {
                    overflow: hidden;
                }

                .interview-skeleton .interview-layout,
                .interview-skeleton .interview-nav,
                .interview-skeleton .interview-content,
                .interview-skeleton .interview-sidebar,
                .interview-skeleton .content-panel,
                .interview-skeleton .content-body {
                    min-height: 0;
                }

                .interview-skeleton .interview-layout {
                    flex: 1;
                    min-height: 0;
                }

                .interview-skeleton .interview-nav,
                .interview-skeleton .interview-content,
                .interview-skeleton .interview-sidebar {
                    overflow: hidden;
                }

                .interview-skeleton .interview-footer {
                    margin-top: 1rem;
                    flex-shrink: 0;
                }

                .interview-skeleton__shimmer {
                    position: relative;
                    overflow: hidden;
                }

                .interview-skeleton__shimmer::after {
                    content: '';
                    position: absolute;
                    inset: 0;
                    transform: translateX(-100%);
                    background: linear-gradient(
                        90deg,
                        transparent 0%,
                        rgba(255, 255, 255, 0.05) 42%,
                        rgba(255, 255, 255, 0.12) 50%,
                        rgba(255, 255, 255, 0.05) 58%,
                        transparent 100%
                    );
                    animation: interview-skeleton-shimmer 1.8s ease-in-out infinite;
                }

                .interview-skeleton__line,
                .interview-skeleton__icon,
                .interview-skeleton__badge,
                .interview-skeleton__tag,
                .interview-skeleton__button-fill,
                .interview-skeleton__skill,
                .interview-skeleton__ring-text {
                    background: linear-gradient(180deg, rgba(255, 255, 255, 0.065), rgba(255, 255, 255, 0.03));
                    border: 1px solid rgba(255, 255, 255, 0.04);
                }

                .interview-skeleton__line {
                    display: block;
                    height: 0.9rem;
                    border-radius: 999px;
                }

                .interview-skeleton__icon {
                    width: 1rem;
                    height: 1rem;
                    border-radius: 0.3rem;
                    flex-shrink: 0;
                }

                .interview-skeleton__nav-label {
                    width: 4.7rem;
                    height: 0.72rem;
                }

                .interview-skeleton__nav-item {
                    pointer-events: none;
                }

                .interview-skeleton__nav-item.interview-nav__item--active {
                    color: #ff2d78;
                }

                .interview-skeleton__nav-item.interview-nav__item--active .interview-skeleton__icon,
                .interview-skeleton__nav-item.interview-nav__item--active .interview-skeleton__line {
                    background: linear-gradient(180deg, rgba(255, 45, 120, 0.24), rgba(255, 45, 120, 0.12));
                    border-color: rgba(255, 45, 120, 0.16);
                }

                .interview-skeleton__cta {
                    pointer-events: none;
                }

                .interview-skeleton__cta-button {
                    position: relative;
                    overflow: hidden;
                    cursor: default;
                }

                .interview-skeleton__button-fill {
                    width: 1.05rem;
                    height: 1.05rem;
                    border-radius: 0.35rem;
                    flex-shrink: 0;
                    background: rgba(255, 255, 255, 0.34);
                    border: none;
                }

                .interview-skeleton__button-fill--text {
                    width: 7rem;
                    height: 0.95rem;
                    border-radius: 999px;
                }

                .interview-skeleton__header-line {
                    width: 13.75rem;
                    height: 1.35rem;
                }

                .interview-skeleton__count {
                    width: 5.8rem;
                    height: 1.85rem;
                    border-radius: 2rem;
                }

                .interview-skeleton .content-body {
                    padding-right: 0.25rem;
                }

                .interview-skeleton__card {
                    pointer-events: none;
                }

                .interview-skeleton__card .q-card__header {
                    align-items: flex-start;
                }

                .interview-skeleton__badge {
                    width: 2.35rem;
                    height: 1.65rem;
                    border-radius: 0.3rem;
                    flex-shrink: 0;
                    margin-top: 0.1rem;
                    background: linear-gradient(180deg, rgba(255, 45, 120, 0.18), rgba(255, 45, 120, 0.1));
                    border-color: rgba(255, 45, 120, 0.18);
                }

                .interview-skeleton__question-lines {
                    flex: 1;
                    display: flex;
                    flex-direction: column;
                    gap: 0.72rem;
                    min-width: 0;
                    padding-top: 0.05rem;
                }

                .interview-skeleton__question-line {
                    height: 0.92rem;
                }

                .interview-skeleton__chevron {
                    width: 1rem;
                    height: 1rem;
                    border-radius: 999px;
                    margin-top: 0.15rem;
                    flex-shrink: 0;
                }

                .interview-skeleton__sidebar-label {
                    width: 6.25rem;
                    height: 0.78rem;
                }

                .interview-skeleton__ring {
                    width: 90px;
                    height: 90px;
                    border-radius: 50%;
                    display: flex;
                    flex-direction: column;
                    align-items: center;
                    justify-content: center;
                    border: 4px solid #3fb950;
                    background:
                        radial-gradient(circle at center, #161b22 58%, transparent 59%),
                        linear-gradient(180deg, rgba(63, 185, 80, 0.12), rgba(63, 185, 80, 0.05));
                    box-shadow: inset 0 0 0 1px rgba(255, 255, 255, 0.03);
                }

                .interview-skeleton__ring-text {
                    border: none;
                    background: rgba(255, 255, 255, 0.42);
                    border-radius: 999px;
                }

                .interview-skeleton__ring-text--score {
                    width: 2.2rem;
                    height: 1.15rem;
                    margin-bottom: 0.3rem;
                }

                .interview-skeleton__ring-text--pct {
                    width: 0.8rem;
                    height: 0.65rem;
                }

                .interview-skeleton__score-sub {
                    width: 10.8rem;
                    height: 0.85rem;
                }

                .interview-skeleton__skill {
                    height: 1.95rem;
                    border-radius: 0.4rem;
                }

                .interview-skeleton__footer {
                    position: relative;
                    overflow: hidden;
                    min-width: 11.6rem;
                    cursor: default;
                    pointer-events: none;
                }

                .interview-skeleton__footer .interview-skeleton__button-fill {
                    width: 0.95rem;
                    height: 0.95rem;
                }

                .interview-skeleton__footer .interview-skeleton__button-fill--text {
                    width: 6.6rem;
                }

                @keyframes interview-skeleton-shimmer {
                    100% {
                        transform: translateX(100%);
                    }
                }

                @media (max-width: 900px) {
                    .interview-skeleton .interview-layout {
                        display: flex;
                        flex-direction: column;
                    }

                    .interview-skeleton .interview-divider {
                        width: 100%;
                        height: 1px;
                    }

                    .interview-skeleton .interview-nav,
                    .interview-skeleton .interview-sidebar {
                        width: 100%;
                    }
                }
            `}</style>

            <div className='interview-layout'>
                <nav className='interview-nav'>
                    <div className='interview-nav__menu'>
                        <p className='interview-nav__label'>
                            <span className='interview-skeleton__line interview-skeleton__nav-label interview-skeleton__shimmer' />
                        </p>

                        {NAV_ITEMS.map((item) => (
                            <div
                                key={item.id}
                                className={`interview-nav__item interview-skeleton__nav-item ${item.active ? 'interview-nav__item--active' : ''}`}
                            >
                                <span className='interview-nav__icon'>
                                    <span className='interview-skeleton__icon interview-skeleton__shimmer' />
                                </span>
                                <span
                                    className='interview-skeleton__line interview-skeleton__shimmer'
                                    style={{ width: item.labelWidth }}
                                />
                            </div>
                        ))}
                    </div>

                    <div className='interview-nav__cta interview-skeleton__cta'>
                        <div className='interview-nav__cta-button interview-skeleton__cta-button interview-skeleton__shimmer'>
                            <span className='interview-skeleton__button-fill' />
                            <span className='interview-skeleton__button-fill interview-skeleton__button-fill--text' />
                        </div>
                    </div>
                </nav>

                <div className='interview-divider' />

                <main className='interview-content'>
                    <section className='content-panel'>
                        <div className='content-header'>
                            <span className='interview-skeleton__line interview-skeleton__header-line interview-skeleton__shimmer' />
                            <span className='content-header__count interview-skeleton__count interview-skeleton__shimmer' />
                        </div>

                        <div className='content-body'>
                            <div className='q-list'>
                                {QUESTION_CARDS.map((card) => (
                                    <article className='q-card interview-skeleton__card' key={card.id}>
                                        <div className='q-card__header'>
                                            <span className='interview-skeleton__badge interview-skeleton__shimmer' />

                                            <div className='interview-skeleton__question-lines'>
                                                {card.lines.map((width, index) => (
                                                    <span
                                                        key={index}
                                                        className='interview-skeleton__line interview-skeleton__question-line interview-skeleton__shimmer'
                                                        style={{ width }}
                                                    />
                                                ))}
                                            </div>

                                            <span className='interview-skeleton__icon interview-skeleton__chevron interview-skeleton__shimmer' />
                                        </div>
                                    </article>
                                ))}
                            </div>
                        </div>
                    </section>
                </main>

                <div className='interview-divider' />

                <aside className='interview-sidebar'>
                    <div className='match-score'>
                        <p className='match-score__label'>
                            <span className='interview-skeleton__line interview-skeleton__sidebar-label interview-skeleton__shimmer' />
                        </p>

                        <div className='match-score__ring interview-skeleton__ring interview-skeleton__shimmer'>
                            <span className='interview-skeleton__ring-text interview-skeleton__ring-text--score' />
                            <span className='interview-skeleton__ring-text interview-skeleton__ring-text--pct' />
                        </div>

                        <p className='match-score__sub'>
                            <span className='interview-skeleton__line interview-skeleton__score-sub interview-skeleton__shimmer' />
                        </p>
                    </div>

                    <div className='sidebar-divider' />

                    <div className='skill-gaps'>
                        <p className='skill-gaps__label'>
                            <span className='interview-skeleton__line interview-skeleton__sidebar-label interview-skeleton__shimmer' />
                        </p>

                        <div className='skill-gaps__list'>
                            {SKILL_TAG_WIDTHS.map((width, index) => (
                                <span
                                    key={index}
                                    className='interview-skeleton__skill interview-skeleton__shimmer'
                                    style={{ width }}
                                />
                            ))}
                        </div>
                    </div>
                </aside>
            </div>

            <div className='interview-footer'>
                <div className='home-btn interview-skeleton__footer interview-skeleton__shimmer'>
                    <span className='interview-skeleton__button-fill' />
                    <span className='interview-skeleton__button-fill interview-skeleton__button-fill--text' />
                </div>
            </div>
        </div>
    )
}

export default InterviewSkeleton
