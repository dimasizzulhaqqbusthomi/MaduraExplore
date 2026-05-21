import React, { useContext } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Calendar, Clock, MapPin, Heart, ArrowLeft, Users, ShieldAlert } from 'lucide-react';
import { AppContext } from '../context/AppContext';

export default function EventDetail() {
  const { id } = useParams();
  const { events, destinations, toggleFavorite, isFavorite } = useContext(AppContext);

  const event = events.find(e => e.id === parseInt(id));

  if (!event) {
    return (
      <div className="section text-center" style={{ padding: '6rem 0', backgroundColor: 'var(--canvas)' }}>
        <div className="container card" style={{ maxWidth: '500px', margin: '0 auto', padding: '2rem', border: '1px solid var(--hairline)', borderRadius: '4px' }}>
          <h2 style={{ fontWeight: 300, marginBottom: '1rem' }}>Festival Tidak Ditemukan</h2>
          <p style={{ color: 'var(--ink-muted)', marginBottom: '1.5rem' }}>Maaf, festival/acara budaya yang Anda cari tidak tersedia.</p>
          <Link to="/events" className="btn btn-primary" style={{ borderRadius: '4px' }}>Kembali ke Acara</Link>
        </div>
      </div>
    );
  }

  const isFav = isFavorite(event.id, 'event');

  // Coordinates mapping
  const coordMap = {
    1: { lat: -7.1591, lng: 113.4802 }, // Pamekasan Stadion
    2: { lat: -7.0094, lng: 113.8604 }, // Sumenep Alun-Alun
    3: { lat: -7.0395, lng: 112.7489 }, // Bangkalan Taman Kota
    4: { lat: -7.1395, lng: 113.4302 }, // Pamekasan Batik
    5: { lat: -7.0211, lng: 112.7634 }  // Bangkalan Stadion Skep
  };

  const coords = coordMap[event.id] || { lat: -7.1068, lng: 113.4862 };
  const mapUrl = `https://maps.google.com/maps?q=${coords.lat},${coords.lng}&t=m&z=15&output=embed&iwloc=near`;

  // Find related tourism spot
  const relatedDest = destinations.find(d => 
    event.relatedDestination && (
      d.name.toLowerCase().includes(event.relatedDestination.toLowerCase()) || 
      event.relatedDestination.toLowerCase().includes(d.name.toLowerCase())
    )
  );

  return (
    <div style={{ backgroundColor: 'var(--canvas)', minHeight: '100vh', padding: '3rem 0' }}>
      <div className="container">
        {/* Breadcrumb */}
        <div style={{ marginBottom: '1.5rem', fontSize: '0.85rem', color: 'var(--ink-muted)' }}>
          <Link to="/" style={{ color: 'inherit', textDecoration: 'none' }}>Beranda</Link> &gt;{' '}
          <Link to="/events" style={{ color: 'inherit', textDecoration: 'none' }}>Acara Budaya</Link> &gt;{' '}
          <span style={{ color: 'var(--primary)', fontWeight: 600 }}>{event.name}</span>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {/* Left Column: Media & Actions */}
          <div className="md:col-span-1">
            <div className="card" style={{ border: '1px solid var(--hairline)', borderRadius: '4px', overflow: 'hidden', backgroundColor: 'var(--canvas)', marginBottom: '1.5rem' }}>
              <img src={event.image} alt={event.name} style={{ width: '100%', height: '240px', objectFit: 'cover' }} />
              <div style={{ padding: '1.25rem' }}>
                <button 
                  onClick={() => toggleFavorite(event.id, 'event')}
                  className="btn btn-secondary w-full"
                  style={{ border: '1px solid var(--hairline-strong)', justifyContent: 'center', gap: '6px', borderRadius: '4px', marginTop: '4px' }}
                >
                  <Heart size={16} fill={isFav ? 'var(--semantic-error)' : 'none'} stroke={isFav ? 'var(--semantic-error)' : 'currentColor'} />
                  {isFav ? 'Hapus dari Kalender' : 'Simpan ke Kalender'}
                </button>
              </div>
            </div>

            {/* Google Map */}
            <div className="card" style={{ border: '1px solid var(--hairline)', borderRadius: '4px', overflow: 'hidden', backgroundColor: 'var(--canvas)' }}>
              <div style={{ padding: '1rem', borderBottom: '1px solid var(--hairline)', fontWeight: 600, fontSize: '0.9rem' }}>
                🗺️ Peta Arena Festival
              </div>
              <div style={{ height: '240px', width: '100%' }}>
                <iframe
                  title="Peta Lokasi Event"
                  width="100%"
                  height="100%"
                  style={{ border: 0 }}
                  loading="lazy"
                  src={mapUrl}
                ></iframe>
              </div>
            </div>
          </div>

          {/* Right Column: Event Details */}
          <div className="md:col-span-2">
            <div className="card" style={{ padding: '2rem', border: '1px solid var(--hairline)', borderRadius: '4px', backgroundColor: 'var(--canvas)' }}>
              <div style={{ display: 'flex', gap: '8px', marginBottom: '1rem' }}>
                <span className="badge" style={{ backgroundColor: 'var(--semantic-error)', color: 'white', fontSize: '0.75rem', fontWeight: 600, padding: '4px 8px', borderRadius: '4px' }}>
                  {event.category.toUpperCase()}
                </span>
                <span className="badge" style={{ backgroundColor: 'var(--surface-1)', color: 'var(--ink)', fontSize: '0.75rem', fontWeight: 600, padding: '4px 8px', borderRadius: '4px', border: '1px solid var(--hairline)' }}>
                  SDG 11: Sustainable Culture
                </span>
              </div>

              <h1 style={{ fontSize: '2.25rem', fontWeight: 300, color: 'var(--ink)', margin: '0 0 8px 0' }}>{event.name}</h1>
              <p style={{ display: 'flex', alignItems: 'center', gap: '4px', color: 'var(--ink-muted)', fontSize: '0.9rem', margin: '0 0 1.5rem 0' }}>
                <MapPin size={16} /> {event.location}
              </p>

              <div style={{ borderTop: '1px solid var(--hairline)', borderBottom: '1px solid var(--hairline)', padding: '1.25rem 0', margin: '1.5rem 0', display: 'flex', flexWrap: 'wrap', gap: '2rem' }}>
                <div>
                  <div style={{ fontSize: '0.75rem', color: 'var(--ink-muted)', fontWeight: 600, marginBottom: '4px' }}>TANGGAL ACARA</div>
                  <div style={{ fontWeight: 600, color: 'var(--semantic-error)', fontSize: '1.1rem', display: 'flex', alignItems: 'center', gap: '6px' }}>
                    <Calendar size={18} /> {event.date}
                  </div>
                </div>
                <div>
                  <div style={{ fontSize: '0.75rem', color: 'var(--ink-muted)', fontWeight: 600, marginBottom: '4px' }}>WAKTU PERTUNJUKAN</div>
                  <div style={{ fontWeight: 600, color: 'var(--ink)', fontSize: '1.1rem', display: 'flex', alignItems: 'center', gap: '6px' }}>
                    <Clock size={18} /> {event.time}
                  </div>
                </div>
                <div>
                  <div style={{ fontSize: '0.75rem', color: 'var(--ink-muted)', fontWeight: 600, marginBottom: '4px' }}>KATEGORI ACARA</div>
                  <div style={{ fontWeight: 600, color: 'var(--ink)', fontSize: '1.1rem' }}>🎭 Tradisional</div>
                </div>
              </div>

              <h3 style={{ fontSize: '1.25rem', fontWeight: 300, color: 'var(--ink)', margin: '0 0 0.75rem 0' }}>Deskripsi Acara</h3>
              <p style={{ lineHeight: '1.6', color: 'var(--ink)', fontSize: '0.975rem', margin: '0 0 2rem 0', letterSpacing: '0.16px' }}>
                {event.description}
              </p>

              {relatedDest ? (
                <div>
                  <h3 style={{ fontSize: '1.25rem', fontWeight: 300, color: 'var(--ink)', margin: '0 0 1rem 0' }}>Destinasi Wisata Terkait</h3>
                  <Link to={`/destinations/${relatedDest.id}`} className="card hover-card" style={{ display: 'flex', gap: '1rem', padding: '1rem', border: '1px solid var(--hairline)', borderRadius: '4px', textDecoration: 'none', color: 'inherit', maxWidth: '400px' }}>
                    <img src={relatedDest.image} alt={relatedDest.name} style={{ width: '80px', height: '80px', objectFit: 'cover', borderRadius: '4px' }} />
                    <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
                      <h4 style={{ margin: '0 0 4px 0', fontSize: '1rem', fontWeight: 600 }}>{relatedDest.name}</h4>
                      <span style={{ fontSize: '0.8rem', color: 'var(--ink-muted)' }}>📍 Wisata {relatedDest.category}</span>
                    </div>
                  </Link>
                </div>
              ) : (
                event.relatedDestination && (
                  <div>
                    <h3 style={{ fontSize: '1.25rem', fontWeight: 300, color: 'var(--ink)', margin: '0 0 1rem 0' }}>Destinasi Wisata Terkait</h3>
                    <p style={{ color: 'var(--ink-muted)', fontSize: '0.85rem' }}>{event.relatedDestination}</p>
                  </div>
                )
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
