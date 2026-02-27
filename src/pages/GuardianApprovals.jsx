import { useState } from 'react'
import {
    Check, X, Clock, ShoppingBag, Wallet, MapPin,
    ChevronDown, AlertTriangle, Shield, Filter,
    CheckCircle,
} from 'lucide-react'
import './GuardianApprovals.css'

const REQUESTS = [
    { id: 1, type: 'listing', child: 'Arjun', avatar: '🦊', title: 'List "Old Skateboard" for exchange', detail: 'Exchange type · Sports category', time: '30 min ago', status: 'pending' },
    { id: 2, type: 'wallet', child: 'Priya', avatar: '🦋', title: 'Add ₹200 credits via UPI', detail: 'Monthly limit: ₹2,800 remaining', time: '1h ago', status: 'pending' },
    { id: 3, type: 'turf', child: 'Arjun', avatar: '🦊', title: 'Turf booking — Central Park 6:30 PM', detail: 'Football · 10 players · ₹55/person', time: '3h ago', status: 'pending' },
    { id: 4, type: 'wallet', child: 'Arjun', avatar: '🦊', title: 'Withdraw ₹100 credits', detail: 'Current balance: ₹310', time: '5h ago', status: 'pending' },
    { id: 5, type: 'listing', child: 'Priya', avatar: '🦋', title: 'List "Art Supply Kit" for sell (₹350)', detail: 'Sell type · Art category', time: '1d ago', status: 'approved' },
    { id: 6, type: 'turf', child: 'Priya', avatar: '🦋', title: 'Turf booking — Badminton Court 7:30 AM', detail: 'Badminton · 4 players · ₹100/person', time: '2d ago', status: 'rejected' },
]

const TYPE_META = {
    listing: { icon: ShoppingBag, color: '#6C5CE7', label: 'Listing' },
    wallet: { icon: Wallet, color: '#FDCB6E', label: 'Wallet' },
    turf: { icon: MapPin, color: '#00CEC9', label: 'Turf' },
}

export default function GuardianApprovals() {
    const [items, setItems] = useState(REQUESTS)
    const [filter, setFilter] = useState('all')

    const approve = (id) => setItems(i => i.map(r => r.id === id ? { ...r, status: 'approved' } : r))
    const reject = (id) => setItems(i => i.map(r => r.id === id ? { ...r, status: 'rejected' } : r))

    const filtered = items.filter(r => filter === 'all' || (filter === 'pending' ? r.status === 'pending' : r.type === filter))
    const pendingCount = items.filter(r => r.status === 'pending').length

    return (
        <div className="gappr-page">
            <div className="container">
                <div className="ga-header">
                    <h1><Shield size={22} /> Approval Requests</h1>
                    <p>Review and approve your child's listing, transaction, and wallet requests</p>
                </div>

                <div className="ga-toolbar">
                    <span className="ga-pending-count">{pendingCount} pending</span>
                    <div className="ga-filters">
                        {[
                            { id: 'all', label: 'All' },
                            { id: 'pending', label: '⏳ Pending' },
                            { id: 'listing', label: '📦 Listings' },
                            { id: 'wallet', label: '💰 Wallet' },
                            { id: 'turf', label: '📍 Turf' },
                        ].map(f => (
                            <button key={f.id} className={`ga-filter ${filter === f.id ? 'active' : ''}`} onClick={() => setFilter(f.id)}>{f.label}</button>
                        ))}
                    </div>
                </div>

                <div className="ga-list">
                    {filtered.map(r => {
                        const meta = TYPE_META[r.type]
                        const TIcon = meta.icon
                        return (
                            <div key={r.id} className={`ga-card ${r.status}`}>
                                <div className="ga-card-left">
                                    <span className="ga-avatar">{r.avatar}</span>
                                    <div className="ga-card-icon" style={{ background: `${meta.color}12`, color: meta.color }}><TIcon size={14} /></div>
                                </div>
                                <div className="ga-card-body">
                                    <div className="ga-card-top">
                                        <span className="ga-child-name">{r.child}</span>
                                        <span className="ga-type-badge" style={{ background: `${meta.color}12`, color: meta.color }}>{meta.label}</span>
                                    </div>
                                    <h4>{r.title}</h4>
                                    <span className="ga-detail">{r.detail}</span>
                                    <span className="ga-time"><Clock size={10} /> {r.time}</span>
                                </div>
                                <div className="ga-card-actions">
                                    {r.status === 'pending' ? (
                                        <>
                                            <button className="ga-act approve" onClick={() => approve(r.id)}><Check size={14} /> Approve</button>
                                            <button className="ga-act reject" onClick={() => reject(r.id)}><X size={14} /> Reject</button>
                                        </>
                                    ) : (
                                        <span className={`ga-resolved ${r.status}`}>
                                            {r.status === 'approved' ? '✓ Approved' : '✗ Rejected'}
                                        </span>
                                    )}
                                </div>
                            </div>
                        )
                    })}
                    {filtered.length === 0 && <div className="ga-empty"><CheckCircle size={16} /> No requests match this filter</div>}
                </div>
            </div>
        </div>
    )
}
