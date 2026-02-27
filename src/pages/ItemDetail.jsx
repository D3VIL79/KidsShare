import { useState } from 'react'
import { useParams, Link } from 'react-router-dom'
import {
    Star, MapPin, Clock, Shield, Heart, Flag, Share2,
    ChevronLeft, ChevronRight, User, Trophy, Award,
    Calendar, Check, X, MessageCircle, Eye, Lock,
    Gift, Repeat2, ShoppingBag, ArrowLeftRight,
    AlertCircle, Bookmark, Send,
} from 'lucide-react'
import './ItemDetail.css'

/* ===== Mock item data ===== */
const ITEMS_DB = {
    1: {
        id: 1,
        title: 'Harry Potter Box Set',
        price: 'Exchange',
        type: 'exchange',
        desc: 'Complete 7-book collection in excellent condition. Hardcover edition with original illustrations. Looking to swap for a Percy Jackson set or similar fantasy series.',
        condition: 'Like New',
        age: '8-15',
        posted: '2 hours ago',
        photos: [
            'https://images.unsplash.com/photo-1626618012641-bf8ca5e0ae1f?auto=format&fit=crop&q=80&w=800',
            'https://images.unsplash.com/photo-1544947950-fa07a98d237f?auto=format&fit=crop&q=80&w=800',
            'https://images.unsplash.com/photo-1512820790803-83ca734da794?auto=format&fit=crop&q=80&w=800'
        ],
        owner: { name: 'BookWorm42', trust: 92, verified: true, joined: 'Jan 2024' },
        area: 'Koramangala, Bangalore',
        mapCoords: { lat: 12.935, lng: 77.624 }
    },
    2: {
        id: 2,
        title: 'PS5 Controller',
        price: '₹150 / day',
        type: 'lend',
        desc: 'Original DualSense controller. Works perfectly, no drift. Available for weekend lending.',
        condition: 'Good',
        age: 'All',
        posted: '4 hours ago',
        photos: [
            'https://images.unsplash.com/photo-1606318801954-d46d46d3360a?auto=format&fit=crop&q=80&w=800',
            'https://images.unsplash.com/photo-1592840496033-b6b4eeb68434?auto=format&fit=crop&q=80&w=800'
        ],
        owner: { name: 'GamerPro', trust: 87, verified: true, joined: 'Feb 2024' },
        area: 'Indiranagar, Bangalore',
        mapCoords: { lat: 12.971, lng: 77.641 }
    },
    3: {
        title: 'Cricket Bat (SG Nexus Plus)', emoji: '🏏',
        photos: ['🏏', '⚾', '🏟️', '💪'],
        category: 'Sports', mode: 'free',
        desc: 'SG Nexus Plus Kashmir willow bat. Great for practice sessions. Free to borrow — just return it when done! Perfect for beginners and intermediate players.',
        condition: 'Good',
        owner: { name: 'SportsStar', trust: 95, badge: 'Community Hero', joined: 'Nov 2024', exchanges: 23, avatar: '🦁' },
        area: 'HSR Layout', posted: '5 hours ago',
    },
    default: {
        title: 'Shared Item', emoji: '📦',
        photos: ['📦', '🎁', '✨', '🔍'],
        category: 'General', mode: 'free',
        desc: 'This is a shared item available in the KidShare Hub community. Check the details and request it if you\'re interested!',
        condition: 'Good',
        owner: { name: 'KidShare User', trust: 80, badge: 'Member', joined: 'Feb 2025', exchanges: 3, avatar: '🐻' },
        area: 'Bengaluru', posted: 'Recently',
    },
}

const MODE_INFO = {
    free: { label: 'Free Share', icon: Gift, color: '#00b894', bg: 'rgba(0,184,148,0.1)', desc: 'Available for free — just request it!' },
    lend: { label: 'Rent / Lend', icon: ShoppingBag, color: '#6C5CE7', bg: 'rgba(108,92,231,0.1)', desc: 'Available to borrow or rent' },
    exchange: { label: 'Exchange', icon: ArrowLeftRight, color: '#e17055', bg: 'rgba(225,112,85,0.1)', desc: 'Looking to swap for something' },
    sell: { label: 'For Sale', icon: ShoppingBag, color: '#00CEC9', bg: 'rgba(0,206,201,0.1)', desc: 'Available for purchase' },
}

export default function ItemDetail() {
    const { id } = useParams()
    const item = ITEMS_DB[id] || ITEMS_DB.default
    const mode = MODE_INFO[item.mode || item.type] // Use item.type for new data structure

    const [activePhoto, setActivePhoto] = useState(0) // Renamed from photoIndex
    const [saved, setSaved] = useState(false)
    const [showRequest, setShowRequest] = useState(false)
    const [requestSent, setRequestSent] = useState(false)
    const [requestMsg, setRequestMsg] = useState('')
    const [calMonth, setCalMonth] = useState(new Date().getMonth())
    const [calYear] = useState(new Date().getFullYear())

    // Generate calendar days with mock availability
    const getDaysInMonth = (month, year) => new Date(year, month + 1, 0).getDate()
    const getFirstDay = (month, year) => new Date(year, month, 1).getDay()
    const today = new Date().getDate()
    const currentMonth = new Date().getMonth()

    const daysInMonth = getDaysInMonth(calMonth, calYear)
    const firstDay = getFirstDay(calMonth, calYear)
    const monthName = new Date(calYear, calMonth).toLocaleString('default', { month: 'long' })

    // Mock availability: random pattern
    const getAvailability = (day) => {
        if (calMonth === currentMonth && day < today) return 'past'
        if (day % 7 === 0 || day % 11 === 0) return 'unavailable'
        if (day % 3 === 0) return 'limited'
        return 'available'
    }

    const handleSendRequest = () => {
        setRequestSent(true)
        setTimeout(() => setShowRequest(false), 2000)
    }

    // Photo navigation functions
    const nextPhoto = () => {
        setActivePhoto((prev) => (prev + 1) % item.photos.length)
    }

    const prevPhoto = () => {
        setActivePhoto((prev) => (prev - 1 + item.photos.length) % item.photos.length)
    }

    return (
        <div className="item-detail-page">
            <div className="container">
                {/* Back nav */}
                <Link to="/browse" className="detail-back">
                    <ChevronLeft size={16} /> Back to Explore
                </Link>

                <div className="detail-layout">
                    {/* ===== Left: Photos + Calendar ===== */}
                    <div className="detail-left">
                        {/* Photo Gallery */}
                        <div className="item-gallery">
                            <div className="gallery-main">
                                <img src={item.photos[activePhoto]} alt={item.title} className="gallery-img-main" />
                                <div className="gallery-nav">
                                    <button className="gallery-btn prev" onClick={prevPhoto}><ChevronLeft size={24} /></button>
                                    <button className="gallery-btn next" onClick={nextPhoto}><ChevronRight size={24} /></button>
                                </div>
                            </div>
                            <div className="gallery-thumbs">
                                {item.photos.map((photo, index) => (
                                    <button
                                        key={index}
                                        className={`gallery-thumb ${index === activePhoto ? 'active' : ''}`}
                                        onClick={() => setActivePhoto(index)}
                                    >
                                        <img src={photo} alt="" className="gallery-img-thumb" />
                                    </button>
                                ))}
                            </div>
                        </div>

                        {/* Availability Calendar */}
                        <div className="availability-section">
                            <h3 className="avail-title">
                                <Calendar size={16} /> Availability
                            </h3>
                            <div className="calendar-card">
                                <div className="cal-header">
                                    <button
                                        className="cal-nav"
                                        onClick={() => setCalMonth((m) => m > 0 ? m - 1 : 11)}
                                        disabled={calMonth <= currentMonth}
                                    >
                                        <ChevronLeft size={16} />
                                    </button>
                                    <span className="cal-month">{monthName} {calYear}</span>
                                    <button
                                        className="cal-nav"
                                        onClick={() => setCalMonth((m) => m < 11 ? m + 1 : 0)}
                                    >
                                        <ChevronRight size={16} />
                                    </button>
                                </div>
                                <div className="cal-weekdays">
                                    {['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa'].map((d) => (
                                        <span key={d} className="cal-weekday">{d}</span>
                                    ))}
                                </div>
                                <div className="cal-days">
                                    {Array.from({ length: firstDay }).map((_, i) => (
                                        <span key={`empty-${i}`} className="cal-day empty" />
                                    ))}
                                    {Array.from({ length: daysInMonth }).map((_, i) => {
                                        const day = i + 1
                                        const avail = getAvailability(day)
                                        const isToday = calMonth === currentMonth && day === today
                                        return (
                                            <span
                                                key={day}
                                                className={`cal-day ${avail} ${isToday ? 'today' : ''}`}
                                                title={avail === 'available' ? 'Available' : avail === 'limited' ? 'Limited' : avail === 'unavailable' ? 'Unavailable' : 'Past'}
                                            >
                                                {day}
                                            </span>
                                        )
                                    })}
                                </div>
                                <div className="cal-legend">
                                    <span className="legend-item"><span className="legend-dot available" /> Available</span>
                                    <span className="legend-item"><span className="legend-dot limited" /> Limited</span>
                                    <span className="legend-item"><span className="legend-dot unavailable" /> Unavailable</span>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* ===== Right: Info ===== */}
                    <div className="detail-right">
                        {/* Mode Badge */}
                        <div className="detail-mode" style={{ background: mode.bg, color: mode.color }}>
                            <mode.icon size={16} />
                            <span className="mode-label">{mode.label}</span>
                        </div>

                        <h1 className="detail-title">{item.title}</h1>

                        <div className="detail-tags">
                            <span className="detail-tag">{item.emoji} {item.category}</span>
                            <span className="detail-tag">📦 {item.condition}</span>
                            <span className="detail-tag"><Clock size={11} /> {item.posted}</span>
                            <span className="detail-tag"><MapPin size={11} /> {item.area}</span>
                        </div>

                        {item.price && (
                            <div className="detail-price">{item.price}</div>
                        )}

                        {item.exchangeFor && (
                            <div className="detail-exchange-for">
                                <ArrowLeftRight size={14} />
                                <span>Looking for: <strong>{item.exchangeFor}</strong></span>
                            </div>
                        )}

                        <p className="detail-desc">{item.desc}</p>

                        {/* Owner Card */}
                        <div className="owner-card">
                            <div className="owner-avatar">{item.owner.avatar}</div>
                            <div className="owner-info">
                                <h4>{item.owner.name}</h4>
                                <div className="owner-meta">
                                    <span className="owner-joined">Joined {item.owner.joined}</span>
                                    <span className="owner-exchanges">{item.owner.exchanges} exchanges</span>
                                </div>
                            </div>
                            <div className="owner-trust">
                                <div className="owner-trust-ring">
                                    <svg viewBox="0 0 80 80" className="owner-trust-svg">
                                        <circle cx="40" cy="40" r="34" className="trust-ring-bg" />
                                        <circle
                                            cx="40" cy="40" r="34"
                                            className="trust-ring-fill"
                                            strokeDasharray={`${item.owner.trust * 2.14} ${214 - item.owner.trust * 2.14}`}
                                            strokeDashoffset="53"
                                        />
                                    </svg>
                                    <span className="owner-trust-num">{item.owner.trust}</span>
                                </div>
                                <div className="owner-badge">
                                    <Trophy size={11} /> {item.owner.badge}
                                </div>
                            </div>
                        </div>

                        {/* Actions */}
                        <div className="detail-actions">
                            <button
                                className="btn btn-primary btn-lg detail-cta"
                                onClick={() => setShowRequest(true)}
                            >
                                <Send size={18} />
                                {item.mode === 'free' ? 'Request Item' : item.mode === 'exchange' ? 'Propose Exchange' : item.mode === 'lend' ? 'Request to Borrow' : 'Buy Now'}
                            </button>
                            <div className="detail-secondary-actions">
                                <button
                                    className={`detail-action-btn ${saved ? 'saved' : ''}`}
                                    onClick={() => setSaved(!saved)}
                                >
                                    <Bookmark size={16} fill={saved ? 'currentColor' : 'none'} />
                                    {saved ? 'Saved' : 'Save'}
                                </button>
                                <button className="detail-action-btn">
                                    <Share2 size={16} /> Share
                                </button>
                                <button className="detail-action-btn report">
                                    <Flag size={16} /> Report
                                </button>
                            </div>
                        </div>

                        {/* Safety Notice */}
                        <div className="detail-safety">
                            <Shield size={14} />
                            <span>Protected by KidShare Safety. All exchanges are moderated and logged.</span>
                        </div>
                    </div>
                </div>
            </div>

            {/* ===== Request Modal ===== */}
            {showRequest && (
                <div className="request-overlay" onClick={() => { setShowRequest(false); setRequestSent(false) }}>
                    <div className="request-modal" onClick={(e) => e.stopPropagation()}>
                        {!requestSent ? (
                            <>
                                <h3>
                                    <Send size={18} />
                                    {item.mode === 'exchange' ? 'Propose an Exchange' : 'Send a Request'}
                                </h3>
                                <p className="request-item-preview">
                                    <span>{item.emoji}</span> {item.title}
                                </p>
                                <div className="request-field">
                                    <label>Message to {item.owner.name}</label>
                                    <textarea
                                        value={requestMsg}
                                        onChange={(e) => setRequestMsg(e.target.value)}
                                        placeholder={
                                            item.mode === 'exchange'
                                                ? `Hi! I'd like to exchange my [item] for your ${item.title}...`
                                                : `Hi! I'm interested in your ${item.title}...`
                                        }
                                        rows={4}
                                    />
                                </div>
                                {item.mode === 'exchange' && (
                                    <div className="request-notice">
                                        <ArrowLeftRight size={13} />
                                        <span>Describe what you'd like to exchange. The owner is looking for: <strong>{item.exchangeFor}</strong></span>
                                    </div>
                                )}
                                <div className="request-safety">
                                    <Shield size={13} />
                                    <span>Messages are filtered for safety. Never share personal info.</span>
                                </div>
                                <button
                                    className="btn btn-primary btn-lg request-send"
                                    onClick={handleSendRequest}
                                >
                                    <Send size={16} /> Send Request
                                </button>
                            </>
                        ) : (
                            <div className="request-success">
                                <Check size={40} className="request-success-icon" />
                                <h3>Request Sent!</h3>
                                <p>{item.owner.name} will review your request and respond soon.</p>
                            </div>
                        )}
                    </div>
                </div>
            )}
        </div>
    )
}
