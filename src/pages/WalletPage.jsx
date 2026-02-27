import { useState, useContext } from 'react'
import { AgeContext } from '../contexts'
import {
    Wallet, TrendingUp, Shield, AlertTriangle, ArrowUpRight,
    ArrowDownLeft, Gift, ArrowLeftRight, Star, Clock,
    ChevronRight, Lock, Info, Zap, Eye, EyeOff,
} from 'lucide-react'
import './WalletPage.css'

const SPENDING_LIMITS = {
    'kids': { daily: 100, weekly: 300, monthly: 500, label: 'Kids', range: '7-12', color: '#e17055' },
    'teens': { daily: 300, weekly: 1000, monthly: 3000, label: 'Teens', range: '13-17', color: '#FDCB6E' },
    'young-adults': { daily: 2000, weekly: 8000, monthly: 25000, label: 'Adults', range: '18-25', color: '#00b894' },
}

const TRANSACTIONS = [
    { id: 1, type: 'earned', title: 'Shared Harry Potter Set', amount: 50, date: 'Feb 17', icon: Gift, emoji: '📚' },
    { id: 2, type: 'spent', title: 'Turf Booking — Central Park', amount: 55, date: 'Feb 16', icon: ArrowDownLeft, emoji: '⚽' },
    { id: 3, type: 'earned', title: 'Exchange completed', amount: 30, date: 'Feb 15', icon: ArrowLeftRight, emoji: '🎲' },
    { id: 4, type: 'earned', title: '5-star rating received', amount: 10, date: 'Feb 14', icon: Star, emoji: '⭐' },
    { id: 5, type: 'spent', title: 'Rented PS5 Controller', amount: 100, date: 'Feb 13', icon: ArrowDownLeft, emoji: '🎮' },
    { id: 6, type: 'earned', title: 'Free giveaway bonus', amount: 25, date: 'Feb 12', icon: Gift, emoji: '🎁' },
    { id: 7, type: 'earned', title: 'Weekly activity reward', amount: 40, date: 'Feb 10', icon: Zap, emoji: '⚡' },
]

export default function WalletPage() {
    const { ageGroup } = useContext(AgeContext)
    const [showBalance, setShowBalance] = useState(true)
    const [txFilter, setTxFilter] = useState('all')

    const userAge = ageGroup || 'teens'
    const limits = SPENDING_LIMITS[userAge]
    const balance = 310
    const totalEarned = TRANSACTIONS.filter(t => t.type === 'earned').reduce((s, t) => s + t.amount, 0)
    const totalSpent = TRANSACTIONS.filter(t => t.type === 'spent').reduce((s, t) => s + t.amount, 0)
    const spentToday = 55
    const spentThisWeek = 155
    const spentThisMonth = 155

    const dailyPct = Math.min(100, Math.round((spentToday / limits.daily) * 100))
    const weeklyPct = Math.min(100, Math.round((spentThisWeek / limits.weekly) * 100))
    const monthlyPct = Math.min(100, Math.round((spentThisMonth / limits.monthly) * 100))

    const filtered = TRANSACTIONS.filter(t => txFilter === 'all' || t.type === txFilter)

    return (
        <div className="wallet-page">
            <div className="container">
                <div className="wal-header">
                    <h1><Wallet size={22} /> Wallet</h1>
                    <p>Your KidShare credits — earn by sharing, spend responsibly</p>
                </div>

                {/* Balance Card */}
                <div className="wal-balance-card">
                    <div className="wal-balance-top">
                        <div>
                            <span className="wal-balance-label">Available Balance</span>
                            <div className="wal-balance-row">
                                <h2 className="wal-balance-amount">{showBalance ? `₹${balance}` : '••••'}</h2>
                                <button className="wal-eye" onClick={() => setShowBalance(p => !p)}>
                                    {showBalance ? <Eye size={16} /> : <EyeOff size={16} />}
                                </button>
                            </div>
                        </div>
                        <div className="wal-balance-ring">
                            <svg viewBox="0 0 80 80">
                                <circle cx="40" cy="40" r="34" className="wal-ring-bg" />
                                <circle cx="40" cy="40" r="34" className="wal-ring-fill"
                                    strokeDasharray={`${monthlyPct * 2.14} ${214 - monthlyPct * 2.14}`}
                                    strokeDashoffset="53" />
                            </svg>
                            <span className="wal-ring-text">{monthlyPct}%</span>
                        </div>
                    </div>
                    <div className="wal-balance-stats">
                        <div className="wal-bs earned">
                            <ArrowUpRight size={14} />
                            <div><span>Earned</span><strong>₹{totalEarned}</strong></div>
                        </div>
                        <div className="wal-bs spent">
                            <ArrowDownLeft size={14} />
                            <div><span>Spent</span><strong>₹{totalSpent}</strong></div>
                        </div>
                    </div>
                </div>

                <div className="wal-layout">
                    {/* Transactions */}
                    <div className="wal-main">
                        <div className="wal-section">
                            <div className="wal-section-header">
                                <h2><Clock size={16} /> Transactions</h2>
                                <div className="wal-tx-filters">
                                    {[
                                        { id: 'all', label: 'All' },
                                        { id: 'earned', label: '↑ Earned' },
                                        { id: 'spent', label: '↓ Spent' },
                                    ].map(f => (
                                        <button key={f.id} className={`wal-tx-filter ${txFilter === f.id ? 'active' : ''}`} onClick={() => setTxFilter(f.id)}>
                                            {f.label}
                                        </button>
                                    ))}
                                </div>
                            </div>
                            <div className="wal-tx-list">
                                {filtered.map(tx => (
                                    <div key={tx.id} className="wal-tx">
                                        <span className="wal-tx-emoji">{tx.emoji}</span>
                                        <div className="wal-tx-info">
                                            <span className="wal-tx-title">{tx.title}</span>
                                            <span className="wal-tx-date">{tx.date}</span>
                                        </div>
                                        <span className={`wal-tx-amount ${tx.type}`}>
                                            {tx.type === 'earned' ? '+' : '-'}₹{tx.amount}
                                        </span>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>

                    {/* Sidebar */}
                    <div className="wal-sidebar">
                        {/* Spending Limits */}
                        <div className="wal-section">
                            <h2><Shield size={16} /> Spending Limits</h2>
                            <div className="wal-age-badge" style={{ background: `${limits.color}12`, color: limits.color }}>
                                {limits.label} ({limits.range})
                            </div>

                            <div className="wal-limits">
                                <div className="wal-limit">
                                    <div className="wal-limit-header">
                                        <span>Daily</span>
                                        <span className="wal-limit-nums">₹{spentToday} / ₹{limits.daily}</span>
                                    </div>
                                    <div className="wal-limit-bar">
                                        <div className="wal-limit-fill" style={{ width: `${dailyPct}%`, background: dailyPct > 80 ? 'var(--danger)' : limits.color }} />
                                    </div>
                                </div>
                                <div className="wal-limit">
                                    <div className="wal-limit-header">
                                        <span>Weekly</span>
                                        <span className="wal-limit-nums">₹{spentThisWeek} / ₹{limits.weekly}</span>
                                    </div>
                                    <div className="wal-limit-bar">
                                        <div className="wal-limit-fill" style={{ width: `${weeklyPct}%`, background: weeklyPct > 80 ? 'var(--danger)' : limits.color }} />
                                    </div>
                                </div>
                                <div className="wal-limit">
                                    <div className="wal-limit-header">
                                        <span>Monthly</span>
                                        <span className="wal-limit-nums">₹{spentThisMonth} / ₹{limits.monthly}</span>
                                    </div>
                                    <div className="wal-limit-bar">
                                        <div className="wal-limit-fill" style={{ width: `${monthlyPct}%`, background: monthlyPct > 80 ? 'var(--danger)' : limits.color }} />
                                    </div>
                                </div>
                            </div>

                            {userAge !== 'young-adults' && (
                                <div className="wal-limit-notice">
                                    <Lock size={12} />
                                    <span>Limits are set by your age group. Guardian can adjust these.</span>
                                </div>
                            )}
                        </div>

                        {/* How to Earn */}
                        <div className="wal-section">
                            <h2><TrendingUp size={16} /> How to Earn</h2>
                            <div className="wal-earn-list">
                                <div className="wal-earn-item"><Gift size={13} /> Share an item for free <strong>+25–50</strong></div>
                                <div className="wal-earn-item"><ArrowLeftRight size={13} /> Complete an exchange <strong>+30</strong></div>
                                <div className="wal-earn-item"><Star size={13} /> Get a 5-star rating <strong>+10</strong></div>
                                <div className="wal-earn-item"><Zap size={13} /> Weekly activity bonus <strong>+40</strong></div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
