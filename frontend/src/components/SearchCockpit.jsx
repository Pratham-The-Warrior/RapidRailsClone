import React, { useState } from 'react';
import { ArrowLeftRight, Search, Train } from 'lucide-react';

const CLASSES = ['1A', '2A', '3A', 'SL', 'CC', '2S'];

const SearchCockpit = ({ onSearch }) => {
    const [form, setForm] = useState({
        from: '',
        to: '',
        date: new Date().toISOString().split('T')[0],
        maxSwitches: 2,
        maxWait: 120,
        classes: ['2A', '3A'],
        sortBy: 'time'
    });

    const [errors, setErrors] = useState({});

    const handleChange = (key, value) => {
        setForm(prev => ({ ...prev, [key]: value }));
    };

    const toggleClass = (cls) => {
        setForm(prev => ({
            ...prev,
            classes: prev.classes.includes(cls)
                ? prev.classes.filter(c => c !== cls)
                : [...prev.classes, cls]
        }));
    };

    const swapStations = () => {
        setForm(prev => ({ ...prev, from: prev.to, to: prev.from }));
    };

    const validate = () => {
        const newErrors = {};
        if (form.from.toUpperCase() === form.to.toUpperCase()) {
            newErrors.station = 'Source and Destination cannot be the same';
        }
        if (form.classes.length === 0) {
            newErrors.classes = 'Select at least one class';
        }
        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!validate()) return;

        if (onSearch) {
            onSearch({
                from: form.from.toUpperCase(),
                to: form.to.toUpperCase(),
                date: form.date,
                max_switches: parseInt(form.maxSwitches),
                max_wait_minutes: parseInt(form.maxWait),
                classes: form.classes,
                sort_by: form.sortBy
            });
        }
    };

    return (
        <form className="search-card" onSubmit={handleSubmit}>
            <h3><Train size={20} /> Book Your Journey</h3>

            <div className="station-group">
                <div className="station-input-wrapper">
                    <span className="station-label">From</span>
                    <input
                        type="text"
                        className="station-input"
                        placeholder="Enter station code"
                        value={form.from}
                        onChange={(e) => handleChange('from', e.target.value)}
                        required
                    />
                </div>

                <button type="button" className="swap-btn" onClick={swapStations}>
                    <ArrowLeftRight size={18} />
                </button>

                <div className="station-input-wrapper">
                    <span className="station-label">To</span>
                    <input
                        type="text"
                        className="station-input"
                        placeholder="Enter station code"
                        value={form.to}
                        onChange={(e) => handleChange('to', e.target.value)}
                        required
                    />
                </div>
            </div>

            <div className="options-row">
                <div className="option-group">
                    <label className="option-label">Travel Date</label>
                    <input
                        type="date"
                        className="option-input"
                        value={form.date}
                        onChange={(e) => handleChange('date', e.target.value)}
                        required
                    />
                </div>

                <div className="option-group">
                    <label className="option-label">Max Changes</label>
                    <select
                        className="option-input"
                        value={form.maxSwitches}
                        onChange={(e) => handleChange('maxSwitches', e.target.value)}
                    >
                        {[0, 1, 2, 3].map(n => (
                            <option key={n} value={n}>{n === 0 ? 'Direct only' : `Up to ${n}`}</option>
                        ))}
                    </select>
                </div>

                <div className="option-group">
                    <label className="option-label">Sort By</label>
                    <select
                        className="option-input"
                        value={form.sortBy}
                        onChange={(e) => handleChange('sortBy', e.target.value)}
                    >
                        <option value="time">Fastest</option>
                        <option value="switches">Fewer Changes</option>
                    </select>
                </div>

                <div className="option-group">
                    <label className="option-label">Max Wait (Mins)</label>
                    <input
                        type="number"
                        className="option-input"
                        min="0"
                        max="720"
                        value={form.maxWait}
                        onChange={(e) => handleChange('maxWait', e.target.value)}
                        placeholder="Wait time"
                    />
                </div>
            </div>

            {errors.station && <div className="error-message" style={{ color: '#ef4444', fontSize: '0.75rem', marginBottom: '1rem', fontWeight: 600 }}>{errors.station}</div>}

            <div className="class-section">
                <label className="class-label">Preferred Class</label>
                <div className="class-chips">
                    {CLASSES.map(cls => (
                        <button
                            key={cls}
                            type="button"
                            className={`class-chip ${form.classes.includes(cls) ? 'active' : ''}`}
                            onClick={() => toggleClass(cls)}
                        >
                            {cls}
                        </button>
                    ))}
                </div>
            </div>

            <button type="submit" className="search-btn">
                <Search size={20} />
                Search Trains
            </button>
        </form>
    );
};

export default SearchCockpit;
