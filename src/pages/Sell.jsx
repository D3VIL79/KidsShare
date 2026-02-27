import { useState, useContext } from 'react'
import { AgeContext } from '../contexts'
import { useNavigate } from 'react-router-dom'
import {
    ShoppingBag, DollarSign, Star, Truck, MapPin,
    AlertTriangle, Shield, TrendingUp, Check, Info,
    Package, Camera, ChevronRight, Lock, CheckCircle,
    Sparkles,
} from 'lucide-react'
import './Sell.css'

const CONDITIONS = [
    { id: 'like-new', label: 'Like New', desc: 'Barely used, no scratches', stars: 5, priceMult: 0.9 },
    { id: 'excellent', label: 'Excellent', desc: 'Minor signs of use', stars: 4, priceMult: 0.75 },
    { id: 'good', label: 'Good', desc: 'Normal wear, fully functional', stars: 3, priceMult: 0.6 },
    { id: 'fair', label: 'Fair', desc: 'Visible wear, works fine', stars: 2, priceMult: 0.45 },
    { id: 'acceptable', label: 'Acceptable', desc: 'Heavy wear, still usable', stars: 1, priceMult: 0.3 },
]

const DELIVERY_METHODS = [
    { id: 'meetup', label: 'Public Meetup', icon: MapPin, desc: 'Meet at a safe public location', badge: 'Recommended', color: '#00b894' },
    { id: 'pickup', label: 'Buyer Pickup', icon: Package, desc: 'Buyer picks up from your area', badge: null, color: '#6C5CE7' },
    { id: 'delivery', label: 'Local Delivery', icon: Truck, desc: 'You deliver within 5 km radius', badge: null, color: '#00CEC9' },
]

export default function Sell() {
    const { ageGroup } = useContext(AgeContext)
    const navigate = useNavigate()
    const [itemName, setItemName] = useState('')
    const [originalPrice, setOriginalPrice] = useState('')
    const [condition, setCondition] = useState(null)
    const [delivery, setDelivery] = useState('meetup')
    const [meetupArea, setMeetupArea] = useState('')
    const [description, setDescription] = useState('')
    const [confirmed, setConfirmed] = useState(false)

    const is18Plus = ageGroup === '18-25'

    // 18+ gate
    if (!is18Plus) {
        return (
            <div className="container sell-page">
                <div className="sell-gate">
                    <Lock size={48} className="sell-gate-icon" />
                    <h2>Age Restricted</h2>
                    <p>The Sell feature is only available for users aged <strong>18–25</strong>.</p>
                    <p className="sell-gate-sub">You can still share, lend, or exchange items for free!</p>
                    <button className="btn btn-primary" onClick={() => navigate('/create')}>
                        <Package size={16} /> Share or Lend Instead
                    </button>
                </div>
            </div>
        )
    }

    const condObj = CONDITIONS.find(c => c.id === condition)
    const origNum = parseFloat(originalPrice) || 0
    const suggestedPrice = condObj ? Math.round(origNum * condObj.priceMult) : 0
    const canSubmit = itemName && originalPrice && condition && delivery && (delivery !== 'meetup' || meetupArea)

    const handleSubmit = () => {
        setConfirmed(true)
        setTimeout(() => navigate('/dashboard'), 2500)
    }

    if (confirmed) {
        return (
            <div className="container sell-page">
                <div className="sell-success">
                    <CheckCircle size={48} className="sell-success-icon" />
                    <h2>Item Listed for Sale! 🎉</h2>
                    <p><strong>{itemName}</strong> is now live at ₹{suggestedPrice}.</p>
                    <p className="sell-success-sub">Buyers will be able to find it in Browse.</p>
                </div>
            </div>
        )
    }

    return (
        <div className="container sell-page">
            <div className="sell-header">
                <h1><ShoppingBag size={24} /> Sell Item</h1>
                <p>List an item for sale — available for 18+ members only</p>
                <span className="sell-age-badge"><Shield size={12} /> 18+ Verified</span>
            </div>

            {/* Item Details */}
            <div className="sell-section">
                <h3>Item Details</h3>
                <div className="sell-field">
                    <label>Item Name</label>
                    <input type="text" placeholder="e.g. PS5 Controller, Textbook Set..." value={itemName} onChange={e => setItemName(e.target.value)} className="sell-input" />
                </div>
                <div className="sell-field">
                    <label>Description</label>
                    <textarea placeholder="Describe the item, any defects, included accessories..." value={description} onChange={e => setDescription(e.target.value)} className="sell-textarea" rows={3} />
                </div>
            </div>

            {/* Condition Rating */}
            <div className="sell-section">
                <h3><Star size={16} /> Condition Rating</h3>
                <p className="sell-hint">Honest rating helps build trust and ensures fair pricing</p>
                <div className="condition-grid">
                    {CONDITIONS.map(c => (
                        <button key={c.id} className={`condition-card ${condition === c.id ? 'active' : ''}`} onClick={() => setCondition(c.id)}>
                            <div className="condition-stars">
                                {Array.from({ length: 5 }).map((_, i) => (
                                    <Star key={i} size={12} fill={i < c.stars ? '#FDCB6E' : 'none'} color={i < c.stars ? '#FDCB6E' : 'var(--border-color)'} />
                                ))}
                            </div>
                            <h4>{c.label}</h4>
                            <p>{c.desc}</p>
                            {condition === c.id && <Check size={14} className="condition-check" />}
                        </button>
                    ))}
                </div>
            </div>

            {/* Price Suggestion */}
            <div className="sell-section">
                <h3><DollarSign size={16} /> Price Suggestion</h3>
                <div className="price-row">
                    <div className="sell-field">
                        <label>Original Price (₹)</label>
                        <input type="number" placeholder="e.g. 2000" value={originalPrice} onChange={e => setOriginalPrice(e.target.value)} className="sell-input" min={0} />
                    </div>
                    <div className="price-arrow"><ChevronRight size={20} /></div>
                    <div className="price-suggested">
                        <span className="price-label">AI Suggested Price</span>
                        <span className="price-amount">₹{suggestedPrice || '—'}</span>
                        {condObj && origNum > 0 && (
                            <span className="price-discount">{Math.round(condObj.priceMult * 100)}% of original</span>
                        )}
                    </div>
                </div>
                {condObj && origNum > 0 && (
                    <div className="price-insight">
                        <Sparkles size={12} />
                        <span>Based on <strong>{condObj.label}</strong> condition. Similar items sell for ₹{Math.round(suggestedPrice * 0.9)} — ₹{Math.round(suggestedPrice * 1.15)} in your area.</span>
                    </div>
                )}
            </div>

            {/* Delivery Method */}
            <div className="sell-section">
                <h3><Truck size={16} /> Delivery / Meetup Method</h3>
                <div className="delivery-grid">
                    {DELIVERY_METHODS.map(d => {
                        const DIcon = d.icon
                        return (
                            <button key={d.id} className={`delivery-card ${delivery === d.id ? 'active' : ''}`} onClick={() => setDelivery(d.id)} style={{ '--del-color': d.color }}>
                                <div className="delivery-icon-wrap" style={{ background: `${d.color}12`, color: d.color }}>
                                    <DIcon size={18} />
                                </div>
                                <div>
                                    <h4>{d.label} {d.badge && <span className="delivery-badge">{d.badge}</span>}</h4>
                                    <p>{d.desc}</p>
                                </div>
                                {delivery === d.id && <Check size={14} className="delivery-check" />}
                            </button>
                        )
                    })}
                </div>

                {delivery === 'meetup' && (
                    <div className="sell-field meetup-field">
                        <label>Meetup Area</label>
                        <input type="text" placeholder="e.g. Koramangala 4th Block" value={meetupArea} onChange={e => setMeetupArea(e.target.value)} className="sell-input" />
                        <div className="meetup-safety">
                            <Shield size={12} /> Always meet in a public, well-lit area
                        </div>
                    </div>
                )}
            </div>

            {/* Safety Notice */}
            <div className="sell-safety-notice">
                <AlertTriangle size={14} />
                <span>Never share personal payment details. Use KidShare's verified channels only.</span>
            </div>

            {/* Submit */}
            <button className="btn btn-primary btn-lg sell-submit" disabled={!canSubmit} onClick={handleSubmit} style={{ opacity: canSubmit ? 1 : 0.5 }}>
                <ShoppingBag size={16} /> List for Sale — ₹{suggestedPrice || '0'}
            </button>
        </div>
    )
}
