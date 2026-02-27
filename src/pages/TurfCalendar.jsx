import { useState } from 'react'
import {
    Calendar, Clock, MapPin, AlertTriangle, Bell, Check,
    ChevronLeft, ChevronRight, Star, Users, Zap, X,
    Info, Shield,
} from 'lucide-react'
import './TurfCalendar.css'

const BOOKINGS = [
    { id: 1, turf: 'Central Park Ground', emoji: '⚽', type: 'Football', time: '5:00 PM', date: 17, month: 1, area: 'Koramangala', players: 14, status: 'confirmed' },
    { id: 2, turf: 'Community Badminton', emoji: '🏸', type: 'Badminton', time: '7:30 AM', date: 19, month: 1, area: 'JP Nagar', players: 4, status: 'confirmed' },
    { id: 3, turf: 'Riverside Court', emoji: '🏀', type: 'Basketball', time: '3:30 PM', date: 20, month: 1, area: 'HSR Layout', players: 8, status: 'pending' },
    { id: 4, turf: 'Green Valley Cricket', emoji: '🏏', type: 'Cricket', time: '9:00 AM', date: 22, month: 1, area: 'Indiranagar', players: 18, status: 'confirmed' },
    { id: 5, turf: 'Central Park Ground', emoji: '⚽', type: 'Football', time: '6:30 PM', date: 22, month: 1, area: 'Koramangala', players: 10, status: 'conflict' },
]

const REMINDERS = [
    { id: 1, text: 'Football at Central Park Ground tomorrow at 5 PM', time: '1 day before', emoji: '⚽', urgent: true },
    { id: 2, text: 'Badminton at Community Badminton in 2 days', time: '2 days before', emoji: '🏸', urgent: false },
    { id: 3, text: 'Basketball at Riverside Court — awaiting confirmation', time: 'Pending', emoji: '🏀', urgent: false },
]

const CONFLICTS = [
    { id: 1, date: 'Feb 22', slots: ['Cricket at 9:00 AM (Indiranagar)', 'Football at 6:30 PM (Koramangala)'], severity: 'low', note: 'Different times — no overlap, but a busy day!' },
]

export default function TurfCalendar() {
    const now = new Date()
    const [calMonth, setCalMonth] = useState(now.getMonth())
    const [calYear] = useState(now.getFullYear())
    const [selectedDay, setSelectedDay] = useState(null)
    const [dismissedReminders, setDismissedReminders] = useState([])

    const daysInMonth = new Date(calYear, calMonth + 1, 0).getDate()
    const firstDay = new Date(calYear, calMonth, 1).getDay()
    const monthName = new Date(calYear, calMonth).toLocaleString('default', { month: 'long' })
    const today = now.getDate()
    const currentMonth = now.getMonth()

    const getBookingsForDay = (day) => BOOKINGS.filter(b => b.date === day && b.month === calMonth)
    const dayBookings = selectedDay ? getBookingsForDay(selectedDay) : []

    const dismissReminder = (id) => setDismissedReminders(p => [...p, id])
    const activeReminders = REMINDERS.filter(r => !dismissedReminders.includes(r.id))

    return (
        <div className="tcal-page">
            <div className="container">
                <div className="tcal-header">
                    <h1><Calendar size={22} /> Turf Calendar</h1>
                    <p>Your personal turf bookings, reminders, and schedule at a glance</p>
                </div>

                <div className="tcal-layout">
                    {/* Calendar */}
                    <div className="tcal-calendar">
                        <div className="tcal-cal-header">
                            <button className="tcal-nav" onClick={() => setCalMonth(m => m > 0 ? m - 1 : 11)} disabled={calMonth <= currentMonth}>
                                <ChevronLeft size={16} />
                            </button>
                            <span className="tcal-month">{monthName} {calYear}</span>
                            <button className="tcal-nav" onClick={() => setCalMonth(m => m < 11 ? m + 1 : 0)}>
                                <ChevronRight size={16} />
                            </button>
                        </div>

                        <div className="tcal-weekdays">
                            {['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa'].map(d => <span key={d}>{d}</span>)}
                        </div>

                        <div className="tcal-days">
                            {Array.from({ length: firstDay }).map((_, i) => <span key={`e-${i}`} className="tcal-day empty" />)}
                            {Array.from({ length: daysInMonth }).map((_, i) => {
                                const day = i + 1
                                const bookings = getBookingsForDay(day)
                                const hasConflict = bookings.some(b => b.status === 'conflict')

                                const isToday = calMonth === currentMonth && day === today
                                const isSelected = selectedDay === day

                                return (
                                    <button
                                        key={day}
                                        className={`tcal-day ${isToday ? 'today' : ''} ${isSelected ? 'selected' : ''} ${hasConflict ? 'conflict' : ''}`}
                                        onClick={() => setSelectedDay(day === selectedDay ? null : day)}
                                    >
                                        <span className="tcal-day-num">{day}</span>
                                        {bookings.length > 0 && (
                                            <div className="tcal-dots">
                                                {bookings.map(b => (
                                                    <span key={b.id} className={`tcal-dot ${b.status}`} />
                                                ))}
                                            </div>
                                        )}
                                    </button>
                                )
                            })}
                        </div>

                        <div className="tcal-legend">
                            <span><span className="tcal-leg confirmed" /> Confirmed</span>
                            <span><span className="tcal-leg pending" /> Pending</span>
                            <span><span className="tcal-leg conflict" /> Conflict</span>
                        </div>

                        {/* Day Detail */}
                        {selectedDay && (
                            <div className="tcal-day-detail">
                                <h3>Feb {selectedDay} — {dayBookings.length > 0 ? `${dayBookings.length} booking${dayBookings.length > 1 ? 's' : ''}` : 'No bookings'}</h3>
                                {dayBookings.length > 0 ? dayBookings.map(b => (
                                    <div key={b.id} className={`tcal-booking-card ${b.status}`}>
                                        <span className="tcal-b-emoji">{b.emoji}</span>
                                        <div className="tcal-b-info">
                                            <h4>{b.turf}</h4>
                                            <div className="tcal-b-meta">
                                                <span><Clock size={10} /> {b.time}</span>
                                                <span><MapPin size={10} /> {b.area}</span>
                                                <span><Users size={10} /> {b.players}</span>
                                            </div>
                                        </div>
                                        <span className={`tcal-b-status ${b.status}`}>
                                            {b.status === 'confirmed' ? '✓ Confirmed' : b.status === 'pending' ? '⏳ Pending' : '⚠️ Conflict'}
                                        </span>
                                    </div>
                                )) : (
                                    <p className="tcal-no-bookings">No turf sessions on this day.</p>
                                )}
                            </div>
                        )}
                    </div>

                    {/* Sidebar */}
                    <div className="tcal-sidebar">
                        {/* Upcoming Reminders */}
                        <div className="tcal-section">
                            <h2><Bell size={16} /> Upcoming Reminders</h2>
                            {activeReminders.length > 0 ? activeReminders.map(r => (
                                <div key={r.id} className={`tcal-reminder ${r.urgent ? 'urgent' : ''}`}>
                                    <span className="tcal-r-emoji">{r.emoji}</span>
                                    <div className="tcal-r-body">
                                        <p>{r.text}</p>
                                        <span className="tcal-r-time"><Clock size={10} /> {r.time}</span>
                                    </div>
                                    <button className="tcal-r-dismiss" onClick={() => dismissReminder(r.id)}>
                                        <X size={12} />
                                    </button>
                                </div>
                            )) : (
                                <div className="tcal-empty-mini"><Check size={14} /> All reminders cleared!</div>
                            )}
                        </div>

                        {/* Conflict Alerts */}
                        <div className="tcal-section">
                            <h2><AlertTriangle size={16} /> Conflict Alerts</h2>
                            {CONFLICTS.length > 0 ? CONFLICTS.map(c => (
                                <div key={c.id} className="tcal-conflict-card">
                                    <div className="tcal-conflict-header">
                                        <AlertTriangle size={13} />
                                        <span>{c.date}</span>
                                        <span className={`tcal-sev ${c.severity}`}>{c.severity === 'high' ? 'Overlap!' : 'Busy Day'}</span>
                                    </div>
                                    <ul className="tcal-conflict-slots">
                                        {c.slots.map((s, i) => <li key={i}>{s}</li>)}
                                    </ul>
                                    <p className="tcal-conflict-note"><Info size={11} /> {c.note}</p>
                                </div>
                            )) : (
                                <div className="tcal-empty-mini"><Check size={14} /> No scheduling conflicts!</div>
                            )}
                        </div>

                        {/* Quick Stats */}
                        <div className="tcal-section">
                            <h2><Star size={16} /> This Month</h2>
                            <div className="tcal-stats">
                                <div className="tcal-stat"><strong>{BOOKINGS.filter(b => b.status === 'confirmed').length}</strong><span>Confirmed</span></div>
                                <div className="tcal-stat"><strong>{BOOKINGS.filter(b => b.status === 'pending').length}</strong><span>Pending</span></div>
                                <div className="tcal-stat"><strong>{CONFLICTS.length}</strong><span>Conflicts</span></div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
