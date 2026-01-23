import React, { useState } from 'react';
import { ChevronDown, ChevronUp, Train, Clock, MapPin, Zap, Calendar } from 'lucide-react';

const RouteCard = ({ route }) => {
    const [expanded, setExpanded] = useState(false);

    return (
        <div className={`route-card ${expanded ? 'expanded' : ''}`}>
            {/* Main Summary */}
            <div className="route-summary" onClick={() => setExpanded(!expanded)}>
                {/* Left: Duration & Type */}
                <div className="route-info-left">
                    <div className="route-duration">
                        <Clock size={18} className="duration-icon" />
                        <span className="duration-value">{route.total_time}</span>
                    </div>
                    <div className={`route-type ${route.switches === 0 ? 'direct' : 'connecting'}`}>
                        {route.switches === 0 ? (
                            <>
                                <Zap size={12} />
                                <span>Direct</span>
                            </>
                        ) : (
                            <span>{route.switches} Change{route.switches > 1 ? 's' : ''}</span>
                        )}
                    </div>
                </div>

                {/* Center: Journey Timeline */}
                <div className="route-journey">
                    <div className="journey-endpoint">
                        <span className="endpoint-time">{route.departure_time}</span>
                        <span className="endpoint-code">{route.from_code}</span>
                    </div>

                    <div className="journey-visual">
                        <div className="journey-line">
                            <div className="journey-dot start"></div>
                            {route.switches > 0 && (
                                <div className="journey-stops">
                                    {Array.from({ length: route.switches }).map((_, i) => (
                                        <div key={i} className="journey-dot stop"></div>
                                    ))}
                                </div>
                            )}
                            <div className="journey-dot end"></div>
                        </div>
                        <span className="journey-label">
                            {route.segments?.[0]?.train_name || 'Express'}
                        </span>
                    </div>

                    <div className="journey-endpoint">
                        <span className="endpoint-time">{route.arrival_time}</span>
                        <span className="endpoint-code">{route.to_code}</span>
                    </div>
                </div>

                {/* Right: Date & Action */}
                <div className="route-info-right">
                    <div className="route-dates-compact">
                        <Calendar size={14} />
                        <span>{route.departure_date} → {route.arrival_date}</span>
                    </div>
                    <button className="expand-toggle" onClick={(e) => { e.stopPropagation(); setExpanded(!expanded); }}>
                        {expanded ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
                    </button>
                </div>
            </div>

            {/* Quick Info Bar */}
            <div className="route-quick-info">
                <div className="quick-item">
                    <Train size={14} />
                    <span>{route.segments?.length || 1} Train{route.segments?.length > 1 ? 's' : ''}</span>
                </div>
                <div className="quick-item">
                    <MapPin size={14} />
                    <span>{route.from_code} to {route.to_code}</span>
                </div>
                <button className="view-details-btn" onClick={() => setExpanded(!expanded)}>
                    {expanded ? 'Hide Details' : 'View Details'}
                </button>
            </div>

            {/* Expanded Segments */}
            {expanded && route.segments && (
                <div className="route-segments">
                    <div className="segments-header">
                        <h4>Journey Breakdown</h4>
                    </div>

                    {route.segments.map((seg, idx) => (
                        <div key={idx} className="segment-card">
                            <div className="segment-header">
                                <div className="segment-train-info">
                                    <div className="train-badge">
                                        <Train size={16} />
                                    </div>
                                    <div className="train-details">
                                        <span className="train-number">{seg.train_number}</span>
                                        <span className="train-name">{seg.train_name}</span>
                                    </div>
                                </div>
                                <div className="segment-duration-badge">
                                    {seg.duration}
                                </div>
                            </div>

                            <div className="segment-timeline">
                                <div className="timeline-stop departure">
                                    <div className="stop-marker"></div>
                                    <div className="stop-info">
                                        <span className="stop-time">{seg.departure_time}</span>
                                        <span className="stop-station">{seg.from_station}</span>
                                    </div>
                                </div>

                                <div className="timeline-connector">
                                    <div className="connector-line"></div>
                                </div>

                                <div className="timeline-stop arrival">
                                    <div className="stop-marker"></div>
                                    <div className="stop-info">
                                        <span className="stop-time">{seg.arrival_time}</span>
                                        <span className="stop-station">{seg.to_station}</span>
                                    </div>
                                </div>
                            </div>

                            {seg.wait_time && (
                                <div className="segment-wait-notice">
                                    <Clock size={14} />
                                    <span>Wait at {seg.to_station}: <strong>{seg.wait_time}</strong></span>
                                </div>
                            )}
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default RouteCard;
