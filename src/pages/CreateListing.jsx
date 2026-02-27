import { useState, useContext } from 'react'
import { useNavigate } from 'react-router-dom'
import { AgeContext } from '../contexts'
import {
    Camera, Upload, Tag, Clock, DollarSign, Shield, Check,
    ChevronRight, AlertTriangle, Image, X, Sparkles,
    Gift, Repeat2, ShoppingBag, ArrowLeftRight,
    BookOpen, Gamepad2, Bike, Music, Palette, Wrench,
    Package, Info,
} from 'lucide-react'
import './CreateListing.css'

const CATEGORIES = [
    { id: 'books', label: 'Books', emoji: '📚', icon: BookOpen },
    { id: 'gaming', label: 'Gaming', emoji: '🎮', icon: Gamepad2 },
    { id: 'sports', label: 'Sports', emoji: '⚽', icon: Bike },
    { id: 'music', label: 'Music', emoji: '🎵', icon: Music },
    { id: 'art', label: 'Art & Craft', emoji: '🎨', icon: Palette },
    { id: 'tools', label: 'Tools & Tech', emoji: '🔧', icon: Wrench },
    { id: 'other', label: 'Other', emoji: '📦', icon: Package },
]

const SHARE_TYPES = [
    { id: 'free', label: 'Free Share', emoji: '🎁', icon: Gift, desc: 'Give away or lend for free', color: '#00b894' },
    { id: 'exchange', label: 'Exchange', emoji: '🔄', icon: ArrowLeftRight, desc: 'Swap for another item', color: '#e17055' },
    { id: 'lend', label: 'Rent / Lend', emoji: '🤝', icon: ShoppingBag, desc: 'Lend for a duration', color: '#6C5CE7' },
    { id: 'sell', label: 'Sell', emoji: '💰', icon: DollarSign, desc: 'Sell at a price', color: '#00CEC9' },
]

const DURATIONS = [
    { id: '1day', label: '1 Day' },
    { id: '3days', label: '3 Days' },
    { id: '1week', label: '1 Week' },
    { id: '2weeks', label: '2 Weeks' },
    { id: '1month', label: '1 Month' },
    { id: 'unlimited', label: 'No Limit' },
]

const AI_TAGS_MOCK = ['Paperback', 'Fiction', 'Young Adult', 'Series', 'Good Condition']

export default function CreateListing() {
    const navigate = useNavigate()
    const { ageGroup } = useContext(AgeContext)
    const needsGuardian = ageGroup === '7-12' || ageGroup === '13-17'

    const [step, setStep] = useState(1) // 1: Photos, 2: Details, 3: Sharing, 4: Review
    const [images, setImages] = useState([])
    const [aiTags, setAiTags] = useState([])
    const [showAiScan, setShowAiScan] = useState(false)
    const [title, setTitle] = useState('')
    const [description, setDescription] = useState('')
    const [category, setCategory] = useState('')
    const [condition, setCondition] = useState('')
    const [shareType, setShareType] = useState('')
    const [price, setPrice] = useState('')
    const [exchangeFor, setExchangeFor] = useState('')
    const [duration, setDuration] = useState('')
    const [guardianApproved, setGuardianApproved] = useState(false)
    const [submitted, setSubmitted] = useState(false)

    const simulateUpload = () => {
        const emojis = ['📚', '📖', '🧙‍♂️', '✨', '🎒', '🎮', '🏏', '🎨']
        if (images.length < 4) {
            const newImg = emojis[Math.floor(Math.random() * emojis.length)]
            setImages([...images, { emoji: newImg, id: Date.now() }])
            // Simulate AI tagging
            if (images.length === 0) {
                setShowAiScan(true)
                setTimeout(() => {
                    setAiTags(AI_TAGS_MOCK)
                    setShowAiScan(false)
                }, 1500)
            }
        }
    }

    const removeImage = (id) => {
        setImages(images.filter((img) => img.id !== id))
    }

    const canProceed = () => {
        if (step === 1) return images.length > 0
        if (step === 2) return title && category && condition
        if (step === 3) return shareType && ((shareType === 'lend' || shareType === 'sell') ? price : true) && duration
        return true
    }

    const handleSubmit = () => {
        setSubmitted(true)
        setTimeout(() => navigate('/dashboard'), 2500)
    }

    if (submitted) {
        return (
            <div className="container create-page">
                <div className="create-success">
                    <div className="create-success-icon"><Sparkles size={48} /></div>
                    <h2>Listing Created! 🎉</h2>
                    <p>
                        {needsGuardian && !guardianApproved
                            ? 'Your listing is pending guardian approval before it goes live.'
                            : 'Your item is now live and visible to the community!'}
                    </p>
                    {needsGuardian && !guardianApproved && (
                        <div className="guardian-pending-notice">
                            <Shield size={16} />
                            <span>A notification has been sent to your guardian for approval.</span>
                        </div>
                    )}
                </div>
            </div>
        )
    }

    return (
        <div className="container create-page">
            {/* Header */}
            <div className="create-header">
                <h1><Package size={24} /> Create a Listing</h1>
                <p>Share, exchange, or sell items with your community</p>
            </div>

            {/* Stepper */}
            <div className="create-stepper">
                {['Photos', 'Details', 'Sharing', 'Review'].map((s, i) => {
                    const num = i + 1
                    return (
                        <div key={s} className={`step-item ${step === num ? 'active' : step > num ? 'done' : ''}`}>
                            <div className="step-circle">
                                {step > num ? <Check size={14} /> : num}
                            </div>
                            <span className="step-text">{s}</span>
                            {i < 3 && <div className="step-line" />}
                        </div>
                    )
                })}
            </div>

            {/* ===== Step 1: Photos ===== */}
            {step === 1 && (
                <section className="create-section">
                    <h2>📸 Add Photos</h2>
                    <p className="create-section-desc">Upload up to 4 photos. Our AI will automatically tag your item.</p>

                    <div className="photo-upload-grid">
                        {images.map((img) => (
                            <div key={img.id} className="upload-preview">
                                <span className="upload-preview-emoji">{img.emoji}</span>
                                <button className="upload-remove" onClick={() => removeImage(img.id)}>
                                    <X size={12} />
                                </button>
                            </div>
                        ))}
                        {images.length < 4 && (
                            <button className="upload-add" onClick={simulateUpload}>
                                <Camera size={22} />
                                <span>Add Photo</span>
                            </button>
                        )}
                    </div>

                    {/* AI Scanning */}
                    {showAiScan && (
                        <div className="ai-scan-bar">
                            <div className="ai-scan-spinner" />
                            <span>AI is analyzing your image...</span>
                        </div>
                    )}

                    {/* AI Tags */}
                    {aiTags.length > 0 && (
                        <div className="ai-tags-section">
                            <div className="ai-tags-header">
                                <Sparkles size={14} />
                                <span>AI-Generated Tags</span>
                            </div>
                            <div className="ai-tags-list">
                                {aiTags.map((tag) => (
                                    <span key={tag} className="ai-tag">
                                        <Tag size={11} /> {tag}
                                    </span>
                                ))}
                            </div>
                            <p className="ai-tags-note">These tags help others find your item. You can edit them in the next step.</p>
                        </div>
                    )}
                </section>
            )}

            {/* ===== Step 2: Details ===== */}
            {step === 2 && (
                <section className="create-section">
                    <h2>📝 Item Details</h2>

                    <div className="create-field">
                        <label>Title *</label>
                        <input
                            type="text"
                            value={title}
                            onChange={(e) => setTitle(e.target.value)}
                            placeholder="e.g., Harry Potter Box Set"
                            maxLength={60}
                        />
                        <span className="field-hint">{title.length}/60</span>
                    </div>

                    <div className="create-field">
                        <label>Description</label>
                        <textarea
                            value={description}
                            onChange={(e) => setDescription(e.target.value)}
                            placeholder="Describe the item, its condition, and any special details..."
                            rows={4}
                        />
                    </div>

                    <div className="create-field">
                        <label>Category *</label>
                        <div className="category-select-grid">
                            {CATEGORIES.map((c) => (
                                <button
                                    key={c.id}
                                    className={`category-select-btn ${category === c.id ? 'selected' : ''}`}
                                    onClick={() => setCategory(c.id)}
                                >
                                    <span>{c.emoji}</span>
                                    <span>{c.label}</span>
                                </button>
                            ))}
                        </div>
                    </div>

                    <div className="create-field">
                        <label>Condition *</label>
                        <div className="condition-options">
                            {['New', 'Like New', 'Good', 'Fair'].map((c) => (
                                <button
                                    key={c}
                                    className={`condition-btn ${condition === c ? 'selected' : ''}`}
                                    onClick={() => setCondition(c)}
                                >
                                    {c}
                                </button>
                            ))}
                        </div>
                    </div>

                    {/* AI Tags edit */}
                    {aiTags.length > 0 && (
                        <div className="create-field">
                            <label><Sparkles size={13} /> AI Tags</label>
                            <div className="ai-tags-list editable">
                                {aiTags.map((tag) => (
                                    <span key={tag} className="ai-tag removable">
                                        {tag}
                                        <button onClick={() => setAiTags(aiTags.filter((t) => t !== tag))}>
                                            <X size={10} />
                                        </button>
                                    </span>
                                ))}
                            </div>
                        </div>
                    )}
                </section>
            )}

            {/* ===== Step 3: Sharing ===== */}
            {step === 3 && (
                <section className="create-section">
                    <h2>🤝 Sharing Options</h2>

                    <div className="create-field">
                        <label>Share Type *</label>
                        <div className="share-type-grid">
                            {SHARE_TYPES.map((t) => (
                                <button
                                    key={t.id}
                                    className={`share-type-card ${shareType === t.id ? 'selected' : ''}`}
                                    onClick={() => setShareType(t.id)}
                                    style={shareType === t.id ? { borderColor: t.color, background: `${t.color}0a` } : {}}
                                >
                                    <span className="share-type-emoji">{t.emoji}</span>
                                    <span className="share-type-label">{t.label}</span>
                                    <span className="share-type-desc">{t.desc}</span>
                                </button>
                            ))}
                        </div>
                    </div>

                    {/* Price (for lend/sell) */}
                    {(shareType === 'lend' || shareType === 'sell') && (
                        <div className="create-field">
                            <label>{shareType === 'sell' ? 'Price' : 'Rent per day'} *</label>
                            <div className="price-input-wrap">
                                <span className="price-symbol">₹</span>
                                <input
                                    type="number"
                                    value={price}
                                    onChange={(e) => setPrice(e.target.value)}
                                    placeholder={shareType === 'sell' ? '150' : '50'}
                                    min="0"
                                    max="10000"
                                />
                            </div>
                        </div>
                    )}

                    {/* Exchange For */}
                    {shareType === 'exchange' && (
                        <div className="create-field">
                            <label>What would you like in exchange?</label>
                            <input
                                type="text"
                                value={exchangeFor}
                                onChange={(e) => setExchangeFor(e.target.value)}
                                placeholder="e.g., Percy Jackson set, any board game..."
                            />
                        </div>
                    )}

                    {/* Duration */}
                    <div className="create-field">
                        <label><Clock size={13} /> Duration *</label>
                        <div className="duration-options">
                            {DURATIONS.map((d) => (
                                <button
                                    key={d.id}
                                    className={`duration-btn ${duration === d.id ? 'selected' : ''}`}
                                    onClick={() => setDuration(d.id)}
                                >
                                    {d.label}
                                </button>
                            ))}
                        </div>
                    </div>

                    {/* Guardian Approval */}
                    {needsGuardian && (
                        <div className="guardian-flag">
                            <Shield size={18} />
                            <div className="guardian-flag-content">
                                <h4>Guardian Approval Required</h4>
                                <p>Since you're under 18, a guardian needs to approve this listing before it goes live.</p>
                                <label className="guardian-check-label">
                                    <input
                                        type="checkbox"
                                        checked={guardianApproved}
                                        onChange={(e) => setGuardianApproved(e.target.checked)}
                                    />
                                    <span>I have my guardian's permission to share this item</span>
                                </label>
                            </div>
                        </div>
                    )}
                </section>
            )}

            {/* ===== Step 4: Review ===== */}
            {step === 4 && (
                <section className="create-section">
                    <h2>✅ Review Your Listing</h2>

                    <div className="review-card">
                        <div className="review-photos">
                            {images.map((img) => (
                                <span key={img.id} className="review-photo">{img.emoji}</span>
                            ))}
                        </div>
                        <h3>{title || 'Untitled'}</h3>
                        {description && <p className="review-desc">{description}</p>}
                        <div className="review-details">
                            <span>📂 {CATEGORIES.find((c) => c.id === category)?.label || '—'}</span>
                            <span>📦 {condition || '—'}</span>
                            <span>
                                {SHARE_TYPES.find((t) => t.id === shareType)?.emoji}{' '}
                                {SHARE_TYPES.find((t) => t.id === shareType)?.label || '—'}
                            </span>
                            {price && <span>💰 ₹{price}{shareType === 'lend' ? '/day' : ''}</span>}
                            {exchangeFor && <span>🔄 For: {exchangeFor}</span>}
                            <span>⏱️ {DURATIONS.find((d) => d.id === duration)?.label || '—'}</span>
                        </div>
                        {aiTags.length > 0 && (
                            <div className="review-tags">
                                {aiTags.map((tag) => (
                                    <span key={tag} className="review-tag">{tag}</span>
                                ))}
                            </div>
                        )}
                    </div>

                    {needsGuardian && (
                        <div className="review-guardian-notice">
                            <Shield size={14} />
                            <span>
                                {guardianApproved
                                    ? 'Guardian permission confirmed. Listing will go live after final approval.'
                                    : 'A notification will be sent to your guardian for approval.'}
                            </span>
                        </div>
                    )}
                </section>
            )}

            {/* Navigation */}
            <div className="create-nav">
                {step > 1 && (
                    <button className="btn btn-ghost" onClick={() => setStep(step - 1)}>
                        Back
                    </button>
                )}
                <div style={{ flex: 1 }} />
                {step < 4 ? (
                    <button
                        className="btn btn-primary"
                        disabled={!canProceed()}
                        onClick={() => setStep(step + 1)}
                        style={{ opacity: canProceed() ? 1 : 0.5 }}
                    >
                        Continue <ChevronRight size={16} />
                    </button>
                ) : (
                    <button className="btn btn-primary btn-lg" onClick={handleSubmit}>
                        <Sparkles size={16} /> Publish Listing
                    </button>
                )}
            </div>
        </div>
    )
}
