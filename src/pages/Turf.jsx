import { useState } from 'react'
import {
    MapPin, Clock, Users, Calendar, Star, ChevronLeft,
    ChevronRight, Check, AlertCircle, DollarSign, Zap,
    Navigation, Shield, UserPlus, UserMinus,
} from 'lucide-react'
import './Turf.css'

const TURFS = [
    { id: 1, name: 'Central Park Ground', type: 'Football', image: 'https://images.unsplash.com/photo-1529900748604-07564a03e7a6?auto=format&fit=crop&q=80&w=800', capacity: 22, rating: 4.8, dist: 0.5, price: 800, area: 'Koramangala', facilities: ['Floodlights', 'Changing Room'] },
    { id: 2, name: 'Riverside Court', type: 'Basketball', image: 'https://images.unsplash.com/photo-1505666287802-931dc83948e9?auto=format&fit=crop&q=80&w=800', capacity: 10, rating: 4.6, dist: 1.2, price: 600, area: 'HSR Layout', facilities: ['Indoor', 'Water'] },
    { id: 3, name: 'Green Valley Cricket', type: 'Cricket', image: 'https://images.unsplash.com/photo-1531415074968-036ba1b575da?auto=format&fit=crop&q=80&w=800', capacity: 22, rating: 4.9, dist: 2.0, price: 1200, area: 'Indiranagar', facilities: ['Floodlights', 'Nets', 'Pavilion'] },
    { id: 4, name: 'Community Badminton', type: 'Badminton', image: 'https://images.unsplash.com/photo-1626224583764-84786c719719?auto=format&fit=crop&q=80&w=800', capacity: 4, rating: 4.7, dist: 0.8, price: 400, area: 'JP Nagar', facilities: ['Indoor', 'AC'] },
    { id: 5, name: 'Marathon Runners Track', type: 'Athletics', image: 'https://images.unsplash.com/photo-1461896836934-ffe607ba8211?auto=format&fit=crop&q=80&w=800', capacity: 50, rating: 4.5, dist: 3.5, price: 200, area: 'Whitefield', facilities: ['Open Air', 'Locker'] },
]

const SLOTS = [
    { time: '6:00 AM', status: 'available' },
    { time: '7:30 AM', status: 'available' },
    { time: '9:00 AM', status: 'booked' },
    { time: '10:30 AM', status: 'available' },
    { time: '2:00 PM', status: 'available' },
    { time: '3:30 PM', status: 'booked' },
    { time: '5:00 PM', status: 'filling' },
    { time: '6:30 PM', status: 'available' },
]

export default function Turf() {
    const [selected, setSelected] = useState(null)
    const [selectedSlot, setSelectedSlot] = useState(null)
    const [players, setPlayers] = useState(2)
    const [booked, setBooked] = useState(false)

    const turf = TURFS.find(t => t.id === selected)
    const splitPrice = turf ? Math.ceil(turf.price / players) : 0

    const handleBook = () => {
        setBooked(true)
        setTimeout(() => { setBooked(false); setSelected(null); setSelectedSlot(null); setPlayers(2) }, 2500)
    }

    return (
        <div className="turf-page">
            <div className="container">
                <div className="turf-header">
                    <h1><Navigation size={22} /> Turf Discovery</h1>
                    <p>Find and book nearby turfs & playgrounds in your community</p>
                </div>

                {/* Nearby Turfs */}
                <div className="turf-grid">
                    {TURFS.map(t => (
                        <div key={t.id} className={`turf-card ${selected === t.id ? 'active' : ''}`} onClick={() => { setSelected(t.id === selected ? null : t.id); setSelectedSlot(null); setPlayers(2) }}>
                            <div className="turf-card-image-wrap">
                                <img src={t.image} alt={t.name} className="turf-card-img" />
                                <div className="turf-card-type-badge">{t.type}</div>
                            </div>
                            <div className="turf-card-content">
                                <div className="turf-card-top">
                                    <h3>{t.name}</h3>
                                    <span className="turf-card-price">₹{t.price}<small>/hr</small></span>
                                </div>
                                <div className="turf-card-meta">
                                    <span><MapPin size={11} /> {t.area} · {t.dist} km</span>
                                    <span><Users size={11} /> {t.capacity} max</span>
                                    <span><Star size={11} fill="#FDCB6E" color="#FDCB6E" /> {t.rating}</span>
                                </div>
                                <div className="turf-facilities">
                                    {t.facilities.map(f => <span key={f} className="turf-facility">{f}</span>)}
                                </div>
                            </div>
                        </div>
                    ))}
                </div>

                {/* Time Slots */}
                {selected && !booked && (
                    <div className="turf-slots-section">
                        <h2><Calendar size={18} /> Available Slots — Today</h2>
                        <div className="turf-slots-grid">
                            {SLOTS.map(slot => {
                                const isBooked = slot.status === 'booked'
                                const isMine = selectedSlot === slot.time
                                const isFilling = slot.status === 'filling'
                                return (
                                    <button
                                        key={slot.time}
                                        className={`turf-slot ${isBooked ? 'booked' : ''} ${isMine ? 'selected' : ''} ${isFilling ? 'filling' : ''}`}
                                        onClick={() => !isBooked && setSelectedSlot(isMine ? null : slot.time)}
                                        disabled={isBooked}
                                    >
                                        <Clock size={13} />
                                        <span className="turf-slot-time">{slot.time}</span>
                                        <span className="turf-slot-status">
                                            {isBooked ? '● Booked' : isMine ? '✓ Selected' : isFilling ? '◐ Filling' : '○ Open'}
                                        </span>
                                    </button>
                                )
                            })}
                        </div>

                        <div className="turf-legend">
                            <span><span className="leg-dot open" /> Open</span>
                            <span><span className="leg-dot filling" /> Filling up</span>
                            <span><span className="leg-dot booked" /> Booked</span>
                        </div>

                        {/* Price Split */}
                        {selectedSlot && (
                            <div className="turf-split-section">
                                <h3><DollarSign size={16} /> Price Split</h3>
                                <div className="split-controls">
                                    <span className="split-label">Players splitting cost</span>
                                    <div className="split-counter">
                                        <button className="split-btn" onClick={() => setPlayers(p => Math.max(1, p - 1))} disabled={players <= 1}>
                                            <UserMinus size={14} />
                                        </button>
                                        <span className="split-num">{players}</span>
                                        <button className="split-btn" onClick={() => setPlayers(p => Math.min(turf.capacity, p + 1))} disabled={players >= turf.capacity}>
                                            <UserPlus size={14} />
                                        </button>
                                    </div>
                                </div>

                                <div className="split-visual">
                                    <div className="split-total">
                                        <span>Total</span>
                                        <strong>₹{turf.price}</strong>
                                    </div>
                                    <div className="split-divider">÷ {players}</div>
                                    <div className="split-per">
                                        <span>Per Person</span>
                                        <strong className="split-highlight">₹{splitPrice}</strong>
                                    </div>
                                </div>

                                {players >= 4 && (
                                    <div className="split-savings">
                                        <Zap size={12} /> Great deal! You're saving ₹{turf.price - splitPrice} per person compared to solo booking.
                                    </div>
                                )}

                                <div className="turf-book-area">
                                    <button className="btn btn-primary btn-lg turf-book-btn" onClick={handleBook}>
                                        <Check size={16} /> Book {selectedSlot} · ₹{splitPrice}/person
                                    </button>
                                    <span className="turf-book-note">
                                        <Shield size={12} /> Approval may be needed for users under 18
                                    </span>
                                </div>
                            </div>
                        )}
                    </div>
                )}

                {/* Success */}
                {booked && (
                    <div className="turf-success">
                        <span className="turf-success-emoji">🎉</span>
                        <h2>Turf Booked!</h2>
                        <p>Your slot has been confirmed. Have fun!</p>
                    </div>
                )}
            </div>
        </div >
    )
}
