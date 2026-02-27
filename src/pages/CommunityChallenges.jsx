import { useState } from 'react'
import {
    Trophy, Star, Clock, Users, Zap, Target, Award,
    ChevronRight, Check, Flame, TrendingUp,
} from 'lucide-react'
import './CommunityChallenges.css'

const CHALLENGES = [
    {
        id: 1, title: 'Share-a-thon Week', desc: 'Share 5 items this week to earn bonus credits!',
        icon: '🎁', color: '#6C5CE7', progress: 60, target: 5, current: 3,
        reward: '50 bonus credits', deadline: '3 days left', status: 'active', participants: 842,
    },
    {
        id: 2, title: 'Green Exchange Challenge', desc: 'Complete 3 eco-friendly exchanges (books, reusable items).',
        icon: '🌱', color: '#00b894', progress: 33, target: 3, current: 1,
        reward: 'Green Champion badge', deadline: '5 days left', status: 'active', participants: 567,
    },
    {
        id: 3, title: 'Trust Builder', desc: 'Get 5 five-star ratings from different users.',
        icon: '⭐', color: '#FDCB6E', progress: 80, target: 5, current: 4,
        reward: '+10 trust score', deadline: '2 days left', status: 'active', participants: 1203,
    },
    {
        id: 4, title: 'Community Helper', desc: 'Help 3 new users with their first exchange.',
        icon: '🤝', color: '#00CEC9', progress: 100, target: 3, current: 3,
        reward: 'Helper badge + 30 credits', deadline: 'Completed!', status: 'completed', participants: 390,
    },
    {
        id: 5, title: 'Turf Champion (Monthly)', desc: 'Organize 4 turf sessions this month.',
        icon: '🏆', color: '#e17055', progress: 25, target: 4, current: 1,
        reward: 'Champion badge + free slot', deadline: '18 days left', status: 'active', participants: 215,
    },
]

const LEADERBOARD = [
    { rank: 1, name: 'ArtLover', points: 2450, avatar: '🦋' },
    { rank: 2, name: 'BookWorm42', points: 2180, avatar: '🐱' },
    { rank: 3, name: 'SportyKid', points: 1920, avatar: '🦁' },
    { rank: 4, name: 'Arjun_Fox', points: 1650, avatar: '🦊' },
    { rank: 5, name: 'GamerPro', points: 1430, avatar: '🐸' },
]

export default function CommunityChallenges() {
    const [tab, setTab] = useState('active')

    const filtered = CHALLENGES.filter(c => tab === 'all' || c.status === tab)

    return (
        <div className="chal-page">
            <div className="container">
                <div className="ch-header">
                    <h1><Trophy size={22} /> Community Challenges</h1>
                    <p>Complete challenges, earn rewards, and climb the leaderboard!</p>
                </div>

                <div className="ch-layout">
                    <div className="ch-main">
                        <div className="ch-tabs">
                            {['active', 'completed', 'all'].map(t => (
                                <button key={t} className={`ch-tab ${tab === t ? 'active' : ''}`} onClick={() => setTab(t)}>{t.charAt(0).toUpperCase() + t.slice(1)}</button>
                            ))}
                        </div>

                        <div className="ch-list">
                            {filtered.map(c => (
                                <div key={c.id} className={`ch-card ${c.status}`}>
                                    <div className="ch-card-top">
                                        <span className="ch-card-icon">{c.icon}</span>
                                        <div className="ch-card-info">
                                            <h3>{c.title}</h3>
                                            <p>{c.desc}</p>
                                        </div>
                                        <span className={`ch-status ${c.status}`}>{c.status === 'completed' ? '✓ Done' : c.deadline}</span>
                                    </div>
                                    <div className="ch-progress-row">
                                        <div className="ch-progress-bar">
                                            <div className="ch-progress-fill" style={{ width: `${c.progress}%`, background: c.color }} />
                                        </div>
                                        <span className="ch-progress-text">{c.current}/{c.target}</span>
                                    </div>
                                    <div className="ch-card-footer">
                                        <span className="ch-reward"><Award size={11} /> {c.reward}</span>
                                        <span className="ch-participants"><Users size={11} /> {c.participants.toLocaleString()}</span>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                    <div className="ch-sidebar">
                        <div className="ch-leaderboard">
                            <h2><Flame size={16} /> Leaderboard</h2>
                            {LEADERBOARD.map(l => (
                                <div key={l.rank} className={`ch-lb-row ${l.rank <= 3 ? 'top' : ''}`}>
                                    <span className={`ch-lb-rank rank-${l.rank}`}>{l.rank}</span>
                                    <span className="ch-lb-avatar">{l.avatar}</span>
                                    <span className="ch-lb-name">{l.name}</span>
                                    <span className="ch-lb-pts">{l.points.toLocaleString()} pts</span>
                                </div>
                            ))}
                        </div>

                        <div className="ch-your-stats">
                            <h2><TrendingUp size={16} /> Your Stats</h2>
                            <div className="ch-stat-grid">
                                <div><strong>3</strong><span>Active</span></div>
                                <div><strong>1</strong><span>Completed</span></div>
                                <div><strong>1,650</strong><span>Points</span></div>
                                <div><strong>#4</strong><span>Rank</span></div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
