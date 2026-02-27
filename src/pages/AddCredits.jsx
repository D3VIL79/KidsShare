import { useState, useContext } from 'react'
import { AgeContext } from '../contexts'
import {
    Plus, Minus, Wallet, Shield, AlertTriangle, Lock,
    Check, ChevronRight, Smartphone, CreditCard, Building2,
    ArrowUpRight, ArrowDownLeft, Info, CheckCircle,
} from 'lucide-react'
import './AddCredits.css'

const SPENDING_LIMITS = {
    'kids': { daily: 100, weekly: 300, monthly: 500, label: 'Kids', range: '7-12', color: '#e17055' },
    'teens': { daily: 300, weekly: 1000, monthly: 3000, label: 'Teens', range: '13-17', color: '#FDCB6E' },
    'young-adults': { daily: 2000, weekly: 8000, monthly: 25000, label: 'Adults', range: '18-25', color: '#00b894' },
}

const METHODS = [
    { id: 'upi', label: 'UPI', desc: 'Google Pay, PhonePe, BHIM', icon: Smartphone, color: '#6C5CE7' },
    { id: 'wallet', label: 'KidShare Wallet', desc: 'Use existing credits', icon: Wallet, color: '#00b894' },
    { id: 'card', label: 'Debit Card', desc: 'Secured payment', icon: CreditCard, color: '#00CEC9' },
]

const PRESETS = [50, 100, 200, 500, 1000]

export default function AddCredits() {
    const { ageGroup } = useContext(AgeContext)
    const [mode, setMode] = useState('add') // 'add' | 'withdraw'
    const [amount, setAmount] = useState('')
    const [method, setMethod] = useState('upi')
    const [guardianApproved, setGuardianApproved] = useState(false)
    const [submitted, setSubmitted] = useState(false)

    const userAge = ageGroup || 'teens'
    const limits = SPENDING_LIMITS[userAge]
    const isMinor = userAge !== 'young-adults'
    const amtNum = parseInt(amount) || 0
    const overLimit = amtNum > limits.monthly
    const canSubmit = amtNum > 0 && !overLimit && method && (!isMinor || guardianApproved)

    const handleSubmit = () => {
        setSubmitted(true)
        setTimeout(() => { setSubmitted(false); setAmount(''); setGuardianApproved(false) }, 2500)
    }

    if (submitted) {
        return (
            <div className="addcr-page">
                <div className="container">
                    <div className="addcr-success">
                        <CheckCircle size={48} className="addcr-success-icon" />
                        <h2>{mode === 'add' ? 'Credits Added!' : 'Withdrawal Requested!'} 🎉</h2>
                        <p>₹{amtNum} {mode === 'add' ? 'has been added to your wallet.' : 'withdrawal is being processed.'}</p>
                        {isMinor && <p className="addcr-success-sub">Guardian has been notified.</p>}
                    </div>
                </div>
            </div>
        )
    }

    return (
        <div className="addcr-page">
            <div className="container">
                <div className="addcr-header">
                    <h1><Wallet size={22} /> {mode === 'add' ? 'Add Credits' : 'Withdraw Credits'}</h1>
                    <p>Manage your KidShare wallet balance</p>
                </div>

                {/* Mode Toggle */}
                <div className="addcr-toggle">
                    <button className={`addcr-tog-btn ${mode === 'add' ? 'active' : ''}`} onClick={() => setMode('add')}>
                        <Plus size={14} /> Add Credits
                    </button>
                    <button className={`addcr-tog-btn ${mode === 'withdraw' ? 'active' : ''}`} onClick={() => setMode('withdraw')}>
                        <Minus size={14} /> Withdraw
                    </button>
                </div>

                <div className="addcr-layout">
                    <div className="addcr-main">
                        {/* Amount */}
                        <div className="addcr-section">
                            <h3>Amount (₹)</h3>
                            <input
                                type="number" className="addcr-input" placeholder="Enter amount"
                                value={amount} onChange={e => setAmount(e.target.value)} min={0}
                            />
                            <div className="addcr-presets">
                                {PRESETS.filter(p => p <= limits.monthly).map(p => (
                                    <button key={p} className={`addcr-preset ${parseInt(amount) === p ? 'active' : ''}`} onClick={() => setAmount(String(p))}>
                                        ₹{p}
                                    </button>
                                ))}
                            </div>
                            {overLimit && (
                                <div className="addcr-over-limit">
                                    <AlertTriangle size={12} /> Amount exceeds your monthly limit of ₹{limits.monthly}
                                </div>
                            )}
                        </div>

                        {/* Payment Method */}
                        <div className="addcr-section">
                            <h3>{mode === 'add' ? 'Payment Method' : 'Withdraw To'}</h3>
                            <div className="addcr-methods">
                                {METHODS.map(m => {
                                    const MIcon = m.icon
                                    return (
                                        <button key={m.id} className={`addcr-method ${method === m.id ? 'active' : ''}`} onClick={() => setMethod(m.id)} style={{ '--m-color': m.color }}>
                                            <div className="addcr-m-icon" style={{ background: `${m.color}12`, color: m.color }}>
                                                <MIcon size={18} />
                                            </div>
                                            <div>
                                                <h4>{m.label}</h4>
                                                <p>{m.desc}</p>
                                            </div>
                                            {method === m.id && <Check size={14} className="addcr-m-check" />}
                                        </button>
                                    )
                                })}
                            </div>
                        </div>

                        {/* Guardian Approval */}
                        {isMinor && (
                            <div className="addcr-guardian">
                                <Shield size={16} />
                                <div className="addcr-g-body">
                                    <h4>Guardian Approval Required</h4>
                                    <p>As a {userAge} user, your guardian must approve this transaction.</p>
                                    <label className="addcr-g-check">
                                        <input type="checkbox" checked={guardianApproved} onChange={e => setGuardianApproved(e.target.checked)} />
                                        <span>I confirm my guardian approves this {mode === 'add' ? 'top-up' : 'withdrawal'}</span>
                                    </label>
                                </div>
                            </div>
                        )}

                        {/* Submit */}
                        <button className="btn btn-primary btn-lg addcr-submit" disabled={!canSubmit} onClick={handleSubmit} style={{ opacity: canSubmit ? 1 : 0.5 }}>
                            {mode === 'add' ? <Plus size={16} /> : <Minus size={16} />}
                            {mode === 'add' ? `Add ₹${amtNum || 0} Credits` : `Withdraw ₹${amtNum || 0}`}
                        </button>
                    </div>

                    {/* Sidebar — Limits */}
                    <div className="addcr-sidebar">
                        <div className="addcr-section">
                            <h3><Lock size={14} /> Your Limits</h3>
                            <div className="addcr-age-badge" style={{ background: `${limits.color}12`, color: limits.color }}>
                                {limits.label} ({limits.range})
                            </div>
                            <div className="addcr-limits">
                                <div className="addcr-lim">
                                    <span>Daily</span><strong>₹{limits.daily}</strong>
                                </div>
                                <div className="addcr-lim">
                                    <span>Weekly</span><strong>₹{limits.weekly}</strong>
                                </div>
                                <div className="addcr-lim">
                                    <span>Monthly</span><strong>₹{limits.monthly}</strong>
                                </div>
                            </div>
                            {isMinor && (
                                <div className="addcr-lim-note">
                                    <Info size={11} /> Guardian can adjust these limits from their dashboard.
                                </div>
                            )}
                        </div>

                        <div className="addcr-section">
                            <h3><Shield size={14} /> Security</h3>
                            <div className="addcr-security-list">
                                <div><Check size={12} /> All payments encrypted</div>
                                <div><Check size={12} /> No card data stored</div>
                                <div><Check size={12} /> Instant refund guarantee</div>
                                <div><Check size={12} /> {isMinor ? 'Guardian notified on every transaction' : 'Transaction receipts via email'}</div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
