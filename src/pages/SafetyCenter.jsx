import { useState } from 'react'
import {
    Shield, AlertTriangle, Ban, Phone, BookOpen, Flag,
    ChevronRight, X, Check, MessageCircle, Search,
    HelpCircle, Eye, Lock, Users, Heart, Info,
} from 'lucide-react'
import './SafetyCenter.css'

const GUIDES = [
    { id: 1, title: 'Meeting Safely for Exchanges', icon: Users, desc: 'Always meet in public, well-lit places with a friend or guardian.' },
    { id: 2, title: 'Protecting Personal Information', icon: Lock, desc: 'Never share your address, phone number, or school details.' },
    { id: 3, title: 'Recognizing Scams & Fake Items', icon: Eye, desc: 'Learn to spot too-good-to-be-true deals and suspicious users.' },
    { id: 4, title: 'Online Communication Rules', icon: MessageCircle, desc: 'Keep chats respectful. No bullying, threats, or harmful language.' },
    { id: 5, title: 'What To Do If Something Feels Wrong', icon: HelpCircle, desc: 'Trust your instincts — report, block, and tell a trusted adult.' },
]

const REPORT_REASONS = [
    'Inappropriate behavior', 'Fake or misleading listing', 'Scam or fraud attempt',
    'Harassment or bullying', 'Unsafe meetup behavior', 'Underage rule violation', 'Other',
]

export default function SafetyCenter() {
    const [showReport, setShowReport] = useState(false)
    const [showBlock, setShowBlock] = useState(false)
    const [reportReason, setReportReason] = useState('')
    const [reportUser, setReportUser] = useState('')
    const [reportSubmitted, setReportSubmitted] = useState(false)
    const [blockUser, setBlockUser] = useState('')
    const [blockSubmitted, setBlockSubmitted] = useState(false)

    const handleReport = () => { setReportSubmitted(true); setTimeout(() => { setShowReport(false); setReportSubmitted(false); setReportReason(''); setReportUser('') }, 2000) }
    const handleBlock = () => { setBlockSubmitted(true); setTimeout(() => { setShowBlock(false); setBlockSubmitted(false); setBlockUser('') }, 2000) }

    return (
        <div className="safety-center-page">
            <div className="container">
                <div className="sc-header">
                    <h1><Shield size={22} /> Safety Center</h1>
                    <p>Your safety is our #1 priority. Get help, report issues, and learn how to stay safe.</p>
                </div>

                {/* Emergency Banner */}
                <div className="sc-emergency">
                    <div className="sc-emergency-left">
                        <AlertTriangle size={20} />
                        <div>
                            <h3>In Immediate Danger?</h3>
                            <p>Call emergency services or tell a trusted adult right away.</p>
                        </div>
                    </div>
                    <div className="sc-emergency-contacts">
                        <a href="tel:112" className="sc-emer-btn"><Phone size={14} /> 112 Emergency</a>
                        <a href="tel:1098" className="sc-emer-btn childline"><Phone size={14} /> 1098 Childline</a>
                    </div>
                </div>

                {/* Quick Actions */}
                <div className="sc-actions">
                    <button className="sc-action-card report" onClick={() => setShowReport(true)}>
                        <Flag size={20} />
                        <h3>Report User</h3>
                        <p>Flag unsafe behavior or rule violations</p>
                        <ChevronRight size={14} className="sc-action-arrow" />
                    </button>
                    <button className="sc-action-card block" onClick={() => setShowBlock(true)}>
                        <Ban size={20} />
                        <h3>Block User</h3>
                        <p>Prevent someone from contacting you</p>
                        <ChevronRight size={14} className="sc-action-arrow" />
                    </button>
                </div>

                {/* Help Guides */}
                <div className="sc-section">
                    <h2><BookOpen size={16} /> Safety Guides</h2>
                    <div className="sc-guides">
                        {GUIDES.map(g => {
                            const GIcon = g.icon
                            return (
                                <div key={g.id} className="sc-guide">
                                    <div className="sc-guide-icon"><GIcon size={16} /></div>
                                    <div>
                                        <h4>{g.title}</h4>
                                        <p>{g.desc}</p>
                                    </div>
                                </div>
                            )
                        })}
                    </div>
                </div>

                {/* Emergency Info */}
                <div className="sc-section">
                    <h2><Phone size={16} /> Emergency Information</h2>
                    <div className="sc-info-grid">
                        <div className="sc-info-card"><Phone size={14} /><div><h4>Police</h4><p>100</p></div></div>
                        <div className="sc-info-card"><Phone size={14} /><div><h4>Child Helpline</h4><p>1098</p></div></div>
                        <div className="sc-info-card"><Phone size={14} /><div><h4>Women Helpline</h4><p>181</p></div></div>
                        <div className="sc-info-card"><Phone size={14} /><div><h4>Cyber Crime</h4><p>1930</p></div></div>
                    </div>
                </div>

                {/* Safety Tips */}
                <div className="sc-tips">
                    <Heart size={14} />
                    <span>Remember: Your safety always comes first. When in doubt, report and tell a trusted adult.</span>
                </div>

                {/* Report Modal */}
                {showReport && (
                    <div className="sc-modal-overlay" onClick={() => setShowReport(false)}>
                        <div className="sc-modal" onClick={e => e.stopPropagation()}>
                            {!reportSubmitted ? (
                                <>
                                    <div className="sc-modal-header">
                                        <h3><Flag size={16} /> Report User</h3>
                                        <button className="sc-modal-close" onClick={() => setShowReport(false)}><X size={16} /></button>
                                    </div>
                                    <div className="sc-modal-body">
                                        <label>Username</label>
                                        <input type="text" placeholder="Enter username to report" value={reportUser} onChange={e => setReportUser(e.target.value)} className="sc-input" />
                                        <label>Reason</label>
                                        <div className="sc-reason-grid">
                                            {REPORT_REASONS.map(r => (
                                                <button key={r} className={`sc-reason-btn ${reportReason === r ? 'active' : ''}`} onClick={() => setReportReason(r)}>{r}</button>
                                            ))}
                                        </div>
                                    </div>
                                    <button className="btn btn-primary sc-modal-submit" disabled={!reportUser || !reportReason} onClick={handleReport}>
                                        <Flag size={14} /> Submit Report
                                    </button>
                                </>
                            ) : (
                                <div className="sc-modal-done"><Check size={24} /><p>Report submitted. Our team will review within 24 hours.</p></div>
                            )}
                        </div>
                    </div>
                )}

                {/* Block Modal */}
                {showBlock && (
                    <div className="sc-modal-overlay" onClick={() => setShowBlock(false)}>
                        <div className="sc-modal" onClick={e => e.stopPropagation()}>
                            {!blockSubmitted ? (
                                <>
                                    <div className="sc-modal-header">
                                        <h3><Ban size={16} /> Block User</h3>
                                        <button className="sc-modal-close" onClick={() => setShowBlock(false)}><X size={16} /></button>
                                    </div>
                                    <div className="sc-modal-body">
                                        <label>Username</label>
                                        <input type="text" placeholder="Enter username to block" value={blockUser} onChange={e => setBlockUser(e.target.value)} className="sc-input" />
                                        <div className="sc-block-info">
                                            <Info size={12} /> They won't be able to message you, see your listings, or interact with your items.
                                        </div>
                                    </div>
                                    <button className="btn btn-primary sc-modal-submit" disabled={!blockUser} onClick={handleBlock} style={{ background: 'var(--danger)' }}>
                                        <Ban size={14} /> Block User
                                    </button>
                                </>
                            ) : (
                                <div className="sc-modal-done"><Check size={24} /><p>User blocked successfully.</p></div>
                            )}
                        </div>
                    </div>
                )}
            </div>
        </div>
    )
}
