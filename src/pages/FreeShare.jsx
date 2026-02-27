import { useState } from 'react'
import { Link } from 'react-router-dom'
import {
    Gift, MapPin, Star, Heart, Leaf, Recycle, TrendingUp,
    Filter, ChevronRight, Users, Package, Clock, Eye,
    Globe, Sparkles, ArrowRight,
} from 'lucide-react'
import './FreeShare.css'

const IMPACT = { itemsSaved: 342, kgWaste: 1280, co2Saved: 640, happyKids: 289 }

const FREE_ITEMS = [
    { id: 1, title: 'Old Encyclopedias (Full Set)', emoji: '📚', owner: 'BookWorm42', avatar: '🦊', trust: 88, area: 'Koramangala', dist: 0.8, posted: '2h ago', claims: 3, priority: true },
    { id: 2, title: 'Broken Skateboard (fixable)', emoji: '🛹', owner: 'SkaterBoy', avatar: '🐱', trust: 82, area: 'HSR Layout', dist: 1.2, posted: '5h ago', claims: 1, priority: true },
    { id: 3, title: 'Kids Painting Set (half used)', emoji: '🎨', owner: 'ArtLover', avatar: '🦋', trust: 91, area: 'Indiranagar', dist: 2.1, posted: '1d ago', claims: 5, priority: false },
    { id: 4, title: 'School Uniform (Class 8)', emoji: '👕', owner: 'NeatFreak', avatar: '🐻', trust: 79, area: 'JP Nagar', dist: 3.5, posted: '1d ago', claims: 2, priority: false },
    { id: 5, title: 'Toy Train Set', emoji: '🚂', owner: 'FunTimes', avatar: '🐼', trust: 85, area: 'Whitefield', dist: 5.2, posted: '2d ago', claims: 7, priority: false },
    { id: 6, title: 'Math Textbooks (Grade 10)', emoji: '📐', owner: 'MathWiz', avatar: '🦉', trust: 93, area: 'Marathahalli', dist: 4.0, posted: '3d ago', claims: 0, priority: false },
]

export default function FreeShare() {
    const [sortBy, setSortBy] = useState('nearby')

    const sorted = [...FREE_ITEMS].sort((a, b) => {
        if (sortBy === 'nearby') return a.dist - b.dist
        if (sortBy === 'recent') return 0 // keep original order (already recent-first)
        if (sortBy === 'popular') return b.claims - a.claims
        return 0
    })

    return (
        <div className="freeshare-page">
            <div className="container">
                {/* Header */}
                <div className="fs-header">
                    <div>
                        <h1><Gift size={24} /> Free Share</h1>
                        <p>Give away items you no longer need — one person's old is another's treasure!</p>
                    </div>
                    <Link to="/create" className="fs-give-btn">
                        <Gift size={16} /> Give Something Away
                    </Link>
                </div>

                {/* Impact Counter */}
                <div className="fs-impact">
                    <div className="fs-impact-title">
                        <Leaf size={16} /> Community Impact
                    </div>
                    <div className="fs-impact-grid">
                        <div className="fs-impact-stat">
                            <Recycle size={18} className="fs-imp-icon green" />
                            <span className="fs-imp-num">{IMPACT.itemsSaved}</span>
                            <span className="fs-imp-label">Items Saved</span>
                        </div>
                        <div className="fs-impact-stat">
                            <Package size={18} className="fs-imp-icon blue" />
                            <span className="fs-imp-num">{IMPACT.kgWaste.toLocaleString()} kg</span>
                            <span className="fs-imp-label">Waste Reduced</span>
                        </div>
                        <div className="fs-impact-stat">
                            <Globe size={18} className="fs-imp-icon teal" />
                            <span className="fs-imp-num">{IMPACT.co2Saved} kg</span>
                            <span className="fs-imp-label">CO₂ Saved</span>
                        </div>
                        <div className="fs-impact-stat">
                            <Heart size={18} className="fs-imp-icon pink" />
                            <span className="fs-imp-num">{IMPACT.happyKids}</span>
                            <span className="fs-imp-label">Happy Recipients</span>
                        </div>
                    </div>
                </div>

                {/* Sort & Filter */}
                <div className="fs-toolbar">
                    <span className="fs-count">{FREE_ITEMS.length} free items available</span>
                    <div className="fs-sort">
                        {[
                            { id: 'nearby', label: '📍 Nearest' },
                            { id: 'recent', label: '🕐 Recent' },
                            { id: 'popular', label: '🔥 Popular' },
                        ].map(s => (
                            <button key={s.id} className={`fs-sort-btn ${sortBy === s.id ? 'active' : ''}`} onClick={() => setSortBy(s.id)}>
                                {s.label}
                            </button>
                        ))}
                    </div>
                </div>

                {/* Items */}
                <div className="fs-grid">
                    {sorted.map(item => (
                        <Link to={`/item/${item.id}`} key={item.id} className="fs-card">
                            {item.priority && (
                                <div className="fs-priority-badge">
                                    <MapPin size={10} /> Nearby Priority
                                </div>
                            )}
                            <div className="fs-card-top">
                                <span className="fs-card-emoji">{item.emoji}</span>
                                <span className="fs-free-tag">FREE</span>
                            </div>
                            <h3 className="fs-card-title">{item.title}</h3>
                            <div className="fs-card-owner">
                                <span className="fs-card-avatar">{item.avatar}</span>
                                <span>{item.owner}</span>
                                <span className="fs-card-trust"><Star size={10} /> {item.trust}</span>
                            </div>
                            <div className="fs-card-meta">
                                <span><MapPin size={10} /> {item.area} · {item.dist} km</span>
                                <span><Clock size={10} /> {item.posted}</span>
                            </div>
                            <div className="fs-card-footer">
                                <span className="fs-claims"><Users size={11} /> {item.claims} claim{item.claims !== 1 ? 's' : ''}</span>
                                <span className="fs-card-arrow"><ChevronRight size={14} /></span>
                            </div>
                        </Link>
                    ))}
                </div>

                {/* Why Give Banner */}
                <div className="fs-banner">
                    <Sparkles size={18} />
                    <div>
                        <h3>Why Give Away?</h3>
                        <p>Every item you share keeps waste out of landfills, helps a neighbor, and earns you trust points + community badges.</p>
                    </div>
                    <Link to="/create" className="fs-banner-cta">Share Now <ArrowRight size={14} /></Link>
                </div>
            </div>
        </div>
    )
}
