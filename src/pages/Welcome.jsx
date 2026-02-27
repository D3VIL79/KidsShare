import { useState, useContext } from 'react'
import { useNavigate } from 'react-router-dom'
import { ThemeContext, AgeContext } from '../contexts'
import {
    Share2,
    Sun,
    Moon,
    Shield,
    Eye,
    Lock,
    ChevronRight,
    Check,
    Heart,
    Users,
    ShieldCheck
} from 'lucide-react'
import './Welcome.css'

const AGE_GROUPS = [
    {
        id: 'kids',
        range: '7 – 12',
        label: 'Little Explorers',
        emoji: '🧒',
        needsGuardian: true,
    },
    {
        id: 'teens',
        range: '13 – 17',
        label: 'Teen Squad',
        emoji: '🧑‍🎓',
        needsGuardian: true,
    },
    {
        id: 'young-adults',
        range: '18 – 25',
        label: 'Young Adults',
        emoji: '🎓',
        needsGuardian: false,
    },
]

const TRUST_BADGES = [
    { icon: ShieldCheck, text: 'Privacy-First Design', color: 'green' },
    { icon: Eye, text: 'No Public Exposure', color: 'blue' },
    { icon: Lock, text: 'Safe & Moderated', color: 'purple' },
]

export default function Welcome() {
    const { theme, toggleTheme } = useContext(ThemeContext)
    const { setAgeGroup } = useContext(AgeContext)
    const [selected, setSelected] = useState(null)
    const navigate = useNavigate()

    const handleSelect = (group) => {
        setSelected(group.id)
        setAgeGroup(group.id)
    }

    const handleContinue = () => {
        if (!selected) return
        navigate('/home')
    }

    const selectedGroup = AGE_GROUPS.find((g) => g.id === selected)
    const showGuardian = selectedGroup?.needsGuardian

    return (
        <div className="welcome-page">
            {/* Background orbs */}
            <div className="welcome-bg">
                <div className="welcome-orb welcome-orb-1" />
                <div className="welcome-orb welcome-orb-2" />
            </div>

            {/* Theme toggle */}
            <button
                className="welcome-theme-toggle"
                onClick={toggleTheme}
                aria-label="Toggle theme"
            >
                {theme === 'light' ? <Moon size={18} /> : <Sun size={18} />}
            </button>

            <div className="welcome-content">
                {/* Logo */}
                <div className="welcome-logo">
                    <div className="welcome-logo-icon">
                        <Share2 size={28} strokeWidth={2.5} />
                    </div>
                    <span className="welcome-logo-text">KidShare Hub</span>
                </div>

                {/* Heading */}
                <h1 className="welcome-heading">
                    Share, Swap &<br />
                    <span>Connect Safely</span>
                </h1>

                <p className="welcome-subtitle">
                    A trusted community where kids & young adults can share, lend, and
                    exchange items — all in a safe, moderated environment.
                </p>

                {/* Age Group Selector */}
                <div className="age-selector">
                    <span className="age-selector-label">Select your age group</span>
                    <div className="age-cards">
                        {AGE_GROUPS.map((group) => (
                            <div
                                key={group.id}
                                className={`age-card${selected === group.id ? ' selected' : ''}`}
                                onClick={() => handleSelect(group)}
                                role="button"
                                tabIndex={0}
                                onKeyDown={(e) => e.key === 'Enter' && handleSelect(group)}
                            >
                                {selected === group.id && (
                                    <div className="age-card-check">
                                        <Check size={13} strokeWidth={3} />
                                    </div>
                                )}
                                <span className="age-card-emoji">{group.emoji}</span>
                                <span className="age-card-range">{group.range}</span>
                                <span className="age-card-label">{group.label}</span>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Guardian CTA (shown when under-18 selected) */}
                {showGuardian && (
                    <div className="guardian-cta" key={selected}>
                        <div className="guardian-banner">
                            <div className="guardian-icon">
                                <Users size={20} />
                            </div>
                            <div className="guardian-text">
                                <h4>Continue with a Guardian</h4>
                                <p>
                                    Users under 18 need a parent or guardian to approve their
                                    account for a safe experience.
                                </p>
                            </div>
                            <ChevronRight size={18} style={{ color: 'var(--text-tertiary)', flexShrink: 0 }} />
                        </div>
                    </div>
                )}

                {/* Action Buttons */}
                <div className="welcome-actions">
                    <button
                        className="btn btn-primary btn-lg"
                        onClick={() => navigate('/login')}
                    >
                        <Heart size={18} />
                        Get Started
                    </button>
                    <button
                        className="btn btn-secondary btn-lg"
                        onClick={() => navigate('/login')}
                    >
                        I have an account
                    </button>
                </div>

                {/* Trust Badges */}
                <div className="trust-badges">
                    {TRUST_BADGES.map((badge, i) => (
                        <div className="trust-badge" key={i}>
                            <div className={`trust-badge-icon ${badge.color}`}>
                                <badge.icon size={14} />
                            </div>
                            <span>{badge.text}</span>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    )
}
