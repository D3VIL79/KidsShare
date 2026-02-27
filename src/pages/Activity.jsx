import { useState } from 'react'
import {
    Activity, Clock, Star, AlertTriangle, Check, X,
    ArrowLeftRight, Gift, ShoppingBag, Package, MapPin,
    ChevronDown, ChevronUp, MessageCircle, Flag, Shield,
    ThumbsUp, ThumbsDown, Loader, CheckCircle, XCircle,
} from 'lucide-react'
import './Activity.css'

const CURRENT = [
    { id: 1, title: 'Harry Potter ↔ Percy Jackson', emoji: '📚', type: 'exchange', with: 'ReaderFan', status: 'in-progress', step: 'Awaiting meetup', started: 'Feb 15', area: 'Koramangala' },
    { id: 2, title: 'Cricket Bat (SG)', emoji: '🏏', type: 'free', with: 'SportyKid', status: 'pending', step: 'Pending pickup', started: 'Feb 16', area: 'HSR Layout' },
]

const HISTORY = [
    { id: 10, title: 'Watercolor Set', emoji: '🎨', type: 'free', with: 'ArtLover', completed: 'Jan 28', rated: true, myRating: 5, theirRating: 5 },
    { id: 11, title: 'Board Games ↔ Puzzle Set', emoji: '🎲', type: 'exchange', with: 'FunTimes', completed: 'Jan 15', rated: true, myRating: 4, theirRating: 4 },
    { id: 12, title: 'Arduino Kit (Rent)', emoji: '🔧', type: 'lend', with: 'TechNerd', completed: 'Dec 20', rated: false, myRating: 0, theirRating: 3 },
    { id: 13, title: 'Skateboard', emoji: '🛹', type: 'free', with: 'SkaterBoy', completed: 'Dec 5', rated: true, myRating: 5, theirRating: 5 },
]

const DISPUTES = [
    { id: 20, title: 'Guitar Strings', emoji: '🎸', with: 'MusicFan', status: 'under-review', reason: 'Item not as described', filed: 'Feb 10', update: 'Under moderator review' },
]

const TYPE_STYLES = {
    free: { bg: 'rgba(0,184,148,0.1)', color: '#00b894', label: 'Free' },
    exchange: { bg: 'rgba(225,112,85,0.1)', color: '#e17055', label: 'Exchange' },
    lend: { bg: 'rgba(108,92,231,0.1)', color: '#6C5CE7', label: 'Lend' },
    sell: { bg: 'rgba(0,206,201,0.1)', color: '#00CEC9', label: 'Sell' },
}

export default function ActivityPage() {
    const [tab, setTab] = useState('current')
    const [ratingModal, setRatingModal] = useState(null)
    const [selectedRating, setSelectedRating] = useState(0)
    const [ratedItems, setRatedItems] = useState({})

    const submitRating = () => {
        setRatedItems(p => ({ ...p, [ratingModal]: selectedRating }))
        setRatingModal(null)
        setSelectedRating(0)
    }

    return (
        <div className="activity-page">
            <div className="container">
                <div className="act-header">
                    <h1><Activity size={22} /> My Activity</h1>
                    <p>Track your transactions, ratings, and disputes</p>
                </div>

                {/* Stats bar */}
                <div className="act-stats">
                    <div className="act-stat"><span className="act-stat-num">{CURRENT.length}</span><span>Active</span></div>
                    <div className="act-stat"><span className="act-stat-num">{HISTORY.length}</span><span>Completed</span></div>
                    <div className="act-stat"><span className="act-stat-num">4.6</span><span>Avg Rating</span></div>
                    <div className="act-stat dispute"><span className="act-stat-num">{DISPUTES.length}</span><span>Disputes</span></div>
                </div>

                {/* Tabs */}
                <div className="act-tabs">
                    {[
                        { id: 'current', label: '🔄 Current', count: CURRENT.length },
                        { id: 'history', label: '📋 History', count: HISTORY.length },
                        { id: 'ratings', label: '⭐ Ratings', count: HISTORY.length },
                        { id: 'disputes', label: '⚠️ Disputes', count: DISPUTES.length },
                    ].map(t => (
                        <button key={t.id} className={`act-tab ${tab === t.id ? 'active' : ''}`} onClick={() => setTab(t.id)}>
                            {t.label} <span className="tab-count">{t.count}</span>
                        </button>
                    ))}
                </div>

                {/* ===== Current Transactions ===== */}
                {tab === 'current' && (
                    <div className="act-list">
                        {CURRENT.length > 0 ? CURRENT.map(tx => (
                            <div key={tx.id} className="act-card">
                                <div className="act-card-left">
                                    <span className="act-card-emoji">{tx.emoji}</span>
                                    <div className="act-card-info">
                                        <div className="act-card-top">
                                            <h3>{tx.title}</h3>
                                            <span className="act-type" style={{ background: TYPE_STYLES[tx.type].bg, color: TYPE_STYLES[tx.type].color }}>{TYPE_STYLES[tx.type].label}</span>
                                        </div>
                                        <div className="act-card-meta">
                                            <span>with <strong>{tx.with}</strong></span>
                                            <span><MapPin size={11} /> {tx.area}</span>
                                            <span><Clock size={11} /> Started {tx.started}</span>
                                        </div>
                                    </div>
                                </div>
                                <div className="act-card-status-area">
                                    <span className={`act-status ${tx.status}`}>
                                        {tx.status === 'in-progress' ? <Loader size={12} /> : <Clock size={12} />}
                                        {tx.step}
                                    </span>
                                </div>
                            </div>
                        )) : (
                            <div className="act-empty"><span>✨</span><p>No active transactions right now.</p></div>
                        )}
                    </div>
                )}

                {/* ===== Past History ===== */}
                {tab === 'history' && (
                    <div className="act-list">
                        {HISTORY.map(tx => (
                            <div key={tx.id} className="act-card completed">
                                <div className="act-card-left">
                                    <span className="act-card-emoji">{tx.emoji}</span>
                                    <div className="act-card-info">
                                        <div className="act-card-top">
                                            <h3>{tx.title}</h3>
                                            <span className="act-type" style={{ background: TYPE_STYLES[tx.type].bg, color: TYPE_STYLES[tx.type].color }}>{TYPE_STYLES[tx.type].label}</span>
                                        </div>
                                        <div className="act-card-meta">
                                            <span>with <strong>{tx.with}</strong></span>
                                            <span><CheckCircle size={11} /> Completed {tx.completed}</span>
                                        </div>
                                    </div>
                                </div>
                                <div className="act-card-status-area">
                                    <span className="act-status done"><Check size={12} /> Completed</span>
                                </div>
                            </div>
                        ))}
                    </div>
                )}

                {/* ===== Ratings ===== */}
                {tab === 'ratings' && (
                    <div className="act-list">
                        {HISTORY.map(tx => (
                            <div key={tx.id} className="act-card rating-card">
                                <div className="act-card-left">
                                    <span className="act-card-emoji">{tx.emoji}</span>
                                    <div className="act-card-info">
                                        <h3>{tx.title}</h3>
                                        <span className="act-card-meta-line">with <strong>{tx.with}</strong> · {tx.completed}</span>
                                    </div>
                                </div>
                                <div className="rating-area">
                                    <div className="rating-row">
                                        <span className="rating-label">Given</span>
                                        <div className="rating-stars">
                                            {tx.rated || ratedItems[tx.id] ? (
                                                Array.from({ length: 5 }).map((_, i) => (
                                                    <Star key={i} size={14} fill={i < (ratedItems[tx.id] || tx.myRating) ? '#FDCB6E' : 'none'} color={i < (ratedItems[tx.id] || tx.myRating) ? '#FDCB6E' : 'var(--border-color)'} />
                                                ))
                                            ) : (
                                                <button className="rate-btn" onClick={() => setRatingModal(tx.id)}>Rate now</button>
                                            )}
                                        </div>
                                    </div>
                                    <div className="rating-row">
                                        <span className="rating-label">Received</span>
                                        <div className="rating-stars">
                                            {tx.theirRating > 0 ? (
                                                Array.from({ length: 5 }).map((_, i) => (
                                                    <Star key={i} size={14} fill={i < tx.theirRating ? '#6C5CE7' : 'none'} color={i < tx.theirRating ? '#6C5CE7' : 'var(--border-color)'} />
                                                ))
                                            ) : (
                                                <span className="no-rating">Not yet rated</span>
                                            )}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                )}

                {/* ===== Disputes ===== */}
                {tab === 'disputes' && (
                    <div className="act-list">
                        {DISPUTES.length > 0 ? DISPUTES.map(d => (
                            <div key={d.id} className="act-card dispute-card">
                                <div className="dispute-banner">
                                    <AlertTriangle size={14} />
                                    <span>{d.reason}</span>
                                </div>
                                <div className="act-card-left">
                                    <span className="act-card-emoji">{d.emoji}</span>
                                    <div className="act-card-info">
                                        <h3>{d.title}</h3>
                                        <div className="act-card-meta">
                                            <span>with <strong>{d.with}</strong></span>
                                            <span><Flag size={11} /> Filed {d.filed}</span>
                                        </div>
                                    </div>
                                </div>
                                <div className="dispute-status">
                                    <span className={`dispute-badge ${d.status}`}>
                                        <Shield size={12} /> {d.update}
                                    </span>
                                </div>
                            </div>
                        )) : (
                            <div className="act-empty"><span>✅</span><p>No disputes. Keep it up!</p></div>
                        )}
                    </div>
                )}
            </div>

            {/* Rating Modal */}
            {ratingModal && (
                <div className="rating-overlay" onClick={() => { setRatingModal(null); setSelectedRating(0) }}>
                    <div className="rating-modal" onClick={e => e.stopPropagation()}>
                        <h3><Star size={18} /> Rate this exchange</h3>
                        <div className="rating-pick">
                            {Array.from({ length: 5 }).map((_, i) => (
                                <button key={i} className="rating-star-btn" onClick={() => setSelectedRating(i + 1)}>
                                    <Star size={28} fill={i < selectedRating ? '#FDCB6E' : 'none'} color={i < selectedRating ? '#FDCB6E' : 'var(--border-color)'} />
                                </button>
                            ))}
                        </div>
                        {selectedRating > 0 && <p className="rating-text">{['', 'Poor', 'Fair', 'Good', 'Great', 'Amazing!'][selectedRating]}</p>}
                        <button className="btn btn-primary btn-lg rating-submit" disabled={!selectedRating} onClick={submitRating} style={{ opacity: selectedRating ? 1 : 0.5 }}>
                            Submit Rating
                        </button>
                    </div>
                </div>
            )}
        </div>
    )
}
