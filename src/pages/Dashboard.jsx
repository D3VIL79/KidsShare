import { useState } from 'react'
import { Link } from 'react-router-dom'
import { AgeContext } from '../contexts'
import {
    Package, Plus, Eye, Trash2, Edit3, Clock, Bell, BellOff,
    ToggleLeft, ToggleRight, Check, X, AlertCircle,
} from 'lucide-react'
import './Dashboard.css'

const TYPE_STYLES = {
    free: { bg: 'rgba(0,184,148,0.1)', color: '#00b894', label: 'Free' },
    exchange: { bg: 'rgba(225,112,85,0.1)', color: '#e17055', label: 'Exchange' },
    lend: { bg: 'rgba(108,92,231,0.1)', color: '#6C5CE7', label: 'Lend' },
    sell: { bg: 'rgba(0,206,201,0.1)', color: '#00CEC9', label: 'Sell' },
}

const MOCK_LISTINGS = [
    { id: 1, title: 'Harry Potter Box Set', image: 'https://images.unsplash.com/photo-1626618012641-bf8ca5e0ae1f?auto=format&fit=crop&q=80&w=800', type: 'exchange', status: 'active', views: 42, requests: 3, posted: 'Feb 14', available: true, notifications: true },
    { id: 2, title: 'Cricket Bat (SG)', image: 'https://images.unsplash.com/photo-1531415074968-036ba1b575da?auto=format&fit=crop&q=80&w=800', type: 'free', status: 'active', views: 28, requests: 1, posted: 'Feb 12', available: true, notifications: true },
    { id: 3, title: 'Rubik\'s Cube Collection', image: 'https://images.unsplash.com/photo-1569516449771-41c89ee94df6?auto=format&fit=crop&q=80&w=800', type: 'sell', status: 'paused', views: 15, requests: 0, posted: 'Feb 10', available: false, notifications: false },
    { id: 4, title: 'Watercolor Set', image: 'https://images.unsplash.com/photo-1513364776144-60967b0f800f?auto=format&fit=crop&q=80&w=800', type: 'free', status: 'completed', views: 56, requests: 4, posted: 'Jan 28', available: false, notifications: false, completedWith: 'ArtLover' },
    { id: 5, title: 'Board Games Bundle', image: 'https://images.unsplash.com/photo-1632501641765-e568d28b0015?auto=format&fit=crop&q=80&w=800', type: 'exchange', status: 'completed', views: 33, requests: 2, posted: 'Jan 15', available: false, notifications: false, completedWith: 'FunTimes' },
]

const MOCK_NOTIFS = [
    { id: 1, user: 'ReaderFan', action: 'requested', time: '10m ago', emoji: '📚' },
    { id: 2, user: 'SportyKid', action: 'requested', time: '1h ago', emoji: '🏏' },
    { id: 3, user: 'PotterHead', action: 'messaged', time: '3h ago', emoji: '📚' },
]

export default function Dashboard() {
    const [filter, setFilter] = useState('all')
    const [listings, setListings] = useState(MOCK_LISTINGS)
    const [showDelete, setShowDelete] = useState(null)

    const toggle = (id, field) => setListings(p => p.map(l => l.id === id ? { ...l, [field]: !l[field], ...(field === 'available' ? { status: l.available ? 'paused' : 'active' } : {}) } : l))
    const deleteListing = (id) => { setListings(p => p.filter(l => l.id !== id)); setShowDelete(null) }

    const filtered = listings.filter(l => filter === 'all' || l.status === filter)
    const counts = { all: listings.length, active: listings.filter(l => l.status === 'active').length, paused: listings.filter(l => l.status === 'paused').length, completed: listings.filter(l => l.status === 'completed').length }

    return (
        <div className="dashboard-page">
            <div className="container">
                <div className="dash-header">
                    <div>
                        <h1><Package size={22} /> My Listings</h1>
                        <p>Manage your shared items and track requests</p>
                    </div>
                    <Link to="/create" className="btn btn-primary"><Plus size={16} /> New Listing</Link>
                </div>

                {MOCK_NOTIFS.length > 0 && (
                    <div className="dash-notifications">
                        <h3><Bell size={14} /> Recent Requests</h3>
                        <div className="notif-list">
                            {MOCK_NOTIFS.map(n => (
                                <div key={n.id} className="notif-item">
                                    <span className="notif-emoji">{n.emoji}</span>
                                    <div className="notif-content">
                                        <span><strong>{n.user}</strong> {n.action} your item</span>
                                        <span className="notif-time">{n.time}</span>
                                    </div>
                                    <div className="notif-actions">
                                        <button className="notif-btn accept"><Check size={14} /></button>
                                        <button className="notif-btn reject"><X size={14} /></button>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                )}

                <div className="dash-filters">
                    {[{ id: 'all', label: 'All' }, { id: 'active', label: '🟢 Active' }, { id: 'paused', label: '⏸️ Paused' }, { id: 'completed', label: '✅ Completed' }].map(f => (
                        <button key={f.id} className={`dash-filter ${filter === f.id ? 'active' : ''}`} onClick={() => setFilter(f.id)}>
                            {f.label} <span className="dash-filter-count">{counts[f.id]}</span>
                        </button>
                    ))}
                </div>

                <div className="dash-listings">
                    {filtered.length > 0 ? filtered.map(listing => (
                        <div key={listing.id} className={`dash-listing-card ${listing.status}`}>
                            <div className="dash-listing-left">
                                <div className="dash-listing-image-wrap">
                                    <img src={listing.image} alt={listing.title} className="dash-listing-img" />
                                </div>
                                <div className="dash-listing-info">
                                    <div className="dash-listing-top">
                                        <h3>{listing.title}</h3>
                                        <span className="dash-type-badge" style={{ background: TYPE_STYLES[listing.type].bg, color: TYPE_STYLES[listing.type].color }}>{TYPE_STYLES[listing.type].label}</span>
                                    </div>
                                    <div className="dash-listing-stats">
                                        <span><Eye size={11} /> {listing.views} views</span>
                                        <span><Bell size={11} /> {listing.requests} requests</span>
                                        <span><Clock size={11} /> {listing.posted}</span>
                                    </div>
                                    {listing.completedWith && <span className="dash-completed-with"><Check size={11} /> Shared with {listing.completedWith}</span>}
                                </div>
                            </div>
                            <div className="dash-listing-actions">
                                {listing.status !== 'completed' && (
                                    <button className={`avail-toggle ${listing.available ? 'on' : 'off'}`} onClick={() => toggle(listing.id, 'available')}>
                                        {listing.available ? <ToggleRight size={22} /> : <ToggleLeft size={22} />}
                                        <span>{listing.available ? 'Live' : 'Paused'}</span>
                                    </button>
                                )}
                                <button className={`notif-toggle ${listing.notifications ? 'on' : 'off'}`} onClick={() => toggle(listing.id, 'notifications')}>
                                    {listing.notifications ? <Bell size={14} /> : <BellOff size={14} />}
                                </button>
                                {listing.status !== 'completed' && <Link to="/create" className="dash-action-btn edit"><Edit3 size={14} /></Link>}
                                <button className="dash-action-btn delete" onClick={() => setShowDelete(listing.id)}><Trash2 size={14} /></button>
                            </div>
                            {showDelete === listing.id && (
                                <div className="delete-confirm">
                                    <AlertCircle size={14} /><span>Delete?</span>
                                    <button className="btn btn-sm delete-yes" onClick={() => deleteListing(listing.id)}>Delete</button>
                                    <button className="btn btn-sm btn-ghost" onClick={() => setShowDelete(null)}>Cancel</button>
                                </div>
                            )}
                        </div>
                    )) : (
                        <div className="dash-empty">
                            <span>📦</span>
                            <h3>No {filter === 'all' ? '' : filter} listings</h3>
                            <p>{filter === 'all' ? 'Create your first listing!' : `No ${filter} listings.`}</p>
                            {filter === 'all' && <Link to="/create" className="btn btn-primary"><Plus size={16} /> Create Listing</Link>}
                        </div>
                    )}
                </div>
            </div>
        </div>
    )
}
