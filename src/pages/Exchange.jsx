import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import {
    ArrowLeftRight, Check, Star, MapPin, Shield,
    ChevronDown, ChevronUp, Sparkles, Zap, Trophy,
    AlertCircle, Heart, Package,
} from 'lucide-react'
import './Exchange.css'

const MY_ITEMS = [
    { id: 1, title: 'Harry Potter Box Set', image: 'https://images.unsplash.com/photo-1626618012641-bf8ca5e0ae1f?auto=format&fit=crop&q=80&w=800', category: 'Books', condition: 'Good', value: 85 },
    { id: 2, title: 'Cricket Bat (SG)', image: 'https://images.unsplash.com/photo-1531415074968-036ba1b575da?auto=format&fit=crop&q=80&w=800', category: 'Sports', condition: 'Good', value: 70 },
    { id: 3, title: 'Arduino Starter Kit', image: 'https://images.unsplash.com/photo-1555449478-ff94aa53e584?auto=format&fit=crop&q=80&w=800', category: 'Tech', condition: 'Like New', value: 90 },
    { id: 4, title: 'Skateboard', image: 'https://images.unsplash.com/photo-1520045892732-304bc3ac5d8e?auto=format&fit=crop&q=80&w=800', category: 'Sports', condition: 'Fair', value: 55 },
]

const THEIR_ITEMS = [
    { id: 10, title: 'Percy Jackson Set', image: 'https://images.unsplash.com/photo-1512820790803-83ca734da794?auto=format&fit=crop&q=80&w=800', category: 'Books', condition: 'Good', value: 80, owner: 'ReaderFan', trust: 88, area: 'Koramangala' },
    { id: 11, title: 'Guitar (Yamaha)', image: 'https://images.unsplash.com/photo-1550291652-6ea9114a47b1?auto=format&fit=crop&q=80&w=800', category: 'Music', condition: 'Excellent', value: 95, owner: 'RockOn', trust: 94, area: 'Rajajinagar' },
    { id: 12, title: 'Telescope', image: 'https://images.unsplash.com/photo-1502681471649-1dc5b0db1184?auto=format&fit=crop&q=80&w=800', category: 'Tech', condition: 'Good', value: 82, owner: 'StarGazer', trust: 91, area: 'Hebbal' },
    { id: 13, title: 'Board Games Bundle', image: 'https://images.unsplash.com/photo-1632501641765-e568d28b0015?auto=format&fit=crop&q=80&w=800', category: 'Gaming', condition: 'Good', value: 72, owner: 'FunTimes', trust: 81, area: 'Electronic City' },
    { id: 14, title: 'Watercolor Set (36)', image: 'https://images.unsplash.com/photo-1513364776144-60967b0f800f?auto=format&fit=crop&q=80&w=800', category: 'Art', condition: 'Like New', value: 65, owner: 'ArtLover', trust: 85, area: 'JP Nagar' },
]

function getMatchScore(offered, requested) {
    if (!offered || !requested) return 0
    const valueDiff = Math.abs(offered.value - requested.value)
    const categoryBonus = offered.category === requested.category ? 10 : 0
    const conditionMap = { 'New': 10, 'Like New': 8, 'Excellent': 7, 'Good': 5, 'Fair': 3 }
    const condScore = ((conditionMap[offered.condition] || 5) + (conditionMap[requested.condition] || 5)) / 2
    const raw = Math.max(0, 100 - valueDiff * 1.5 + categoryBonus + condScore)
    return Math.min(99, Math.round(raw))
}

function getMatchLabel(score) {
    if (score >= 90) return { text: 'Perfect Match!', color: '#00b894', emoji: '🌟' }
    if (score >= 75) return { text: 'Great Match', color: '#6C5CE7', emoji: '✨' }
    if (score >= 55) return { text: 'Fair Match', color: '#FDCB6E', emoji: '👍' }
    return { text: 'Low Match', color: '#e17055', emoji: '⚠️' }
}

export default function Exchange() {
    const navigate = useNavigate()
    const [offered, setOffered] = useState(null)
    const [requested, setRequested] = useState(null)
    const [showMyItems, setShowMyItems] = useState(false)
    const [showTheirItems, setShowTheirItems] = useState(false)
    const [message, setMessage] = useState('')
    const [confirmed, setConfirmed] = useState(false)

    const score = getMatchScore(offered, requested)
    const matchInfo = getMatchLabel(score)

    const handleConfirm = () => {
        setConfirmed(true)
        setTimeout(() => navigate('/dashboard'), 2500)
    }

    if (confirmed) {
        return (
            <div className="container exchange-page">
                <div className="exchange-success">
                    <Sparkles size={48} className="exchange-success-icon" />
                    <h2>Swap Proposed! 🤝</h2>
                    <p>Your exchange request has been sent. The other user will review it shortly.</p>
                    <div className="exchange-success-summary">
                        <div className="success-item">
                            <img src={offered?.image} alt="" className="success-img-thumb" />
                            {offered?.title}
                        </div>
                        <ArrowLeftRight size={18} className="success-arrow" />
                        <div className="success-item">
                            <img src={requested?.image} alt="" className="success-img-thumb" />
                            {requested?.title}
                        </div>
                    </div>
                </div>
            </div>
        )
    }

    return (
        <div className="container exchange-page">
            <div className="exchange-header">
                <h1><ArrowLeftRight size={24} /> Exchange Builder</h1>
                <p>Build a fair swap by selecting items from both sides</p>
            </div>

            <div className="exchange-builder">
                {/* ===== Left: Your Item ===== */}
                <div className="exchange-side yours">
                    <h3 className="side-title">🎁 You Offer</h3>
                    {offered ? (
                        <div className="selected-item-card">
                            <div className="sel-image-wrap">
                                <img src={offered.image} alt={offered.title} className="sel-img" />
                            </div>
                            <div className="sel-info">
                                <h4>{offered.title}</h4>
                                <span className="sel-meta">{offered.category} · {offered.condition}</span>
                            </div>
                            <button className="sel-change" onClick={() => { setOffered(null); setShowMyItems(true) }}>Change</button>
                        </div>
                    ) : (
                        <button className="select-item-btn" onClick={() => setShowMyItems(!showMyItems)}>
                            <Package size={20} />
                            <span>Select your item</span>
                            {showMyItems ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
                        </button>
                    )}
                    {showMyItems && !offered && (
                        <div className="item-picker">
                            {MY_ITEMS.map(item => (
                                <button key={item.id} className="picker-item" onClick={() => { setOffered(item); setShowMyItems(false) }}>
                                    <div className="picker-image-wrap">
                                        <img src={item.image} alt={item.title} className="picker-img" />
                                    </div>
                                    <div className="picker-info">
                                        <span className="picker-title">{item.title}</span>
                                        <span className="picker-meta">{item.category} · {item.condition}</span>
                                    </div>
                                </button>
                            ))}
                        </div>
                    )}
                </div>

                {/* ===== Center: Match Score ===== */}
                <div className="exchange-center">
                    <div className={`match-indicator ${offered && requested ? 'active' : ''}`}>
                        {offered && requested ? (
                            <>
                                <div className="match-ring" style={{ '--match-color': matchInfo.color }}>
                                    <svg viewBox="0 0 100 100" className="match-ring-svg">
                                        <circle cx="50" cy="50" r="42" className="match-ring-bg" />
                                        <circle cx="50" cy="50" r="42" className="match-ring-fill"
                                            style={{ stroke: matchInfo.color, strokeDasharray: `${score * 2.64} ${264 - score * 2.64}` }}
                                            strokeDashoffset="66"
                                        />
                                    </svg>
                                    <span className="match-score">{score}%</span>
                                </div>
                                <span className="match-label" style={{ color: matchInfo.color }}>
                                    {matchInfo.emoji} {matchInfo.text}
                                </span>
                            </>
                        ) : (
                            <>
                                <ArrowLeftRight size={28} className="match-placeholder-icon" />
                                <span className="match-placeholder">Select items to see match</span>
                            </>
                        )}
                    </div>
                </div>

                {/* ===== Right: Their Item ===== */}
                <div className="exchange-side theirs">
                    <h3 className="side-title">🔄 You Want</h3>
                    {requested ? (
                        <div className="selected-item-card">
                            <div className="sel-image-wrap">
                                <img src={requested.image} alt={requested.title} className="sel-img" />
                            </div>
                            <div className="sel-info">
                                <h4>{requested.title}</h4>
                                <span className="sel-meta">{requested.category} · {requested.condition}</span>
                                <span className="sel-owner"><Star size={11} /> {requested.trust} · {requested.owner}</span>
                            </div>
                            <button className="sel-change" onClick={() => { setRequested(null); setShowTheirItems(true) }}>Change</button>
                        </div>
                    ) : (
                        <button className="select-item-btn" onClick={() => setShowTheirItems(!showTheirItems)}>
                            <Package size={20} />
                            <span>Select their item</span>
                            {showTheirItems ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
                        </button>
                    )}
                    {showTheirItems && !requested && (
                        <div className="item-picker">
                            {THEIR_ITEMS.map(item => (
                                <button key={item.id} className="picker-item" onClick={() => { setRequested(item); setShowTheirItems(false) }}>
                                    <div className="picker-image-wrap">
                                        <img src={item.image} alt={item.title} className="picker-img" />
                                    </div>
                                    <div className="picker-info">
                                        <span className="picker-title">{item.title}</span>
                                        <span className="picker-meta">{item.category} · {item.condition}</span>
                                        <span className="picker-owner"><Star size={10} /> {item.trust} · {item.owner} · <MapPin size={10} /> {item.area}</span>
                                    </div>
                                </button>
                            ))}
                        </div>
                    )}
                </div>
            </div>

            {/* Match Advice */}
            {offered && requested && score < 55 && (
                <div className="match-advice">
                    <AlertCircle size={14} />
                    <span>The value difference is large. Consider adding a sweetener or picking a closer-value item for a fairer trade.</span>
                </div>
            )}

            {/* Message + Confirm */}
            {offered && requested && (
                <div className="exchange-confirm-section">
                    <div className="exchange-message-field">
                        <label>Add a message (optional)</label>
                        <textarea
                            value={message}
                            onChange={(e) => setMessage(e.target.value)}
                            placeholder="Hi! I think this would be a great swap..."
                            rows={3}
                        />
                    </div>

                    <div className="exchange-safety">
                        <Shield size={13} />
                        <span>Exchanges are moderated. Meet in public places only. Never share personal info.</span>
                    </div>

                    <button className="btn btn-primary btn-lg exchange-confirm-btn" onClick={handleConfirm}>
                        <ArrowLeftRight size={18} /> Confirm Swap Proposal
                    </button>
                </div>
            )}
        </div>
    )
}
