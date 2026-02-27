import { useState } from 'react'
import {
    Eye, AlertTriangle, Check, X, Search, Shield,
    Clock, Flag, ChevronDown, Star, Zap,
} from 'lucide-react'
import './AdminModeration.css'

const FLAGGED = [
    { id: 1, title: 'iPhone 14 Pro — ₹5,000 Only!', owner: 'FakeAccount99', avatar: '🐺', category: 'Tech', riskScore: 94, reason: 'Suspicious pricing · Possible scam', reports: 5, date: 'Feb 17' },
    { id: 2, title: 'Fireworks Kit — Fun for Kids!', owner: 'DangerZone', avatar: '🦇', category: 'Other', riskScore: 88, reason: 'Age-inappropriate · Safety hazard', reports: 3, date: 'Feb 16' },
    { id: 3, title: 'Used Textbooks Bundle', owner: 'BookSeller', avatar: '🐱', category: 'Books', riskScore: 32, reason: 'Pricing inconsistency (listed free, description says ₹200)', reports: 1, date: 'Feb 15' },
    { id: 4, title: 'Gaming Mouse — RGB', owner: 'GamerPro', avatar: '🐸', category: 'Gaming', riskScore: 45, reason: 'Duplicate listing detected', reports: 0, date: 'Feb 14' },
    { id: 5, title: 'Adult Graphic Novel Collection', owner: 'NightOwl', avatar: '🦉', category: 'Books', riskScore: 78, reason: 'Age-restricted content in kids platform', reports: 2, date: 'Feb 13' },
]

export default function AdminModeration() {
    const [items, setItems] = useState(FLAGGED)
    const [filter, setFilter] = useState('all')
    const [expanded, setExpanded] = useState(null)

    const approve = (id) => setItems(i => i.filter(x => x.id !== id))
    const remove = (id) => setItems(i => i.filter(x => x.id !== id))

    const filtered = items.filter(i => {
        if (filter === 'high') return i.riskScore >= 70
        if (filter === 'medium') return i.riskScore >= 40 && i.riskScore < 70
        if (filter === 'low') return i.riskScore < 40
        return true
    })

    return (
        <div className="amod-page">
            <div className="container">
                <div className="am-header">
                    <h1><Eye size={22} /> Content Moderation</h1>
                    <p>Review flagged listings, AI risk scores, and take action</p>
                </div>

                <div className="am-stats-bar">
                    <div className="am-stat"><span className="am-stat-num danger">{items.filter(i => i.riskScore >= 70).length}</span> High Risk</div>
                    <div className="am-stat"><span className="am-stat-num warning">{items.filter(i => i.riskScore >= 40 && i.riskScore < 70).length}</span> Medium</div>
                    <div className="am-stat"><span className="am-stat-num safe">{items.filter(i => i.riskScore < 40).length}</span> Low</div>
                    <div className="am-stat"><span className="am-stat-num total">{items.length}</span> Total Flagged</div>
                </div>

                <div className="am-filters">
                    {['all', 'high', 'medium', 'low'].map(f => (
                        <button key={f} className={`am-filter ${filter === f ? 'active' : ''}`} onClick={() => setFilter(f)}>
                            {f === 'all' ? 'All' : f === 'high' ? '🔴 High Risk' : f === 'medium' ? '🟡 Medium' : '🟢 Low'}
                        </button>
                    ))}
                </div>

                <div className="am-list">
                    {filtered.map(item => {
                        const isOpen = expanded === item.id
                        const riskColor = item.riskScore >= 70 ? 'var(--danger)' : item.riskScore >= 40 ? 'var(--warning)' : 'var(--success)'
                        return (
                            <div key={item.id} className="am-card">
                                <div className="am-card-main" onClick={() => setExpanded(isOpen ? null : item.id)}>
                                    <span className="am-avatar">{item.avatar}</span>
                                    <div className="am-card-body">
                                        <h4>{item.title}</h4>
                                        <span className="am-card-owner">by {item.owner} · {item.category}</span>
                                    </div>
                                    <div className="am-risk-ring">
                                        <svg viewBox="0 0 40 40">
                                            <circle cx="20" cy="20" r="16" className="am-ring-bg" />
                                            <circle cx="20" cy="20" r="16" className="am-ring-fill"
                                                strokeDasharray={`${item.riskScore} ${100 - item.riskScore}`} strokeDashoffset="25"
                                                style={{ stroke: riskColor }} />
                                        </svg>
                                        <span className="am-risk-num" style={{ color: riskColor }}>{item.riskScore}</span>
                                    </div>
                                    <ChevronDown size={14} className={`am-chev ${isOpen ? 'rot' : ''}`} />
                                </div>
                                {isOpen && (
                                    <div className="am-card-detail">
                                        <div className="am-detail-row"><Flag size={11} /> <span>Reason: {item.reason}</span></div>
                                        <div className="am-detail-row"><AlertTriangle size={11} /> <span>{item.reports} user report(s)</span></div>
                                        <div className="am-detail-row"><Clock size={11} /> <span>Flagged: {item.date}</span></div>
                                        <div className="am-card-actions">
                                            <button className="am-act approve" onClick={() => approve(item.id)}><Check size={13} /> Approve</button>
                                            <button className="am-act remove" onClick={() => remove(item.id)}><X size={13} /> Remove Listing</button>
                                        </div>
                                    </div>
                                )}
                            </div>
                        )
                    })}
                    {filtered.length === 0 && <div className="am-empty"><Check size={14} /> No flagged content in this category.</div>}
                </div>
            </div>
        </div>
    )
}
