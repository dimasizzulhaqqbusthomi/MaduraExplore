import React, { useState, useContext } from 'react';
import { AppContext } from '../context/AppContext';
import { Map, Plus, Trash2, Calendar, Clock, Heart, Sparkles, AlertCircle } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function Planner() {
  const { 
    itinerary, 
    destinations, 
    favorites,
    addToItinerary, 
    removeFromItinerary, 
    updateItineraryTime, 
    clearItinerary
  } = useContext(AppContext);

  const [selectedDestId, setSelectedDestId] = useState('');
  const [showAddMenu, setShowAddMenu] = useState(null); // holds day index (1, 2, 3)
  const [msg, setMsg] = useState('');

  const handleAddDirect = (day, destId) => {
    const dest = destinations.find(d => d.id === parseInt(destId));
    if (dest) {
      const res = addToItinerary(day, dest);
      if (!res.success) {
        setMsg(res.message);
        setTimeout(() => setMsg(''), 3000);
      }
      setSelectedDestId('');
      setShowAddMenu(null);
    }
  };

  // Get favorite destinations
  const favoriteDestinations = destinations.filter(dest => 
    favorites.some(fav => fav.id === dest.id && fav.type === 'destination')
  );

  return (
    <div className="section" style={{ backgroundColor: 'var(--canvas)', minHeight: '100vh', padding: '3rem 0' }}>
      <div className="container">
        {/* Header */}
        <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'space-between', alignItems: 'center', gap: '1rem', marginBottom: '2.5rem' }}>
          <div>
            <h1 className="font-semibold" style={{ fontSize: '2rem', fontWeight: 300, color: 'var(--ink)', marginBottom: '0.25rem' }}>
              Rencana Perjalanan 3-Hari Madura
            </h1>
            <p style={{ color: 'var(--ink-muted)', fontSize: '0.95rem' }}>
              Susun liburan terintegrasi Anda hari demi hari secara dinamis di seluruh kabupaten Madura.
            </p>
          </div>
          <div style={{ display: 'flex', gap: '0.5rem' }}>
            <button 
              onClick={clearItinerary}
              className="btn btn-ghost"
              style={{ border: '1px solid var(--hairline-strong)', color: 'var(--semantic-error)', borderRadius: '4px', fontSize: '0.875rem' }}
            >
              Reset Rencana
            </button>
            <Link to="/maps" className="btn btn-primary" style={{ display: 'flex', alignItems: 'center', gap: '6px', borderRadius: '4px', textDecoration: 'none' }}>
              <Map size={16} /> Lihat di Peta
            </Link>
          </div>
        </div>

        {msg && (
          <div style={{ padding: '12px 16px', backgroundColor: 'rgba(255,0,0,0.05)', border: '1px solid var(--semantic-error)', color: 'var(--semantic-error)', borderRadius: '4px', marginBottom: '1.5rem', fontSize: '0.9rem', display: 'flex', alignItems: 'center', gap: '8px' }}>
            <AlertCircle size={16} /> {msg}
          </div>
        )}

        <div className="grid md:grid-cols-4 gap-8">
          {/* Main Planner Grid */}
          <div className="md:col-span-3">
            <div className="grid md:grid-cols-3 gap-6">
              {[1, 2, 3].map(dayNum => {
                const dayKey = `day${dayNum}`;
                const items = itinerary[dayKey] || [];
                return (
                  <div key={dayNum} className="card" style={{ backgroundColor: 'var(--surface-1)', border: '1px solid var(--hairline)', borderRadius: '4px', display: 'flex', flexDirection: 'column' }}>
                    <div style={{ padding: '1rem 1.25rem', borderBottom: '1px solid var(--hairline)', backgroundColor: 'var(--canvas)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                      <h3 style={{ fontSize: '1rem', fontWeight: 600, display: 'flex', alignItems: 'center', gap: '8px', margin: 0 }}>
                        <Calendar size={18} style={{ color: 'var(--primary)' }} /> Hari {dayNum}
                      </h3>
                      <span className="badge" style={{ backgroundColor: 'var(--surface-1)', color: 'var(--ink)', fontSize: '0.75rem' }}>
                        {items.length} Lokasi
                      </span>
                    </div>
                    
                    <div style={{ padding: '1.25rem', minHeight: '380px', display: 'flex', flexDirection: 'column', flexGrow: 1 }}>
                      {items.length === 0 ? (
                        <div style={{ textAlign: 'center', margin: 'auto 0', padding: '2rem 0', color: 'var(--ink-muted)' }}>
                          <Clock size={36} style={{ margin: '0 auto 8px auto', opacity: 0.3, color: 'var(--primary)' }} />
                          <p style={{ fontSize: '0.8rem', margin: 0 }}>Belum ada destinasi yang direncanakan untuk hari ini.</p>
                        </div>
                      ) : (
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem', marginBottom: '1.5rem' }}>
                          {items.map(item => (
                            <div 
                              key={item.id} 
                              style={{ 
                                padding: '0.85rem', 
                                border: '1px solid var(--hairline)', 
                                backgroundColor: 'var(--canvas)',
                                borderRadius: '4px',
                                position: 'relative'
                              }}
                            >
                              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '6px' }}>
                                <input 
                                  type="text" 
                                  value={item.time} 
                                  onChange={(e) => updateItineraryTime(dayNum, item.id, e.target.value)}
                                  style={{
                                    fontSize: '0.75rem',
                                    fontWeight: 600,
                                    color: 'var(--primary)',
                                    border: 'none',
                                    background: 'transparent',
                                    width: '80px',
                                    padding: 0,
                                    outline: 'none'
                                  }}
                                  title="Klik untuk mengubah jam"
                                />
                                <button 
                                  style={{ padding: '2px', background: 'transparent', border: 'none', color: 'var(--semantic-error)', cursor: 'pointer' }}
                                  onClick={() => removeFromItinerary(dayNum, item.id)}
                                  title="Hapus dari rencana"
                                >
                                  <Trash2 size={14} />
                                </button>
                              </div>
                              <Link 
                                to={`/destinations/${item.id}`}
                                style={{ fontSize: '0.9rem', fontWeight: 600, color: 'var(--ink)', textDecoration: 'none', display: 'block', marginBottom: '4px' }}
                              >
                                {item.name || item.title || 'Destinasi Wisata'}
                              </Link>
                              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', fontSize: '0.72rem', color: 'var(--ink-muted)' }}>
                                <span>📍 {item.location}</span>
                                <span className="badge" style={{ backgroundColor: 'var(--surface-1)', padding: '1px 4px', fontSize: '0.65rem' }}>{item.category}</span>
                              </div>
                            </div>
                          ))}
                        </div>
                      )}
                      
                      {/* Dynamic Add dropdown inside Day card */}
                      <div style={{ marginTop: 'auto', position: 'relative' }}>
                        {showAddMenu === dayNum ? (
                          <div className="card" style={{ border: '1px solid var(--hairline-strong)', backgroundColor: 'white', position: 'absolute', bottom: '100%', left: 0, right: 0, zIndex: 10, padding: '12px', marginBottom: '8px', boxShadow: '0 4px 16px rgba(0,0,0,0.1)', borderRadius: '4px' }}>
                            <label style={{ fontSize: '0.75rem', fontWeight: 600, display: 'block', marginBottom: '6px', color: '#161616' }}>Pilih Destinasi:</label>
                            <select
                              value={selectedDestId}
                              onChange={(e) => setSelectedDestId(e.target.value)}
                              className="input mb-2"
                              style={{ width: '100%', fontSize: '0.8rem', padding: '6px', borderRadius: '4px', border: '1px solid var(--hairline)', marginBottom: '8px', color: '#161616' }}
                            >
                              <option value="">-- Pilih --</option>
                              {destinations.map(d => (
                                <option key={d.id} value={d.id}>{d.name} ({d.location})</option>
                              ))}
                            </select>
                            <div style={{ display: 'flex', gap: '4px' }}>
                              <button 
                                onClick={() => handleAddDirect(dayNum, selectedDestId)}
                                className="btn btn-primary"
                                style={{ flex: 1, fontSize: '0.75rem', padding: '6px 0', justifyContent: 'center', borderRadius: '4px' }}
                                disabled={!selectedDestId}
                              >
                                Tambah
                              </button>
                              <button 
                                onClick={() => setShowAddMenu(null)}
                                className="btn btn-ghost"
                                style={{ border: '1px solid var(--hairline)', fontSize: '0.75rem', padding: '6px 0', justifyContent: 'center', borderRadius: '4px', backgroundColor: 'white' }}
                              >
                                Batal
                              </button>
                            </div>
                          </div>
                        ) : (
                          <button 
                            onClick={() => { setShowAddMenu(dayNum); setSelectedDestId(''); }}
                            className="btn btn-ghost" 
                            style={{ width: '100%', border: '1px dashed var(--hairline-strong)', fontSize: '0.8rem', padding: '8px', justifyContent: 'center', borderRadius: '4px', display: 'flex', alignItems: 'center', gap: '4px', backgroundColor: 'var(--canvas)' }}
                          >
                            <Plus size={14} /> Tambah Destinasi
                          </button>
                        )}
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
 
          {/* Sidebar - Quick Add from Favorites */}
          <div className="col-span-1">
            <div className="card p-4" style={{ border: '1px solid var(--hairline)', backgroundColor: 'var(--canvas)', borderRadius: '4px', padding: '1.25rem' }}>
              <h3 style={{ fontSize: '0.8rem', textTransform: 'uppercase', color: 'var(--ink-muted)', marginBottom: '1.25rem', display: 'flex', alignItems: 'center', gap: '6px', margin: 0 }}>
                <Heart size={14} style={{ color: 'var(--semantic-error)' }} /> Destinasi Favorit ({favoriteDestinations.length})
              </h3>
              
              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
                {favoriteDestinations.map(dest => (
                  <div key={dest.id} style={{ fontSize: '0.8rem', padding: '10px', border: '1px solid var(--hairline)', backgroundColor: 'var(--canvas)', borderRadius: '4px', display: 'flex', flexDirection: 'column', gap: '6px' }}>
                    <div style={{ fontWeight: 600, color: 'var(--ink)' }}>{dest.name}</div>
                    
                    <div style={{ display: 'flex', gap: '4px', alignItems: 'center' }}>
                      <span style={{ fontSize: '0.7rem', color: 'var(--ink-muted)' }}>Hari:</span>
                      {[1, 2, 3].map(day => (
                        <button
                          key={day}
                          onClick={() => addToItinerary(day, dest)}
                          style={{
                            padding: '2px 8px',
                            fontSize: '0.7rem',
                            backgroundColor: 'var(--surface-1)',
                            border: '1px solid var(--hairline)',
                            cursor: 'pointer',
                            borderRadius: '4px',
                            fontWeight: 600
                          }}
                        >
                          +{day}
                        </button>
                      ))}
                    </div>
                  </div>
                ))}
                
                {favoriteDestinations.length === 0 && (
                  <div style={{ textAlign: 'center', padding: '24px 0', color: 'var(--ink-muted)', lineHeight: '1.5', fontSize: '0.8rem' }}>
                    <Sparkles size={20} style={{ margin: '0 auto 8px auto', color: 'var(--primary)', opacity: 0.4 }} />
                    Belum ada destinasi favorit.<br />
                    Tandai objek wisata di <Link to="/explore" style={{ color: 'var(--primary)', textDecoration: 'underline' }}>Jelajahi</Link> dengan ikon hati untuk memunculkannya di sini.
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
