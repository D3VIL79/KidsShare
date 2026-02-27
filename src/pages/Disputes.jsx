import { useState } from 'react'
import {
    AlertTriangle, Upload, Clock, Check, X, ChevronDown,
    MessageCircle, Shield, FileText, Camera, Eye,
    CheckCircle, Info,
} from 'lucide-react'
import './Disputes.css'

const DISPUTES = [
    {
        id: 1, title: 'Item Not as Described — Board Game Set', against: 'GamerPro',
        avatar: '🦁', status: 'open', severity: 'high', date: 'Feb 15',
        description: 'The board game set was missing 3 pieces and the box was damaged. Listing showed complete set.',
        evidence: ['photo_damage.jpg', 'chat_screenshot.png'],
        timeline: [
            { step: 'Dispute Filed', date: 'Feb 15', done: true },
            { step: 'Evidence Collected', date: 'Feb 16', done: true },
            { step: 'Under Review', date: 'Feb 17', done: false, current: true },
            { step: 'Resolution', date: 'Pending', done: false },
        ],
    },
    {
        id: 2, title: 'Late Return — PS5 Controller', against: 'TechNerd',
        avatar: '🦉', status: 'resolved', severity: 'low', date: 'Feb 8',
        description: 'Controller returned 3 days late. Penalty applied and credit refunded.',
        evidence: ['rental_agreement.pdf'],
        timeline: [
            { step: 'Dispute Filed', date: 'Feb 8', done: true },
            { step: 'Evidence Collected', date: 'Feb 9', done: true },
            { step: 'Under Review', date: 'Feb 10', done: true },
            { step: 'Resolved — Penalty Applied', date: 'Feb 11', done: true },
        ],
    },
    {
        id: 3, title: 'Missed Meetup — No Show', against: 'SkaterBoy',
        avatar: '🐯', status: 'pending', severity: 'medium', date: 'Feb 13',
        description: 'Agreed to meet at Koramangala Park but user did not show up. No prior notice.',
        evidence: [],
        timeline: [
            { step: 'Dispute Filed', date: 'Feb 13', done: true },
            { step: 'Evidence Needed', date: 'Pending', done: false, current: true },
            { step: 'Under Review', date: 'Pending', done: false },
            { step: 'Resolution', date: 'Pending', done: false },
        ],
    },
]

export default function DisputesPage() {
    const [expandedId, setExpandedId] = useState(null)
    const [filter, setFilter] = useState('all')
    const [showUpload, setShowUpload] = useState(null)

    const filtered = DISPUTES.filter(d => filter === 'all' || d.status === filter)
    const openCount = DISPUTES.filter(d => d.status === 'open').length
    const pendingCount = DISPUTES.filter(d => d.status === 'pending').length

    return (
        <div className="disputes-page">
            <div className="container">
                <div className="disp-header">
                    <h1><AlertTriangle size={22} /> Dispute Resolution</h1>
                    <p>Track and resolve issues with exchanges, rentals, and meetups</p>
                </div>

                {/* Stats */}
                <div className="disp-stats">
                    <div className="disp-stat open"><span>{openCount}</span><label>Open</label></div>
                    <div className="disp-stat pending"><span>{pendingCount}</span><label>Pending</label></div>
                    <div className="disp-stat resolved"><span>{DISPUTES.filter(d => d.status === 'resolved').length}</span><label>Resolved</label></div>
                    <div className="disp-stat total"><span>{DISPUTES.length}</span><label>Total</label></div>
                </div>

                {/* Filters */}
                <div className="disp-filters">
                    {['all', 'open', 'pending', 'resolved'].map(f => (
                        <button key={f} className={`disp-filter ${filter === f ? 'active' : ''}`} onClick={() => setFilter(f)}>
                            {f.charAt(0).toUpperCase() + f.slice(1)}
                        </button>
                    ))}
                </div>

                {/* Disputes List */}
                <div className="disp-list">
                    {filtered.map(d => {
                        const isOpen = expandedId === d.id
                        return (
                            <div key={d.id} className={`disp-card ${d.status}`}>
                                <div className="disp-card-header" onClick={() => setExpandedId(isOpen ? null : d.id)}>
                                    <span className="disp-avatar">{d.avatar}</span>
                                    <div className="disp-card-info">
                                        <h3>{d.title}</h3>
                                        <span className="disp-card-meta">vs {d.against} · {d.date}</span>
                                    </div>
                                    <span className={`disp-status-badge ${d.status}`}>
                                        {d.status === 'open' ? '🔴 Open' : d.status === 'pending' ? '🟡 Pending' : '🟢 Resolved'}
                                    </span>
                                    <ChevronDown size={14} className={`disp-chevron ${isOpen ? 'rotated' : ''}`} />
                                </div>

                                {isOpen && (
                                    <div className="disp-expanded">
                                        {/* Description */}
                                        <div className="disp-desc">
                                            <h4>Description</h4>
                                            <p>{d.description}</p>
                                        </div>

                                        {/* Status Tracking */}
                                        <div className="disp-timeline">
                                            <h4>Status Tracking</h4>
                                            <div className="disp-steps">
                                                {d.timeline.map((s, i) => (
                                                    <div key={i} className={`disp-step ${s.done ? 'done' : ''} ${s.current ? 'current' : ''}`}>
                                                        <div className="disp-step-dot" />
                                                        <div>
                                                            <span className="disp-step-label">{s.step}</span>
                                                            <span className="disp-step-date">{s.date}</span>
                                                        </div>
                                                    </div>
                                                ))}
                                            </div>
                                        </div>

                                        {/* Evidence */}
                                        <div className="disp-evidence">
                                            <h4><FileText size={13} /> Evidence ({d.evidence.length})</h4>
                                            {d.evidence.length > 0 ? (
                                                <div className="disp-evidence-list">
                                                    {d.evidence.map((e, i) => (
                                                        <div key={i} className="disp-evidence-item">
                                                            <Camera size={12} /> <span>{e}</span> <Eye size={12} className="disp-ev-view" />
                                                        </div>
                                                    ))}
                                                </div>
                                            ) : (
                                                <p className="disp-no-ev">No evidence uploaded yet.</p>
                                            )}
                                            {d.status !== 'resolved' && (
                                                <button className="disp-upload-btn" onClick={() => setShowUpload(d.id)}>
                                                    <Upload size={13} /> Upload Evidence
                                                </button>
                                            )}
                                        </div>
                                    </div>
                                )}
                            </div>
                        )
                    })}
                </div>

                {filtered.length === 0 && (
                    <div className="disp-empty"><CheckCircle size={18} /> No disputes in this category.</div>
                )}

                {/* Upload Modal */}
                {showUpload && (
                    <div className="disp-modal-overlay" onClick={() => setShowUpload(null)}>
                        <div className="disp-modal" onClick={e => e.stopPropagation()}>
                            <div className="disp-modal-header">
                                <h3><Upload size={16} /> Upload Evidence</h3>
                                <button onClick={() => setShowUpload(null)}><X size={16} /></button>
                            </div>
                            <div className="disp-drop-zone">
                                <Camera size={24} />
                                <p>Drag photos, screenshots, or documents here</p>
                                <span>or click to browse files</span>
                            </div>
                            <div className="disp-upload-note">
                                <Info size={12} /> Accepted: JPG, PNG, PDF. Max 5 MB per file, up to 5 files.
                            </div>
                            <button className="btn btn-primary disp-upload-submit" onClick={() => setShowUpload(null)}>
                                <Upload size={14} /> Upload
                            </button>
                        </div>
                    </div>
                )}
            </div>
        </div>
    )
}
