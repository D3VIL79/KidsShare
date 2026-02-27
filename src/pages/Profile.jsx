import { useState, useContext } from 'react'
import { AgeContext } from '../contexts'
import {
    Star, Shield, Award, Trophy, Heart, Zap, Target,
    BookOpen, Users, Clock, MapPin, Edit3, Share2,
    ChevronRight, Lock, Eye, TrendingUp, CheckCircle,
    Gift, ArrowLeftRight, ShoppingBag, Medal,
} from 'lucide-react'
import './Profile.css'

const TRUST_BREAKDOWN = [
    { label: 'Verified Account', score: 20, max: 20, icon: Shield, color: '#6C5CE7' },
    { label: 'Successful Exchanges', score: 18, max: 25, icon: ArrowLeftRight, color: '#00b894' },
    { label: 'Positive Ratings', score: 15, max: 20, icon: Star, color: '#FDCB6E' },
    { label: 'Response Time', score: 12, max: 15, icon: Clock, color: '#00CEC9' },
    { label: 'Community Reports', score: 10, max: 10, icon: CheckCircle, color: '#00b894' },
    { label: 'Account Age', score: 7, max: 10, icon: TrendingUp, color: '#6C5CE7' },
]

const ACHIEVEMENTS = [
    { id: 1, title: 'First Share', desc: 'Shared your first item', emoji: '🎁', unlocked: true, date: 'Nov 2024' },
    { id: 2, title: 'Bookworm', desc: 'Shared 5 books', emoji: '📚', unlocked: true, date: 'Dec 2024' },
    { id: 3, title: 'Trusted Trader', desc: 'Completed 10 exchanges', emoji: '🤝', unlocked: true, date: 'Jan 2025' },
    { id: 4, title: '5-Star Streak', desc: 'Got 5 consecutive 5-star ratings', emoji: '⭐', unlocked: true, date: 'Feb 2025' },
    { id: 5, title: 'Community Hero', desc: 'Helped 25 community members', emoji: '🦸', unlocked: false, progress: 18, total: 25 },
    { id: 6, title: 'Safety Champion', desc: 'Completed all safety modules', emoji: '🛡️', unlocked: false, progress: 3, total: 5 },
    { id: 7, title: 'Turf Master', desc: 'Booked 20 turf sessions', emoji: '🏟️', unlocked: false, progress: 8, total: 20 },
    { id: 8, title: 'Generous Spirit', desc: 'Gave away 10 items for free', emoji: '💝', unlocked: false, progress: 4, total: 10 },
]

const BADGES = [
    { id: 1, title: 'Rising Star', emoji: '🌟', color: '#FDCB6E', desc: 'Active community member' },
    { id: 2, title: 'Book Lover', emoji: '📖', color: '#6C5CE7', desc: 'Shared 5+ books' },
    { id: 3, title: 'Fair Trader', emoji: '⚖️', color: '#00b894', desc: 'All exchanges rated 4+' },
    { id: 4, title: 'Quick Responder', emoji: '⚡', color: '#00CEC9', desc: 'Avg response < 1 hour' },
    { id: 5, title: 'Safe Player', emoji: '🛡️', color: '#e17055', desc: 'Zero safety violations' },
]

export default function Profile() {
    const { ageGroup } = useContext(AgeContext)
    const [activeTab, setActiveTab] = useState('trust')

    const totalTrust = TRUST_BREAKDOWN.reduce((s, t) => s + t.score, 0)
    const maxTrust = TRUST_BREAKDOWN.reduce((s, t) => s + t.max, 0)
    const trustPercent = Math.round((totalTrust / maxTrust) * 100)

    return (
        <div className="profile-page">
            <div className="container">
                {/* Profile Header */}
                <div className="profile-hero">
                    <div className="profile-avatar-wrap">
                        <div className="profile-avatar">🦊</div>
                        <button className="avatar-edit"><Edit3 size={12} /></button>
                    </div>
                    <div className="profile-identity">
                        <h1>BookWorm42</h1>
                        <div className="profile-meta-row">
                            <span><MapPin size={12} /> Koramangala, Bengaluru</span>
                            <span><Clock size={12} /> Joined Nov 2024</span>
                            <span><Users size={12} /> {ageGroup || '13-17'}</span>
                        </div>
                        <div className="profile-quick-stats">
                            <div className="pq-stat"><strong>23</strong><span>Exchanges</span></div>
                            <div className="pq-stat"><strong>4.8</strong><span>Rating</span></div>
                            <div className="pq-stat"><strong>5</strong><span>Badges</span></div>
                            <div className="pq-stat"><strong>4</strong><span>Achievements</span></div>
                        </div>
                    </div>
                    <div className="profile-trust-hero">
                        <svg viewBox="0 0 120 120" className="trust-hero-svg">
                            <circle cx="60" cy="60" r="52" className="trust-hero-bg" />
                            <circle cx="60" cy="60" r="52" className="trust-hero-fill"
                                strokeDasharray={`${trustPercent * 3.27} ${327 - trustPercent * 3.27}`}
                                strokeDashoffset="82" />
                        </svg>
                        <div className="trust-hero-inner">
                            <span className="trust-hero-num">{totalTrust}</span>
                            <span className="trust-hero-label">Trust</span>
                        </div>
                    </div>
                </div>

                {/* Tab Navigation */}
                <div className="profile-tabs">
                    {[
                        { id: 'trust', label: '🔒 Trust Score' },
                        { id: 'achievements', label: '🏆 Achievements' },
                        { id: 'badges', label: '🎖️ Badges' },
                    ].map(t => (
                        <button key={t.id} className={`profile-tab ${activeTab === t.id ? 'active' : ''}`} onClick={() => setActiveTab(t.id)}>
                            {t.label}
                        </button>
                    ))}
                </div>

                {/* ===== Trust Score Breakdown ===== */}
                {activeTab === 'trust' && (
                    <div className="profile-section">
                        <h2><Shield size={18} /> Trust Score Breakdown</h2>
                        <p className="section-desc">Your trust score is calculated from multiple factors. Keep sharing and being a great community member!</p>
                        <div className="trust-breakdown">
                            {TRUST_BREAKDOWN.map(item => {
                                const ItemIcon = item.icon
                                const pct = Math.round((item.score / item.max) * 100)
                                return (
                                    <div key={item.label} className="trust-factor">
                                        <div className="trust-factor-header">
                                            <div className="trust-factor-icon" style={{ background: `${item.color}12`, color: item.color }}>
                                                <ItemIcon size={14} />
                                            </div>
                                            <span className="trust-factor-label">{item.label}</span>
                                            <span className="trust-factor-score">{item.score}/{item.max}</span>
                                        </div>
                                        <div className="trust-bar">
                                            <div className="trust-bar-fill" style={{ width: `${pct}%`, background: item.color }} />
                                        </div>
                                    </div>
                                )
                            })}
                        </div>
                        <div className="trust-total">
                            <span>Total Trust Score</span>
                            <strong>{totalTrust} / {maxTrust}</strong>
                        </div>
                    </div>
                )}

                {/* ===== Achievements ===== */}
                {activeTab === 'achievements' && (
                    <div className="profile-section">
                        <h2><Trophy size={18} /> Achievements</h2>
                        <p className="section-desc">{ACHIEVEMENTS.filter(a => a.unlocked).length} of {ACHIEVEMENTS.length} unlocked</p>
                        <div className="achievements-grid">
                            {ACHIEVEMENTS.map(ach => (
                                <div key={ach.id} className={`achievement-card ${ach.unlocked ? 'unlocked' : 'locked'}`}>
                                    <span className="ach-emoji">{ach.emoji}</span>
                                    <h4>{ach.title}</h4>
                                    <p>{ach.desc}</p>
                                    {ach.unlocked ? (
                                        <span className="ach-date"><CheckCircle size={11} /> {ach.date}</span>
                                    ) : (
                                        <div className="ach-progress">
                                            <div className="ach-progress-bar">
                                                <div className="ach-progress-fill" style={{ width: `${(ach.progress / ach.total) * 100}%` }} />
                                            </div>
                                            <span className="ach-progress-text">{ach.progress}/{ach.total}</span>
                                        </div>
                                    )}
                                    {!ach.unlocked && <div className="ach-lock"><Lock size={14} /></div>}
                                </div>
                            ))}
                        </div>
                    </div>
                )}

                {/* ===== Community Badges ===== */}
                {activeTab === 'badges' && (
                    <div className="profile-section">
                        <h2><Award size={18} /> Community Badges</h2>
                        <p className="section-desc">Badges are earned through consistent positive behavior</p>
                        <div className="badges-grid">
                            {BADGES.map(badge => (
                                <div key={badge.id} className="badge-card" style={{ borderColor: `${badge.color}40` }}>
                                    <div className="badge-icon" style={{ background: `${badge.color}15` }}>
                                        <span>{badge.emoji}</span>
                                    </div>
                                    <h4>{badge.title}</h4>
                                    <p>{badge.desc}</p>
                                    <div className="badge-earned">
                                        <CheckCircle size={12} style={{ color: badge.color }} />
                                        <span>Earned</span>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                )}
            </div>
        </div>
    )
}
