import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import {
    Calendar, Clock, AlertTriangle, Shield, ChevronLeft,
    ChevronRight, Check, Bell, Info, Zap, DollarSign,
    ArrowRight, CheckCircle,
} from 'lucide-react'
import './Scheduler.css'

const ITEM = { title: 'PS5 DualSense Controller', emoji: '🎮', owner: 'GamerPro', rate: 50 }

export default function Scheduler() {
    const navigate = useNavigate()
    const now = new Date()
    const [calMonth, setCalMonth] = useState(now.getMonth())
    const [calYear] = useState(now.getFullYear())
    const [startDate, setStartDate] = useState(null)
    const [endDate, setEndDate] = useState(null)
    const [reminder, setReminder] = useState('1day')
    const [agreed, setAgreed] = useState(false)
    const [confirmed, setConfirmed] = useState(false)

    const today = now.getDate()
    const currentMonth = now.getMonth()
    const daysInMonth = new Date(calYear, calMonth + 1, 0).getDate()
    const firstDay = new Date(calYear, calMonth, 1).getDay()
    const monthName = new Date(calYear, calMonth).toLocaleString('default', { month: 'long' })

    const isAvailable = (day) => {
        if (calMonth === currentMonth && day <= today) return false
        if (day % 7 === 0 || day % 13 === 0) return false
        return true
    }

    const handleDayClick = (day) => {
        if (!isAvailable(day)) return
        const dateKey = `${calYear}-${calMonth}-${day}`
        if (!startDate || (startDate && endDate)) {
            setStartDate(dateKey); setEndDate(null)
        } else {
            const [, , sd] = startDate.split('-').map(Number)
            if (calMonth === parseInt(startDate.split('-')[1]) && day <= sd) {
                setStartDate(dateKey); setEndDate(null)
            } else {
                setEndDate(dateKey)
            }
        }
    }

    const isInRange = (day) => {
        if (!startDate || !endDate) return false
        const [, sm, sd] = startDate.split('-').map(Number)
        const [, em, ed] = endDate.split('-').map(Number)
        if (calMonth === sm && calMonth === em) return day >= sd && day <= ed
        if (calMonth === sm) return day >= sd
        if (calMonth === em) return day <= ed
        return false
    }

    const isStart = (day) => startDate === `${calYear}-${calMonth}-${day}`
    const isEnd = (day) => endDate === `${calYear}-${calMonth}-${day}`

    const getDuration = () => {
        if (!startDate || !endDate) return 0
        const [, sm, sd] = startDate.split('-').map(Number)
        const [, em, ed] = endDate.split('-').map(Number)
        const s = new Date(calYear, sm, sd)
        const e = new Date(calYear, em, ed)
        return Math.ceil((e - s) / (1000 * 60 * 60 * 24)) + 1
    }

    const duration = getDuration()
    const totalCost = duration * ITEM.rate
    const isLong = duration > 7
    const penalty = isLong ? Math.round(ITEM.rate * 1.5) : ITEM.rate

    const handleConfirm = () => {
        setConfirmed(true)
        setTimeout(() => navigate('/my-activity'), 2500)
    }

    if (confirmed) {
        return (
            <div className="container sched-page">
                <div className="sched-success">
                    <CheckCircle size={48} className="sched-success-icon" />
                    <h2>Booking Confirmed! 📅</h2>
                    <p>You've booked <strong>{ITEM.title}</strong> for {duration} day{duration > 1 ? 's' : ''}.</p>
                    <p className="sched-success-sub">A reminder will be sent before the return date.</p>
                </div>
            </div>
        )
    }

    return (
        <div className="container sched-page">
            <div className="sched-header">
                <h1><Calendar size={24} /> Lend / Rent Scheduler</h1>
                <p>Select your lending dates and set return reminders</p>
            </div>

            {/* Item preview */}
            <div className="sched-item-preview">
                <span className="sched-item-emoji">{ITEM.emoji}</span>
                <div>
                    <h3>{ITEM.title}</h3>
                    <span className="sched-item-rate">₹{ITEM.rate}/day · by {ITEM.owner}</span>
                </div>
            </div>

            <div className="sched-layout">
                {/* Calendar */}
                <div className="sched-calendar">
                    <div className="sched-cal-header">
                        <button className="sched-cal-nav" onClick={() => setCalMonth(m => m > 0 ? m - 1 : 11)} disabled={calMonth <= currentMonth}>
                            <ChevronLeft size={16} />
                        </button>
                        <span className="sched-cal-month">{monthName} {calYear}</span>
                        <button className="sched-cal-nav" onClick={() => setCalMonth(m => m < 11 ? m + 1 : 0)}>
                            <ChevronRight size={16} />
                        </button>
                    </div>

                    <div className="sched-weekdays">
                        {['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa'].map(d => <span key={d}>{d}</span>)}
                    </div>

                    <div className="sched-days">
                        {Array.from({ length: firstDay }).map((_, i) => <span key={`e-${i}`} className="sched-day empty" />)}
                        {Array.from({ length: daysInMonth }).map((_, i) => {
                            const day = i + 1
                            const avail = isAvailable(day)
                            const inRange = isInRange(day)
                            const start = isStart(day)
                            const end = isEnd(day)
                            return (
                                <button
                                    key={day}
                                    className={`sched-day ${avail ? 'available' : 'disabled'} ${inRange ? 'in-range' : ''} ${start ? 'start' : ''} ${end ? 'end' : ''}`}
                                    onClick={() => handleDayClick(day)}
                                    disabled={!avail}
                                >
                                    {day}
                                </button>
                            )
                        })}
                    </div>

                    <div className="sched-legend">
                        <span><span className="sched-dot avail" /> Available</span>
                        <span><span className="sched-dot selected" /> Selected</span>
                        <span><span className="sched-dot unavail" /> Unavailable</span>
                    </div>
                </div>

                {/* Right Panel */}
                <div className="sched-sidebar">
                    {/* Summary */}
                    <div className="sched-summary">
                        <h3>Booking Summary</h3>
                        <div className="sched-summary-rows">
                            <div className="sched-row">
                                <span>Start</span>
                                <strong>{startDate ? startDate.split('-').reverse().join('/') : '—'}</strong>
                            </div>
                            <div className="sched-row">
                                <span>End</span>
                                <strong>{endDate ? endDate.split('-').reverse().join('/') : '—'}</strong>
                            </div>
                            <div className="sched-row">
                                <span>Duration</span>
                                <strong>{duration > 0 ? `${duration} day${duration > 1 ? 's' : ''}` : '—'}</strong>
                            </div>
                            <div className="sched-row total">
                                <span>Total Cost</span>
                                <strong>₹{duration > 0 ? totalCost : 0}</strong>
                            </div>
                        </div>
                    </div>

                    {/* Auto-return Reminder */}
                    <div className="sched-reminder">
                        <h4><Bell size={14} /> Auto-Return Reminder</h4>
                        <p>We'll send you a notification before the return date</p>
                        <div className="reminder-options">
                            {[
                                { id: '1day', label: '1 day before' },
                                { id: '2days', label: '2 days before' },
                                { id: 'morning', label: 'Morning of return' },
                                { id: 'both', label: '1 day + morning' },
                            ].map(r => (
                                <button key={r.id} className={`reminder-btn ${reminder === r.id ? 'active' : ''}`} onClick={() => setReminder(r.id)}>
                                    {reminder === r.id && <Check size={12} />} {r.label}
                                </button>
                            ))}
                        </div>
                    </div>

                    {/* Penalty Warning */}
                    <div className={`sched-penalty ${isLong ? 'warn' : ''}`}>
                        <AlertTriangle size={16} />
                        <div>
                            <h4>Late Return Policy</h4>
                            <p>Items returned late will incur a penalty of <strong>₹{penalty}/day</strong> after the due date.</p>
                            {isLong && (
                                <p className="penalty-extra">⚠️ Bookings over 7 days have a <strong>1.5× penalty rate</strong>. Please ensure timely return.</p>
                            )}
                        </div>
                    </div>

                    {/* Agree & Confirm */}
                    <label className="sched-agree">
                        <input type="checkbox" checked={agreed} onChange={(e) => setAgreed(e.target.checked)} />
                        <span>I agree to return the item on time and accept the penalty terms</span>
                    </label>

                    <button
                        className="btn btn-primary btn-lg sched-confirm"
                        disabled={!startDate || !endDate || !agreed}
                        onClick={handleConfirm}
                        style={{ opacity: startDate && endDate && agreed ? 1 : 0.5 }}
                    >
                        <Calendar size={16} /> Confirm Booking
                    </button>
                </div>
            </div>
        </div>
    )
}
