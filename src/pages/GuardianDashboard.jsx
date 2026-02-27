import { useState } from 'react'
import { Link } from 'react-router-dom'
import {
    Shield, Check, X, Clock, AlertTriangle, Eye, User, Bell,
    Activity, MessageCircle, ShoppingBag, MapPin, Wallet,
    ToggleLeft, ToggleRight, ChevronDown, ChevronUp, Lock,
    CheckCircle, FileText, Fingerprint, Heart, AlertCircle,
    Timer, Sliders, Users,
} from 'lucide-react'
import './GuardianDashboard.css'

/* ===== What child can do checklist ===== */
const CHILD_CAN_DO = [
    { icon: '📚', text: 'Share items for free with the community' },
    { icon: '🔄', text: 'Exchange items with matched peers' },
    { icon: '👀', text: 'Browse & discover items from others' },
    { icon: '⭐', text: 'Build trust score & earn badges' },
    { icon: '📝', text: 'Create listings (reviewed by moderators)' },
]

const CHILD_CANNOT = [
    { icon: '🚫', text: 'Access public chat without your approval' },
    { icon: '🔒', text: 'Make purchases without wallet limits you set' },
    { icon: '📍', text: 'Share location or personal details publicly' },
    { icon: '📞', text: 'Exchange phone numbers or social media' },
]

/* ===== Permission controls ===== */
const PERMISSIONS = [
    {
        id: 'chat',
        icon: MessageCircle,
        title: 'Messaging / Chat Access',
        desc: 'Allow filtered, time-limited messaging with matched peers',
        color: '#6C5CE7',
        default: false,
    },
    {
        id: 'rentals',
        icon: ShoppingBag,
        title: 'Rentals & Purchases',
        desc: 'Allow renting or buying items using wallet credits',
        color: '#00CEC9',
        default: false,
    },
    {
        id: 'turf',
        icon: MapPin,
        title: 'Turf / Playground Sharing',
        desc: 'Allow booking shared sports facilities and turfs',
        color: '#FD79A8',
        default: true,
    },
    {
        id: 'exchange',
        icon: Heart,
        title: 'Item Exchanges',
        desc: 'Allow exchanging items with matched community peers',
        color: '#FDCB6E',
        default: true,
    },
]

export default function GuardianDashboard() {
    const [permissions, setPermissions] = useState(
        Object.fromEntries(PERMISSIONS.map((p) => [p.id, p.default]))
    )
    const [walletLimit, setWalletLimit] = useState(200)
    const [dailyHours, setDailyHours] = useState(2)
    const [consentChecked, setConsentChecked] = useState(false)
    const [consentSubmitted, setConsentSubmitted] = useState(false)
    const [expandActivity, setExpandActivity] = useState(false)

    const togglePermission = (id) => {
        setPermissions((prev) => ({ ...prev, [id]: !prev[id] }))
    }

    const ACTIVITY_LOG = [
        { text: 'Alex listed "Puzzle Set" for exchange', time: 'Yesterday', safe: true },
        { text: 'Alex sent a message to Sam M.', time: 'Yesterday', safe: true },
        { text: 'Alex browsed 12 items in Games category', time: '2 days ago', safe: true },
        { text: 'Content filter triggered on a message (auto-blocked)', time: '3 days ago', safe: false },
        { text: 'Alex booked Turf slot — 5 PM Saturday', time: '4 days ago', safe: true },
    ]

    const PENDING = [
        { id: 1, child: 'Alex', action: 'wants to share "Harry Potter Set"', time: '10 min ago', emoji: '📚' },
        { id: 2, child: 'Alex', action: 'requested to book Turf at 5 PM', time: '1 hour ago', emoji: '⚽' },
        { id: 3, child: 'Alex', action: 'wants to exchange "Chess Set"', time: '3 hours ago', emoji: '♟️' },
    ]

    if (consentSubmitted) {
        return (
            <div className="container guardian-page">
                <div className="guardian-success">
                    <div className="guardian-success-icon">
                        <CheckCircle size={56} />
                    </div>
                    <h2>Consent Confirmed!</h2>
                    <p>
                        Your child's account is now active with the permissions and limits you set.
                        You can change these anytime from this dashboard.
                    </p>
                    <div className="guardian-success-summary">
                        <h4>Permissions Summary</h4>
                        {PERMISSIONS.map((p) => (
                            <div key={p.id} className="summary-row">
                                <span>{p.title}</span>
                                <span className={permissions[p.id] ? 'allowed' : 'denied'}>
                                    {permissions[p.id] ? '✓ Allowed' : '✕ Denied'}
                                </span>
                            </div>
                        ))}
                        <div className="summary-row">
                            <span>Daily Screen Time</span>
                            <span className="allowed">{dailyHours}h / day</span>
                        </div>
                        <div className="summary-row">
                            <span>Wallet Limit</span>
                            <span className="allowed">₹{walletLimit} / month</span>
                        </div>
                    </div>
                    <Link to="/home" className="btn btn-primary btn-lg" style={{ marginTop: 'var(--space-6)' }}>
                        Go to Dashboard
                    </Link>
                </div>
            </div>
        )
    }

    return (
        <div className="container guardian-page">
            {/* Header */}
            <div className="guardian-header">
                <div className="guardian-header-icon">
                    <Shield size={26} />
                </div>
                <div>
                    <h1>Guardian Consent & Controls</h1>
                    <p>Review what your child can do and set permissions</p>
                </div>
            </div>

            {/* ===== Section 1: What Your Child Can Do ===== */}
            <section className="guardian-section">
                <h2 className="guardian-section-title">
                    <CheckCircle size={18} />
                    What Your Child Can Do
                </h2>
                <div className="checklist-grid">
                    <div className="checklist-card allowed-card">
                        <h3 className="checklist-heading allowed">✓ Allowed by Default</h3>
                        {CHILD_CAN_DO.map((item, i) => (
                            <div key={i} className="checklist-item">
                                <span className="checklist-emoji">{item.icon}</span>
                                <span>{item.text}</span>
                            </div>
                        ))}
                    </div>
                    <div className="checklist-card blocked-card">
                        <h3 className="checklist-heading blocked">✕ Blocked Until You Approve</h3>
                        {CHILD_CANNOT.map((item, i) => (
                            <div key={i} className="checklist-item">
                                <span className="checklist-emoji">{item.icon}</span>
                                <span>{item.text}</span>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* ===== Section 2: Approve / Deny Permissions ===== */}
            <section className="guardian-section">
                <h2 className="guardian-section-title">
                    <Sliders size={18} />
                    Approve / Deny Permissions
                </h2>
                <p className="guardian-section-desc">
                    Toggle each permission on or off. You can change these anytime.
                </p>
                <div className="permissions-list">
                    {PERMISSIONS.map((perm) => (
                        <div key={perm.id} className={`permission-card ${permissions[perm.id] ? 'enabled' : 'disabled'}`}>
                            <div className="permission-left">
                                <div className="permission-icon" style={{ background: `${perm.color}15`, color: perm.color }}>
                                    <perm.icon size={20} />
                                </div>
                                <div className="permission-info">
                                    <h4>{perm.title}</h4>
                                    <p>{perm.desc}</p>
                                </div>
                            </div>
                            <button
                                className={`permission-toggle ${permissions[perm.id] ? 'on' : 'off'}`}
                                onClick={() => togglePermission(perm.id)}
                                aria-label={`Toggle ${perm.title}`}
                            >
                                <div className="toggle-track">
                                    <div className="toggle-thumb" />
                                </div>
                                <span className="toggle-label">
                                    {permissions[perm.id] ? 'Allowed' : 'Denied'}
                                </span>
                            </button>
                        </div>
                    ))}
                </div>
            </section>

            {/* ===== Section 3: Set Limits ===== */}
            <section className="guardian-section">
                <h2 className="guardian-section-title">
                    <Timer size={18} />
                    Set Limits
                </h2>

                {/* Wallet Limit */}
                <div className="limit-card">
                    <div className="limit-header">
                        <div className="limit-icon" style={{ background: 'rgba(0,206,201,0.1)', color: 'var(--secondary)' }}>
                            <Wallet size={20} />
                        </div>
                        <div>
                            <h4>Monthly Wallet Limit</h4>
                            <p>Maximum credits your child can spend per month</p>
                        </div>
                    </div>
                    <div className="limit-slider-wrap">
                        <input
                            type="range"
                            min="0"
                            max="1000"
                            step="50"
                            value={walletLimit}
                            onChange={(e) => setWalletLimit(Number(e.target.value))}
                            className="limit-slider"
                        />
                        <div className="limit-value">
                            <span className="limit-amount">₹{walletLimit}</span>
                            <span className="limit-period">/ month</span>
                        </div>
                    </div>
                    <div className="limit-markers">
                        <span>₹0</span>
                        <span>₹250</span>
                        <span>₹500</span>
                        <span>₹750</span>
                        <span>₹1000</span>
                    </div>
                </div>

                {/* Daily Hours */}
                <div className="limit-card">
                    <div className="limit-header">
                        <div className="limit-icon" style={{ background: 'rgba(108,92,231,0.1)', color: 'var(--primary)' }}>
                            <Clock size={20} />
                        </div>
                        <div>
                            <h4>Daily Screen Time</h4>
                            <p>Maximum hours your child can use the platform daily</p>
                        </div>
                    </div>
                    <div className="limit-slider-wrap">
                        <input
                            type="range"
                            min="0.5"
                            max="8"
                            step="0.5"
                            value={dailyHours}
                            onChange={(e) => setDailyHours(Number(e.target.value))}
                            className="limit-slider"
                        />
                        <div className="limit-value">
                            <span className="limit-amount">{dailyHours}h</span>
                            <span className="limit-period">/ day</span>
                        </div>
                    </div>
                    <div className="limit-markers">
                        <span>30m</span>
                        <span>2h</span>
                        <span>4h</span>
                        <span>6h</span>
                        <span>8h</span>
                    </div>
                </div>
            </section>

            {/* ===== Section 4: Pending Approvals ===== */}
            <section className="guardian-section">
                <h2 className="guardian-section-title">
                    <Bell size={18} />
                    Pending Approvals
                    {PENDING.length > 0 && <span className="pending-count">{PENDING.length}</span>}
                </h2>
                <div className="pending-list">
                    {PENDING.map((p) => (
                        <div key={p.id} className="pending-card">
                            <div className="pending-left">
                                <span className="pending-emoji">{p.emoji}</span>
                                <div>
                                    <div className="pending-text">
                                        <strong>{p.child}</strong> {p.action}
                                    </div>
                                    <span className="pending-time">{p.time}</span>
                                </div>
                            </div>
                            <div className="pending-actions">
                                <button className="pending-btn approve">
                                    <Check size={14} /> Approve
                                </button>
                                <button className="pending-btn deny">
                                    <X size={14} /> Deny
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
            </section>

            {/* ===== Section 5: Activity Log ===== */}
            <section className="guardian-section">
                <button className="guardian-section-title clickable" onClick={() => setExpandActivity(!expandActivity)}>
                    <Eye size={18} />
                    Recent Activity
                    {expandActivity ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
                </button>
                {expandActivity && (
                    <div className="activity-log">
                        {ACTIVITY_LOG.map((a, i) => (
                            <div key={i} className={`activity-row ${a.safe ? '' : 'flagged'}`}>
                                <div className={`activity-dot ${a.safe ? 'safe' : 'warn'}`} />
                                {!a.safe && <AlertTriangle size={13} className="activity-warn-icon" />}
                                <span className="activity-text">{a.text}</span>
                                <span className="activity-time">{a.time}</span>
                            </div>
                        ))}
                    </div>
                )}
            </section>

            {/* ===== Section 6: Digital Consent ===== */}
            <section className="guardian-section consent-section">
                <div className="consent-card">
                    <div className="consent-icon-wrap">
                        <Fingerprint size={28} />
                    </div>
                    <h2>Digital Consent Confirmation</h2>
                    <p>
                        By giving consent, you confirm that you are the parent or legal guardian of this
                        child and authorize them to use KidShare Hub under the permissions and limits
                        you have configured above.
                    </p>

                    <div className="consent-checklist">
                        <label className="consent-checkbox-label" onClick={() => setConsentChecked(!consentChecked)}>
                            <div className={`consent-checkbox ${consentChecked ? 'checked' : ''}`}>
                                {consentChecked && <Check size={14} />}
                            </div>
                            <span>
                                I confirm I am the parent/legal guardian and I agree to the{' '}
                                <a href="#" onClick={(e) => e.stopPropagation()}>Terms of Service</a>,{' '}
                                <a href="#" onClick={(e) => e.stopPropagation()}>Privacy Policy</a>, and{' '}
                                <a href="#" onClick={(e) => e.stopPropagation()}>Child Safety Policy</a>.
                            </span>
                        </label>
                    </div>

                    <button
                        className="btn btn-primary btn-lg consent-submit"
                        disabled={!consentChecked}
                        onClick={() => setConsentSubmitted(true)}
                        style={{ opacity: consentChecked ? 1 : 0.5 }}
                    >
                        <Shield size={18} /> Confirm Consent & Activate Account
                    </button>

                    <div className="consent-note">
                        <Lock size={13} />
                        <span>You can modify permissions anytime. All activity is logged and reviewable.</span>
                    </div>
                </div>
            </section>
        </div>
    )
}
