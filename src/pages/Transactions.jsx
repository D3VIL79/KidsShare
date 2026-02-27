import { useState } from 'react'
import {
    Clock, ArrowUpRight, ArrowDownLeft, RotateCcw, Filter,
    Download, Search, ChevronDown, Gift, ArrowLeftRight,
    Star, Zap, Truck, Calendar, CreditCard, TrendingUp,
} from 'lucide-react'
import './Transactions.css'

const TX_DATA = [
    { id: 1, type: 'earned', category: 'sharing', title: 'Shared Harry Potter Set', amount: 50, date: '2025-02-17', ref: 'TXN-3847' },
    { id: 2, type: 'rental', category: 'rental', title: 'Turf Booking — Central Park', amount: 55, date: '2025-02-16', ref: 'TXN-3846' },
    { id: 3, type: 'earned', category: 'exchange', title: 'Exchange completed — Board Game', amount: 30, date: '2025-02-15', ref: 'TXN-3845' },
    { id: 4, type: 'earned', category: 'rating', title: '5-star rating received', amount: 10, date: '2025-02-14', ref: 'TXN-3844' },
    { id: 5, type: 'rental', category: 'rental', title: 'Rented PS5 Controller (3 days)', amount: 100, date: '2025-02-13', ref: 'TXN-3843' },
    { id: 6, type: 'refund', category: 'refund', title: 'Refund — Cancelled Turf Booking', amount: 45, date: '2025-02-12', ref: 'TXN-3842' },
    { id: 7, type: 'earned', category: 'bonus', title: 'Weekly activity reward', amount: 40, date: '2025-02-10', ref: 'TXN-3841' },
    { id: 8, type: 'earned', category: 'sharing', title: 'Free giveaway bonus', amount: 25, date: '2025-02-09', ref: 'TXN-3840' },
    { id: 9, type: 'rental', category: 'rental', title: 'Book rental — Science Kit', amount: 30, date: '2025-02-08', ref: 'TXN-3839' },
    { id: 10, type: 'refund', category: 'refund', title: 'Refund — Overcharged rental', amount: 20, date: '2025-02-06', ref: 'TXN-3838' },
    { id: 11, type: 'earned', category: 'exchange', title: 'Exchange completed — Art Supplies', amount: 35, date: '2025-02-05', ref: 'TXN-3837' },
    { id: 12, type: 'rental', category: 'rental', title: 'Badminton Court — JP Nagar', amount: 40, date: '2025-02-03', ref: 'TXN-3836' },
]

const CATEGORY_META = {
    sharing: { icon: Gift, color: '#00b894', label: 'Sharing' },
    exchange: { icon: ArrowLeftRight, color: '#6C5CE7', label: 'Exchange' },
    rating: { icon: Star, color: '#FDCB6E', label: 'Rating' },
    bonus: { icon: Zap, color: '#00CEC9', label: 'Bonus' },
    rental: { icon: Truck, color: '#e17055', label: 'Rental' },
    refund: { icon: RotateCcw, color: '#0984e3', label: 'Refund' },
}

export default function Transactions() {
    const [filter, setFilter] = useState('all')
    const [search, setSearch] = useState('')
    const [expanded, setExpanded] = useState(null)

    const filtered = TX_DATA.filter(tx => {
        if (filter !== 'all' && tx.type !== filter) return false
        if (search && !tx.title.toLowerCase().includes(search.toLowerCase()) && !tx.ref.toLowerCase().includes(search.toLowerCase())) return false
        return true
    })

    const totalEarned = TX_DATA.filter(t => t.type === 'earned').reduce((s, t) => s + t.amount, 0)
    const totalRentals = TX_DATA.filter(t => t.type === 'rental').reduce((s, t) => s + t.amount, 0)
    const totalRefunds = TX_DATA.filter(t => t.type === 'refund').reduce((s, t) => s + t.amount, 0)

    return (
        <div className="txn-page">
            <div className="container">
                <div className="txn-header">
                    <h1><Clock size={22} /> Transactions History</h1>
                    <p>Complete record of credits earned, rentals, and refunds</p>
                </div>

                {/* Summary */}
                <div className="txn-summary">
                    <div className="txn-sum-card earned">
                        <ArrowUpRight size={18} />
                        <div><span>Credits Earned</span><strong>₹{totalEarned}</strong></div>
                    </div>
                    <div className="txn-sum-card rental">
                        <ArrowDownLeft size={18} />
                        <div><span>Rentals Paid</span><strong>₹{totalRentals}</strong></div>
                    </div>
                    <div className="txn-sum-card refund">
                        <RotateCcw size={18} />
                        <div><span>Refunds</span><strong>₹{totalRefunds}</strong></div>
                    </div>
                </div>

                {/* Toolbar */}
                <div className="txn-toolbar">
                    <div className="txn-search">
                        <Search size={14} />
                        <input type="text" placeholder="Search transactions or ref..." value={search} onChange={e => setSearch(e.target.value)} />
                    </div>
                    <div className="txn-filters">
                        {[
                            { id: 'all', label: 'All' },
                            { id: 'earned', label: '↑ Earned' },
                            { id: 'rental', label: '↓ Rentals' },
                            { id: 'refund', label: '↩ Refunds' },
                        ].map(f => (
                            <button key={f.id} className={`txn-filter-btn ${filter === f.id ? 'active' : ''}`} onClick={() => setFilter(f.id)}>{f.label}</button>
                        ))}
                    </div>
                </div>

                {/* List */}
                <div className="txn-list">
                    {filtered.length > 0 ? filtered.map(tx => {
                        const cat = CATEGORY_META[tx.category]
                        const CatIcon = cat.icon
                        const isOpen = expanded === tx.id
                        return (
                            <div key={tx.id} className={`txn-row ${isOpen ? 'open' : ''}`} onClick={() => setExpanded(isOpen ? null : tx.id)}>
                                <div className="txn-row-main">
                                    <div className="txn-icon-wrap" style={{ background: `${cat.color}12`, color: cat.color }}>
                                        <CatIcon size={16} />
                                    </div>
                                    <div className="txn-detail">
                                        <span className="txn-title">{tx.title}</span>
                                        <span className="txn-date">{tx.date}</span>
                                    </div>
                                    <span className={`txn-amount ${tx.type}`}>
                                        {tx.type === 'earned' || tx.type === 'refund' ? '+' : '-'}₹{tx.amount}
                                    </span>
                                    <ChevronDown size={14} className={`txn-chevron ${isOpen ? 'rotated' : ''}`} />
                                </div>
                                {isOpen && (
                                    <div className="txn-expanded">
                                        <div className="txn-exp-row"><span>Reference</span><strong>{tx.ref}</strong></div>
                                        <div className="txn-exp-row"><span>Category</span><span className="txn-cat-badge" style={{ background: `${cat.color}12`, color: cat.color }}>{cat.label}</span></div>
                                        <div className="txn-exp-row"><span>Status</span><span className="txn-status-badge">✓ Completed</span></div>
                                    </div>
                                )}
                            </div>
                        )
                    }) : (
                        <div className="txn-empty">No transactions match your filter.</div>
                    )}
                </div>

                <div className="txn-count">{filtered.length} of {TX_DATA.length} transactions</div>
            </div>
        </div>
    )
}
