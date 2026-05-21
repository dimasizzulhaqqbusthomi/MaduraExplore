import React, { useState, useContext } from 'react';
import { Link } from 'react-router-dom';
import { Calendar, MapPin, ArrowRight, Search, Heart } from 'lucide-react';
import { AppContext } from '../context/AppContext';

export default function Events() {
  const { events, toggleFavorite, isFavorite } = useContext(AppContext);
  const [searchQuery, setSearchQuery] = useState('');
  const [activeFilter, setActiveFilter] = useState('Semua');

  const categories = ['Semua', 'cultural festival', 'traditional performance', 'culinary festival', 'local celebration'];

  // Map category values for UI
  const categoryLabels = {
    'Semua': 'Semua Kategori',
    'cultural festival': 'Festival Budaya Adat',
    'traditional performance': 'Kesenian Tradisional',
    'culinary festival': 'Festival Kuliner',
    'local celebration': 'Perayaan Lokal'
  };

  // Search & Filter Logic
  const filteredEvents = events.filter(event => {
    const matchesFilter = activeFilter === 'Semua' || event.category === activeFilter;
    const matchesSearch = event.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          event.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          event.location.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesFilter && matchesSearch;
  });

  return (
    <div className="section" style={{ backgroundColor: 'var(--canvas)', minHeight: '100vh' }}>
      <div className="container">
        {/* Header */}
        <div style={{ marginBottom: '2.5rem' }}>
          <h1 style={{ fontSize: '2rem', fontWeight: 300, color: 'var(--ink)', marginBottom: '0.5rem' }}>
            Kalender Acara Budaya & Kebudayaan Madura
          </h1>
          <p style={{ color: 'var(--ink-muted)', fontSize: '0.95rem', letterSpacing: '0.16px' }}>
            Mendukung SDG 11 dengan melestarikan kebudayaan lokal, mempromosikan tradisi pusaka karapan sapi, keris, batik gentongan, dan pawai adat luhur di Pulau Madura.
          </p>
        </div>

        {/* Search & Filter */}
        <div className="card p-4 mb-8" style={{ border: '1px solid var(--hairline)', backgroundColor: 'var(--surface-1)', padding: '16px', marginBottom: '2rem', borderRadius: '4px' }}>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
            {/* Search Input */}
            <div style={{ position: 'relative' }}>
              <input 
                type="text" 
                placeholder="Cari festival budaya, saronen, pameran batik..." 
                className="input" 
                style={{ 
                  paddingLeft: '2.5rem', 
                  width: '100%', 
                  borderRadius: '4px',
                  backgroundColor: 'var(--canvas)', 
                  border: '1px solid var(--hairline)',
                  padding: '11px 16px 11px 40px' 
                }}
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
              <Search size={18} style={{ position: 'absolute', left: '1rem', top: '50%', transform: 'translateY(-50%)', color: 'var(--ink-muted)' }} />
            </div>

            {/* Filter Pills */}
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem', alignItems: 'center' }}>
              <span style={{ fontSize: '0.8rem', fontWeight: 600, color: 'var(--ink-muted)', marginRight: '8px' }}>Saring Acara:</span>
              {categories.map(cat => (
                <button
                  key={cat}
                  onClick={() => setActiveFilter(cat)}
                  style={{
                    fontSize: '0.8rem',
                    padding: '6px 12px',
                    cursor: 'pointer',
                    backgroundColor: activeFilter === cat ? 'var(--primary)' : 'var(--canvas)',
                    color: activeFilter === cat ? 'white' : 'var(--ink)',
                    border: '1px solid var(--hairline-strong)',
                    borderRadius: '4px',
                    fontWeight: activeFilter === cat ? 600 : 400
                  }}
                >
                  {categoryLabels[cat] || cat}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Event List */}
        <div style={{ maxWidth: '900px', margin: '0 auto', display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
          {filteredEvents.length > 0 ? filteredEvents.map(event => {
            const isFav = isFavorite(event.id, 'event');
            return (
              <div 
                key={event.id} 
                className="card" 
                style={{ 
                  display: 'flex', 
                  flexDirection: 'row', 
                  flexWrap: 'wrap',
                  padding: '0', 
                  overflow: 'hidden', 
                  border: '1px solid var(--hairline)',
                  backgroundColor: 'var(--canvas)',
                  borderRadius: '4px'
                }}
              >
                {/* Event Date Block */}
                <div 
                  style={{ 
                    backgroundColor: 'var(--primary)', 
                    color: 'white', 
                    padding: '2rem', 
                    display: 'flex', 
                    flexDirection: 'column', 
                    alignItems: 'center', 
                    justifyContent: 'center',
                    minWidth: '160px',
                    textAlign: 'center',
                    flex: '1 0 160px'
                  }}
                >
                  <Calendar size={24} style={{ color: 'white', marginBottom: '8px' }} />
                  <div style={{ fontWeight: 600, fontSize: '1.1rem', color: 'white' }}>{event.date}</div>
                </div>

                {/* Event Details Content */}
                <div style={{ padding: '1.5rem 2rem', flex: '99 1 350px', display: 'flex', flexDirection: 'column' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '0.5rem' }}>
                    <span className="badge" style={{ backgroundColor: 'var(--semantic-error)', color: 'white', fontSize: '0.72rem', padding: '4px 8px', borderRadius: '4px' }}>
                      {categoryLabels[event.category] || event.category}
                    </span>
                    <button 
                      onClick={(e) => {
                        e.stopPropagation();
                        toggleFavorite(event.id, 'event');
                      }}
                      style={{
                        backgroundColor: 'transparent',
                        border: 'none',
                        cursor: 'pointer'
                      }}
                    >
                      <Heart size={18} fill={isFav ? 'var(--semantic-error)' : 'none'} stroke={isFav ? 'var(--semantic-error)' : '#161616'} />
                    </button>
                  </div>

                  <h2 style={{ fontSize: '1.25rem', fontWeight: 600, margin: '4px 0 8px 0', color: 'var(--ink)' }}>{event.name}</h2>
                  
                  <p style={{ color: 'var(--ink-muted)', display: 'flex', alignItems: 'center', gap: '4px', marginBottom: '12px', fontSize: '0.8rem' }}>
                    <MapPin size={12} /> {event.location}
                  </p>
                  
                  <p style={{ fontSize: '0.875rem', marginBottom: '1.5rem', color: 'var(--ink-muted)', lineHeight: '1.5', letterSpacing: '0.16px' }}>
                    {event.description.substring(0, 160)}...
                  </p>
                  
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: 'auto' }}>
                    {event.relatedDestination && (
                      <span style={{ fontSize: '0.75rem', color: 'var(--ink-muted)' }}>
                        📍 Terkait: <strong>{event.relatedDestination}</strong>
                      </span>
                    )}
                    <Link 
                      to={`/events/${event.id}`} 
                      className="btn btn-ghost" 
                      style={{ padding: '0', display: 'flex', alignItems: 'center', gap: '0.25rem', fontSize: '0.9rem', color: 'var(--primary)', textDecoration: 'none', marginLeft: 'auto' }}
                    >
                      Lihat Acara <ArrowRight size={16} />
                    </Link>
                  </div>
                </div>
              </div>
            );
          }) : (
            <div className="text-center py-12 text-subtle card" style={{ border: '1px dashed var(--hairline)', backgroundColor: 'var(--canvas)', borderRadius: '4px', color: 'var(--ink-muted)' }}>
              Tidak ada festival atau acara budaya yang cocok dengan kriteria pencarian Anda.
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
