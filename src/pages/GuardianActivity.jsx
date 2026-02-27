import { useState } from 'react'
import {
    Activity, ArrowLeftRight, MessageCircle, Flag,
    Clock, Filter, Search, ChevronDown, Eye, Shield,
    ShoppingBag, MapPin,
} from 'lucide-react'
import './GuardianActivity.css'

const LOGS = [
    { id: 1, type: 'exchange', child: 'Arjun', avatar: '🦊', text: 'Completed exchange — Board Game for Puzzle Set', time: '30 min ago', detail: 'With user BookWorm42' },
    { id: 2, type: 'chat', child: 'Arjun', avatar: '🦊', text: 'Sent 4 messages in community chat', time: '1h ago', detail: 'All messages passed content filter', safe: true },
    { id: 3, type: 'exchange', child: 'Priya', avatar: '🦋', text: 'Listed "Art Supply Kit" for exchange', time: '2h ago', detail: 'Art category · Pending approval' },
    { id: 4, type: 'chat', child: 'Priya', avatar: '🦋', text: 'Received a message from SportyKid', time: '3h ago', detail: 'Message: "Hey, is the art kit still available?"', safe: true },
    { id: 5, type: 'report', child: 'Arjun', avatar: '🦊', text: 'Reported user "FakeAccount99" for suspicious listing', time: '5h ago', detail: 'Reason: Scam / Fraud · Under review' },
    { id: 6, type: 'exchange', child: 'Arjun', avatar: '🦊', text: 'Browsed 12 items in Sports category', time: '6h ago', detail: 'No interactions' },
    { id: 7, type: 'chat', child: 'Arjun', avatar: '🦊', text: 'Attempted to share personal information', time: '8h ago', detail: 'BLOCKED: Phone number detected and removed', safe: false },
    { id: 8, type: 'exchange', child: 'Priya', avatar: '🦋', text: 'Received 5-star rating from ArtLover', time: '1d ago', detail: 'Comment: "Super smooth transaction!"' },
    { id: 9, type: 'report', child: 'Priya', avatar: '🦋', text: 'Blocked user "RudeTrader"', time: '2d ago', detail: 'Reason: Harassment' },
    { id: 10, type: 'exchange', child: 'Arjun', avatar: '🦊', text: 'Turf booking — Football at Central Park', time: '2d ago', detail: '10 players · ₹55/person' },
]

const TYPE_META = {
    exchange: { icon: ArrowLeftRight, color: '#6C5CE7', label: 'Exchange' },
    chat: { icon: MessageCircle, color: '#00CEC9', label: 'Chat' },
    report: { icon: Flag, color: '#e17055', label: 'Report' },
}

export default function GuardianActivity() {
    const [filter, setFilter] = useState('all')
    const [child, setChild] = useState('all')
    const [search, setSearch] = useState('')
    const [expanded, setExpanded] = useState(null)

    const filtered = LOGS.filter(l => {
        if (filter !== 'all' && l.type !== filter) return false
        if (child !== 'all' && l.child !== child) return false
        if (search && !l.text.toLowerCase().includes(search.toLowerCase())) return false
        return true
    })

    return (
        <div className="gact-page">
            <div className="container">
                <div className="gact-header">
                    <h1><Activity size={22} /> Child Activity Log</h1>
                    <p>Full history of exchanges, chats, and reports across all linked children</p>
                </div>

                {/* Toolbar */}
                <div className="gact-toolbar">
                    <div className="gact-search">
                        <Search size={14} />
                        <input placeholder="Search activity..." value={search} onChange={e => setSearch(e.target.value)} />
                    </div>
                    <div className="gact-filter-group">
                        <div className="gact-child-btns">
                            {['all', 'Arjun', 'Priya'].map(c => (
                                <button key={c} className={`gact-child-btn ${child === c ? 'active' : ''}`} onClick={() => setChild(c)}>
                                    {c === 'all' ? 'All' : c === 'Arjun' ? '🦊 Arjun' : '🦋 Priya'}
                                </button>
                            ))}
                        </div>
                        <div className="gact-type-btns">
                            {[
                                { id: 'all', label: 'All' },
                                { id: 'exchange', label: '↔ Exchanges' },
                                { id: 'chat', label: '💬 Chats' },
                                { id: 'report', label: '🚩 Reports' },
                            ].map(f => (
                                <button key={f.id} className={`gact-type-btn ${filter === f.id ? 'active' : ''}`} onClick={() => setFilter(f.id)}>{f.label}</button>
                            ))}
                        </div>
                    </div>
                </div>

                {/* Log List */}
                <div className="gact-list">
                    {filtered.map(l => {
                        const meta = TYPE_META[l.type]
                        const LIcon = meta.icon
                        const isOpen = expanded === l.id
                        return (
                            <div key={l.id} className={`gact-row ${l.safe === false ? 'flagged' : ''}`} onClick={() => setExpanded(isOpen ? null : l.id)}>
                                <div className="gact-row-main">
                                    <span className="gact-avatar">{l.avatar}</span>
                                    <div className="gact-row-icon" style={{ background: `${meta.color}12`, color: meta.color }}><LIcon size={13} /></div>
                                    <div className="gact-row-body">
                                        <span className="gact-row-text">{l.text}</span>
                                        <span className="gact-row-time"><Clock size={10} /> {l.time}</span>
                                    </div>
                                    {l.safe === false && <span className="gact-flag">⚠ Blocked</span>}
                                    <ChevronDown size={13} className={`gact-chev ${isOpen ? 'rotated' : ''}`} />
                                </div>
                                {isOpen && (
                                    <div className="gact-detail">
                                        <span>{l.detail}</span>
                                    </div>
                                )}
                            </div>
                        )
                    })}
                    {filtered.length === 0 && <div className="gact-empty">No activity matches your filters.</div>}
                </div>

                <div className="gact-count">{filtered.length} of {LOGS.length} entries</div>
            </div>
        </div>
    )
}
