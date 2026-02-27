import { useState } from 'react'
import { Link } from 'react-router-dom'
import {
    Sparkles, Star, MapPin, ArrowLeftRight, Heart,
    Zap, ChevronRight, BookOpen, Gamepad2, Bike,
    Music, Palette, Wrench, Eye, Filter, TrendingUp,
} from 'lucide-react'
import './Suggestions.css'

const SUGGESTIONS = [
    {
        id: 1, match: 96,
        yours: { title: 'Harry Potter Box Set', emoji: '📚', category: 'Books' },
        theirs: { title: 'Percy Jackson Set', emoji: '📖', category: 'Books', owner: 'ReaderFan', trust: 88, area: 'Koramangala', avatar: '🐱' },
        mutualInterests: ['Fantasy Books', 'Reading', 'Young Adult Fiction'],
        reason: 'Same category, similar value, both fantasy series',
        aiTag: 'Top Pick',
    },
    {
        id: 2, match: 89,
        yours: { title: 'Arduino Starter Kit', emoji: '🔧', category: 'Tech' },
        theirs: { title: 'Raspberry Pi 4', emoji: '🖥️', category: 'Tech', owner: 'TechNerd', trust: 91, area: 'Indiranagar', avatar: '🦊' },
        mutualInterests: ['Electronics', 'Coding', 'Robotics'],
        reason: 'Both tech items, similar value, shared coding interest',
        aiTag: 'Great Value',
    },
    {
        id: 3, match: 82,
        yours: { title: 'Cricket Bat (SG)', emoji: '🏏', category: 'Sports' },
        theirs: { title: 'Badminton Racket Set', emoji: '🏸', category: 'Sports', owner: 'SportyKid', trust: 85, area: 'HSR Layout', avatar: '🦁' },
        mutualInterests: ['Sports', 'Outdoor Activities'],
        reason: 'Both sports equipment, nearby location',
        aiTag: 'Nearby',
    },
    {
        id: 4, match: 78,
        yours: { title: 'Harry Potter Box Set', emoji: '📚', category: 'Books' },
        theirs: { title: 'Narnia Chronicles', emoji: '📕', category: 'Books', owner: 'FantasyFan', trust: 79, area: 'JP Nagar', avatar: '🐻' },
        mutualInterests: ['Fantasy Books', 'Reading'],
        reason: 'Both classic fantasy series, great for fans',
        aiTag: 'Similar Taste',
    },
    {
        id: 5, match: 74,
        yours: { title: 'Skateboard', emoji: '🛹', category: 'Sports' },
        theirs: { title: 'Inline Skates', emoji: '⛸️', category: 'Sports', owner: 'RollerKid', trust: 82, area: 'Whitefield', avatar: '🐼' },
        mutualInterests: ['Skating', 'Outdoor Activities'],
        reason: 'Similar recreational items, close value range',
        aiTag: 'Fun Swap',
    },
    {
        id: 6, match: 68,
        yours: { title: 'Arduino Starter Kit', emoji: '🔧', category: 'Tech' },
        theirs: { title: 'Telescope (60mm)', emoji: '🔭', category: 'Tech', owner: 'StarGazer', trust: 94, area: 'Hebbal', avatar: '🦉' },
        mutualInterests: ['Science', 'Exploration'],
        reason: 'Both STEM items, high-trust owner',
        aiTag: 'Trusted',
    },
]

const AI_TAG_COLORS = {
    'Top Pick': '#6C5CE7',
    'Great Value': '#00b894',
    'Nearby': '#00CEC9',
    'Similar Taste': '#e17055',
    'Fun Swap': '#FDCB6E',
    'Trusted': '#6C5CE7',
}

function getMatchColor(match) {
    if (match >= 90) return '#00b894'
    if (match >= 75) return '#6C5CE7'
    if (match >= 60) return '#FDCB6E'
    return '#e17055'
}

export default function Suggestions() {
    const [sortBy, setSortBy] = useState('match')
    const [hoveredId, setHoveredId] = useState(null)

    const sorted = [...SUGGESTIONS].sort((a, b) => {
        if (sortBy === 'match') return b.match - a.match
        if (sortBy === 'trust') return b.theirs.trust - a.theirs.trust
        return 0
    })

    return (
        <div className="suggestions-page">
            <div className="container">
                {/* Header */}
                <div className="sugg-header">
                    <div className="sugg-header-text">
                        <h1><Sparkles size={24} /> Exchange Suggestions</h1>
                        <p>AI-powered swap recommendations based on your items and interests</p>
                    </div>
                    <div className="sugg-sort">
                        <span>Sort by</span>
                        <select value={sortBy} onChange={(e) => setSortBy(e.target.value)}>
                            <option value="match">Best Match</option>
                            <option value="trust">Highest Trust</option>
                        </select>
                    </div>
                </div>

                {/* AI insight */}
                <div className="sugg-ai-banner">
                    <Sparkles size={16} />
                    <span>We found <strong>{SUGGESTIONS.length} potential swaps</strong> across your {3} listed items. Suggestions update as new items are posted.</span>
                </div>

                {/* Suggestions */}
                <div className="sugg-list">
                    {sorted.map(sugg => {
                        const matchColor = getMatchColor(sugg.match)
                        const tagColor = AI_TAG_COLORS[sugg.aiTag] || 'var(--primary)'
                        return (
                            <div
                                key={sugg.id}
                                className={`sugg-card ${hoveredId === sugg.id ? 'hovered' : ''}`}
                                onMouseEnter={() => setHoveredId(sugg.id)}
                                onMouseLeave={() => setHoveredId(null)}
                            >
                                {/* AI Tag */}
                                <div className="sugg-ai-tag" style={{ background: `${tagColor}15`, color: tagColor }}>
                                    <Zap size={11} /> {sugg.aiTag}
                                </div>

                                {/* Swap Visual */}
                                <div className="sugg-swap">
                                    <div className="sugg-item yours">
                                        <span className="sugg-item-emoji">{sugg.yours.emoji}</span>
                                        <span className="sugg-item-title">{sugg.yours.title}</span>
                                        <span className="sugg-item-cat">{sugg.yours.category}</span>
                                    </div>

                                    <div className="sugg-match-center">
                                        <div className="sugg-match-ring" style={{ '--ring-color': matchColor }}>
                                            <svg viewBox="0 0 60 60" className="sugg-ring-svg">
                                                <circle cx="30" cy="30" r="25" className="sugg-ring-bg" />
                                                <circle cx="30" cy="30" r="25" className="sugg-ring-fill"
                                                    style={{ stroke: matchColor, strokeDasharray: `${sugg.match * 1.57} ${157 - sugg.match * 1.57}` }}
                                                    strokeDashoffset="39" />
                                            </svg>
                                            <span className="sugg-match-num">{sugg.match}%</span>
                                        </div>
                                        <ArrowLeftRight size={16} className="sugg-swap-icon" />
                                    </div>

                                    <div className="sugg-item theirs">
                                        <span className="sugg-item-emoji">{sugg.theirs.emoji}</span>
                                        <span className="sugg-item-title">{sugg.theirs.title}</span>
                                        <div className="sugg-owner-row">
                                            <span className="sugg-owner-avatar">{sugg.theirs.avatar}</span>
                                            <span>{sugg.theirs.owner}</span>
                                            <span className="sugg-owner-trust"><Star size={10} /> {sugg.theirs.trust}</span>
                                        </div>
                                    </div>
                                </div>

                                {/* Mutual Interests */}
                                <div className="sugg-interests">
                                    <Heart size={12} className="sugg-heart" />
                                    <span className="sugg-interests-label">Mutual:</span>
                                    {sugg.mutualInterests.map(i => (
                                        <span key={i} className="sugg-interest-chip">{i}</span>
                                    ))}
                                </div>

                                {/* AI Reason */}
                                <p className="sugg-reason"><Sparkles size={11} /> {sugg.reason}</p>

                                {/* Action */}
                                <Link to="/exchange" className="sugg-cta">
                                    Propose Swap <ChevronRight size={14} />
                                </Link>
                            </div>
                        )
                    })}
                </div>
            </div>
        </div>
    )
}
