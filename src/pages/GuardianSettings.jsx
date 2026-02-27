import { useState } from 'react'
import {
    Settings, Bell, Phone, Link2, Shield, Check,
    Mail, Clock, AlertTriangle, Smartphone, User,
    ToggleLeft, ToggleRight, Info, Save,
} from 'lucide-react'
import './GuardianSettings.css'

const NOTIF_PREFS = [
    { id: 'risk', label: 'Risk Alerts', desc: 'Critical safety warnings', default: true, critical: true },
    { id: 'approvals', label: 'Approval Requests', desc: 'New pending approvals', default: true },
    { id: 'activity', label: 'Activity Summary', desc: 'Daily digest of child activity', default: true },
    { id: 'chat', label: 'Chat Activity', desc: 'When child sends/receives messages', default: false },
    { id: 'wallet', label: 'Wallet Transactions', desc: 'Credit additions or spending', default: true },
    { id: 'turf', label: 'Turf Bookings', desc: 'When child books a turf slot', default: false },
]

export default function GuardianSettings() {
    const [notifs, setNotifs] = useState(() => {
        const init = {}
        NOTIF_PREFS.forEach(n => init[n.id] = n.default)
        return init
    })
    const [emergency, setEmergency] = useState({ name: 'Mrs. Sharma', phone: '+91 98765 43210', relation: 'Mother' })
    const [linkedChildren] = useState([
        { id: 1, name: 'Arjun', avatar: '🦊', email: 'arjun@kidshare.com', linked: true },
        { id: 2, name: 'Priya', avatar: '🦋', email: 'priya@kidshare.com', linked: true },
    ])
    const [linkCode, setLinkCode] = useState('')
    const [saved, setSaved] = useState(false)

    const toggleNotif = (id) => {
        const n = NOTIF_PREFS.find(p => p.id === id)
        if (n?.critical) return
        setNotifs(p => ({ ...p, [id]: !p[id] }))
    }

    const handleSave = () => { setSaved(true); setTimeout(() => setSaved(false), 2000) }

    return (
        <div className="gset-page">
            <div className="container">
                <div className="gs-header">
                    <h1><Settings size={22} /> Guardian Settings</h1>
                    <p>Manage notifications, emergency contacts, and linked accounts</p>
                </div>

                <div className="gs-layout">
                    <div className="gs-main">
                        {/* Notification Prefs */}
                        <div className="gs-section">
                            <h2><Bell size={16} /> Notification Preferences</h2>
                            <div className="gs-notif-list">
                                {NOTIF_PREFS.map(n => (
                                    <div key={n.id} className={`gs-notif-row ${n.critical ? 'critical' : ''}`}>
                                        <div>
                                            <h4>{n.label} {n.critical && <span className="gs-critical-tag">Always On</span>}</h4>
                                            <p>{n.desc}</p>
                                        </div>
                                        <button className="gs-tog" onClick={() => toggleNotif(n.id)} disabled={n.critical}>
                                            {notifs[n.id] ? <ToggleRight size={26} color="var(--primary)" /> : <ToggleLeft size={26} />}
                                        </button>
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* Emergency Contact */}
                        <div className="gs-section">
                            <h2><Phone size={16} /> Emergency Contact</h2>
                            <div className="gs-form">
                                <label>Full Name</label>
                                <input value={emergency.name} onChange={e => setEmergency(p => ({ ...p, name: e.target.value }))} className="gs-input" />
                                <label>Phone Number</label>
                                <input value={emergency.phone} onChange={e => setEmergency(p => ({ ...p, phone: e.target.value }))} className="gs-input" />
                                <label>Relation</label>
                                <div className="gs-relation-btns">
                                    {['Mother', 'Father', 'Guardian', 'Other'].map(r => (
                                        <button key={r} className={`gs-rel-btn ${emergency.relation === r ? 'active' : ''}`} onClick={() => setEmergency(p => ({ ...p, relation: r }))}>{r}</button>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="gs-sidebar">
                        {/* Account Linking */}
                        <div className="gs-section">
                            <h2><Link2 size={16} /> Linked Children</h2>
                            <div className="gs-linked-list">
                                {linkedChildren.map(c => (
                                    <div key={c.id} className="gs-linked-card">
                                        <span className="gs-linked-avatar">{c.avatar}</span>
                                        <div>
                                            <h4>{c.name}</h4>
                                            <p>{c.email}</p>
                                        </div>
                                        <span className="gs-linked-status"><Check size={12} /> Linked</span>
                                    </div>
                                ))}
                            </div>
                            <div className="gs-link-new">
                                <h4>Link New Account</h4>
                                <div className="gs-link-input-row">
                                    <input placeholder="Enter child's link code" value={linkCode} onChange={e => setLinkCode(e.target.value)} className="gs-input" />
                                    <button className="gs-link-btn" disabled={!linkCode}><Link2 size={13} /> Link</button>
                                </div>
                                <span className="gs-link-hint"><Info size={10} /> Your child can find their link code in Settings → Account.</span>
                            </div>
                        </div>

                        {/* Security */}
                        <div className="gs-section">
                            <h2><Shield size={16} /> Security</h2>
                            <div className="gs-security-list">
                                <div><Check size={12} /> Two-factor authentication enabled</div>
                                <div><Check size={12} /> Email verified</div>
                                <div><Check size={12} /> Phone number verified</div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Save */}
                <button className="btn btn-primary gs-save" onClick={handleSave}>
                    {saved ? <><Check size={14} /> Saved!</> : <><Save size={14} /> Save Settings</>}
                </button>
            </div>
        </div>
    )
}
