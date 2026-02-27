import { useState } from 'react'
import {
    Bell, Check, X, Shield, Calendar, Clock, Inbox,
    AlertTriangle, MapPin, Star, ChevronRight, Trash2,
    ArrowLeftRight, Gift, ShieldAlert, CheckCircle,
    BellOff, Eye,
} from 'lucide-react'
import './Notifications.css'

const MOCK_NOTIFS = [
    // Requests
    { id: 1, type: 'request', title: 'New request for Harry Potter Box Set', desc: 'ReaderFan wants to exchange', emoji: '📚', time: '5 min ago', read: false, action: true },
    { id: 2, type: 'request', title: 'Borrow request for Cricket Bat', desc: 'SportyKid wants to borrow for the weekend', emoji: '🏏', time: '1 hour ago', read: false, action: true },
    // Approvals
    { id: 3, type: 'approval', title: 'Exchange approved!', desc: 'PotterHead accepted your swap proposal for Narnia Chronicles', emoji: '✅', time: '2 hours ago', read: false },
    { id: 4, type: 'approval', title: 'Listing approved by guardian', desc: 'Your Arduino Kit listing is now live', emoji: '🔧', time: '3 hours ago', read: true },
    { id: 5, type: 'approval', title: 'Guardian declined listing', desc: 'Your "Pocket Knife" listing was not approved', emoji: '❌', time: '5 hours ago', read: true },
    // Turf
    { id: 6, type: 'turf', title: 'Turf booking tomorrow!', desc: 'Basketball Court at Green Park — 4:00 PM', emoji: '🏀', time: '6 hours ago', read: false },
    { id: 7, type: 'turf', title: 'Turf booking confirmed', desc: 'Cricket Ground at Sports Arena — Feb 20, 10 AM', emoji: '🏏', time: '1 day ago', read: true },
    // Safety
    { id: 8, type: 'safety', title: 'Safety reminder', desc: 'Always meet in public places for exchanges. Never share your address.', emoji: '🛡️', time: '2 days ago', read: true },
    { id: 9, type: 'safety', title: 'Suspicious activity flagged', desc: 'A user you interacted with was reported. Your exchange is being reviewed.', emoji: '⚠️', time: '3 days ago', read: false, urgent: true },
    { id: 10, type: 'safety', title: 'Monthly safety check', desc: 'Review your privacy settings and blocked users list.', emoji: '🔒', time: '5 days ago', read: true },
]

const FILTERS = [
    { id: 'all', label: 'All' },
    { id: 'request', label: '📨 Requests' },
    { id: 'approval', label: '✅ Approvals' },
    { id: 'turf', label: '🏟️ Turf' },
    { id: 'safety', label: '🛡️ Safety' },
]

export default function Notifications() {
    const [notifs, setNotifs] = useState(MOCK_NOTIFS)
    const [filter, setFilter] = useState('all')

    const markRead = (id) => setNotifs(p => p.map(n => n.id === id ? { ...n, read: true } : n))
    const markAllRead = () => setNotifs(p => p.map(n => ({ ...n, read: true })))
    const dismiss = (id) => setNotifs(p => p.filter(n => n.id !== id))
    const clearAll = () => setNotifs([])

    const filtered = notifs.filter(n => filter === 'all' || n.type === filter)
    const unreadCount = notifs.filter(n => !n.read).length

    const getTypeStyle = (type) => {
        switch (type) {
            case 'request': return { bg: 'rgba(108,92,231,0.08)', border: 'rgba(108,92,231,0.15)', icon: Inbox, color: 'var(--primary)' }
            case 'approval': return { bg: 'rgba(0,184,148,0.06)', border: 'rgba(0,184,148,0.15)', icon: CheckCircle, color: 'var(--success)' }
            case 'turf': return { bg: 'rgba(0,206,201,0.06)', border: 'rgba(0,206,201,0.15)', icon: Calendar, color: '#00CEC9' }
            case 'safety': return { bg: 'rgba(253,203,110,0.06)', border: 'rgba(253,203,110,0.15)', icon: Shield, color: 'var(--warning)' }
            default: return { bg: 'transparent', border: 'var(--border-color)', icon: Bell, color: 'var(--text-secondary)' }
        }
    }

    return (
        <div className="notifs-page">
            <div className="container">
                {/* Header */}
                <div className="notifs-header">
                    <div>
                        <h1><Bell size={22} /> Notifications</h1>
                        <p>{unreadCount > 0 ? `${unreadCount} unread` : 'All caught up!'}</p>
                    </div>
                    <div className="notifs-header-actions">
                        {unreadCount > 0 && (
                            <button className="notifs-action-btn" onClick={markAllRead}>
                                <Eye size={14} /> Mark all read
                            </button>
                        )}
                        {notifs.length > 0 && (
                            <button className="notifs-action-btn danger" onClick={clearAll}>
                                <Trash2 size={14} /> Clear all
                            </button>
                        )}
                    </div>
                </div>

                {/* Filters */}
                <div className="notifs-filters">
                    {FILTERS.map(f => {
                        const count = f.id === 'all' ? notifs.length : notifs.filter(n => n.type === f.id).length
                        return (
                            <button key={f.id} className={`notif-filter ${filter === f.id ? 'active' : ''}`} onClick={() => setFilter(f.id)}>
                                {f.label} <span className="notif-filter-count">{count}</span>
                            </button>
                        )
                    })}
                </div>

                {/* List */}
                <div className="notifs-list">
                    {filtered.length > 0 ? filtered.map(notif => {
                        const style = getTypeStyle(notif.type)
                        const TypeIcon = style.icon
                        return (
                            <div
                                key={notif.id}
                                className={`notif-card ${notif.read ? 'read' : 'unread'} ${notif.urgent ? 'urgent' : ''}`}
                                onClick={() => markRead(notif.id)}
                            >
                                {!notif.read && <div className="notif-unread-dot" />}
                                <div className="notif-icon-wrap" style={{ background: style.bg, color: style.color }}>
                                    <TypeIcon size={16} />
                                </div>
                                <div className="notif-body">
                                    <div className="notif-title-row">
                                        <span className="notif-emoji">{notif.emoji}</span>
                                        <h4>{notif.title}</h4>
                                    </div>
                                    <p className="notif-desc">{notif.desc}</p>
                                    <span className="notif-time"><Clock size={10} /> {notif.time}</span>
                                </div>
                                <div className="notif-card-actions">
                                    {notif.action && (
                                        <button className="notif-view-btn">
                                            View <ChevronRight size={14} />
                                        </button>
                                    )}
                                    <button className="notif-dismiss" onClick={(e) => { e.stopPropagation(); dismiss(notif.id) }}>
                                        <X size={14} />
                                    </button>
                                </div>
                            </div>
                        )
                    }) : (
                        <div className="notifs-empty">
                            <span>🔔</span>
                            <h3>No {filter === 'all' ? '' : filter} notifications</h3>
                            <p>You're all caught up!</p>
                        </div>
                    )}
                </div>
            </div>
        </div>
    )
}
