
import { useState, useContext } from 'react'
import { AgeContext } from '../contexts'

import {
    Clock, Users, MapPin, Star, Shield, AlertTriangle,
    Check, X, UserPlus, Calendar, ChevronRight, Info,
    CheckCircle, Lock, Eye,
} from 'lucide-react'
import './TurfSlot.css'

const TURF = { name: 'Central Park Ground', emoji: '⚽', type: 'Football', area: 'Koramangala', capacity: 22, price: 800 }

const SLOT = { time: '5:00 PM – 6:30 PM', date: 'Today, Feb 17', status: 'filling', spotsLeft: 8, totalSpots: 22 }

const PARTICIPANTS = [
    { id: 1, name: 'BookWorm42', avatar: '🦊', trust: 88, age: '13-17', role: 'Organizer' },
    { id: 2, name: 'SportyKid', avatar: '🐱', trust: 85, age: '13-17', role: 'Player' },
    { id: 3, name: 'GamerPro', avatar: '🦁', trust: 91, age: '18-25', role: 'Player' },
    { id: 4, name: 'ArtLover', avatar: '🦋', trust: 79, age: '13-17', role: 'Player' },
    { id: 5, name: 'RunnerX', avatar: '🐻', trust: 93, age: '18-25', role: 'Player' },
    { id: 6, name: 'TechNerd', avatar: '🦉', trust: 87, age: '13-17', role: 'Player' },
    { id: 7, name: 'MusicFan', avatar: '🐼', trust: 80, age: '13-17', role: 'Player' },
    { id: 8, name: 'SkaterBoy', avatar: '🐯', trust: 76, age: '7-12', role: 'Player' },
    { id: 9, name: 'FunTimes', avatar: '🐸', trust: 84, age: '13-17', role: 'Player' },
    { id: 10, name: 'ReaderFan', avatar: '🐰', trust: 89, age: '13-17', role: 'Player' },
    { id: 11, name: 'PotterHead', avatar: '🐨', trust: 82, age: '13-17', role: 'Player' },
    { id: 12, name: 'MathWiz', avatar: '🐹', trust: 90, age: '18-25', role: 'Player' },
    { id: 13, name: 'StarGazer', avatar: '🦄', trust: 94, age: '18-25', role: 'Player' },
    { id: 14, name: 'CraftQueen', avatar: '🐝', trust: 86, age: '13-17', role: 'Player' },
]

const RULES = [
    { text: 'Wear proper sports shoes on the turf', icon: '👟' },
    { text: 'No metal studs allowed on synthetic turf', icon: '🚫' },
    { text: 'Bring your own water bottle', icon: '💧' },
    { text: 'No food or drinks on the playing area', icon: '🍔' },
    { text: 'Respect the referee and other players', icon: '🤝' },
    { text: 'Leave the turf clean after use', icon: '🧹' },
]

const AGE_RULES = [
    { ageGroup: '7-12', rules: ['Must have guardian present at venue', 'Maximum 2-hour play limit', 'No evening slots after 6 PM'], color: '#e17055' },
    { ageGroup: '13-17', rules: ['Guardian consent required for booking', 'Play allowed until 8 PM', 'Must be in group of 3+'], color: '#FDCB6E' },
    { ageGroup: '18-25', rules: ['Full access to all slots', 'Can organize events', 'Responsible for under-18 players if acting as organizer'], color: '#00b894' },
]

export default function TurfSlot() {
    const { ageGroup } = useContext(AgeContext)
    const [joined, setJoined] = useState(false)

    const fillPct = Math.round(((SLOT.totalSpots - SLOT.spotsLeft) / SLOT.totalSpots) * 100)
    const userAge = ageGroup || '13-17'
    const myAgeRules = AGE_RULES.find(r => r.ageGroup === userAge)

    return (
        <div className="turfslot-page">
            <div className="container">
                {/* Header */}
                <div className="ts-header">
                    <span className="ts-emoji">{TURF.emoji}</span>
                    <div>
                        <h1>{TURF.name}</h1>
                        <div className="ts-meta">
                            <span>{TURF.type}</span>
                            <span><MapPin size={11} /> {TURF.area}</span>
                            <span><Users size={11} /> {TURF.capacity} capacity</span>
                        </div>
                    </div>
                </div>

                <div className="ts-layout">
                    {/* Left column */}
                    <div className="ts-main">
                        {/* Slot Availability */}
                        <div className="ts-section">
                            <h2><Clock size={16} /> Slot Availability</h2>
                            <div className="ts-slot-card">
                                <div className="ts-slot-header">
                                    <div>
                                        <h3>{SLOT.time}</h3>
                                        <span className="ts-slot-date"><Calendar size={12} /> {SLOT.date}</span>
                                    </div>
                                    <span className={`ts - slot - badge ${SLOT.status} `}>
                                        {SLOT.status === 'filling' ? '◐ Filling Up' : SLOT.status === 'available' ? '○ Open' : '● Full'}
                                    </span>
                                </div>

                                <div className="ts-availability">
                                    <div className="ts-avail-bar">
                                        <div className="ts-avail-fill" style={{ width: `${fillPct}% ` }} />
                                    </div>
                                    <div className="ts-avail-info">
                                        <span><strong>{SLOT.totalSpots - SLOT.spotsLeft}</strong> / {SLOT.totalSpots} players joined</span>
                                        <span className="ts-spots-left">{SLOT.spotsLeft} spots left</span>
                                    </div>
                                </div>

                                <div className="ts-price-row">
                                    <span>Price per person</span>
                                    <strong>₹{Math.ceil(TURF.price / (SLOT.totalSpots - SLOT.spotsLeft + 1))}</strong>
                                </div>
                            </div>

                            {!joined ? (
                                <button className="btn btn-primary btn-lg ts-join-btn" onClick={() => setJoined(true)}>
                                    <UserPlus size={16} /> Join This Slot
                                </button>
                            ) : (
                                <div className="ts-joined-msg">
                                    <CheckCircle size={16} /> You've joined this slot! See you on the field.
                                </div>
                            )}
                        </div>

                        {/* Participants */}
                        <div className="ts-section">
                            <h2><Users size={16} /> Participants ({PARTICIPANTS.length})</h2>
                            <div className="ts-participants">
                                {PARTICIPANTS.map(p => (
                                    <div key={p.id} className="ts-participant">
                                        <span className="ts-p-avatar">{p.avatar}</span>
                                        <div className="ts-p-info">
                                            <span className="ts-p-name">{p.name}</span>
                                            <span className="ts-p-meta">
                                                <Star size={10} fill="#FDCB6E" color="#FDCB6E" /> {p.trust}
                                                <span className="ts-p-age">{p.age}</span>
                                            </span>
                                        </div>
                                        {p.role === 'Organizer' && <span className="ts-p-role">Organizer</span>}
                                    </div>
                                ))}
                                {SLOT.spotsLeft > 0 && (
                                    <div className="ts-empty-spots">
                                        +{SLOT.spotsLeft} open spot{SLOT.spotsLeft > 1 ? 's' : ''}
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>

                    {/* Right column */}
                    <div className="ts-sidebar">
                        {/* Rules */}
                        <div className="ts-section">
                            <h2><Shield size={16} /> Turf Rules</h2>
                            <div className="ts-rules">
                                {RULES.map((r, i) => (
                                    <div key={i} className="ts-rule">
                                        <span className="ts-rule-icon">{r.icon}</span>
                                        <span>{r.text}</span>
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* Age Limits */}
                        <div className="ts-section">
                            <h2><AlertTriangle size={16} /> Age Limits</h2>
                            <div className="ts-age-rules">
                                {AGE_RULES.map(ar => (
                                    <div key={ar.ageGroup} className={`ts - age - card ${ar.ageGroup === userAge ? 'current' : ''} `} style={{ '--age-color': ar.color }}>
                                        <div className="ts-age-header">
                                            <span className="ts-age-label" style={{ background: `${ar.color} 15`, color: ar.color }}>{ar.ageGroup}</span>
                                            {ar.ageGroup === userAge && <span className="ts-you-badge">You</span>}
                                        </div>
                                        <ul className="ts-age-list">
                                            {ar.rules.map((rule, i) => (
                                                <li key={i}><Check size={11} /> {rule}</li>
                                            ))}
                                        </ul>
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* Your age notice */}
                        {myAgeRules && userAge !== '18-25' && (
                            <div className="ts-age-notice">
                                <Info size={14} />
                                <span>As a <strong>{userAge}</strong> user, {userAge === '7-12' ? 'your guardian must be present at the venue.' : 'guardian consent is required for booking.'}</span>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    )
}
