import { useState } from 'react'
import {
    Settings, Shield, CreditCard, ToggleLeft, ToggleRight,
    Check, Save, Info, Users, AlertTriangle, Lock,
} from 'lucide-react'
import './AdminSettings.css'

const AGE_RULES = [
    { group: '7-12', canSell: false, canRent: false, canChat: true, canTurf: false, maxWallet: 500 },
    { group: '13-17', canSell: false, canRent: true, canChat: true, canTurf: true, maxWallet: 3000 },
    { group: '18-25', canSell: true, canRent: true, canChat: true, canTurf: true, maxWallet: 25000 },
]

const FEATURE_TOGGLES = [
    { id: 'ai_moderation', label: 'AI Content Moderation', desc: 'Auto-flag listings & messages', default: true },
    { id: 'exchange_suggestions', label: 'Exchange Suggestions', desc: 'AI-powered swap recommendations', default: true },
    { id: 'turf_booking', label: 'Turf Booking', desc: 'Allow sports facility booking', default: true },
    { id: 'sell_feature', label: 'Sell Feature (18+)', desc: 'Allow selling items for credits', default: true },
    { id: 'wallet', label: 'Wallet System', desc: 'Credit-based transactions', default: true },
    { id: 'guardian_mode', label: 'Guardian Mode', desc: 'Parental monitoring & controls', default: true },
]

const FEE_SETTINGS = [
    { id: 'listing_fee', label: 'Listing Fee', value: 0, unit: '₹' },
    { id: 'exchange_fee', label: 'Exchange Commission', value: 5, unit: '%' },
    { id: 'rental_fee', label: 'Rental Commission', value: 10, unit: '%' },
    { id: 'sell_fee', label: 'Sale Commission', value: 8, unit: '%' },
]

export default function AdminSettings() {
    const [features, setFeatures] = useState(() => {
        const init = {}
        FEATURE_TOGGLES.forEach(f => init[f.id] = f.default)
        return init
    })
    const [fees, setFees] = useState(() => {
        const init = {}
        FEE_SETTINGS.forEach(f => init[f.id] = f.value)
        return init
    })
    const [saved, setSaved] = useState(false)

    const toggleFeature = (id) => setFeatures(f => ({ ...f, [id]: !f[id] }))
    const handleSave = () => { setSaved(true); setTimeout(() => setSaved(false), 2000) }

    return (
        <div className="aset-page">
            <div className="container">
                <div className="as-header">
                    <h1><Settings size={22} /> System Settings</h1>
                    <p>Configure age rules, fees, and platform features</p>
                </div>

                <div className="as-layout">
                    <div className="as-main">
                        {/* Age Rules */}
                        <div className="as-section">
                            <h2><Users size={16} /> Age Rules</h2>
                            <div className="as-age-table">
                                <div className="as-age-head">
                                    <span>Group</span><span>Sell</span><span>Rent</span><span>Chat</span><span>Turf</span><span>Max Wallet</span>
                                </div>
                                {AGE_RULES.map(r => (
                                    <div key={r.group} className="as-age-row">
                                        <span className="as-age-group">{r.group}</span>
                                        <span className={r.canSell ? 'as-yes' : 'as-no'}>{r.canSell ? '✓' : '✗'}</span>
                                        <span className={r.canRent ? 'as-yes' : 'as-no'}>{r.canRent ? '✓' : '✗'}</span>
                                        <span className={r.canChat ? 'as-yes' : 'as-no'}>{r.canChat ? '✓' : '✗'}</span>
                                        <span className={r.canTurf ? 'as-yes' : 'as-no'}>{r.canTurf ? '✓' : '✗'}</span>
                                        <span>₹{r.maxWallet.toLocaleString()}</span>
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* Fees */}
                        <div className="as-section">
                            <h2><CreditCard size={16} /> Fee Configuration</h2>
                            <div className="as-fee-list">
                                {FEE_SETTINGS.map(f => (
                                    <div key={f.id} className="as-fee-row">
                                        <span>{f.label}</span>
                                        <div className="as-fee-input-wrap">
                                            <input type="number" value={fees[f.id]} onChange={e => setFees(o => ({ ...o, [f.id]: e.target.value }))} className="as-fee-input" />
                                            <span className="as-fee-unit">{f.unit}</span>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>

                    <div className="as-sidebar">
                        {/* Feature Toggles */}
                        <div className="as-section">
                            <h2><Lock size={16} /> Feature Toggles</h2>
                            <div className="as-toggle-list">
                                {FEATURE_TOGGLES.map(f => (
                                    <div key={f.id} className="as-toggle-row">
                                        <div>
                                            <h4>{f.label}</h4>
                                            <p>{f.desc}</p>
                                        </div>
                                        <button className="as-tog" onClick={() => toggleFeature(f.id)}>
                                            {features[f.id] ? <ToggleRight size={26} color="var(--primary)" /> : <ToggleLeft size={26} />}
                                        </button>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>

                <button className="btn btn-primary as-save" onClick={handleSave}>
                    {saved ? <><Check size={14} /> Saved!</> : <><Save size={14} /> Save Configuration</>}
                </button>
            </div>
        </div>
    )
}
