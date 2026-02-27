import { useState } from 'react'
import {
    Flag, Upload, Eye, Check, X, Clock, AlertTriangle,
    ChevronDown, Shield, FileText, Camera, Ban, Star,
} from 'lucide-react'
import './AdminDisputes.css'

const DISPUTES_DATA = [
    {
        id: 1, title: 'Item Not as Described — Board Game', reporter: 'Arjun_Fox', reported: 'GamerPro',
        status: 'open', priority: 'high', date: 'Feb 17',
        description: 'Board game set missing 3 pieces, box damaged. Listing showed complete set.',
        evidence: ['photo_damage.jpg', 'chat_screenshot.png', 'listing_original.jpg'],
        timeline: [
            { step: 'Filed', date: 'Feb 15', done: true },
            { step: 'Evidence', date: 'Feb 16', done: true },
            { step: 'Review', date: 'Feb 17', done: false, current: true },
            { step: 'Decision', date: 'Pending', done: false },
        ],
    },
    {
        id: 2, title: 'Missed Meetup — No Show', reporter: 'BookWorm42', reported: 'SkaterBoy',
        status: 'pending', priority: 'medium', date: 'Feb 16',
        description: 'User agreed to meet at park but never showed up without prior notice.',
        evidence: ['chat_messages.png'],
        timeline: [
            { step: 'Filed', date: 'Feb 13', done: true },
            { step: 'Evidence', date: 'Pending', done: false, current: true },
            { step: 'Review', date: 'Pending', done: false },
            { step: 'Decision', date: 'Pending', done: false },
        ],
    },
    {
        id: 3, title: 'Harassment in Chat', reporter: 'ArtLover', reported: 'RudeTrader',
        status: 'open', priority: 'high', date: 'Feb 15',
        description: 'Repeated offensive and threatening messages in private chat.',
        evidence: ['chat_log_1.png', 'chat_log_2.png'],
        timeline: [
            { step: 'Filed', date: 'Feb 14', done: true },
            { step: 'Evidence', date: 'Feb 15', done: true },
            { step: 'Review', date: 'Feb 16', done: false, current: true },
            { step: 'Decision', date: 'Pending', done: false },
        ],
    },
]

const PENALTIES = ['Warning', 'Restrict Chat (7 days)', 'Suspend (14 days)', 'Permanent Ban', 'Trust Score Reduction (-20)']

export default function AdminDisputes() {
    const [disputes, setDisputes] = useState(DISPUTES_DATA)
    const [expanded, setExpanded] = useState(null)
    const [decision, setDecision] = useState({})
    const [penalty, setPenalty] = useState({})

    const resolve = (id) => setDisputes(ds => ds.map(d => d.id === id ? { ...d, status: 'resolved' } : d))

    return (
        <div className="adsp-page">
            <div className="container">
                <div className="adsp-header">
                    <h1><Flag size={22} /> Dispute Handling</h1>
                    <p>Review evidence, make decisions, and apply penalties</p>
                </div>

                <div className="adsp-list">
                    {disputes.map(d => {
                        const isOpen = expanded === d.id
                        return (
                            <div key={d.id} className={`adsp-card ${d.status} ${d.priority}-prio`}>
                                <div className="adsp-card-hdr" onClick={() => setExpanded(isOpen ? null : d.id)}>
                                    <div className="adsp-card-left">
                                        <h4>{d.title}</h4>
                                        <span className="adsp-parties">{d.reporter} → {d.reported}</span>
                                    </div>
                                    <span className={`adsp-status ${d.status}`}>
                                        {d.status === 'open' ? '🔴 Open' : d.status === 'pending' ? '🟡 Pending' : '🟢 Resolved'}
                                    </span>
                                    <span className={`adsp-prio ${d.priority}`}>{d.priority}</span>
                                    <ChevronDown size={14} className={`adsp-chev ${isOpen ? 'rot' : ''}`} />
                                </div>

                                {isOpen && (
                                    <div className="adsp-body">
                                        <div className="adsp-desc"><h5>Description</h5><p>{d.description}</p></div>

                                        {/* Evidence */}
                                        <div className="adsp-evidence">
                                            <h5><FileText size={12} /> Evidence ({d.evidence.length})</h5>
                                            <div className="adsp-ev-list">
                                                {d.evidence.map((e, i) => (
                                                    <div key={i} className="adsp-ev-item"><Camera size={11} /> {e} <Eye size={11} className="adsp-ev-view" /></div>
                                                ))}
                                            </div>
                                        </div>

                                        {/* Timeline */}
                                        <div className="adsp-timeline">
                                            <h5>Progress</h5>
                                            <div className="adsp-steps">
                                                {d.timeline.map((s, i) => (
                                                    <div key={i} className={`adsp-step ${s.done ? 'done' : ''} ${s.current ? 'current' : ''}`}>
                                                        <div className="adsp-step-dot" />
                                                        <span>{s.step}</span>
                                                        <span className="adsp-step-date">{s.date}</span>
                                                    </div>
                                                ))}
                                            </div>
                                        </div>

                                        {/* Decision Tools */}
                                        {d.status !== 'resolved' && (
                                            <div className="adsp-decision">
                                                <h5><Shield size={12} /> Decision</h5>
                                                <textarea placeholder="Your decision notes..." value={decision[d.id] || ''} onChange={e => setDecision(o => ({ ...o, [d.id]: e.target.value }))} className="adsp-textarea" rows={2} />
                                                <div className="adsp-penalty-select">
                                                    <span>Penalty:</span>
                                                    <div className="adsp-penalty-btns">
                                                        {PENALTIES.map(p => (
                                                            <button key={p} className={`adsp-pen-btn ${penalty[d.id] === p ? 'active' : ''}`} onClick={() => setPenalty(o => ({ ...o, [d.id]: p }))}>{p}</button>
                                                        ))}
                                                    </div>
                                                </div>
                                                <button className="btn btn-primary adsp-resolve-btn" disabled={!decision[d.id] || !penalty[d.id]} onClick={() => resolve(d.id)}>
                                                    <Check size={14} /> Resolve Dispute
                                                </button>
                                            </div>
                                        )}
                                    </div>
                                )}
                            </div>
                        )
                    })}
                </div>
            </div>
        </div>
    )
}
