import React, { useState, useEffect, useContext } from 'react';
import { useSearchParams, Link } from 'react-router-dom';
import { MapPin, Navigation, Info, Search, Filter } from 'lucide-react';
import { AppContext } from '../context/AppContext';

export default function Maps() {
  const { destinations } = useContext(AppContext);
  const [searchParams] = useSearchParams();
  
  const [filterRegion, setFilterRegion] = useState('Semua');
  const [filterCategory, setFilterCategory] = useState('Semua');
  const [searchQuery, setSearchQuery] = useState('');

  // Default to Madura island general view coordinates
  const [selectedLocation, setSelectedLocation] = useState({
    name: 'Pulau Madura',
    lat: -7.1068, 
    lng: 113.4862,
    zoom: 9
  });

  // Handle query params from detail view redirect
  useEffect(() => {
    const latParam = searchParams.get('lat');
    const lngParam = searchParams.get('lng');
    if (latParam && lngParam) {
      const lat = parseFloat(latParam);
      const lng = parseFloat(lngParam);
      // Find matching destination to show details
      const matched = destinations.find(d => Math.abs(d.lat - lat) < 0.001 && Math.abs(d.lng - lng) < 0.001);
      if (matched) {
        setSelectedLocation({
          ...matched,
          zoom: 15
        });
      } else {
        setSelectedLocation({
          name: 'Lokasi Pilihan',
          lat,
          lng,
          zoom: 15
        });
      }
    }
  }, [searchParams, destinations]);
  
  const handleSelectLocation = (dest) => {
    setSelectedLocation({
      ...dest,
      zoom: 15
    });
  };

  const regions = ['Semua', 'Bangkalan', 'Sampang', 'Pamekasan', 'Sumenep'];
  const categories = ['Semua', 'Alam', 'Pantai', 'Budaya', 'Religi', 'Sejarah'];

  const filtered = destinations.filter(d => {
    const matchesRegion = filterRegion === 'Semua' || d.location === filterRegion;
    const matchesCategory = filterCategory === 'Semua' || d.category === filterCategory;
    const query = searchQuery.toLowerCase().trim();
    const matchesSearch = !query || 
      d.name.toLowerCase().includes(query) ||
      d.location.toLowerCase().includes(query) ||
      d.category.toLowerCase().includes(query);

    return matchesRegion && matchesCategory && matchesSearch;
  });

  return (
    <div className="maps-container">
      {/* Map Tools Header */}
      <div style={{ borderBottom: '1px solid var(--hairline)', padding: '12px 24px', backgroundColor: 'var(--surface-1)' }}>
        <div style={{ display: 'flex', flexWrap: 'wrap', alignItems: 'center', justifyContent: 'space-between', gap: '12px' }}>
          <h1 style={{ margin: 0, fontSize: '1.25rem', fontWeight: 300, display: 'flex', alignItems: 'center', gap: '8px', color: 'var(--ink)' }}>
            <Navigation size={20} style={{ color: 'var(--primary)' }} /> Peta Interaktif Sistem Pariwisata Madura
          </h1>
          <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
            <span style={{ fontSize: '0.8rem', color: 'var(--ink-muted)', display: 'flex', alignItems: 'center' }}>Saring Wilayah:</span>
            {regions.map(r => (
              <button
                key={r}
                onClick={() => setFilterRegion(r)}
                style={{
                  fontSize: '0.75rem',
                  padding: '4px 10px',
                  backgroundColor: filterRegion === r ? 'var(--primary)' : 'var(--canvas)',
                  color: filterRegion === r ? 'white' : 'var(--ink)',
                  border: '1px solid var(--hairline-strong)',
                  borderRadius: '4px',
                  cursor: 'pointer',
                  fontWeight: filterRegion === r ? 600 : 400
                }}
              >
                {r}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Main Split Layout */}
      <div className="maps-split">
        {/* Left Sidebar List */}
        <div className="maps-sidebar">
          {/* Sidebar Filters */}
          <div style={{ padding: '16px', borderBottom: '1px solid var(--hairline)', backgroundColor: 'var(--surface-1)' }}>
            <div style={{ position: 'relative', marginBottom: '8px' }}>
              <input 
                type="text" 
                placeholder="Cari lokasi wisata..." 
                style={{ 
                  width: '100%', 
                  fontSize: '0.8rem', 
                  padding: '8px 12px 8px 32px', 
                  borderRadius: '4px',
                  border: '1px solid var(--hairline)',
                  backgroundColor: 'var(--canvas)',
                  color: 'var(--ink)'
                }}
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
              <Search size={14} style={{ position: 'absolute', left: '10px', top: '50%', transform: 'translateY(-50%)', color: 'var(--ink-muted)' }} />
            </div>
            
            <div style={{ display: 'flex', gap: '4px', overflowX: 'auto', paddingBottom: '4px' }}>
              {categories.map(c => (
                <button
                  key={c}
                  onClick={() => setFilterCategory(c)}
                  style={{
                    fontSize: '0.7rem',
                    padding: '2px 8px',
                    backgroundColor: filterCategory === c ? 'var(--primary)' : 'var(--canvas)',
                    color: filterCategory === c ? 'white' : 'var(--ink)',
                    border: '1px solid var(--hairline)',
                    borderRadius: '4px',
                    cursor: 'pointer',
                    whiteSpace: 'nowrap'
                  }}
                >
                  {c}
                </button>
              ))}
            </div>
          </div>

          {/* Location List */}
          <div style={{ overflowY: 'auto', flexGrow: 1, padding: '12px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px' }}>
              <span style={{ fontSize: '0.75rem', fontWeight: 600, color: 'var(--ink-muted)' }}>
                DITEMUKAN ({filtered.length})
              </span>
              {selectedLocation.name !== 'Pulau Madura' && (
                <button
                  onClick={() => setSelectedLocation({ name: 'Pulau Madura', lat: -7.1068, lng: 113.4862, zoom: 9 })}
                  style={{ fontSize: '0.75rem', color: 'var(--primary)', border: 'none', background: 'transparent', cursor: 'pointer', fontWeight: 600 }}
                >
                  Reset Peta
                </button>
              )}
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
              {filtered.map(d => (
                <div
                  key={d.id}
                  onClick={() => handleSelectLocation(d)}
                  style={{
                    padding: '10px 12px',
                    cursor: 'pointer',
                    border: '1px solid var(--hairline)',
                    borderRadius: '4px',
                    backgroundColor: selectedLocation.id === d.id ? 'var(--surface-1)' : 'var(--canvas)',
                    borderColor: selectedLocation.id === d.id ? 'var(--primary)' : 'var(--hairline)',
                    transition: 'all 0.15s'
                  }}
                >
                  <h4 style={{ margin: '0 0 4px 0', fontSize: '0.85rem', fontWeight: 600, color: 'var(--ink)' }}>{d.name}</h4>
                  <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.75rem', color: 'var(--ink-muted)' }}>
                    <span>📍 {d.location}</span>
                    <span style={{ fontWeight: 600, color: 'var(--primary)' }}>{d.category}</span>
                  </div>
                </div>
              ))}

              {filtered.length === 0 && (
                <div style={{ textAlign: 'center', padding: '24px 0', color: 'var(--ink-muted)', fontSize: '0.8rem' }}>
                  Tidak ada titik koordinat yang cocok.
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Right Map Canvas */}
        <div className="maps-canvas-container">
          <iframe
            title="Google Maps"
            src={`https://maps.google.com/maps?q=${selectedLocation.lat},${selectedLocation.lng}&t=m&z=${selectedLocation.zoom}&output=embed&iwloc=near`}
            className="maps-iframe"
            allowFullScreen=""
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
          ></iframe>

          {/* Floating Details Card Overlay */}
          {selectedLocation.name !== 'Pulau Madura' && selectedLocation.id && (
            <div style={{
              position: 'absolute',
              bottom: '24px',
              left: '24px',
              right: '24px',
              maxWidth: '380px',
              backgroundColor: 'white',
              padding: '16px',
              borderRadius: '4px',
              boxShadow: '0 4px 24px rgba(0,0,0,0.15)',
              border: '1px solid var(--hairline-strong)',
              display: 'flex',
              flexDirection: 'column',
              gap: '8px',
              zIndex: 5
            }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                <h4 style={{ margin: 0, fontSize: '1rem', fontWeight: 600, color: '#161616' }}>{selectedLocation.name}</h4>
                <span className="badge" style={{ backgroundColor: 'var(--surface-1)', color: 'var(--primary)', fontSize: '0.75rem' }}>
                  ⭐ {selectedLocation.rating}
                </span>
              </div>
              <p style={{ fontSize: '0.8rem', color: '#525252', margin: 0, lineHeight: '1.4' }}>
                {selectedLocation.shortDescription}
              </p>
              <div style={{ display: 'flex', gap: '8px', marginTop: '4px' }}>
                <Link
                  to={`/destinations/${selectedLocation.id}`}
                  className="btn btn-primary"
                  style={{ flex: 1, fontSize: '0.75rem', padding: '8px', justifyContent: 'center', textAlign: 'center', borderRadius: '4px', textDecoration: 'none' }}
                >
                  Buka Detail
                </Link>
                <a
                  href={`https://www.google.com/maps?q=${selectedLocation.lat},${selectedLocation.lng}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn btn-ghost"
                  style={{ flex: 1, border: '1px solid var(--primary)', color: 'var(--primary)', fontSize: '0.75rem', padding: '8px', justifyContent: 'center', borderRadius: '4px', backgroundColor: 'white', textDecoration: 'none' }}
                >
                  🗺️ Google Maps
                </a>
                <button
                  onClick={() => setSelectedLocation({ name: 'Pulau Madura', lat: -7.1068, lng: 113.4862, zoom: 9 })}
                  className="btn btn-ghost"
                  style={{ border: '1px solid var(--hairline)', fontSize: '0.75rem', padding: '8px', justifyContent: 'center', borderRadius: '4px', backgroundColor: 'white' }}
                >
                  ✕
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
