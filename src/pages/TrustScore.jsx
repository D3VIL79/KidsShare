import {
    Star, Clock, CheckCircle, AlertTriangle, TrendingUp,
    Shield, ThumbsUp, ThumbsDown, Info, ChevronRight,
} from 'lucide-react'
import './TrustScore.css'

const TRUST = {
    total: 87,
    factors: [
        { id: 'deals', label: 'Completed Deals', score: 92, max: 100, detail: '23 of 25 deals completed', icon: CheckCircle, color: '#00b894' },
        { id: 'timeliness', label: 'Timeliness', score: 85, max: 100, detail: '20 of 23 on-time returns', icon: Clock, color: '#6C5CE7' },
        { id: 'ratings', label: 'Ratings Received', score: 90, max: 100, detail: 'Average 4.5 ★ from 18 ratings', icon: Star, color: '#FDCB6E' },
        { id: 'violations', label: 'Violations', score: 95, max: 100, detail: '0 active violations', icon: Shield, color: '#00CEC9' },
        { id: 'community', label: 'Community Contribution', score: 78, max: 100, detail: '12 items shared, 3 events organized', icon: ThumbsUp, color: '#e17055' },
        { id: 'responsiveness', label: 'Responsiveness', score: 82, max: 100, detail: 'Average reply time: 2.3 hours', icon: TrendingUp, color: '#0984e3' },
    ]
}

const RECENT_RATINGS = [
    { id: 1, from: 'BookWorm42', avatar: '🦊', stars: 5, comment: 'Great exchange! Item exactly as described.', date: 'Feb 15' },
    { id: 2, from: 'SportyKid', avatar: '🐱', stars: 4, comment: 'Good condition, slightly late return.', date: 'Feb 12' },
    { id: 3, from: 'ArtLover', avatar: '🦋', stars: 5, comment: 'Super smooth transaction! Highly recommend.', date: 'Feb 10' },
]

const VIOLATIONS_LOG = [
    { id: 1, type: 'warning', text: 'Late return: PS5 Controller (resolved)', date: 'Jan 28', resolved: true },
]

export default function TrustScore() {
    const ringPct = TRUST.total
    const circumference = 2 * Math.PI * 52
    const offset = circumference - (ringPct / 100) * circumference

    return (
        <div className="trust-page">
            <div className="container">
                <div className="ts-hdr">
                    <h1><Shield size={22} /> Trust Score Breakdown</h1>
                    <p>See how your trust score is calculated and find ways to improve</p>
                </div>

                {/* Score Overview */}
                <div className="ts-overview">
                    <div className="ts-ring-wrap">
                        <svg viewBox="0 0 120 120" className="ts-ring-svg">
                            <circle cx="60" cy="60" r="52" className="ts-ring-bg" />
                            <circle cx="60" cy="60" r="52" className="ts-ring-fill"
                                strokeDasharray={circumference} strokeDashoffset={offset}
                                style={{ stroke: ringPct >= 80 ? '#00b894' : ringPct >= 60 ? '#FDCB6E' : '#e17055' }} />
                        </svg>
                        <div className="ts-ring-center">
                            <span className="ts-ring-num">{TRUST.total}</span>
                            <span className="ts-ring-label">Trust Score</span>
                        </div>
                    </div>
                    <div className="ts-overview-info">
                        <span className="ts-level" style={{ color: '#00b894' }}>⭐ Trusted Member</span>
                        <p>Your trust score is calculated from 6 factors. Keep sharing and being reliable to boost your score!</p>
                    </div>
                </div>

                <div className="ts-layout">
                    <div className="ts-main-col">
                        {/* Factors */}
                        <div className="ts-section">
                            <h2>Score Factors</h2>
                            <div className="ts-factors">
                                {TRUST.factors.map(f => {
                                    const FIcon = f.icon
                                    return (
                                        <div key={f.id} className="ts-factor">
                                            <div className="ts-factor-head">
                                                <div className="ts-factor-icon" style={{ background: `${f.color}12`, color: f.color }}><FIcon size={14} /></div>
                                                <span className="ts-factor-label">{f.label}</span>
                                                <span className="ts-factor-score" style={{ color: f.color }}>{f.score}/{f.max}</span>
                                            </div>
                                            <div className="ts-factor-bar">
                                                <div className="ts-factor-fill" style={{ width: `${f.score}%`, background: f.color }} />
                                            </div>
                                            <span className="ts-factor-detail">{f.detail}</span>
                                        </div>
                                    )
                                })}
                            </div>
                        </div>
                    </div>

                    <div className="ts-side-col">
                        {/* Recent Ratings */}
                        <div className="ts-section">
                            <h2><Star size={14} /> Recent Ratings</h2>
                            <div className="ts-ratings">
                                {RECENT_RATINGS.map(r => (
                                    <div key={r.id} className="ts-rating-card">
                                        <div className="ts-rating-top">
                                            <span className="ts-rating-avatar">{r.avatar}</span>
                                            <span className="ts-rating-from">{r.from}</span>
                                            <span className="ts-rating-stars">{'★'.repeat(r.stars)}{'☆'.repeat(5 - r.stars)}</span>
                                        </div>
                                        <p className="ts-rating-comment">"{r.comment}"</p>
                                        <span className="ts-rating-date">{r.date}</span>
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* Violations */}
                        <div className="ts-section">
                            <h2><AlertTriangle size={14} /> Violations Log</h2>
                            {VIOLATIONS_LOG.length > 0 ? VIOLATIONS_LOG.map(v => (
                                <div key={v.id} className={`ts-violation ${v.resolved ? 'resolved' : ''}`}>
                                    <AlertTriangle size={12} />
                                    <div>
                                        <span>{v.text}</span>
                                        <span className="ts-v-date">{v.date}</span>
                                    </div>
                                    {v.resolved && <span className="ts-v-resolved">Resolved</span>}
                                </div>
                            )) : (
                                <div className="ts-clean"><CheckCircle size={14} /> Clean record — no violations!</div>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
