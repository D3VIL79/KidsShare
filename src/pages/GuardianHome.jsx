import { useState } from 'react'
import { Link } from 'react-router-dom'
import {
    Shield, AlertTriangle, Clock, Check, X, Eye, Bell,
    Activity, Users, ChevronRight, TrendingUp, MapPin,
    Wallet, MessageCircle, ShoppingBag, Star, Lock,
} from 'lucide-react'
import './GuardianHome.css'

const CHILDREN = [
    { id: 1, name: 'Arjun', avatar: '🦊', age: 12, group: '7-12', trust: 72, lastActive: '2 min ago', status: 'online' },
    { id: 2, name: 'Priya', avatar: '🦋', age: 15, group: '13-17', trust: 88, lastActive: '1h ago', status: 'offline' },
]

const RISK_ALERTS = [
    { id: 1, severity: 'high', text: 'Arjun attempted to share a phone number in chat', time: '10 min ago', child: 'Arjun' },
    { id: 2, severity: 'medium', text: 'Priya requested to book an evening turf slot (after 8 PM)', time: '2h ago', child: 'Priya' },
    { id: 3, severity: 'low', text: 'Arjun received a low trust score (< 70) match suggestion', time: '5h ago', child: 'Arjun' },
]

const PENDING = [
    { id: 1, type: 'listing', child: 'Arjun', text: 'Wants to list "Old Skateboard" for exchange', time: '30 min ago' },
    { id: 2, type: 'wallet', child: 'Priya', text: 'Requesting to add ₹200 credits', time: '1h ago' },
    { id: 3, type: 'turf', child: 'Arjun', text: 'Turf booking — Central Park, 6:30 PM', time: '3h ago' },
]

const ACTIVITY_SUMMARY = [
    { label: 'Items Shared', value: 8, icon: ShoppingBag, color: '#6C5CE7' },
    { label: 'Exchanges', value: 5, icon: Activity, color: '#00b894' },
    { label: 'Chats Today', value: 12, icon: MessageCircle, color: '#00CEC9' },
    { label: 'Wallet Balance', value: '₹310', icon: Wallet, color: '#FDCB6E' },
]

export default function GuardianHome() {
    const [approvals, setApprovals] = useState(PENDING)

    const approve = (id) => setApprovals(a => a.filter(p => p.id !== id))
    const reject = (id) => setApprovals(a => a.filter(p => p.id !== id))

    return (
        <div className="ghome-page">
            <div className="container">
                <div className="gh-header">
                    <div>
                        <h1><Shield size={22} /> Guardian Dashboard</h1>
                        <p>Monitor, approve, and keep your children safe on KidShare</p>
                    </div>
                </div>

                {/* Children Cards */}
                <div className="gh-children">
                    {CHILDREN.map(c => (
                        <div key={c.id} className="gh-child-card">
                            <div className="gh-child-top">
                                <span className="gh-child-avatar">{c.avatar}</span>
                                <div>
                                    <h3>{c.name} <span className={`gh-status-dot ${c.status}`} /></h3>
                                    <span className="gh-child-meta">Age {c.age} · {c.group}</span>
                                </div>
                                <div className="gh-child-trust">
                                    <Star size={12} fill="#FDCB6E" color="#FDCB6E" /> {c.trust}
                                </div>
                            </div>
                            <div className="gh-child-footer">
                                <span><Clock size={11} /> {c.lastActive}</span>
                                <Link to="/guardian/activity" className="gh-child-link">View Activity <ChevronRight size={12} /></Link>
                            </div>
                        </div>
                    ))}
                </div>

                {/* Activity Summary */}
                <div className="gh-stats">
                    {ACTIVITY_SUMMARY.map(s => {
                        const SIcon = s.icon
                        return (
                            <div key={s.label} className="gh-stat">
                                <SIcon size={16} style={{ color: s.color }} />
                                <strong>{s.value}</strong>
                                <span>{s.label}</span>
                            </div>
                        )
                    })}
                </div>

                <div className="gh-layout">
                    {/* Risk Alerts */}
                    <div className="gh-section">
                        <h2><AlertTriangle size={16} /> Risk Alerts</h2>
                        <div className="gh-alerts">
                            {RISK_ALERTS.map(a => (
                                <div key={a.id} className={`gh-alert ${a.severity}`}>
                                    <AlertTriangle size={14} />
                                    <div>
                                        <span className="gh-alert-text">{a.text}</span>
                                        <span className="gh-alert-meta">{a.child} · {a.time}</span>
                                    </div>
                                    <span className={`gh-sev ${a.severity}`}>{a.severity}</span>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Pending Approvals */}
                    <div className="gh-section">
                        <h2><Clock size={16} /> Pending Approvals ({approvals.length})</h2>
                        {approvals.length > 0 ? approvals.map(p => (
                            <div key={p.id} className="gh-approval">
                                <div className="gh-appr-info">
                                    <span className="gh-appr-child">{p.child}</span>
                                    <span className="gh-appr-text">{p.text}</span>
                                    <span className="gh-appr-time">{p.time}</span>
                                </div>
                                <div className="gh-appr-actions">
                                    <button className="gh-appr-btn approve" onClick={() => approve(p.id)}><Check size={14} /></button>
                                    <button className="gh-appr-btn reject" onClick={() => reject(p.id)}><X size={14} /></button>
                                </div>
                            </div>
                        )) : (
                            <div className="gh-empty"><Check size={14} /> All approvals handled!</div>
                        )}
                    </div>
                </div>

                {/* Quick Links */}
                <div className="gh-quick-links">
                    <Link to="/guardian/permissions" className="gh-qlink"><Lock size={14} /> Permissions</Link>
                    <Link to="/guardian/approvals" className="gh-qlink"><Check size={14} /> Approvals</Link>
                    <Link to="/guardian/activity" className="gh-qlink"><Activity size={14} /> Activity Log</Link>
                    <Link to="/guardian/settings" className="gh-qlink"><Bell size={14} /> Settings</Link>
                </div>
            </div>
        </div>
    )
}
