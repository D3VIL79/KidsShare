import { useState } from 'react'
import {
    Lock, MessageCircle, ShoppingBag, MapPin, Clock,
    Shield, Check, AlertTriangle, Info, ToggleLeft, ToggleRight,
    Heart, Wallet, Eye,
} from 'lucide-react'
import './GuardianPermissions.css'

const PERMS = [
    { id: 'chat', icon: MessageCircle, title: 'Chat / Messaging', desc: 'Allow filtered messaging with matched peers', color: '#6C5CE7', default: true },
    { id: 'renting', icon: ShoppingBag, title: 'Renting Items', desc: 'Allow renting or lending items from the community', color: '#00b894', default: true },
    { id: 'turf', icon: MapPin, title: 'Turf Booking', desc: 'Allow booking shared sports facilities', color: '#00CEC9', default: false },
    { id: 'exchange', icon: Heart, title: 'Item Exchanges', desc: 'Allow exchanging items with community peers', color: '#FDCB6E', default: true },
    { id: 'wallet', icon: Wallet, title: 'Wallet / Credits', desc: 'Allow adding or spending credits', color: '#e17055', default: false },
    { id: 'browse', icon: Eye, title: 'Browse All Content', desc: 'Allow browsing items from all age groups', color: '#0984e3', default: false },
]

const TIME_LIMITS = [
    { id: 'daily', label: 'Daily Screen Time', options: ['30 min', '1 hr', '2 hr', '3 hr', 'Unlimited'] },
    { id: 'chat_hours', label: 'Chat Active Hours', options: ['8AM–6PM', '8AM–8PM', '9AM–9PM', 'Always'] },
    { id: 'turf_hours', label: 'Turf Booking Hours', options: ['Morning Only', 'Until 6PM', 'Until 8PM', 'Any Time'] },
]

export default function GuardianPermissions() {
    const [perms, setPerms] = useState(() => {
        const init = {}
        PERMS.forEach(p => init[p.id] = p.default)
        return init
    })
    const [timeLimits, setTimeLimits] = useState({ daily: '2 hr', chat_hours: '8AM–8PM', turf_hours: 'Until 6PM' })
    const [child, setChild] = useState('Arjun')

    const toggle = (id) => setPerms(p => ({ ...p, [id]: !p[id] }))

    return (
        <div className="gperm-page">
            <div className="container">
                <div className="gp-header">
                    <h1><Lock size={22} /> Permission Control</h1>
                    <p>Enable or disable features for your child's account</p>
                </div>

                <div className="gp-child-select">
                    <span>Managing:</span>
                    {['Arjun', 'Priya'].map(c => (
                        <button key={c} className={`gp-child-btn ${child === c ? 'active' : ''}`} onClick={() => setChild(c)}>
                            {c === 'Arjun' ? '🦊' : '🦋'} {c}
                        </button>
                    ))}
                </div>

                {/* Feature Toggles */}
                <div className="gp-section">
                    <h2><Shield size={16} /> Feature Access</h2>
                    <div className="gp-toggles">
                        {PERMS.map(p => {
                            const PIcon = p.icon
                            const on = perms[p.id]
                            return (
                                <div key={p.id} className={`gp-toggle-card ${on ? 'on' : 'off'}`}>
                                    <div className="gp-tog-icon" style={{ background: `${p.color}12`, color: p.color }}><PIcon size={16} /></div>
                                    <div className="gp-tog-info">
                                        <h4>{p.title}</h4>
                                        <p>{p.desc}</p>
                                    </div>
                                    <button className="gp-tog-switch" onClick={() => toggle(p.id)}>
                                        {on ? <ToggleRight size={28} color={p.color} /> : <ToggleLeft size={28} />}
                                    </button>
                                </div>
                            )
                        })}
                    </div>
                </div>

                {/* Time Limits */}
                <div className="gp-section">
                    <h2><Clock size={16} /> Time Limits</h2>
                    <div className="gp-time-limits">
                        {TIME_LIMITS.map(tl => (
                            <div key={tl.id} className="gp-time-row">
                                <span className="gp-time-label">{tl.label}</span>
                                <div className="gp-time-options">
                                    {tl.options.map(o => (
                                        <button key={o} className={`gp-time-btn ${timeLimits[tl.id] === o ? 'active' : ''}`} onClick={() => setTimeLimits(t => ({ ...t, [tl.id]: o }))}>
                                            {o}
                                        </button>
                                    ))}
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                <div className="gp-notice">
                    <Info size={14} />
                    <span>Changes take effect immediately. Your child will be notified when permissions change.</span>
                </div>
            </div>
        </div>
    )
}
