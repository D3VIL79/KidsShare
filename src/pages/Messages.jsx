import { useState, useContext } from 'react'
import { AgeContext } from '../contexts'
import {
    Inbox, Check, X, AlertTriangle, Shield, Clock,
    Star, MapPin, ChevronDown, ChevronUp, Eye,
    MessageCircle, Flag, UserX, ShieldAlert, Bell,
    ArrowLeftRight, Gift, ShoppingBag,
} from 'lucide-react'
import './Messages.css'

const TYPE_STYLES = {
    free: { bg: 'rgba(0,184,148,0.1)', color: '#00b894', label: 'Free Share' },
    exchange: { bg: 'rgba(225,112,85,0.1)', color: '#e17055', label: 'Exchange' },
    lend: { bg: 'rgba(108,92,231,0.1)', color: '#6C5CE7', label: 'Lend' },
}

const MOCK_REQUESTS = [
    {
        id: 1, status: 'pending',
        item: { title: 'Harry Potter Box Set', emoji: '📚', type: 'exchange' },
        from: { name: 'ReaderFan', trust: 45, avatar: '🐱', joined: 'Feb 2025', exchanges: 1 },
        message: 'Hi! I have the complete Percy Jackson set in great condition. Would love to swap!',
        time: '10 minutes ago',
        trustWarning: true, warningReason: 'New user with low trust score',
        needsGuardian: false,
    },
    {
        id: 2, status: 'pending',
        item: { title: 'Cricket Bat (SG)', emoji: '🏏', type: 'free' },
        from: { name: 'SportyKid', trust: 88, avatar: '🦁', joined: 'Nov 2024', exchanges: 12 },
        message: 'Hey! Can I borrow the bat for this weekend? I have practice on Saturday.',
        time: '1 hour ago',
        trustWarning: false,
        needsGuardian: false,
    },
    {
        id: 3, status: 'pending',
        item: { title: 'Harry Potter Box Set', emoji: '📚', type: 'exchange' },
        from: { name: 'PotterHead', trust: 72, avatar: '🦊', joined: 'Jun 2025', exchanges: 5 },
        message: 'I\'ve got the Narnia chronicles! Let me know if you\'re interested in a swap.',
        time: '3 hours ago',
        trustWarning: false,
        needsGuardian: true,
    },
    {
        id: 4, status: 'accepted',
        item: { title: 'Watercolor Set', emoji: '🎨', type: 'free' },
        from: { name: 'ArtLover', trust: 93, avatar: '🐼', joined: 'Sep 2024', exchanges: 18 },
        message: 'Thank you so much! I\'ll take great care of it.',
        time: '2 days ago',
        trustWarning: false, needsGuardian: false,
    },
    {
        id: 5, status: 'rejected',
        item: { title: 'Board Games Bundle', emoji: '🎲', type: 'exchange' },
        from: { name: 'Unknown99', trust: 22, avatar: '🐻', joined: 'Feb 2025', exchanges: 0 },
        message: 'Can I have all the games? Meet me at my place.',
        time: '3 days ago',
        trustWarning: true, warningReason: 'Suspicious request — asked for private meetup',
        needsGuardian: false,
    },
]

export default function Messages() {
    const { ageGroup } = useContext(AgeContext)
    const needsGuardian = ageGroup === '7-12' || ageGroup === '13-17'

    const [requests, setRequests] = useState(MOCK_REQUESTS)
    const [filter, setFilter] = useState('pending')

    const [guardianSent, setGuardianSent] = useState({})

    const handleAccept = (id) => {
        setRequests(p => p.map(r => r.id === id ? { ...r, status: 'accepted' } : r))
    }

    const handleReject = (id) => {
        setRequests(p => p.map(r => r.id === id ? { ...r, status: 'rejected' } : r))
    }

    const sendGuardianApproval = (id) => {
        setGuardianSent(p => ({ ...p, [id]: true }))
    }

    const filtered = requests.filter(r => filter === 'all' || r.status === filter)
    const pendingCount = requests.filter(r => r.status === 'pending').length

    return (
        <div className="inbox-page">
            <div className="container">
                {/* Header */}
                <div className="inbox-header">
                    <div>
                        <h1><Inbox size={22} /> Requests Inbox</h1>
                        <p>Review and respond to incoming requests</p>
                    </div>
                    {pendingCount > 0 && (
                        <div className="inbox-pending-badge">
                            <Bell size={14} /> {pendingCount} pending
                        </div>
                    )}
                </div>

                {/* Filter Tabs */}
                <div className="inbox-filters">
                    {[
                        { id: 'pending', label: '⏳ Pending', count: requests.filter(r => r.status === 'pending').length },
                        { id: 'accepted', label: '✅ Accepted', count: requests.filter(r => r.status === 'accepted').length },
                        { id: 'rejected', label: '❌ Rejected', count: requests.filter(r => r.status === 'rejected').length },
                        { id: 'all', label: 'All', count: requests.length },
                    ].map(f => (
                        <button
                            key={f.id}
                            className={`inbox-filter ${filter === f.id ? 'active' : ''}`}
                            onClick={() => setFilter(f.id)}
                        >
                            {f.label} <span className="inbox-filter-count">{f.count}</span>
                        </button>
                    ))}
                </div>

                {/* Request List */}
                <div className="inbox-list">
                    {filtered.length > 0 ? filtered.map(req => (
                        <div key={req.id} className={`inbox-card ${req.status} ${req.trustWarning ? 'warned' : ''}`}>
                            {/* Trust Warning Banner */}
                            {req.trustWarning && (
                                <div className="trust-warning-banner">
                                    <ShieldAlert size={14} />
                                    <span>⚠️ {req.warningReason}</span>
                                </div>
                            )}

                            <div className="inbox-card-main">
                                {/* Item info */}
                                <div className="inbox-item-row">
                                    <span className="inbox-item-emoji">{req.item.emoji}</span>
                                    <span className="inbox-item-title">{req.item.title}</span>
                                    <span className="inbox-item-type" style={{ background: TYPE_STYLES[req.item.type].bg, color: TYPE_STYLES[req.item.type].color }}>
                                        {TYPE_STYLES[req.item.type].label}
                                    </span>
                                </div>

                                {/* User info */}
                                <div className="inbox-user-row">
                                    <div className="inbox-user-left">
                                        <span className="inbox-user-avatar">{req.from.avatar}</span>
                                        <div>
                                            <span className="inbox-user-name">{req.from.name}</span>
                                            <div className="inbox-user-meta">
                                                <span className={`inbox-trust ${req.from.trust < 50 ? 'low' : req.from.trust < 75 ? 'mid' : 'high'}`}>
                                                    <Star size={11} /> {req.from.trust}
                                                </span>
                                                <span>{req.from.exchanges} exchanges</span>
                                                <span>Joined {req.from.joined}</span>
                                            </div>
                                        </div>
                                    </div>
                                    <span className="inbox-time"><Clock size={11} /> {req.time}</span>
                                </div>

                                {/* Message */}
                                <div className="inbox-message">
                                    <MessageCircle size={13} />
                                    <p>"{req.message}"</p>
                                </div>

                                {/* Actions */}
                                {req.status === 'pending' && (
                                    <div className="inbox-actions">
                                        {/* Guardian Approval */}
                                        {needsGuardian && req.needsGuardian && !guardianSent[req.id] && (
                                            <button className="inbox-guardian-btn" onClick={() => sendGuardianApproval(req.id)}>
                                                <Shield size={14} /> Ask Guardian
                                            </button>
                                        )}
                                        {guardianSent[req.id] && (
                                            <span className="inbox-guardian-sent">
                                                <Shield size={12} /> Guardian notified
                                            </span>
                                        )}

                                        <div className="inbox-main-actions">
                                            <button className="inbox-accept" onClick={() => handleAccept(req.id)}>
                                                <Check size={16} /> Accept
                                            </button>
                                            <button className="inbox-reject" onClick={() => handleReject(req.id)}>
                                                <X size={16} /> Decline
                                            </button>
                                            <button className="inbox-report">
                                                <Flag size={14} />
                                            </button>
                                        </div>
                                    </div>
                                )}

                                {/* Status badges for resolved */}
                                {req.status === 'accepted' && (
                                    <div className="inbox-resolved accepted">
                                        <Check size={14} /> Request accepted
                                    </div>
                                )}
                                {req.status === 'rejected' && (
                                    <div className="inbox-resolved rejected">
                                        <X size={14} /> Request declined
                                    </div>
                                )}
                            </div>
                        </div>
                    )) : (
                        <div className="inbox-empty">
                            <span>📬</span>
                            <h3>No {filter === 'all' ? '' : filter} requests</h3>
                            <p>Requests from community members will show up here.</p>
                        </div>
                    )}
                </div>
            </div>
        </div>
    )
}
