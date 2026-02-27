import { Heart, Shield, Users, Star, Globe, Zap, Award, Target } from 'lucide-react'
import './AboutPage.css'

const VALUES = [
    { icon: Shield, title: 'Safety First', desc: 'Every feature is built with child safety at its core — from AI content moderation to guardian controls.', color: '#e17055' },
    { icon: Users, title: 'Community Driven', desc: 'We believe in the power of sharing. Our platform connects young people to exchange, learn, and grow together.', color: '#6C5CE7' },
    { icon: Heart, title: 'Inclusive by Design', desc: 'Age-appropriate experiences for everyone, from 7-year-olds sharing toys to 25-year-olds trading skills.', color: '#00b894' },
    { icon: Zap, title: 'Sustainability', desc: 'Reduce waste and promote reuse. Every exchange is a step toward a more sustainable future.', color: '#FDCB6E' },
]

const STATS_ABOUT = [
    { value: '12,000+', label: 'Active Users' },
    { value: '8,000+', label: 'Items Exchanged' },
    { value: '94%', label: 'Safety Score' },
    { value: '3', label: 'Age Groups Served' },
]

const TEAM = [
    { name: 'Aarav Mehta', role: 'Founder & CEO', emoji: '🚀' },
    { name: 'Diya Sharma', role: 'Head of Safety', emoji: '🛡️' },
    { name: 'Rohan Patel', role: 'Lead Developer', emoji: '💻' },
    { name: 'Isha Gupta', role: 'Community Lead', emoji: '🌟' },
]

export default function AboutPage() {
    return (
        <div className="about-page">
            <div className="container">
                <div className="abt-hero">
                    <span className="abt-badge"><Globe size={12} /> About Us</span>
                    <h1>Making Sharing <span className="abt-gradient">Safe, Fun & Smart</span></h1>
                    <p>KidShare Hub is India's first age-verified sharing economy platform built exclusively for young people — connecting communities through safe exchanges, rentals, and shared experiences.</p>
                </div>

                <div className="abt-stats">
                    {STATS_ABOUT.map(s => (
                        <div key={s.label} className="abt-stat"><strong>{s.value}</strong><span>{s.label}</span></div>
                    ))}
                </div>

                <div className="abt-section">
                    <h2><Target size={16} /> Our Mission</h2>
                    <p>To empower young people with a trusted platform where they can share, exchange, and learn the values of community, sustainability, and responsibility — all while staying protected in a safe, age-appropriate digital environment.</p>
                </div>

                <div className="abt-values-section">
                    <h2><Star size={16} /> Our Values</h2>
                    <div className="abt-values">
                        {VALUES.map(v => {
                            const VIcon = v.icon
                            return (
                                <div key={v.title} className="abt-value-card">
                                    <div className="abt-val-icon" style={{ background: `${v.color}12`, color: v.color }}><VIcon size={20} /></div>
                                    <h3>{v.title}</h3>
                                    <p>{v.desc}</p>
                                </div>
                            )
                        })}
                    </div>
                </div>

                <div className="abt-section">
                    <h2><Award size={16} /> How It Works</h2>
                    <div className="abt-steps">
                        {['Sign Up & Verify', 'List or Browse Items', 'Match & Exchange', 'Rate & Build Trust'].map((s, i) => (
                            <div key={s} className="abt-step"><span className="abt-step-num">{i + 1}</span><span>{s}</span></div>
                        ))}
                    </div>
                </div>

                <div className="abt-team-section">
                    <h2><Users size={16} /> Our Team</h2>
                    <div className="abt-team">
                        {TEAM.map(t => (
                            <div key={t.name} className="abt-team-card">
                                <span className="abt-team-emoji">{t.emoji}</span>
                                <h4>{t.name}</h4>
                                <span>{t.role}</span>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    )
}
