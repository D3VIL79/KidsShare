import { useState, useRef, useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import {
    Share2, Mail, Lock, User, Shield, Users, Phone, School,
    ArrowRight, ArrowLeft, Check, CheckCircle, Calendar,
    KeyRound, Smartphone, Loader2, AlertCircle, Eye, EyeOff,
    Heart,
} from 'lucide-react'
import './Auth.css'

const STEPS_LABELS = ['Your Info', 'Verify Age', 'Set Password', 'Guardian']
const AGE_GROUPS = [
    {
        id: 'kids', range: '7 – 12', emoji: '🧒', label: 'Little Explorer',
        needsGuardian: true, desc: 'Full guardian supervision & approval required',
    },
    {
        id: 'teens', range: '13 – 17', emoji: '🧑‍🎓', label: 'Teen Squad',
        needsGuardian: true, desc: 'Guardian consent needed, limited wallet access',
    },
    {
        id: 'young-adults', range: '18 – 25', emoji: '🎓', label: 'Young Adult',
        needsGuardian: false, desc: 'Full platform access, no guardian required',
    },
]

const SIGNUP_METHODS = [
    { id: 'email', label: 'Email', icon: Mail, placeholder: 'your@email.com', type: 'email' },
    { id: 'school', label: 'School ID', icon: School, placeholder: 'e.g. STU-2026-0412', type: 'text' },
    { id: 'phone', label: 'Phone', icon: Phone, placeholder: '•••••  •••10', type: 'tel' },
]

export default function Signup() {
    const navigate = useNavigate()
    const [step, setStep] = useState(0)
    const [method, setMethod] = useState('email')
    const [form, setForm] = useState({
        name: '',
        credential: '',
        password: '',
        dob: '',
        guardianEmail: '',
        guardianPhone: '',
    })
    const [ageGroup, setAgeGroup] = useState(null)
    const [showPass, setShowPass] = useState(false)
    const [otpSent, setOtpSent] = useState(false)
    const [otp, setOtp] = useState(['', '', '', '', '', ''])
    const [otpVerified, setOtpVerified] = useState(false)
    const [timer, setTimer] = useState(30)
    const [showResend, setShowResend] = useState(false)
    const [verifying, setVerifying] = useState(false)
    const otpRefs = useRef([])

    const selectedGroup = AGE_GROUPS.find((g) => g.id === ageGroup)
    const totalSteps = selectedGroup?.needsGuardian ? 4 : 3

    // OTP countdown
    useEffect(() => {
        if (!otpSent || otpVerified) return
        setTimeout(() => {
            setTimer(30)
            setShowResend(false)
        }, 0)
        const interval = setInterval(() => {
            setTimer((t) => {
                if (t <= 1) { clearInterval(interval); setShowResend(true); return 0 }
                return t - 1
            })
        }, 1000)
        return () => clearInterval(interval)
    }, [otpSent, otpVerified])

    const formatPhone = (val) => {
        const digits = val.replace(/\D/g, '').slice(0, 10)
        if (digits.length <= 5) return digits
        return '•'.repeat(Math.min(digits.length - 2, 5)) + ' ' + digits.slice(-2)
    }

    const handleOtpChange = (index, value) => {
        if (!/^\d?$/.test(value)) return
        const next = [...otp]
        next[index] = value
        setOtp(next)
        if (value && index < 5) otpRefs.current[index + 1]?.focus()
    }

    const handleOtpKeyDown = (index, e) => {
        if (e.key === 'Backspace' && !otp[index] && index > 0)
            otpRefs.current[index - 1]?.focus()
    }

    const handleOtpPaste = (e) => {
        e.preventDefault()
        const pasted = e.clipboardData.getData('text').replace(/\D/g, '').slice(0, 6)
        const next = [...otp]
        pasted.split('').forEach((ch, i) => { next[i] = ch })
        setOtp(next)
    }

    const handleVerifyOtp = () => {
        if (otp.some((d) => !d)) return
        setVerifying(true)
        setTimeout(() => { setVerifying(false); setOtpVerified(true) }, 1200)
    }

    const handleResend = () => {
        setOtp(['', '', '', '', '', ''])
        setTimer(30)
        setShowResend(false)
        const interval = setInterval(() => {
            setTimer((t) => {
                if (t <= 1) { clearInterval(interval); setShowResend(true); return 0 }
                return t - 1
            })
        }, 1000)
    }

    // Calculate age from DOB
    const [age, setAge] = useState(null)
    useEffect(() => {
        if (!form.dob) { setTimeout(() => setAge(null), 0); return }
        const diff = Date.now() - new Date(form.dob).getTime()
        const calculatedAge = Math.floor(diff / (365.25 * 24 * 60 * 60 * 1000))
        setTimeout(() => setAge(calculatedAge), 0)
    }, [form.dob])

    // Auto-select age group from DOB
    const handleDobChange = (val) => {
        setForm({ ...form, dob: val })
        const dob = new Date(val)
        const age = Math.floor((Date.now() - dob.getTime()) / (365.25 * 24 * 60 * 60 * 1000))
        if (age >= 7 && age <= 12) setAgeGroup('kids')
        else if (age >= 13 && age <= 17) setAgeGroup('teens')
        else if (age >= 18 && age <= 25) setAgeGroup('young-adults')
        else setAgeGroup(null)
    }

    const activeMethod = SIGNUP_METHODS.find((m) => m.id === method)

    const canProceed = () => {
        if (step === 0) return form.name.trim() && form.credential.trim() && otpVerified
        if (step === 1) return ageGroup !== null && form.dob
        if (step === 2) return form.password.length >= 6
        if (step === 3) return form.guardianEmail.trim()
        return false
    }

    return (
        <div className="auth-page">
            <div className="auth-container" style={{ maxWidth: 520 }}>
                {/* Brand */}
                <div className="auth-brand">
                    <div className="auth-logo-icon">
                        <Share2 size={26} strokeWidth={2.5} />
                    </div>
                    <h1 className="auth-title">Create Account</h1>
                    <p className="auth-subtitle">Join the safest sharing community</p>
                </div>

                {/* Stepper */}
                <div className="auth-stepper">
                    {STEPS_LABELS.slice(0, totalSteps).map((s, i) => (
                        <div key={s} className={`stepper-item ${i < step ? 'done' : i === step ? 'active' : ''}`}>
                            <div className="stepper-bar" />
                            <span className="stepper-label">{s}</span>
                        </div>
                    ))}
                </div>

                <div className="auth-card card">
                    {/* ===== STEP 0: Your Info + OTP ===== */}
                    {step === 0 && (
                        <>
                            {/* Name */}
                            <div className="auth-field">
                                <label>Full Name</label>
                                <div className="auth-input-wrap">
                                    <User size={16} className="auth-input-icon" />
                                    <input
                                        type="text"
                                        value={form.name}
                                        onChange={(e) => setForm({ ...form, name: e.target.value })}
                                        placeholder="Your full name"
                                    />
                                </div>
                            </div>

                            {/* Method Selector */}
                            <div className="auth-field">
                                <label>Sign up with</label>
                                <div className="auth-method-selector">
                                    {SIGNUP_METHODS.map((m) => (
                                        <button
                                            key={m.id}
                                            className={`auth-method-btn${method === m.id ? ' active' : ''}`}
                                            onClick={() => {
                                                setMethod(m.id)
                                                setForm({ ...form, credential: '' })
                                                setOtpSent(false)
                                                setOtpVerified(false)
                                                setOtp(['', '', '', '', '', ''])
                                            }}
                                        >
                                            <m.icon size={14} />
                                            {m.label}
                                        </button>
                                    ))}
                                </div>
                            </div>

                            {/* Credential Input */}
                            <div className="auth-field">
                                <label>{activeMethod.label}</label>
                                <div className="auth-input-wrap">
                                    <activeMethod.icon size={16} className="auth-input-icon" />
                                    {method === 'phone' ? (
                                        <div className="auth-phone-input">
                                            <span className="auth-phone-prefix">+91</span>
                                            <input
                                                type="text"
                                                value={form.credential ? formatPhone(form.credential) : ''}
                                                onChange={(e) => {
                                                    const raw = e.target.value.replace(/[• ]/g, '')
                                                    if (/^\d{0,10}$/.test(raw)) setForm({ ...form, credential: raw })
                                                }}
                                                placeholder={activeMethod.placeholder}
                                                inputMode="numeric"
                                                disabled={otpVerified}
                                            />
                                        </div>
                                    ) : (
                                        <input
                                            type={activeMethod.type}
                                            value={form.credential}
                                            onChange={(e) => setForm({ ...form, credential: e.target.value })}
                                            placeholder={activeMethod.placeholder}
                                            disabled={otpVerified}
                                        />
                                    )}
                                    {otpVerified && (
                                        <CheckCircle size={18} className="auth-verified-icon" />
                                    )}
                                </div>
                                {method === 'phone' && !otpVerified && (
                                    <span className="auth-hint muted">
                                        <Shield size={11} /> Your number is masked and never shown publicly
                                    </span>
                                )}
                            </div>

                            {/* OTP Flow */}
                            {!otpSent && !otpVerified && (
                                <button
                                    className="btn btn-secondary auth-otp-send-btn"
                                    onClick={() => setOtpSent(true)}
                                    disabled={!form.credential.trim() || (method === 'phone' && form.credential.length < 10)}
                                >
                                    <Smartphone size={16} /> Send Verification OTP
                                </button>
                            )}

                            {otpSent && !otpVerified && (
                                <div className="auth-otp-inline">
                                    <label className="auth-otp-inline-label">
                                        <KeyRound size={14} /> Enter 6-digit OTP
                                    </label>
                                    <div className="otp-boxes" onPaste={handleOtpPaste}>
                                        {otp.map((digit, i) => (
                                            <input
                                                key={i}
                                                ref={(el) => (otpRefs.current[i] = el)}
                                                type="text"
                                                inputMode="numeric"
                                                maxLength={1}
                                                value={digit}
                                                onChange={(e) => handleOtpChange(i, e.target.value)}
                                                onKeyDown={(e) => handleOtpKeyDown(i, e)}
                                                className={`otp-box${digit ? ' filled' : ''}`}
                                                autoFocus={i === 0}
                                            />
                                        ))}
                                    </div>
                                    <div className="auth-otp-timer">
                                        {showResend ? (
                                            <button className="auth-resend-btn" onClick={handleResend}>Resend OTP</button>
                                        ) : (
                                            <span>Resend in <strong>{timer}s</strong></span>
                                        )}
                                    </div>
                                    <button
                                        className="btn btn-primary btn-sm"
                                        onClick={handleVerifyOtp}
                                        disabled={otp.some((d) => !d) || verifying}
                                        style={{ width: '100%' }}
                                    >
                                        {verifying ? <><Loader2 size={14} className="spin" /> Verifying...</> : <><Check size={14} /> Verify</>}
                                    </button>
                                </div>
                            )}

                            {otpVerified && (
                                <div className="auth-verified-banner">
                                    <CheckCircle size={16} />
                                    <span>{activeMethod.label} verified successfully!</span>
                                </div>
                            )}
                        </>
                    )}

                    {/* ===== STEP 1: Age Verification ===== */}
                    {step === 1 && (
                        <div className="auth-age-step">
                            <h3 className="auth-step-title">
                                <Calendar size={18} />
                                Verify Your Age
                            </h3>
                            <p className="auth-step-desc">
                                This helps us keep the platform safe for everyone
                            </p>

                            {/* Date of Birth */}
                            <div className="auth-field">
                                <label>Date of Birth</label>
                                <div className="auth-input-wrap">
                                    <Calendar size={16} className="auth-input-icon" />
                                    <input
                                        type="date"
                                        value={form.dob}
                                        onChange={(e) => handleDobChange(e.target.value)}
                                        max={new Date(new Date().setFullYear(new Date().getFullYear() - 7)).toISOString().split('T')[0]}
                                        min={new Date(new Date().setFullYear(new Date().getFullYear() - 25)).toISOString().split('T')[0]}
                                    />
                                </div>
                                {form.dob && age !== null && (
                                    <span className="auth-hint">
                                        You are <strong>{age} years old</strong>
                                    </span>
                                )}
                            </div>

                            {/* Auto-detected age group */}
                            {ageGroup && (
                                <div className="auth-age-result" key={ageGroup}>
                                    <div className="age-result-card">
                                        <span className="age-result-emoji">{selectedGroup.emoji}</span>
                                        <div className="age-result-info">
                                            <div className="age-result-range">
                                                {selectedGroup.range} — {selectedGroup.label}
                                            </div>
                                            <div className="age-result-desc">{selectedGroup.desc}</div>
                                        </div>
                                        <CheckCircle size={20} style={{ color: 'var(--success)', flexShrink: 0 }} />
                                    </div>
                                    {selectedGroup.needsGuardian && (
                                        <div className="auth-notice warning">
                                            <AlertCircle size={14} />
                                            <span>Guardian consent will be required in the next step</span>
                                        </div>
                                    )}
                                </div>
                            )}

                            {form.dob && !ageGroup && (
                                <div className="auth-notice danger">
                                    <AlertCircle size={14} />
                                    <span>KidShare Hub is for ages 7–25 only</span>
                                </div>
                            )}
                        </div>
                    )}

                    {/* ===== STEP 2: Set Password ===== */}
                    {step === 2 && (
                        <>
                            <h3 className="auth-step-title">
                                <Lock size={18} />
                                Create a Password
                            </h3>
                            <p className="auth-step-desc">Choose a strong password to protect your account</p>

                            <div className="auth-field">
                                <label>Password</label>
                                <div className="auth-input-wrap">
                                    <Lock size={16} className="auth-input-icon" />
                                    <input
                                        type={showPass ? 'text' : 'password'}
                                        value={form.password}
                                        onChange={(e) => setForm({ ...form, password: e.target.value })}
                                        placeholder="At least 6 characters"
                                    />
                                    <button
                                        className="auth-toggle-pass"
                                        onClick={() => setShowPass(!showPass)}
                                        type="button"
                                    >
                                        {showPass ? <EyeOff size={16} /> : <Eye size={16} />}
                                    </button>
                                </div>
                            </div>

                            {/* Strength indicator */}
                            <div className="password-strength">
                                <div className="strength-bars">
                                    {[1, 2, 3, 4].map((level) => (
                                        <div
                                            key={level}
                                            className={`strength-bar ${form.password.length >= level * 3 ? 'filled' : ''}`}
                                            style={{
                                                background: form.password.length >= level * 3
                                                    ? level <= 1 ? 'var(--danger)' : level <= 2 ? 'var(--warning)' : level <= 3 ? 'var(--info)' : 'var(--success)'
                                                    : 'var(--border-color)',
                                            }}
                                        />
                                    ))}
                                </div>
                                <span className="strength-label">
                                    {form.password.length === 0 ? '' : form.password.length < 4 ? 'Weak' : form.password.length < 7 ? 'Fair' : form.password.length < 10 ? 'Good' : 'Strong'}
                                </span>
                            </div>
                        </>
                    )}

                    {/* ===== STEP 3: Guardian Consent ===== */}
                    {step === 3 && (
                        <div className="auth-guardian-step">
                            <div className="auth-guardian-icon-wrap">
                                <Users size={32} />
                            </div>
                            <h3 className="auth-step-title centered">Guardian Consent Required</h3>
                            <p className="auth-step-desc centered">
                                Since you're under 18, a parent or guardian must approve your account for a safe experience.
                            </p>

                            <div className="auth-field">
                                <label>Guardian's Email</label>
                                <div className="auth-input-wrap">
                                    <Mail size={16} className="auth-input-icon" />
                                    <input
                                        type="email"
                                        value={form.guardianEmail}
                                        onChange={(e) => setForm({ ...form, guardianEmail: e.target.value })}
                                        placeholder="parent@email.com"
                                    />
                                </div>
                            </div>

                            <div className="auth-field">
                                <label>Guardian's Phone <span className="auth-optional">(optional)</span></label>
                                <div className="auth-input-wrap">
                                    <Phone size={16} className="auth-input-icon" />
                                    <div className="auth-phone-input">
                                        <span className="auth-phone-prefix">+91</span>
                                        <input
                                            type="text"
                                            value={form.guardianPhone}
                                            onChange={(e) => {
                                                const raw = e.target.value.replace(/\D/g, '').slice(0, 10)
                                                setForm({ ...form, guardianPhone: raw })
                                            }}
                                            placeholder="•••••  •••10"
                                            inputMode="numeric"
                                        />
                                    </div>
                                </div>
                            </div>

                            <div className="auth-notice">
                                <Shield size={14} />
                                <span>We'll send a secure approval link. Your guardian can review activity, approve exchanges, and manage safety settings.</span>
                            </div>

                            <button
                                className="btn btn-accent auth-submit"
                                onClick={() => navigate('/home')}
                                disabled={!form.guardianEmail.trim()}
                                style={{ opacity: form.guardianEmail.trim() ? 1 : 0.5 }}
                            >
                                <Mail size={16} /> Send Approval & Create Account
                            </button>
                        </div>
                    )}
                </div>

                {/* Navigation (for non-guardian-submit steps) */}
                {!(step === 3) && (
                    <div className="auth-nav">
                        {step > 0 ? (
                            <button className="btn btn-ghost" onClick={() => setStep((s) => s - 1)}>
                                <ArrowLeft size={16} /> Back
                            </button>
                        ) : <div />}
                        {step < totalSteps - 1 ? (
                            <button
                                className="btn btn-primary"
                                onClick={() => setStep((s) => s + 1)}
                                disabled={!canProceed()}
                                style={{ opacity: canProceed() ? 1 : 0.5 }}
                            >
                                Next <ArrowRight size={16} />
                            </button>
                        ) : step === totalSteps - 1 && !selectedGroup?.needsGuardian ? (
                            <Link to="/home" className="btn btn-primary">
                                <Heart size={16} /> Create Account
                            </Link>
                        ) : null}
                    </div>
                )}

                <p className="auth-footer-text">
                    Already have an account? <Link to="/login">Sign In</Link>
                </p>
                <div className="auth-safety-line">
                    <Shield size={13} /> Protected by KidShare Safety
                </div>
            </div>
        </div>
    )
}
