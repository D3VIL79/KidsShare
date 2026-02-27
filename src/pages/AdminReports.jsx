
import {
    BarChart3, TrendingUp, Shield, Users, AlertTriangle,
    ChevronDown, Activity, Eye, Flag, Clock,
} from 'lucide-react'
import './AdminReports.css'

const ABUSE_TRENDS = [
    { month: 'Sep', reports: 12 }, { month: 'Oct', reports: 18 }, { month: 'Nov', reports: 15 },
    { month: 'Dec', reports: 22 }, { month: 'Jan', reports: 28 }, { month: 'Feb', reports: 19 },
]

const AGE_BEHAVIOR = [
    { group: '7-12', active: 2840, avgTrust: 78, topActivity: 'Free sharing', topIssue: 'Accidental info sharing', color: '#e17055' },
    { group: '13-17', active: 6312, avgTrust: 82, topActivity: 'Exchanges & Turf', topIssue: 'Chat conduct', color: '#FDCB6E' },
    { group: '18-25', active: 3695, avgTrust: 88, topActivity: 'Selling & Renting', topIssue: 'Late returns', color: '#00b894' },
]

const SAFETY_METRICS = [
    { label: 'Content Filter Accuracy', value: '97.3%', change: '↑ 0.8%', icon: Shield, color: '#6C5CE7' },
    { label: 'Avg Report Resolution', value: '18h', change: '↓ 3h faster', icon: Clock, color: '#00CEC9' },
    { label: 'Auto-Blocked Messages', value: '342', change: 'This month', icon: AlertTriangle, color: '#e17055' },
    { label: 'False Positive Rate', value: '2.1%', change: '↓ 0.4%', icon: Eye, color: '#FDCB6E' },
]

export default function AdminReports() {

    const maxReports = Math.max(...ABUSE_TRENDS.map(a => a.reports))

    return (
        <div className="arep-page">
            <div className="container">
                <div className="ar-header">
                    <h1><BarChart3 size={22} /> Reports & Analytics</h1>
                    <p>Abuse trends, age-group behavior analysis, and safety performance</p>
                </div>

                {/* Safety Metrics */}
                <div className="ar-metrics">
                    {SAFETY_METRICS.map(m => {
                        const MIcon = m.icon
                        return (
                            <div key={m.label} className="ar-metric-card">
                                <div className="ar-metric-icon" style={{ background: `${m.color}12`, color: m.color }}><MIcon size={16} /></div>
                                <div>
                                    <span className="ar-metric-label">{m.label}</span>
                                    <strong className="ar-metric-value">{m.value}</strong>
                                    <span className="ar-metric-change">{m.change}</span>
                                </div>
                            </div>
                        )
                    })}
                </div>

                <div className="ar-layout">
                    {/* Abuse Trends */}
                    <div className="ar-section">
                        <h2><TrendingUp size={16} /> Abuse Trends</h2>
                        <div className="ar-chart">
                            {ABUSE_TRENDS.map(a => (
                                <div key={a.month} className="ar-bar-col">
                                    <span className="ar-bar-val">{a.reports}</span>
                                    <div className="ar-bar" style={{ height: `${(a.reports / maxReports) * 100}%` }} />
                                    <span className="ar-bar-label">{a.month}</span>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Age-Group Behavior */}
                    <div className="ar-section">
                        <h2><Users size={16} /> Age-Group Behavior</h2>
                        <div className="ar-age-list">
                            {AGE_BEHAVIOR.map(g => (
                                <div key={g.group} className="ar-age-card" style={{ borderLeftColor: g.color }}>
                                    <div className="ar-age-head">
                                        <span className="ar-age-badge" style={{ background: `${g.color}12`, color: g.color }}>{g.group}</span>
                                        <span className="ar-age-active">{g.active.toLocaleString()} active</span>
                                    </div>
                                    <div className="ar-age-details">
                                        <div><span>Avg Trust</span><strong style={{ color: g.color }}>{g.avgTrust}</strong></div>
                                        <div><span>Top Activity</span><strong>{g.topActivity}</strong></div>
                                        <div><span>Top Issue</span><strong className="ar-issue">{g.topIssue}</strong></div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
