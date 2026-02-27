
import { Link } from 'react-router-dom'
import {
    BarChart3, Shield, AlertTriangle, Users, Activity,
    TrendingUp, Eye, Clock, ChevronRight, Bell,
    ShoppingBag, MessageCircle, Flag, CheckCircle,
} from 'lucide-react'
import './AdminDashboard.css'

const STATS = [
    { label: 'Total Users', value: '12,847', change: '+342 this week', icon: Users, color: '#6C5CE7' },
    { label: 'Active Listings', value: '3,291', change: '+128 today', icon: ShoppingBag, color: '#00b894' },
    { label: 'Exchanges', value: '8,412', change: '+67 today', icon: Activity, color: '#00CEC9' },
    { label: 'Safety Score', value: '94.2%', change: '↑ 1.3%', icon: Shield, color: '#FDCB6E' },
]

const ALERTS = [
    { id: 1, severity: 'critical', text: 'User "FakeAccount99" flagged for potential scam — 5 reports in 24h', time: '12 min ago' },
    { id: 2, severity: 'high', text: 'Spike in flagged listings in "Electronics" category (age-inappropriate items)', time: '1h ago' },
    { id: 3, severity: 'medium', text: 'User "RudeTrader" repeatedly violating chat conduct rules', time: '3h ago' },
    { id: 4, severity: 'low', text: 'Unusual login pattern detected for 3 accounts from same IP', time: '5h ago' },
]

const DISPUTES = [
    { id: 1, title: 'Item Not as Described — Board Game', users: 'Arjun vs GamerPro', status: 'open', priority: 'high', date: 'Feb 17' },
    { id: 2, title: 'Missed Meetup — No Show', users: 'BookWorm42 vs SkaterBoy', status: 'pending', priority: 'medium', date: 'Feb 16' },
    { id: 3, title: 'Late Return — PS5 Controller', users: 'TechNerd vs SportyKid', status: 'review', priority: 'low', date: 'Feb 15' },
]

export default function AdminDashboard() {
    return (
        <div className="admin-dash-page">
            <div className="container">
                <div className="ad-header">
                    <h1><BarChart3 size={22} /> Admin Dashboard</h1>
                    <p>Platform overview, safety monitoring, and dispute management</p>
                </div>

                {/* Platform Stats */}
                <div className="ad-stats">
                    {STATS.map(s => {
                        const SIcon = s.icon
                        return (
                            <div key={s.label} className="ad-stat-card">
                                <div className="ad-stat-icon" style={{ background: `${s.color}12`, color: s.color }}><SIcon size={18} /></div>
                                <div>
                                    <span className="ad-stat-label">{s.label}</span>
                                    <strong className="ad-stat-value">{s.value}</strong>
                                    <span className="ad-stat-change">{s.change}</span>
                                </div>
                            </div>
                        )
                    })}
                </div>

                <div className="ad-layout">
                    {/* Safety Alerts */}
                    <div className="ad-section">
                        <div className="ad-section-hdr">
                            <h2><AlertTriangle size={16} /> Safety Alerts</h2>
                            <Link to="/admin/moderation" className="ad-view-all">View All <ChevronRight size={12} /></Link>
                        </div>
                        <div className="ad-alert-list">
                            {ALERTS.map(a => (
                                <div key={a.id} className={`ad-alert ${a.severity}`}>
                                    <div className={`ad-alert-dot ${a.severity}`} />
                                    <div className="ad-alert-body">
                                        <span className="ad-alert-text">{a.text}</span>
                                        <span className="ad-alert-time">{a.time}</span>
                                    </div>
                                    <span className={`ad-sev-badge ${a.severity}`}>{a.severity}</span>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Active Disputes */}
                    <div className="ad-section">
                        <div className="ad-section-hdr">
                            <h2><Flag size={16} /> Active Disputes</h2>
                            <Link to="/admin/disputes" className="ad-view-all">View All <ChevronRight size={12} /></Link>
                        </div>
                        <div className="ad-dispute-list">
                            {DISPUTES.map(d => (
                                <div key={d.id} className="ad-dispute">
                                    <div>
                                        <h4>{d.title}</h4>
                                        <span className="ad-disp-users">{d.users}</span>
                                        <span className="ad-disp-date">{d.date}</span>
                                    </div>
                                    <div className="ad-disp-right">
                                        <span className={`ad-disp-status ${d.status}`}>
                                            {d.status === 'open' ? '🔴 Open' : d.status === 'pending' ? '🟡 Pending' : '🔵 Review'}
                                        </span>
                                        <span className={`ad-disp-prio ${d.priority}`}>{d.priority}</span>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>

                {/* Quick Nav */}
                <div className="ad-quick-nav">
                    <Link to="/admin/users" className="ad-qnav"><Users size={14} /> User Management</Link>
                    <Link to="/admin/moderation" className="ad-qnav"><Eye size={14} /> Content Moderation</Link>
                    <Link to="/admin/disputes" className="ad-qnav"><Flag size={14} /> Dispute Panel</Link>
                    <Link to="/admin/reports" className="ad-qnav"><BarChart3 size={14} /> Reports</Link>
                    <Link to="/admin/settings" className="ad-qnav"><Shield size={14} /> System Settings</Link>
                </div>
            </div>
        </div>
    )
}
