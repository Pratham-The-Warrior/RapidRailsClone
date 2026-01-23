import React from 'react';
import { X, LogOut, Settings, History, User, CreditCard, Bell, ChevronRight, Star, ShieldCheck, HelpCircle } from 'lucide-react';

const UserProfile = ({ isOpen, onClose }) => {
    if (!isOpen) return null;

    const upcomingJourneys = [
        { from: 'CSMT', to: 'NDLS', date: 'Oct 26', train: 'Rajdhani Exp', status: 'Confirmed' },
    ];

    const passengers = [
        { name: 'Pratham Sarda', age: 24, gender: 'M' },
        { name: 'Rahul Sharma', age: 28, gender: 'M' },
    ];

    return (
        <div className={`profile-drawer ${isOpen ? 'open' : ''}`}>
            <div className="drawer-overlay" onClick={onClose}></div>
            <div className="drawer-content premium">
                <div className="drawer-inner">
                    <div className="drawer-header premium-header">
                        <div className="user-profile-hero">
                            <div className="avatar-wrapper">
                                <div className="user-avatar-large">
                                    <User size={40} color="white" />
                                </div>
                                <div className="loyalty-badge">
                                    <Star size={12} fill="#FFD700" color="#FFD700" />
                                </div>
                            </div>
                            <div className="user-meta">
                                <h3 className="user-name-large">Pratham Sarda</h3>
                                <div className="user-status-pill">Gold Member</div>
                            </div>
                        </div>
                        <button className="close-btn-premium" onClick={onClose}>
                            <X size={20} />
                        </button>
                    </div>

                    <div className="drawer-scroll-area">
                        {/* Quick Check Widget */}
                        <div className="pnr-checker">
                            <input type="text" placeholder="Enter PNR for Quick Status" className="pnr-input" />
                            <button className="pnr-btn">Check</button>
                        </div>

                        <div className="drawer-section">
                            <div className="section-header">
                                <h4 className="section-title-premium">Upcoming Journey</h4>
                                <a href="#" className="section-link">View All</a>
                            </div>
                            {upcomingJourneys.map((j, i) => (
                                <div key={i} className="premium-card journey-card">
                                    <div className="journey-main">
                                        <span className="station-pair">{j.from} → {j.to}</span>
                                        <span className="journey-date">{j.date}</span>
                                    </div>
                                    <div className="journey-sub">
                                        <span>{j.train}</span>
                                        <span className="status-tag confirmed">{j.status}</span>
                                    </div>
                                </div>
                            ))}
                        </div>

                        <div className="drawer-section">
                            <h4 className="section-title-premium">Saved Passengers</h4>
                            <div className="passengers-list">
                                {passengers.map((p, i) => (
                                    <div key={i} className="passenger-row">
                                        <div className="passenger-icon"><User size={16} /></div>
                                        <div className="passenger-details">
                                            <span className="p-name">{p.name}</span>
                                            <span className="p-meta">{p.age} Yrs • {p.gender}</span>
                                        </div>
                                        <ChevronRight size={16} color="#475569" />
                                    </div>
                                ))}
                                <button className="add-passenger-btn">+ Add New Passenger</button>
                            </div>
                        </div>

                        <div className="drawer-section">
                            <h4 className="section-title-premium">Account & Preferences</h4>
                            <div className="settings-list">
                                <div className="setting-item">
                                    <CreditCard size={18} />
                                    <span>Linked Bank Accounts</span>
                                </div>
                                <div className="setting-item">
                                    <ShieldCheck size={18} />
                                    <span>Privacy & Security</span>
                                </div>
                                <div className="setting-item">
                                    <HelpCircle size={18} />
                                    <span>Help & Support</span>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="drawer-footer-premium">
                        <button className="logout-btn-premium">
                            <LogOut size={18} />
                            <span>Sign Out</span>
                        </button>
                        <p className="app-version">RailOptima v2.4.0</p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default UserProfile;
