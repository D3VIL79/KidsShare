import { useState, useContext } from 'react'
import { Link, NavLink, Outlet, useNavigate } from 'react-router-dom'
import { ThemeContext, AgeContext, AuthContext } from '../contexts'
import {
    Share2, Sun, Moon, Home, Search, PlusCircle, MapPin, LayoutDashboard,
    ShieldCheck, User, MessageCircle, Menu, X, Shield, Eye, Lock, Heart,
    Bell, ShoppingBag, ArrowLeftRight, Sparkles, Gift, Calendar, Wallet,
    CreditCard, Receipt, Activity, Star, Flag, Users, BarChart3, Settings,
    FileText, Globe, Trophy, TrendingUp, MessageSquare, ChevronDown,
    ChevronRight, Layers, LogOut,
} from 'lucide-react'
import './Layout.css'
const kidshareLogo = '/kidshare.png'

const SIDEBAR_SECTIONS = [
    {
        label: 'Main',
        roles: ['kid', 'guardian', 'admin'],
        links: [
            { to: '/home', label: 'Home', icon: Home, roles: ['kid', 'guardian', 'admin'] },
            { to: '/browse', label: 'Explore', icon: Search, roles: ['kid', 'guardian', 'admin'] },
            { to: '/dashboard', label: 'Dashboard', icon: LayoutDashboard, roles: ['kid'] },
            { to: '/notifications', label: 'Notifications', icon: Bell, roles: ['kid', 'guardian', 'admin'] },
            { to: '/messages', label: 'Messages', icon: MessageCircle, roles: ['kid', 'guardian', 'admin'] },
            { to: '/profile', label: 'My Profile', icon: User, roles: ['kid', 'guardian', 'admin'] },
        ],
    },
    {
        label: 'Share & Exchange',
        roles: ['kid'],
        links: [
            { to: '/create', label: 'Share Item', icon: PlusCircle },
            { to: '/sell', label: 'Sell Item', icon: ShoppingBag },
            { to: '/lend', label: 'Lend / Rent', icon: Layers },
            { to: '/exchange', label: 'Exchange Builder', icon: ArrowLeftRight },
            { to: '/free-share', label: 'Free Share', icon: Gift },
            { to: '/suggestions', label: 'AI Suggestions', icon: Sparkles },
            { to: '/my-activity', label: 'My Activity', icon: Activity },
            { to: '/requests', label: 'Requests Inbox', icon: Receipt },
        ],
    },
    {
        label: 'Turf & Sports',
        roles: ['kid'],
        links: [
            { to: '/turf', label: 'Discover Turfs', icon: MapPin },
            { to: '/turf-calendar', label: 'Turf Calendar', icon: Calendar },
        ],
    },
    {
        label: 'Wallet',
        roles: ['kid'],
        links: [
            { to: '/wallet', label: 'Wallet Overview', icon: Wallet },
            { to: '/transactions', label: 'Transactions', icon: Receipt },
            { to: '/credits', label: 'Add / Withdraw', icon: CreditCard },
        ],
    },
    {
        label: 'Safety & Trust',
        roles: ['kid'],
        links: [
            { to: '/safety', label: 'Safety Guidelines', icon: Shield },
            { to: '/safety-center', label: 'Safety Center', icon: ShieldCheck },
            { to: '/trust-score', label: 'Trust Score', icon: Star },
            { to: '/disputes', label: 'Disputes', icon: Flag },
        ],
    },
    {
        label: 'Guardian Panel',
        roles: ['guardian'],
        links: [
            { to: '/guardian', label: 'Guardian Home', icon: Eye },
            { to: '/guardian/permissions', label: 'Permissions', icon: Lock },
            { to: '/guardian/approvals', label: 'Approvals', icon: ShieldCheck },
            { to: '/guardian/activity', label: 'Activity Log', icon: Activity },
            { to: '/guardian/settings', label: 'Guardian Settings', icon: Settings },
        ],
    },
    {
        label: 'Admin Panel',
        roles: ['admin'],
        links: [
            { to: '/admin', label: 'Admin Dashboard', icon: BarChart3 },
            { to: '/admin/users', label: 'User Management', icon: Users },
            { to: '/admin/moderation', label: 'Moderation', icon: Eye },
            { to: '/admin/disputes', label: 'Dispute Handling', icon: Flag },
            { to: '/admin/reports', label: 'Reports', icon: TrendingUp },
            { to: '/admin/settings', label: 'System Settings', icon: Settings },
        ],
    },
    {
        label: 'Community',
        roles: ['kid'],
        links: [
            { to: '/challenges', label: 'Challenges', icon: Trophy },
            { to: '/impact', label: 'Impact Dashboard', icon: Globe },
            { to: '/feedback', label: 'Feedback', icon: MessageSquare },
        ],
    },
    {
        label: 'Legal',
        roles: ['kid', 'guardian', 'admin'],
        links: [
            { to: '/about', label: 'About', icon: Globe },
            { to: '/privacy', label: 'Privacy Policy', icon: Lock },
            { to: '/terms', label: 'Terms & Conditions', icon: FileText },
        ],
    },
]

const TOP_NAV_ALL = [
    { to: '/home', label: 'Home', icon: Home, roles: ['kid', 'guardian', 'admin'] },
    { to: '/browse', label: 'Browse', icon: Search, roles: ['kid', 'guardian', 'admin'] },
    { to: '/create', label: 'Share', icon: PlusCircle, roles: ['kid'] },
    { to: '/turf', label: 'Turf', icon: MapPin, roles: ['kid'] },
    { to: '/dashboard', label: 'Dashboard', icon: LayoutDashboard, roles: ['kid'] },
    { to: '/guardian', label: 'Guardian', icon: Eye, roles: ['guardian'] },
    { to: '/admin', label: 'Admin', icon: BarChart3, roles: ['admin'] },
    { to: '/messages', label: 'Messages', icon: MessageCircle, roles: ['kid', 'guardian', 'admin'] },
]

const AGE_LABELS = { kids: '7–12', teens: '13–17', 'young-adults': '18–25' }

const ROLE_LABELS = { kid: '🧒 Kid', guardian: '👨‍👩‍👧 Guardian', admin: '🛡️ Admin' }

export default function Layout() {
    const { theme, toggleTheme } = useContext(ThemeContext)
    const { ageGroup } = useContext(AgeContext)
    const { user, logout } = useContext(AuthContext)
    const navigate = useNavigate()
    const [mobileNav, setMobileNav] = useState(false)
    const [sidebarOpen, setSidebarOpen] = useState(false)
    const [collapsedSections, setCollapsedSections] = useState({})

    const role = user?.role || 'kid'

    // Filter sections and links by role
    const filteredSections = SIDEBAR_SECTIONS
        .filter(section => section.roles.includes(role))
        .map(section => ({
            ...section,
            links: section.links.filter(link => !link.roles || link.roles.includes(role)),
        }))
        .filter(section => section.links.length > 0)

    const filteredTopNav = TOP_NAV_ALL.filter(link => link.roles.includes(role))

    const toggleSection = (label) => {
        setCollapsedSections(prev => ({ ...prev, [label]: !prev[label] }))
    }

    const handleLogout = () => {
        logout()
        navigate('/login')
    }

    return (
        <div className="app-layout">
            {/* Header */}
            <header className="header">
                <div className="header-inner">
                    <div className="header-left">
                        <button className="sidebar-toggle" onClick={() => setSidebarOpen(!sidebarOpen)} aria-label="Toggle sidebar">
                            <Menu size={18} />
                        </button>
                        <Link to="/home" className="header-logo">
                            <img src={kidshareLogo} alt="KidShare Logo" className="logo-img" />
                            <span className="header-logo-text">KidShare Hub</span>
                        </Link>
                        <nav className="header-nav">
                            {filteredTopNav.map((link) => (
                                <NavLink key={link.to} to={link.to} className={({ isActive }) => (isActive ? 'active' : '')}>
                                    <link.icon size={16} />
                                    <span className="hide-mobile">{link.label}</span>
                                </NavLink>
                            ))}
                        </nav>
                    </div>
                    <div className="header-right">
                        {user && (
                            <div className="header-role-badge">{ROLE_LABELS[role]}</div>
                        )}
                        {ageGroup && (
                            <div className="header-age-badge"><Shield size={12} />{AGE_LABELS[ageGroup] || ageGroup}</div>
                        )}
                        <button className="header-theme-btn" onClick={toggleTheme} aria-label="Toggle theme">
                            {theme === 'light' ? <Moon size={16} /> : <Sun size={16} />}
                        </button>
                        {user && (
                            <button className="header-logout-btn" onClick={handleLogout} aria-label="Logout" title="Logout">
                                <LogOut size={16} />
                            </button>
                        )}
                        <Link to="/profile" className="header-avatar-btn" aria-label="Profile">
                            {user?.email?.charAt(0).toUpperCase() || 'K'}
                        </Link>
                        <button className="header-menu-btn" onClick={() => setMobileNav(true)} aria-label="Open menu"><Menu size={18} /></button>
                    </div>
                </div>
            </header>

            {/* Sidebar */}
            <div className={`sidebar-overlay${sidebarOpen ? ' open' : ''}`} onClick={() => setSidebarOpen(false)} />
            <aside className={`sidebar${sidebarOpen ? ' open' : ''}`}>
                <div className="sidebar-header">
                    <Link to="/home" className="header-logo" onClick={() => setSidebarOpen(false)}>
                        <img src={kidshareLogo} alt="KidShare Logo" className="logo-img" />
                        <span className="header-logo-text">KidShare Hub</span>
                    </Link>
                    <button className="sidebar-close" onClick={() => setSidebarOpen(false)}><X size={18} /></button>
                </div>
                {user && (
                    <div className="sidebar-user-badge">
                        <span className="sidebar-user-role">{ROLE_LABELS[role]}</span>
                        <span className="sidebar-user-email">{user.email}</span>
                    </div>
                )}
                <nav className="sidebar-nav">
                    {filteredSections.map((section) => {
                        const isCollapsed = collapsedSections[section.label]
                        return (
                            <div key={section.label} className="sidebar-section">
                                <button className="sidebar-section-label" onClick={() => toggleSection(section.label)}>
                                    <span>{section.label}</span>
                                    <ChevronDown size={12} className={`sidebar-chev ${isCollapsed ? 'collapsed' : ''}`} />
                                </button>
                                {!isCollapsed && (
                                    <div className="sidebar-links">
                                        {section.links.map((link) => (
                                            <NavLink key={link.to} to={link.to} className={({ isActive }) => `sidebar-link${isActive ? ' active' : ''}`} onClick={() => setSidebarOpen(false)}>
                                                <link.icon size={15} />
                                                <span>{link.label}</span>
                                            </NavLink>
                                        ))}
                                    </div>
                                )}
                            </div>
                        )
                    })}
                </nav>
                {user && (
                    <div className="sidebar-logout">
                        <button className="sidebar-logout-btn" onClick={handleLogout}>
                            <LogOut size={16} />
                            <span>Logout</span>
                        </button>
                    </div>
                )}
            </aside>

            {/* Mobile Navigation */}
            <div className={`mobile-nav-overlay${mobileNav ? ' open' : ''}`} onClick={() => setMobileNav(false)}>
                <div className="mobile-nav" onClick={(e) => e.stopPropagation()}>
                    <button className="mobile-nav-close" onClick={() => setMobileNav(false)}><X size={20} /></button>
                    {user && (
                        <div className="mobile-user-badge">
                            <span>{ROLE_LABELS[role]}</span>
                            <span className="mobile-user-email">{user.email}</span>
                        </div>
                    )}
                    <div className="mobile-nav-scroll">
                        {filteredSections.map((section) => (
                            <div key={section.label} className="mobile-section">
                                <span className="mobile-section-label">{section.label}</span>
                                {section.links.map((link) => (
                                    <NavLink key={link.to} to={link.to} className={({ isActive }) => (isActive ? 'active' : '')} onClick={() => setMobileNav(false)}>
                                        <link.icon size={16} />{link.label}
                                    </NavLink>
                                ))}
                            </div>
                        ))}
                    </div>
                    {user && (
                        <div className="mobile-logout">
                            <button className="mobile-logout-btn" onClick={handleLogout}>
                                <LogOut size={16} /> Logout
                            </button>
                        </div>
                    )}
                </div>
            </div>

            {/* Main Content */}
            <main className="main-content">
                <Outlet />
            </main>

            {/* Footer */}
            <footer className="footer">
                <div className="footer-inner">
                    <div className="footer-brand">
                        <Link to="/home" className="header-logo">
                            <img src={kidshareLogo} alt="KidShare Logo" className="logo-img" />
                            <span className="header-logo-text">KidShare Hub</span>
                        </Link>
                        <p>A trusted community where kids & young adults can share, lend, and exchange items safely.</p>
                        <div className="footer-safety-badges">
                            <div className="footer-safety-badge green"><Shield size={14} /></div>
                            <div className="footer-safety-badge blue"><Eye size={14} /></div>
                            <div className="footer-safety-badge purple"><Lock size={14} /></div>
                        </div>
                    </div>
                    <div className="footer-col">
                        <h4>Explore</h4>
                        <Link to="/browse">Browse Items</Link>
                        {role === 'kid' && <Link to="/turf">Turf Sharing</Link>}
                        {role === 'kid' && <Link to="/create">Share an Item</Link>}
                        {role === 'kid' && <Link to="/challenges">Challenges</Link>}
                        {role === 'kid' && <Link to="/impact">Impact</Link>}
                    </div>
                    <div className="footer-col">
                        <h4>Account</h4>
                        {role === 'kid' && <Link to="/dashboard">Dashboard</Link>}
                        <Link to="/profile">My Profile</Link>
                        {role === 'kid' && <Link to="/wallet">Wallet</Link>}
                        <Link to="/messages">Messages</Link>
                        <Link to="/feedback">Feedback</Link>
                    </div>
                    <div className="footer-col">
                        <h4>Safety & Info</h4>
                        {role === 'kid' && <Link to="/safety-center">Safety Center</Link>}
                        {role === 'kid' && <Link to="/safety">Safety Guidelines</Link>}
                        <Link to="/about">About Us</Link>
                        <Link to="/privacy">Privacy Policy</Link>
                        <Link to="/terms">Terms & Conditions</Link>
                    </div>
                </div>
                <div className="footer-bottom">
                    <span>© 2026 KidShare Hub. Safety-first sharing.</span>
                    <span style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                        Made with <Heart size={12} color="var(--accent)" /> for communities
                    </span>
                </div>
            </footer>
        </div>
    )
}
