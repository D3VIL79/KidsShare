import { useState, useContext } from 'react'
import { Link } from 'react-router-dom'
import { AgeContext } from '../contexts'
import {
    Search, SlidersHorizontal, MapPin, Star, Clock,
    BookOpen, Gamepad2, Bike, Music, Palette, Wrench,
    Gift, Repeat2, ShoppingBag, X, ChevronDown, ChevronUp,
    Shield, Eye, Filter, Grid, List, Heart,
} from 'lucide-react'
import './Browse.css'

/* ===== Mock Items ===== */
const ALL_ITEMS = [
    // Books
    { id: 1, title: 'Harry Potter Box Set', image: 'https://images.unsplash.com/photo-1626618012641-bf8ca5e0ae1f?auto=format&fit=crop&q=80&w=800', category: 'books', type: 'exchange', user: 'BookWorm42', trust: 92, area: 'Koramangala', distance: 1.2, time: '2h ago', age: 'all', desc: 'Looking to exchange for Percy Jackson set' },
    { id: 13, title: 'Diary of a Wimpy Kid Set', image: 'https://images.unsplash.com/photo-1593351415075-3bac9f45c877?auto=format&fit=crop&q=80&w=800', category: 'books', type: 'lend', user: 'KidReader', trust: 88, area: 'Indiranagar', distance: 3.5, time: '1d ago', age: 'all', desc: 'First 5 books, good condition' },
    { id: 14, title: 'Science Encyclopedia', image: 'https://images.unsplash.com/photo-1532012197267-da84d127e765?auto=format&fit=crop&q=80&w=800', category: 'books', type: 'share', user: 'SciGuy', trust: 95, area: 'Whitefield', distance: 6.0, time: '3h ago', age: 'all', desc: 'Hardcover, full color images' },
    { id: 28, title: 'Comic Book Collection', image: 'https://images.unsplash.com/photo-1612036782180-6f0b6cd846fe?auto=format&fit=crop&q=80&w=800', category: 'books', type: 'exchange', user: 'ComicFan', trust: 82, area: 'Jayanagar', distance: 4.2, time: '5h ago', age: 'all', desc: 'Marvel & DC mix' },

    // Gaming
    { id: 2, title: 'PS5 Controller', image: 'https://images.unsplash.com/photo-1606318801954-d46d46d3360a?auto=format&fit=crop&q=80&w=800', category: 'gaming', type: 'lend', user: 'GamerPro', trust: 87, area: 'Indiranagar', distance: 2.3, time: '4h ago', age: 'all', desc: 'Available for weekend lending' },
    { id: 4, title: 'Rubik\'s Cube Collection', image: 'https://images.unsplash.com/photo-1569516449771-41c89ee94df6?auto=format&fit=crop&q=80&w=800', category: 'gaming', type: 'sell', user: 'PuzzleKing', trust: 78, area: 'Whitefield', distance: 5.1, time: '8h ago', age: 'all', desc: '3 cubes, ₹150 for the set' },
    { id: 11, title: 'Board Games Bundle', image: 'https://images.unsplash.com/photo-1632501641765-e568d28b0015?auto=format&fit=crop&q=80&w=800', category: 'gaming', type: 'exchange', user: 'FunTimes', trust: 81, area: 'Electronic City', distance: 8.2, time: '2d ago', age: 'all', desc: 'Monopoly + Scrabble + Catan, exchange for other games' },
    { id: 15, title: 'Nintendo Switch Games', image: 'https://images.unsplash.com/photo-1578303512597-81e6cc155b3e?auto=format&fit=crop&q=80&w=800', category: 'gaming', type: 'exchange', user: 'SwitchUser', trust: 90, area: 'HSR Layout', distance: 1.8, time: '6h ago', age: 'all', desc: 'Mario Kart & Zelda' },
    { id: 25, title: 'Gaming Headset', image: 'https://images.unsplash.com/photo-1618366712010-f4ae9c647dcb?auto=format&fit=crop&q=80&w=800', category: 'gaming', type: 'sell', user: 'AudioGamer', trust: 85, area: 'BTM Layout', distance: 2.9, time: '12h ago', age: 'all', desc: 'Razer Kraken, barely used' },

    // Sports
    { id: 3, title: 'Cricket Bat (SG)', image: 'https://images.unsplash.com/photo-1531415074968-036ba1b575da?auto=format&fit=crop&q=80&w=800', category: 'sports', type: 'free', user: 'SportsStar', trust: 95, area: 'HSR Layout', distance: 0.8, time: '5h ago', age: 'all', desc: 'Free to borrow for practice sessions' },
    { id: 6, title: 'Skateboard', image: 'https://images.unsplash.com/photo-1520045892732-304bc3ac5d8e?auto=format&fit=crop&q=80&w=800', category: 'sports', type: 'exchange', user: 'SkateX', trust: 83, area: 'Jayanagar', distance: 1.5, time: '6h ago', age: 'all', desc: 'Looking for rollerblades in exchange' },
    { id: 10, title: 'Basketball', image: 'https://images.unsplash.com/photo-1519861531473-920026393112?auto=format&fit=crop&q=80&w=800', category: 'sports', type: 'free', user: 'SlamDunk', trust: 79, area: 'Koramangala', distance: 0.3, time: '1h ago', age: 'all', desc: 'New Spalding basketball, free to share' },
    { id: 16, title: 'Tennis Racket Set', image: 'https://images.unsplash.com/photo-1617083934555-5634045f9005?auto=format&fit=crop&q=80&w=800', category: 'sports', type: 'lend', user: 'TennisPro', trust: 93, area: 'Malleshwaram', distance: 5.5, time: '9h ago', age: 'all', desc: 'Wilson rackets (2) with balls' },
    { id: 17, title: 'Football Cleats (Size 8)', image: 'https://images.unsplash.com/photo-1511886929837-354d827aae26?auto=format&fit=crop&q=80&w=800', category: 'sports', type: 'sell', user: 'GoalScorer', trust: 80, area: 'Hebbal', distance: 7.1, time: '2d ago', age: 'all', desc: 'Nike Mercurial, used for one season' },

    // Music
    { id: 7, title: 'Piano Keyboard (Casio)', image: 'https://images.unsplash.com/photo-1520523839897-bd0b52f945a0?auto=format&fit=crop&q=80&w=800', category: 'music', type: 'lend', user: 'MusicFan', trust: 88, area: 'Malleshwaram', distance: 4.0, time: '12h ago', age: 'all', desc: 'Available for 2-week lending period' },
    { id: 12, title: 'Guitar (Acoustic)', image: 'https://images.unsplash.com/photo-1550291652-6ea9114a47b1?auto=format&fit=crop&q=80&w=800', category: 'music', type: 'lend', user: 'RockOn', trust: 94, area: 'Rajajinagar', distance: 4.7, time: '10h ago', age: '13+', desc: 'Yamaha acoustic, great for learning' },
    { id: 18, title: 'Ukulele', image: 'https://images.unsplash.com/photo-1506157786151-b8491531f063?auto=format&fit=crop&q=80&w=800', category: 'music', type: 'exchange', user: 'UkePlayer', trust: 86, area: 'JP Nagar', distance: 2.1, time: '1d ago', age: 'all', desc: 'Soprano ukulele, mint condition' },
    { id: 30, title: 'Drum Sticks', image: 'https://images.unsplash.com/photo-1519892300165-cb5542fb4747?auto=format&fit=crop&q=80&w=800', category: 'music', type: 'free', user: 'DrummerBoy', trust: 91, area: 'Indiranagar', distance: 1.9, time: '4h ago', age: 'all', desc: 'Spare pair of Vic Firth 5A' },

    // Art
    { id: 9, title: 'Watercolor Set (36 colors)', image: 'https://images.unsplash.com/photo-1513364776144-60967b0f800f?auto=format&fit=crop&q=80&w=800', category: 'art', type: 'free', user: 'ArtLover', trust: 85, area: 'JP Nagar', distance: 0.5, time: '3h ago', age: 'all', desc: 'Barely used, perfect for beginners' },
    { id: 19, title: 'Canvas Easel', image: 'https://images.unsplash.com/photo-1579783902614-a3fb39279c0f?auto=format&fit=crop&q=80&w=800', category: 'art', type: 'lend', user: 'PainterX', trust: 89, area: 'Koramangala', distance: 0.9, time: '2h ago', age: 'all', desc: 'Wooden adjustable easel' },
    { id: 26, title: 'Sketching Pencils Set', image: 'https://images.unsplash.com/photo-1518640467707-6811f4a6ab73?auto=format&fit=crop&q=80&w=800', category: 'art', type: 'exchange', user: 'SketchArtist', trust: 84, area: 'HSR Layout', distance: 3.1, time: '1d ago', age: 'all', desc: 'Graphite and charcoal pencils' },

    // Tools & Tech
    { id: 5, title: 'Arduino Starter Kit', image: 'https://images.unsplash.com/photo-1555449478-ff94aa53e584?auto=format&fit=crop&q=80&w=800', category: 'tools', type: 'lend', user: 'TechNerd', trust: 90, area: 'BTM Layout', distance: 3.2, time: '1d ago', age: '13+', desc: 'Full kit with sensors, wires, and manual' },
    { id: 8, title: 'Telescope', image: 'https://images.unsplash.com/photo-1502681471649-1dc5b0db1184?auto=format&fit=crop&q=80&w=800', category: 'tools', type: 'lend', user: 'StarGazer', trust: 91, area: 'Hebbal', distance: 6.3, time: '1d ago', age: 'all', desc: 'Great for stargazing, includes tripod' },
    { id: 20, title: 'Drone (Mini)', image: 'https://images.unsplash.com/photo-1473968512647-3c4472448817?auto=format&fit=crop&q=80&w=800', category: 'tools', type: 'exchange', user: 'FlyHigh', trust: 88, area: 'Whitefield', distance: 5.8, time: '3d ago', age: '13+', desc: 'DJI Mini SE, looking for GoPro' },
    { id: 29, title: 'Microscope', image: 'https://images.unsplash.com/photo-1581093588401-fbb07366f89b?auto=format&fit=crop&q=80&w=800', category: 'tools', type: 'lend', user: 'ScienceKid', trust: 92, area: 'Electronic City', distance: 9.0, time: '2d ago', age: 'all', desc: 'Student microscope 1000x' },

    // Toys (New Category implicitly via 'tools' or 'gaming' or added to Art/Others essentially, but let's label them 'art' or 'gaming' or reusing categories for now as changing CATEGORIES array is separate)
    // Actually, I should probably check CATEGORIES. The previous file had: books, gaming, sports, music, art, tools.
    // I will stick to these categories but maybe map Toys to 'gaming' or 'art' for now to avoid breaking filters, or just add a new category if I can modify the CATEGORIES array too.
    // Let's modify CATEGORIES array too in a separate chunk to add 'Toys'.

    { id: 21, title: 'LEGO City Set', image: 'https://images.unsplash.com/photo-1587654780291-39c940483713?auto=format&fit=crop&q=80&w=800', category: 'gaming', type: 'exchange', user: 'BuilderBob', trust: 93, area: 'Indiranagar', distance: 1.1, time: '3h ago', age: 'all', desc: 'Police Station set, missing box' },
    { id: 22, title: 'RC Car', image: 'https://images.unsplash.com/photo-1594787318286-3d835c1d207f?auto=format&fit=crop&q=80&w=800', category: 'gaming', type: 'sell', user: 'RacerX', trust: 79, area: 'Koramangala', distance: 0.6, time: '5h ago', age: 'all', desc: 'High speed off-road buggy' },
    { id: 23, title: 'Dollhouse', image: 'https://images.unsplash.com/photo-1516981879613-9f5da904015f?auto=format&fit=crop&q=80&w=800', category: 'art', type: 'free', user: 'PlayHouse', trust: 96, area: 'Jayanagar', distance: 2.5, time: '1d ago', age: 'all', desc: 'Wooden dollhouse, needs painting' },
    { id: 24, title: 'Action Figures', image: 'https://images.unsplash.com/photo-1628151015968-3a4429e9ef04?auto=format&fit=crop&q=80&w=800', category: 'gaming', type: 'exchange', user: 'HeroFan', trust: 85, area: 'BTM Layout', distance: 3.8, time: '7h ago', age: 'all', desc: 'Avengers set of 5' },
    { id: 27, title: 'Karaoke Mic', image: 'https://images.unsplash.com/photo-1518378875323-28c0490dfb14?auto=format&fit=crop&q=80&w=800', category: 'music', type: 'sell', user: 'SingerPro', trust: 81, area: 'Rajajinagar', distance: 6.5, time: '4h ago', age: 'all', desc: 'Bluetooth mic with speaker' },
]

const CATEGORIES = [
    { id: 'all', label: 'All', icon: Grid, emoji: '✨' },
    { id: 'books', label: 'Books', icon: BookOpen, emoji: '📚' },
    { id: 'gaming', label: 'Gaming', icon: Gamepad2, emoji: '🎮' },
    { id: 'sports', label: 'Sports', icon: Bike, emoji: '⚽' },
    { id: 'music', label: 'Music', icon: Music, emoji: '🎵' },
    { id: 'art', label: 'Art', icon: Palette, emoji: '🎨' },
    { id: 'tools', label: 'Tools & Tech', icon: Wrench, emoji: '🔧' },
]

const TYPES = [
    { id: 'free', label: 'Free', emoji: '🎁', color: '#00b894' },
    { id: 'exchange', label: 'Exchange', emoji: '🔄', color: '#e17055' },
    { id: 'lend', label: 'Rent / Lend', emoji: '🤝', color: '#6C5CE7' },
    { id: 'sell', label: 'Sell', emoji: '💰', color: '#00CEC9' },
]

const TYPE_STYLES = {
    free: { bg: 'rgba(0,184,148,0.1)', color: '#00b894', label: 'Free' },
    exchange: { bg: 'rgba(225,112,85,0.1)', color: '#e17055', label: 'Exchange' },
    lend: { bg: 'rgba(108,92,231,0.1)', color: '#6C5CE7', label: 'Lend' },
    sell: { bg: 'rgba(0,206,201,0.1)', color: '#00CEC9', label: 'Sell' },
}

const SORT_OPTIONS = [
    { id: 'recent', label: 'Most Recent' },
    { id: 'distance', label: 'Nearest First' },
    { id: 'trust', label: 'Highest Trust' },
]

export default function Browse() {
    const { ageGroup } = useContext(AgeContext)
    const [search, setSearch] = useState('')
    const [category, setCategory] = useState('all')
    const [activeTypes, setActiveTypes] = useState(['free', 'exchange', 'lend', 'sell'])
    const [maxDistance, setMaxDistance] = useState(10)
    const [sort, setSort] = useState('recent')
    const [showFilters, setShowFilters] = useState(false)
    const [viewMode, setViewMode] = useState('grid') // grid | list
    const [ageSafe, setAgeSafe] = useState(true)

    const toggleType = (id) => {
        setActiveTypes((prev) =>
            prev.includes(id) ? prev.filter((t) => t !== id) : [...prev, id]
        )
    }

    // Age-safe content filtering
    const getAgeFilter = () => {
        if (!ageSafe) return () => true
        if (ageGroup === '7-12') return (item) => item.age === 'all'
        if (ageGroup === '13-17') return (item) => item.age === 'all' || item.age === '13+'
        return () => true
    }

    const filteredItems = ALL_ITEMS
        .filter(getAgeFilter())
        .filter((item) => category === 'all' || item.category === category)
        .filter((item) => activeTypes.includes(item.type))
        .filter((item) => item.distance <= maxDistance)
        .filter((item) =>
            !search || item.title.toLowerCase().includes(search.toLowerCase()) ||
            item.desc.toLowerCase().includes(search.toLowerCase())
        )
        .sort((a, b) => {
            if (sort === 'distance') return a.distance - b.distance
            if (sort === 'trust') return b.trust - a.trust
            return 0 // recent = default order
        })

    const activeFilterCount =
        (category !== 'all' ? 1 : 0) +
        (activeTypes.length < 4 ? 1 : 0) +
        (maxDistance < 10 ? 1 : 0) +
        (ageSafe ? 1 : 0)

    return (
        <div className="browse-page">
            {/* Search Header */}
            <div className="browse-header container">
                <h1 className="browse-title">Explore Items</h1>
                <div className="browse-search-row">
                    <div className="browse-search-wrap">
                        <Search size={16} className="browse-search-icon" />
                        <input
                            type="text"
                            value={search}
                            onChange={(e) => setSearch(e.target.value)}
                            placeholder="Search items, categories..."
                            className="browse-search-input"
                        />
                        {search && (
                            <button className="browse-search-clear" onClick={() => setSearch('')}>
                                <X size={14} />
                            </button>
                        )}
                    </div>
                    <button
                        className={`browse-filter-btn ${showFilters ? 'active' : ''}`}
                        onClick={() => setShowFilters(!showFilters)}
                    >
                        <SlidersHorizontal size={16} />
                        Filters
                        {activeFilterCount > 0 && (
                            <span className="filter-count">{activeFilterCount}</span>
                        )}
                    </button>
                </div>
            </div>

            {/* Filter Panel */}
            {showFilters && (
                <div className="browse-filters container">
                    {/* Age-safe Toggle */}
                    <div className="filter-group">
                        <label className="filter-label">
                            <Shield size={14} />
                            Age-Safe Content
                        </label>
                        <div className="age-safe-toggle">
                            <button
                                className={`safe-toggle-btn ${ageSafe ? 'on' : 'off'}`}
                                onClick={() => setAgeSafe(!ageSafe)}
                            >
                                <div className="safe-toggle-track">
                                    <div className="safe-toggle-thumb" />
                                </div>
                                <span>{ageSafe ? 'Enabled' : 'Disabled'}</span>
                            </button>
                            {ageSafe && ageGroup && (
                                <span className="age-safe-label">
                                    <Shield size={11} />
                                    Showing content safe for {ageGroup === '7-12' ? 'ages 7–12' : ageGroup === '13-17' ? 'ages 13–17' : 'all ages'}
                                </span>
                            )}
                        </div>
                    </div>

                    {/* Distance Slider */}
                    <div className="filter-group">
                        <label className="filter-label">
                            <MapPin size={14} />
                            Maximum Distance
                        </label>
                        <div className="distance-slider-wrap">
                            <input
                                type="range"
                                min="0.5"
                                max="10"
                                step="0.5"
                                value={maxDistance}
                                onChange={(e) => setMaxDistance(Number(e.target.value))}
                                className="distance-slider"
                            />
                            <span className="distance-value">{maxDistance} km</span>
                        </div>
                        <div className="distance-markers">
                            <span>0.5 km</span>
                            <span>5 km</span>
                            <span>10 km</span>
                        </div>
                    </div>

                    {/* Type Toggles */}
                    <div className="filter-group">
                        <label className="filter-label">
                            <Filter size={14} />
                            Item Type
                        </label>
                        <div className="type-toggles">
                            {TYPES.map((t) => (
                                <button
                                    key={t.id}
                                    className={`type-toggle ${activeTypes.includes(t.id) ? 'active' : ''}`}
                                    onClick={() => toggleType(t.id)}
                                    style={activeTypes.includes(t.id) ? { borderColor: t.color, background: `${t.color}10`, color: t.color } : {}}
                                >
                                    <span className="type-toggle-emoji">{t.emoji}</span>
                                    {t.label}
                                </button>
                            ))}
                        </div>
                    </div>

                    {/* Sort */}
                    <div className="filter-group">
                        <label className="filter-label">Sort by</label>
                        <div className="sort-options">
                            {SORT_OPTIONS.map((s) => (
                                <button
                                    key={s.id}
                                    className={`sort-option ${sort === s.id ? 'active' : ''}`}
                                    onClick={() => setSort(s.id)}
                                >
                                    {s.label}
                                </button>
                            ))}
                        </div>
                    </div>

                    {/* Reset */}
                    <button
                        className="btn btn-ghost filter-reset"
                        onClick={() => {
                            setCategory('all'); setActiveTypes(['free', 'exchange', 'lend', 'sell'])
                            setMaxDistance(10); setSort('recent'); setAgeSafe(true)
                        }}
                    >
                        Reset all filters
                    </button>
                </div>
            )}

            {/* Category Pills */}
            <div className="browse-categories container">
                {CATEGORIES.map((c) => (
                    <button
                        key={c.id}
                        className={`category-pill ${category === c.id ? 'active' : ''}`}
                        onClick={() => setCategory(c.id)}
                    >
                        <span className="cat-emoji">{c.emoji}</span>
                        {c.label}
                    </button>
                ))}
            </div>

            {/* Results Bar */}
            <div className="browse-results-bar container">
                <span className="results-count">
                    {filteredItems.length} item{filteredItems.length !== 1 ? 's' : ''} found
                </span>
                <div className="view-toggle">
                    <button
                        className={`view-btn ${viewMode === 'grid' ? 'active' : ''}`}
                        onClick={() => setViewMode('grid')}
                    >
                        <Grid size={14} />
                    </button>
                    <button
                        className={`view-btn ${viewMode === 'list' ? 'active' : ''}`}
                        onClick={() => setViewMode('list')}
                    >
                        <List size={14} />
                    </button>
                </div>
            </div>

            {/* Items Grid / List */}
            <div className="container">
                {filteredItems.length > 0 ? (
                    <div className={`items-${viewMode}`}>
                        {filteredItems.map((item) => (
                            <Link key={item.id} to={`/item/${item.id}`} className={`item-card-${viewMode}`}>
                                <div className="item-card-image-wrap">
                                    <img src={item.image} alt={item.title} className="item-card-img" />
                                </div>
                                <div className="item-card-body">
                                    <div className="item-card-top">
                                        <h3>{item.title}</h3>
                                        <span
                                            className="item-type-badge"
                                            style={{ background: TYPE_STYLES[item.type].bg, color: TYPE_STYLES[item.type].color }}
                                        >
                                            {TYPE_STYLES[item.type].label}
                                        </span>
                                    </div>
                                    <p className="item-card-desc">{item.desc}</p>
                                    <div className="item-card-meta">
                                        <span className="item-user">
                                            <span className="item-avatar">{item.user[0]}</span>
                                            {item.user}
                                        </span>
                                        <span className="item-trust"><Star size={11} /> {item.trust}</span>
                                        <span className="item-distance"><MapPin size={11} /> {item.distance} km</span>
                                        <span className="item-time"><Clock size={11} /> {item.time}</span>
                                    </div>
                                </div>
                            </Link>
                        ))}
                    </div>
                ) : (
                    <div className="browse-empty">
                        <span className="browse-empty-emoji">🔍</span>
                        <h3>No items found</h3>
                        <p>Try adjusting your filters or search terms</p>
                        <button
                            className="btn btn-secondary"
                            onClick={() => {
                                setSearch(''); setCategory('all')
                                setActiveTypes(['free', 'exchange', 'lend', 'sell'])
                                setMaxDistance(10)
                            }}
                        >
                            Reset Filters
                        </button>
                    </div>
                )}
            </div>
        </div>
    )
}
