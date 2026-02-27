import { useState } from 'react'
import { Link } from 'react-router-dom'
import { AgeContext } from '../contexts'
import {
    Share2, ArrowRight, Search, MapPin, Star, Shield,
    Heart, Repeat2, ShoppingBag, Gift, Bike, BookOpen,
    Gamepad2, Music, TrendingUp, Clock, ChevronRight,
    PlusCircle, Calendar, Zap, Eye, Users, Award,
    Sparkles, Trophy, Flame,
} from 'lucide-react'
import './Home.css'

/* ===== Mock Data ===== */
/* ===== Mock Data ===== */
const FEED_ITEMS = [
    {
        id: 1, title: 'Harry Potter Box Set', type: 'exchange', image: 'https://images.unsplash.com/photo-1626618012641-bf8ca5e0ae1f?auto=format&fit=crop&q=80&w=800',
        user: 'BookWorm42', trustScore: 92, area: 'Koramangala', time: '2h ago',
        tag: 'Books', desc: 'Looking to exchange for a Percy Jackson set',
    },
    {
        id: 2, title: 'PS5 Controller', type: 'lend', image: 'https://images.unsplash.com/photo-1606318801954-d46d46d3360a?auto=format&fit=crop&q=80&w=800',
        user: 'GamerPro', trustScore: 87, area: 'Indiranagar', time: '4h ago',
        tag: 'Gaming', desc: 'Available for weekend lending, great condition',
    },
    {
        id: 20, title: 'Drone (Mini)', type: 'exchange', image: 'https://images.unsplash.com/photo-1473968512647-3c4472448817?auto=format&fit=crop&q=80&w=800',
        user: 'FlyHigh', trustScore: 88, area: 'Whitefield', time: '5h ago',
        tag: 'Tech', desc: 'DJI Mini SE, looking for GoPro or similar camera',
    },
    {
        id: 3, title: 'Cricket Bat (SG)', type: 'share', image: 'https://images.unsplash.com/photo-1531415074968-036ba1b575da?auto=format&fit=crop&q=80&w=800',
        user: 'SportsStar', trustScore: 95, area: 'HSR Layout', time: '5h ago',
        tag: 'Sports', desc: 'Free to borrow for practice sessions',
    },
    {
        id: 21, title: 'LEGO City Set', type: 'exchange', image: 'https://images.unsplash.com/photo-1587654780291-39c940483713?auto=format&fit=crop&q=80&w=800',
        user: 'BuilderBob', trustScore: 93, area: 'Indiranagar', time: '6h ago',
        tag: 'Toys', desc: 'Police Station set, missing box but parts complete. Want Star Wars Lego.',
    },
    {
        id: 4, title: 'Rubik\'s Cube Collection', type: 'sell', image: 'https://images.unsplash.com/photo-1569516449771-41c89ee94df6?auto=format&fit=crop&q=80&w=800',
        user: 'PuzzleKing', trustScore: 78, area: 'Whitefield', time: '8h ago',
        tag: 'Games', desc: '3 cubes, ₹150 for the set',
    },
]

const RECOMMENDED = [
    { id: 5, title: 'Arduino Starter Kit', image: 'https://images.unsplash.com/photo-1555449478-ff94aa53e584?auto=format&fit=crop&q=80&w=800', type: 'lend', user: 'TechNerd', area: 'BTM Layout', match: '94%' },
    { id: 22, title: 'RC Car', image: 'https://images.unsplash.com/photo-1594787318286-3d835c1d207f?auto=format&fit=crop&q=80&w=800', type: 'sell', user: 'RacerX', area: 'Koramangala', match: '91%' },
    { id: 6, title: 'Skateboard', image: 'https://images.unsplash.com/photo-1520045892732-304bc3ac5d8e?auto=format&fit=crop&q=80&w=800', type: 'exchange', user: 'SkateX', area: 'Jayanagar', match: '89%' },
    { id: 7, title: 'Piano Keyboard', image: 'https://images.unsplash.com/photo-1520523839897-bd0b52f945a0?auto=format&fit=crop&q=80&w=800', type: 'share', user: 'MusicFan', area: 'Malleshwaram', match: '85%' },
    { id: 25, title: 'Gaming Headset', image: 'https://images.unsplash.com/photo-1618366712010-f4ae9c647dcb?auto=format&fit=crop&q=80&w=800', type: 'sell', user: 'AudioGamer', area: 'BTM Layout', match: '84%' },
    { id: 8, title: 'Telescope', image: 'https://images.unsplash.com/photo-1502681471649-1dc5b0db1184?auto=format&fit=crop&q=80&w=800', type: 'lend', user: 'StarGazer', area: 'Hebbal', match: '82%' },
]

const NEARBY = [
    { id: 9, title: 'Basketball', image: 'https://images.unsplash.com/photo-1519861531473-920026393112?auto=format&fit=crop&q=80&w=800', distance: '0.3 km', user: 'SlamDunk', type: 'share' },
    { id: 10, title: 'Art Supplies Set', image: 'https://images.unsplash.com/photo-1513364776144-60967b0f800f?auto=format&fit=crop&q=80&w=800', distance: '0.5 km', user: 'ArtLover', type: 'exchange' },
    { id: 11, title: 'Board Games Bundle', image: 'https://images.unsplash.com/photo-1632501641765-e568d28b0015?auto=format&fit=crop&q=80&w=800', distance: '0.8 km', user: 'FunTimes', type: 'share' },
]

const TYPE_COLORS = {
    share: { bg: 'rgba(0,184,148,0.1)', color: '#00b894', label: 'Free Share' },
    lend: { bg: 'rgba(108,92,231,0.1)', color: '#6C5CE7', label: 'Lend' },
    exchange: { bg: 'rgba(253,203,110,0.12)', color: '#e17055', label: 'Exchange' },
    sell: { bg: 'rgba(0,206,201,0.1)', color: '#00CEC9', label: 'Sell' },
}

const QUICK_ACTIONS = [
    { icon: Gift, label: 'Share Item', desc: 'Give for free', path: '/create', color: '#00b894' },
    { icon: Repeat2, label: 'Exchange', desc: 'Swap items', path: '/create', color: '#FDCB6E' },
    { icon: Calendar, label: 'Book Turf', desc: 'Play sports', path: '/turf', color: '#FD79A8' },
    { icon: Search, label: 'Browse', desc: 'Find items', path: '/browse', color: '#6C5CE7' },
]

export default function Home() {
    const [activeFilter, setActiveFilter] = useState('all')

    const filteredFeed = activeFilter === 'all'
        ? FEED_ITEMS
        : FEED_ITEMS.filter((item) => item.type === activeFilter)

    return (
        <div className="home-page">
            {/* ===== Greeting + Trust Score ===== */}
            <section className="home-greeting container">
                <div className="greeting-left">
                    <h1 className="greeting-text">
                        <span className="greeting-wave">👋</span> Hey there!
                    </h1>
                    <p className="greeting-sub">See what's new in your community today</p>
                </div>
                <div className="trust-badge-wrap">
                    <div className="trust-badge">
                        <div className="trust-ring">
                            <svg viewBox="0 0 100 100" className="trust-ring-svg">
                                <circle cx="50" cy="50" r="42" className="trust-ring-bg" />
                                <circle
                                    cx="50" cy="50" r="42"
                                    className="trust-ring-fill"
                                    strokeDasharray={`${88 * 2.64} ${264 - 88 * 2.64}`}
                                    strokeDashoffset="66"
                                />
                            </svg>
                            <div className="trust-ring-value">
                                <span className="trust-number">88</span>
                            </div>
                        </div>
                        <div className="trust-info">
                            <span className="trust-label">Trust Score</span>
                            <div className="trust-level">
                                <Trophy size={12} />
                                <span>Rising Star</span>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* ===== Quick Actions ===== */}
            <section className="home-quick-actions container">
                <div className="quick-actions-grid">
                    {QUICK_ACTIONS.map((a, i) => (
                        <Link key={i} to={a.path} className="quick-action-card">
                            <div className="quick-action-icon" style={{ background: `${a.color}15`, color: a.color }}>
                                <a.icon size={22} />
                            </div>
                            <span className="quick-action-label">{a.label}</span>
                            <span className="quick-action-desc">{a.desc}</span>
                        </Link>
                    ))}
                </div>
            </section>

            {/* ===== Personalized Feed ===== */}
            <section className="home-feed container">
                <div className="section-header">
                    <div>
                        <h2><Sparkles size={18} /> Your Feed</h2>
                        <p>Tailored to your interests and community</p>
                    </div>
                    <Link to="/browse" className="see-all-link">
                        See all <ChevronRight size={14} />
                    </Link>
                </div>

                {/* Filter pills */}
                <div className="feed-filters">
                    {[
                        { id: 'all', label: 'All' },
                        { id: 'share', label: '🎁 Free' },
                        { id: 'lend', label: '🤝 Lend' },
                        { id: 'exchange', label: '🔄 Exchange' },
                        { id: 'sell', label: '💰 Sell' },
                    ].map((f) => (
                        <button
                            key={f.id}
                            className={`filter-pill ${activeFilter === f.id ? 'active' : ''}`}
                            onClick={() => setActiveFilter(f.id)}
                        >
                            {f.label}
                        </button>
                    ))}
                </div>

                {/* Feed cards */}
                <div className="feed-list">
                    {filteredFeed.map((item) => (
                        <Link key={item.id} to={`/item/${item.id}`} className="feed-card">
                            <div className="feed-card-image-wrap">
                                <img src={item.image} alt={item.title} className="feed-card-img" />
                            </div>
                            <div className="feed-card-content">
                                <div className="feed-card-top">
                                    <h3>{item.title}</h3>
                                    <span
                                        className="feed-type-badge"
                                        style={{ background: TYPE_COLORS[item.type].bg, color: TYPE_COLORS[item.type].color }}
                                    >
                                        {TYPE_COLORS[item.type].label}
                                    </span>
                                </div>
                                <p className="feed-card-desc">{item.desc}</p>
                                <div className="feed-card-meta">
                                    <span className="feed-user">
                                        <span className="feed-avatar">{item.user[0]}</span>
                                        {item.user}
                                    </span>
                                    <span className="feed-trust">
                                        <Star size={11} /> {item.trustScore}
                                    </span>
                                    <span className="feed-area">
                                        <MapPin size={11} /> {item.area}
                                    </span>
                                    <span className="feed-time">
                                        <Clock size={11} /> {item.time}
                                    </span>
                                </div>
                            </div>
                        </Link>
                    ))}
                </div>
            </section>

            {/* ===== Recommended For You ===== */}
            <section className="home-recommended container">
                <div className="section-header">
                    <div>
                        <h2><Zap size={18} /> Recommended For You</h2>
                        <p>Based on your interests and activity</p>
                    </div>
                </div>
                <div className="recommended-scroll">
                    {RECOMMENDED.map((item) => (
                        <Link key={item.id} to={`/item/${item.id}`} className="recommended-card">
                            <div className="recommended-match">{item.match} match</div>
                            <div className="recommended-image-wrap">
                                <img src={item.image} alt={item.title} className="recommended-img" />
                            </div>
                            <h4>{item.title}</h4>
                            <span className="recommended-user">{item.user}</span>
                            <span className="recommended-area"><MapPin size={11} /> {item.area}</span>
                            <span
                                className="recommended-type"
                                style={{ background: TYPE_COLORS[item.type].bg, color: TYPE_COLORS[item.type].color }}
                            >
                                {TYPE_COLORS[item.type].label}
                            </span>
                        </Link>
                    ))}
                </div>
            </section>

            {/* ===== Nearby Sharing ===== */}
            <section className="home-nearby container">
                <div className="section-header">
                    <div>
                        <h2><MapPin size={18} /> Nearby Sharing</h2>
                        <p>Available items close to your area</p>
                    </div>
                    <Link to="/browse" className="see-all-link">
                        Map view <ChevronRight size={14} />
                    </Link>
                </div>
                <div className="nearby-list">
                    {NEARBY.map((item) => (
                        <Link key={item.id} to={`/item/${item.id}`} className="nearby-card">
                            <div className="nearby-image-wrap">
                                <img src={item.image} alt={item.title} className="nearby-img" />
                            </div>
                            <div className="nearby-info">
                                <h4>{item.title}</h4>
                                <span className="nearby-user">by {item.user}</span>
                            </div>
                            <div className="nearby-right">
                                <span className="nearby-distance"><MapPin size={12} /> {item.distance}</span>
                                <span
                                    className="nearby-type"
                                    style={{ background: TYPE_COLORS[item.type].bg, color: TYPE_COLORS[item.type].color }}
                                >
                                    {TYPE_COLORS[item.type].label}
                                </span>
                            </div>
                        </Link>
                    ))}
                </div>
            </section>

            {/* ===== Community Stats ===== */}
            <section className="home-stats container">
                <div className="stats-banner">
                    <div className="stat-item">
                        <Flame size={18} />
                        <span className="stat-value">2,430</span>
                        <span className="stat-label">Active Items</span>
                    </div>
                    <div className="stat-divider" />
                    <div className="stat-item">
                        <Users size={18} />
                        <span className="stat-value">1,280</span>
                        <span className="stat-label">Community Members</span>
                    </div>
                    <div className="stat-divider" />
                    <div className="stat-item">
                        <Repeat2 size={18} />
                        <span className="stat-value">850</span>
                        <span className="stat-label">Exchanges Made</span>
                    </div>
                    <div className="stat-divider" />
                    <div className="stat-item">
                        <Shield size={18} />
                        <span className="stat-value">100%</span>
                        <span className="stat-label">Safe & Moderated</span>
                    </div>
                </div>
            </section>
        </div>
    )
}
