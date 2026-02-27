import { TrendingUp, Leaf, Users, Heart, Globe, Recycle, ArrowLeftRight, Gift } from 'lucide-react'
import './ImpactDashboard.css'

const IMPACT_STATS = [
    { label: 'Items Shared', value: '8,412', icon: Gift, color: '#6C5CE7', desc: 'Items given a second life' },
    { label: 'CO₂ Saved (est.)', value: '2.3 tons', icon: Leaf, color: '#00b894', desc: 'By reusing instead of buying new' },
    { label: 'Waste Prevented', value: '1,240 kg', icon: Recycle, color: '#00CEC9', desc: 'Items kept out of landfills' },
    { label: 'Community Impact', value: '12,847', icon: Users, color: '#FDCB6E', desc: 'Users making a difference' },
]

const MONTHLY_DATA = [
    { month: 'Sep', items: 420, co2: 0.12 },
    { month: 'Oct', items: 580, co2: 0.17 },
    { month: 'Nov', items: 710, co2: 0.21 },
    { month: 'Dec', items: 890, co2: 0.26 },
    { month: 'Jan', items: 1100, co2: 0.32 },
    { month: 'Feb', items: 980, co2: 0.29 },
]

const CATEGORIES = [
    { name: 'Books & Education', count: 2340, pct: 28, color: '#6C5CE7' },
    { name: 'Sports & Outdoors', count: 1890, pct: 22, color: '#00b894' },
    { name: 'Toys & Games', count: 1650, pct: 20, color: '#FDCB6E' },
    { name: 'Tech & Gaming', count: 1320, pct: 16, color: '#00CEC9' },
    { name: 'Art & Crafts', count: 1212, pct: 14, color: '#e17055' },
]

const MILESTONES = [
    { target: '5,000 Exchanges', achieved: true, date: 'Oct 2025' },
    { target: '10,000 Users', achieved: true, date: 'Dec 2025' },
    { target: '1 Ton CO₂ Saved', achieved: true, date: 'Jan 2026' },
    { target: '25,000 Users', achieved: false, progress: 51 },
    { target: '5 Tons CO₂ Saved', achieved: false, progress: 46 },
]

export default function ImpactDashboard() {
    const maxItems = Math.max(...MONTHLY_DATA.map(d => d.items))

    return (
        <div className="impact-page">
            <div className="container">
                <div className="imp-hero">
                    <span className="imp-badge"><Globe size={12} /> Impact</span>
                    <h1>Our <span className="imp-gradient">Community Impact</span></h1>
                    <p>Every exchange, every share, every connection — it all adds up to a meaningful difference.</p>
                </div>

                <div className="imp-stats">
                    {IMPACT_STATS.map(s => {
                        const SIcon = s.icon
                        return (
                            <div key={s.label} className="imp-stat-card">
                                <div className="imp-stat-icon" style={{ background: `${s.color}12`, color: s.color }}><SIcon size={20} /></div>
                                <strong>{s.value}</strong>
                                <span className="imp-stat-label">{s.label}</span>
                                <span className="imp-stat-desc">{s.desc}</span>
                            </div>
                        )
                    })}
                </div>

                <div className="imp-layout">
                    <div className="imp-section">
                        <h2><TrendingUp size={16} /> Monthly Exchange Growth</h2>
                        <div className="imp-chart">
                            {MONTHLY_DATA.map(d => (
                                <div key={d.month} className="imp-bar-col">
                                    <span className="imp-bar-val">{d.items}</span>
                                    <div className="imp-bar" style={{ height: `${(d.items / maxItems) * 100}%` }} />
                                    <span className="imp-bar-label">{d.month}</span>
                                </div>
                            ))}
                        </div>
                    </div>

                    <div className="imp-section">
                        <h2><Heart size={16} /> Top Categories Shared</h2>
                        <div className="imp-cats">
                            {CATEGORIES.map(c => (
                                <div key={c.name} className="imp-cat-row">
                                    <span className="imp-cat-name">{c.name}</span>
                                    <div className="imp-cat-bar"><div className="imp-cat-fill" style={{ width: `${c.pct}%`, background: c.color }} /></div>
                                    <span className="imp-cat-count">{c.count.toLocaleString()}</span>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>

                <div className="imp-milestones">
                    <h2><ArrowLeftRight size={16} /> Community Milestones</h2>
                    <div className="imp-ml-list">
                        {MILESTONES.map((m, i) => (
                            <div key={i} className={`imp-ml ${m.achieved ? 'done' : 'pending'}`}>
                                <div className="imp-ml-dot" />
                                <div>
                                    <span className="imp-ml-target">{m.target}</span>
                                    {m.achieved ? (
                                        <span className="imp-ml-date">✓ Achieved {m.date}</span>
                                    ) : (
                                        <div className="imp-ml-progress"><div className="imp-ml-fill" style={{ width: `${m.progress}%` }} /><span>{m.progress}%</span></div>
                                    )}
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    )
}
