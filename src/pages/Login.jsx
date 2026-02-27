import { useState, useContext } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import {
    Mail, Shield, ArrowRight, Loader2,
    Baby, Users, ShieldCheck, BookOpen, Sparkles,
} from 'lucide-react'
import { AuthContext } from '../contexts'
import './Auth.css'

const ROLES = [
    {
        id: 'kid',
        label: 'Kid',
        emoji: '🧒',
        icon: Baby,
        color: '#6C5CE7',
        gradient: 'linear-gradient(135deg, #6C5CE7 0%, #A29BFE 100%)',
        tagline: 'Share, swap & explore!',
        redirectTo: '/home',
    },
    {
        id: 'guardian',
        label: 'Guardian',
        emoji: '👨‍👩‍👧',
        icon: Users,
        color: '#00CEC9',
        gradient: 'linear-gradient(135deg, #00CEC9 0%, #81ECEC 100%)',
        tagline: 'Keep your kids safe',
        redirectTo: '/guardian',
    },
    {
        id: 'admin',
        label: 'Admin',
        emoji: '🛡️',
        icon: ShieldCheck,
        color: '#E17055',
        gradient: 'linear-gradient(135deg, #E17055 0%, #FDCB6E 100%)',
        tagline: 'Manage the platform',
        redirectTo: '/admin',
    },
]

export default function Login() {
    const { login } = useContext(AuthContext)
    const navigate = useNavigate()
    const [activeRole, setActiveRole] = useState(0)
    const [email, setEmail] = useState('')
    const [loading, setLoading] = useState(false)
    const [flipDir, setFlipDir] = useState('right') // 'left' | 'right'
    const [flipping, setFlipping] = useState(false)

    const role = ROLES[activeRole]

    const handleTabClick = (index) => {
        if (index === activeRole || flipping) return
        setFlipDir(index > activeRole ? 'right' : 'left')
        setFlipping(true)
        setTimeout(() => {
            setActiveRole(index)
            setTimeout(() => setFlipping(false), 400)
        }, 350)
    }

    const handleLogin = (e) => {
        e.preventDefault()
        if (!email.trim()) return
        setLoading(true)
        setTimeout(() => {
            login(email.trim(), role.id)
            navigate(role.redirectTo)
        }, 800)
    }

    return (
        <div className="auth-page book-login-page">
            {/* Background decorations */}
            <div className="book-bg-orb book-bg-orb-1" />
            <div className="book-bg-orb book-bg-orb-2" />
            <div className="book-bg-orb book-bg-orb-3" />

            <div className="book-login-wrapper">
                {/* Brand Header */}
                <div className="book-brand">
                    <div className="book-brand-icon">
                        <BookOpen size={28} strokeWidth={2.2} />
                    </div>
                    <h1>KidShare Hub</h1>
                    <p>Choose your role & sign in</p>
                </div>

                {/* Role Tabs */}
                <div className="book-role-tabs">
                    {ROLES.map((r, i) => (
                        <button
                            key={r.id}
                            className={`book-role-tab${activeRole === i ? ' active' : ''}`}
                            onClick={() => handleTabClick(i)}
                            style={{
                                '--tab-color': r.color,
                                '--tab-gradient': r.gradient,
                            }}
                        >
                            <span className="book-role-tab-emoji">{r.emoji}</span>
                            <span className="book-role-tab-label">{r.label}</span>
                        </button>
                    ))}
                    <div
                        className="book-tab-indicator"
                        style={{
                            transform: `translateX(${activeRole * 100}%)`,
                            background: role.gradient,
                        }}
                    />
                </div>

                {/* Book Container */}
                <div className="book-container">
                    <div className="book-spine" style={{ background: role.gradient }} />
                    <div className={`book-page-wrapper ${flipping ? `flip-${flipDir}` : 'idle'}`}>
                        {/* Page Content */}
                        <div className="book-page">
                            {/* Page header with role icon */}
                            <div className="book-page-header" style={{ background: role.gradient }}>
                                <div className="book-page-role-icon">
                                    <role.icon size={32} />
                                </div>
                                <h2>{role.label} Login</h2>
                                <p>{role.tagline}</p>
                                <div className="book-page-sparkle">
                                    <Sparkles size={16} />
                                </div>
                            </div>

                            {/* Form */}
                            <form className="book-page-form" onSubmit={handleLogin}>
                                <div className="book-field">
                                    <label>
                                        <Mail size={14} />
                                        Email Address
                                    </label>
                                    <input
                                        type="email"
                                        value={email}
                                        onChange={(e) => setEmail(e.target.value)}
                                        placeholder={`Enter your ${role.label.toLowerCase()} email`}
                                        autoComplete="email"
                                        required
                                    />
                                </div>

                                <button
                                    type="submit"
                                    className="book-login-btn"
                                    disabled={!email.trim() || loading}
                                    style={{ background: role.gradient }}
                                >
                                    {loading ? (
                                        <>
                                            <Loader2 size={18} className="spin" />
                                            Signing in...
                                        </>
                                    ) : (
                                        <>
                                            Sign In as {role.label}
                                            <ArrowRight size={18} />
                                        </>
                                    )}
                                </button>
                            </form>

                            {/* Page number decoration */}
                            <div className="book-page-number">
                                <span>{activeRole + 1}</span> / <span>{ROLES.length}</span>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Footer */}
                <div className="book-login-footer">
                    <p>
                        Don't have an account?{' '}
                        <Link to="/signup">Sign Up</Link>
                    </p>
                    <div className="book-safety-line">
                        <Shield size={13} />
                        Protected by KidShare Safety
                    </div>
                </div>
            </div>
        </div>
    )
}
