import { useState } from 'react'
import {
    MessageSquare, Star, Send, ThumbsUp, Lightbulb,
    Bug, Sparkles, Check, ChevronDown,
} from 'lucide-react'
import './FeedbackPage.css'

const CATEGORIES = [
    { id: 'feature', label: '✨ Feature Request', icon: Sparkles, color: '#6C5CE7' },
    { id: 'bug', label: '🐛 Bug Report', icon: Bug, color: '#e17055' },
    { id: 'idea', label: '💡 Improvement Idea', icon: Lightbulb, color: '#FDCB6E' },
    { id: 'praise', label: '👍 Praise / Appreciate', icon: ThumbsUp, color: '#00b894' },
]

const PAST_FEEDBACK = [
    { id: 1, cat: 'feature', title: 'Add dark mode to chat', votes: 42, status: 'implemented', date: 'Jan 2026' },
    { id: 2, cat: 'bug', title: 'Calendar dots not showing on mobile', votes: 18, status: 'fixed', date: 'Feb 2026' },
    { id: 3, cat: 'idea', title: 'Allow custom avatar uploads', votes: 63, status: 'planned', date: 'Dec 2025' },
    { id: 4, cat: 'feature', title: 'Group exchange feature', votes: 37, status: 'under-review', date: 'Feb 2026' },
    { id: 5, cat: 'praise', title: 'Love the safety features!', votes: 89, status: 'noted', date: 'Jan 2026' },
]

export default function FeedbackPage() {
    const [category, setCategory] = useState('')
    const [title, setTitle] = useState('')
    const [desc, setDesc] = useState('')
    const [rating, setRating] = useState(0)
    const [submitted, setSubmitted] = useState(false)

    const handleSubmit = () => { if (category && title) { setSubmitted(true); setTimeout(() => { setSubmitted(false); setCategory(''); setTitle(''); setDesc(''); setRating(0) }, 2500) } }

    return (
        <div className="fb-page">
            <div className="container">
                <div className="fb-header">
                    <h1><MessageSquare size={22} /> Feedback & Suggestions</h1>
                    <p>Help us make KidShare Hub better — every voice matters!</p>
                </div>

                <div className="fb-layout">
                    <div className="fb-form-section">
                        <h2>Submit Feedback</h2>

                        <div className="fb-cats">
                            {CATEGORIES.map(c => {
                                const CIcon = c.icon
                                return (
                                    <button key={c.id} className={`fb-cat-btn ${category === c.id ? 'active' : ''}`} style={category === c.id ? { borderColor: c.color, background: `${c.color}08` } : {}} onClick={() => setCategory(c.id)}>
                                        <CIcon size={14} style={{ color: c.color }} /> {c.label}
                                    </button>
                                )
                            })}
                        </div>

                        <label>Title</label>
                        <input className="fb-input" placeholder="Brief summary of your feedback" value={title} onChange={e => setTitle(e.target.value)} />

                        <label>Description (optional)</label>
                        <textarea className="fb-textarea" placeholder="Tell us more..." rows={4} value={desc} onChange={e => setDesc(e.target.value)} />

                        <label>Rate your experience</label>
                        <div className="fb-stars">
                            {[1, 2, 3, 4, 5].map(s => (
                                <Star key={s} size={22} className={`fb-star ${s <= rating ? 'filled' : ''}`} onClick={() => setRating(s)} fill={s <= rating ? '#FDCB6E' : 'none'} color={s <= rating ? '#FDCB6E' : 'var(--text-tertiary)'} />
                            ))}
                        </div>

                        <button className="btn btn-primary fb-submit" onClick={handleSubmit} disabled={!category || !title}>
                            {submitted ? <><Check size={14} /> Thank You!</> : <><Send size={14} /> Submit Feedback</>}
                        </button>
                    </div>

                    <div className="fb-sidebar">
                        <h2>Community Suggestions</h2>
                        <div className="fb-past-list">
                            {PAST_FEEDBACK.map(f => (
                                <div key={f.id} className="fb-past-card">
                                    <div className="fb-past-top">
                                        <span className={`fb-past-cat ${f.cat}`}>
                                            {f.cat === 'feature' ? '✨' : f.cat === 'bug' ? '🐛' : f.cat === 'idea' ? '💡' : '👍'}
                                        </span>
                                        <h4>{f.title}</h4>
                                    </div>
                                    <div className="fb-past-footer">
                                        <span className="fb-votes"><ThumbsUp size={10} /> {f.votes}</span>
                                        <span className={`fb-fstatus ${f.status}`}>{f.status.replace('-', ' ')}</span>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
