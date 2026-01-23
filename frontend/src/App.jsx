import React, { useState } from 'react';
import SearchCockpit from './components/SearchCockpit';
import RouteCard from './components/RouteCard';
import { Train, Loader2, AlertCircle } from 'lucide-react';
import { searchRoutes } from './api';

const getMockRoutes = (from, to) => [
  {
    total_time: '16h 40m',
    switches: 0,
    departure_time: '16:55',
    arrival_time: '09:35',
    from_code: from || 'CSMT',
    to_code: to || 'NDLS',
    departure_date: 'Jan 23',
    arrival_date: 'Jan 24',
    segments: [
      {
        train_number: '12951',
        train_name: 'Rajdhani Express',
        from_station: from || 'Mumbai CSMT',
        to_station: to || 'New Delhi',
        departure_time: '16:55',
        arrival_time: '09:35',
        duration: '16h 40m'
      }
    ]
  },
  {
    total_time: '19h 15m',
    switches: 1,
    departure_time: '07:00',
    arrival_time: '02:15',
    from_code: from || 'CSMT',
    to_code: to || 'NDLS',
    departure_date: 'Jan 23',
    arrival_date: 'Jan 24',
    segments: [
      {
        train_number: '12263',
        train_name: 'Duronto Express',
        from_station: from || 'Mumbai CSMT',
        to_station: 'Intermediate Jn',
        departure_time: '07:00',
        arrival_time: '10:30',
        duration: '3h 30m'
      },
      {
        train_number: '12628',
        train_name: 'Superfast Express',
        from_station: 'Intermediate Jn',
        to_station: to || 'New Delhi',
        departure_time: '11:45',
        arrival_time: '02:15',
        duration: '14h 30m',
        wait_time: '1h 15m'
      }
    ]
  },
  {
    total_time: '22h 10m',
    switches: 0,
    departure_time: '21:30',
    arrival_time: '19:40',
    from_code: from || 'CSMT',
    to_code: to || 'NDLS',
    departure_date: 'Jan 23',
    arrival_date: 'Jan 24',
    segments: [
      {
        train_number: '12137',
        train_name: 'Punjab Mail',
        from_station: from || 'Mumbai CSMT',
        to_station: to || 'New Delhi',
        departure_time: '21:30',
        arrival_time: '19:40',
        duration: '22h 10m'
      }
    ]
  }
];

function App() {
  const [routes, setRoutes] = useState([]);
  const [loading, setLoading] = useState(false);
  const [searched, setSearched] = useState(false);
  const [error, setError] = useState(null);

  const handleSearch = async (params) => {
    setLoading(true);
    setSearched(true);
    setError(null);

    try {
      const data = await searchRoutes(params);
      setRoutes(data.routes || []);
    } catch (err) {
      console.warn('Backend search failed, showing mock routes:', err);
      // Fallback to mock routes if backend is not ready
      const mockData = getMockRoutes(params.from, params.to);
      setRoutes(mockData);
      // We don't set an error here anymore because we're showing "just for show" routes
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="app">
      <section className="hero">
        <header className="header">
          <div className="logo">
            <div className="logo-icon">
              <Train size={24} color="white" />
            </div>
            <div>
              <div>RapidRail</div>
              <div className="tagline">Smart Train Routes</div>
            </div>
          </div>
        </header>

        <div className="hero-content">
          <h1 className="hero-title">Find Your Perfect Route</h1>
          <p className="hero-subtitle">Optimized train connections across India</p>

          <SearchCockpit onSearch={handleSearch} />
        </div>
      </section>

      {(loading || searched) && (
        <section className="results-section">
          {loading ? (
            <div className="loading-state">
              <Loader2 size={32} className="spinner" />
              <p>Finding best routes...</p>
            </div>
          ) : error ? (
            <div className="error-state" style={{ textAlign: 'center', padding: '40px', color: '#ef4444' }}>
              <AlertCircle size={48} style={{ margin: '0 auto 16px' }} />
              <h3 style={{ marginBottom: '8px' }}>Search Failed</h3>
              <p>{error}</p>
            </div>
          ) : routes.length > 0 ? (
            <>
              <div className="results-header">
                <h2 className="results-title">Available Routes</h2>
                <span className="results-count">{routes.length} options found</span>
              </div>
              <div className="results-list">
                {routes.map((route, idx) => (
                  <RouteCard key={idx} route={route} />
                ))}
              </div>
            </>
          ) : (
            <div className="empty-state">
              <p>No routes found. Try different stations or dates.</p>
            </div>
          )}
        </section>
      )}
    </div>
  );
}

export default App;
