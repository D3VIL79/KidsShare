import { useState } from 'react'
import {
    Users, Search, Shield, Ban, Star, ChevronDown,
    Check, X, Eye, AlertTriangle, Clock, ToggleLeft, ToggleRight,
} from 'lucide-react'
import './AdminUsers.css'

const USERS_DATA = [
    { id: 1, name: 'Arjun_Fox', avatar: '🦊', age: 12, group: '7-12', trust: 72, status: 'active', reports: 0, joined: 'Jan 2025', exchanges: 8 },
    { id: 2, name: 'BookWorm42', avatar: '🐱', age: 14, group: '13-17', trust: 91, status: 'active', reports: 0, joined: 'Dec 2024', exchanges: 23 },
    { id: 3, name: 'FakeAccount99', avatar: '🐺', age: 16, group: '13-17', trust: 18, status: 'suspended', reports: 5, joined: 'Feb 2025', exchanges: 0 },
    { id: 4, name: 'SportyKid', avatar: '🦁', age: 15, group: '13-17', trust: 85, status: 'active', reports: 1, joined: 'Nov 2024', exchanges: 15 },
    { id: 5, name: 'RudeTrader', avatar: '🐯', age: 17, group: '13-17', trust: 32, status: 'restricted', reports: 3, joined: 'Oct 2024', exchanges: 4 },
    { id: 6, name: 'ArtLover', avatar: '🦋', age: 22, group: '18-25', trust: 95, status: 'active', reports: 0, joined: 'Sep 2024', exchanges: 31 },
    { id: 7, name: 'GamerPro', avatar: '🐸', age: 19, group: '18-25', trust: 67, status: 'active', reports: 2, joined: 'Jan 2025', exchanges: 12 },
]

export default function AdminUsers() {
    const [search, setSearch] = useState('')
    const [filter, setFilter] = useState('all')
    const [users, setUsers] = useState(USERS_DATA)
    const [expanded, setExpanded] = useState(null)
    const [trustOverride, setTrustOverride] = useState({})

    const filtered = users.filter(u => {
        if (filter !== 'all' && u.status !== filter) return false
        if (search && !u.name.toLowerCase().includes(search.toLowerCase())) return false
        return true
    })

    const toggleStatus = (id, newStatus) => setUsers(us => us.map(u => u.id === id ? { ...u, status: newStatus } : u))

    return (
        <div className="au-page">
            <div className="container">
                <div className="au-header">
                    <h1><Users size={22} /> User Management</h1>
                    <p>Search, restrict, suspend, and manage trust scores</p>
                </div>

                <div className="au-toolbar">
                    <div className="au-search"><Search size={14} /><input placeholder="Search users..." value={search} onChange={e => setSearch(e.target.value)} /></div>
                    <div className="au-filters">
                        {['all', 'active', 'restricted', 'suspended'].map(f => (
                            <button key={f} className={`au-filter ${filter === f ? 'active' : ''}`} onClick={() => setFilter(f)}>
                                {f.charAt(0).toUpperCase() + f.slice(1)}
                            </button>
                        ))}
                    </div>
                </div>

                <div className="au-table">
                    <div className="au-table-head">
                        <span>User</span><span>Age Group</span><span>Trust</span><span>Reports</span><span>Status</span><span>Actions</span>
                    </div>
                    {filtered.map(u => (
                        <div key={u.id}>
                            <div className="au-row" onClick={() => setExpanded(expanded === u.id ? null : u.id)}>
                                <div className="au-user-cell"><span className="au-av">{u.avatar}</span><span>{u.name}</span></div>
                                <span className="au-age-badge">{u.group}</span>
                                <span className={`au-trust ${u.trust >= 70 ? 'good' : u.trust >= 40 ? 'mid' : 'low'}`}>{u.trust}</span>
                                <span className={`au-reports ${u.reports > 0 ? 'has' : ''}`}>{u.reports}</span>
                                <span className={`au-status-badge ${u.status}`}>{u.status}</span>
                                <div className="au-actions" onClick={e => e.stopPropagation()}>
                                    {u.status === 'active' && <button className="au-act restrict" onClick={() => toggleStatus(u.id, 'restricted')} title="Restrict"><Ban size={13} /></button>}
                                    {u.status === 'active' && <button className="au-act suspend" onClick={() => toggleStatus(u.id, 'suspended')} title="Suspend"><X size={13} /></button>}
                                    {u.status !== 'active' && <button className="au-act restore" onClick={() => toggleStatus(u.id, 'active')} title="Restore"><Check size={13} /></button>}
                                </div>
                            </div>
                            {expanded === u.id && (
                                <div className="au-expanded">
                                    <div className="au-exp-row"><span>Joined</span><strong>{u.joined}</strong></div>
                                    <div className="au-exp-row"><span>Exchanges</span><strong>{u.exchanges}</strong></div>
                                    <div className="au-exp-row">
                                        <span>Trust Override</span>
                                        <input type="number" min={0} max={100} placeholder={u.trust}
                                            value={trustOverride[u.id] ?? ''} className="au-trust-input"
                                            onChange={e => setTrustOverride(o => ({ ...o, [u.id]: e.target.value }))} />
                                        <button className="au-trust-save" disabled={!trustOverride[u.id]}
                                            onClick={() => { setUsers(us => us.map(x => x.id === u.id ? { ...x, trust: parseInt(trustOverride[u.id]) || x.trust } : x)); setTrustOverride(o => ({ ...o, [u.id]: '' })) }}>
                                            Apply
                                        </button>
                                    </div>
                                </div>
                            )}
                        </div>
                    ))}
                </div>
                <div className="au-count">{filtered.length} users</div>
            </div>
        </div>
    )
}
