import React, { useContext } from 'react';
import { useParams, Link } from 'react-router-dom';
import { MapPin, Star, BedDouble, Phone, Clock, Wifi, Car, ChevronLeft, ExternalLink, Heart } from 'lucide-react';
import { AppContext } from '../context/AppContext';

function StarBadge({ stars }) {
  const colors = { 2: '#6b7280', 3: '#f59e0b', 4: '#3b82f6', 5: '#8b5cf6' };
  return (
    <span style={{
      display: 'inline-flex', alignItems: 'center', gap: '3px',
      backgroundColor: colors[stars] || '#6b7280',
      color: 'white', fontSize: '0.8rem', fontWeight: 700,
      padding: '4px 10px', borderRadius: '2px'
    }}>
      {'★'.repeat(stars)} {stars} Bintang
    </span>
  );
}

export default function AccommodationDetail() {
  const { id } = useParams();
  const { accommodations, destinations, toggleFavorite, isFavorite } = useContext(AppContext);
  const isFav = isFavorite(parseInt(id), 'accommodation');

  const acc = accommodations?.find(a => a.id === parseInt(id));

  if (!acc) {
    return (
      <div style={{ padding: '6rem 0', textAlign: 'center', backgroundColor: 'var(--canvas)' }}>
        <div className="container">
          <h2 style={{ fontWeight: 300, marginBottom: '1rem' }}>Penginapan Tidak Ditemukan</h2>
          <Link to="/accommodations" className="btn btn-primary" style={{ borderRadius: '4px' }}>Kembali ke Penginapan</Link>
        </div>
      </div>
    );
  }

  const mapsUrl = `https://www.google.com/maps?q=${acc.lat},${acc.lng}`;
  const embedUrl = `https://www.google.com/maps/embed/v1/place?key=AIzaSyD-9tSrke72PouQMnMX-a7eZSW0jkFMBWY&q=${acc.lat},${acc.lng}&zoom=15`;

  // Nearby destinations from same region
  const nearbyDests = destinations
    .filter(d => d.location === acc.region || d.location.includes(acc.region))
    .slice(0, 4);

  return (
    <div style={{ backgroundColor: 'var(--canvas)', minHeight: '100vh' }}>
      {/* Breadcrumb */}
      <div style={{ backgroundColor: 'var(--surface-1)', borderBottom: '1px solid var(--hairline)', padding: '0.75rem 0' }}>
        <div className="container">
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '0.85rem', color: 'var(--ink-muted)' }}>
            <Link to="/" style={{ color: 'var(--ink-muted)', textDecoration: 'none' }}>Beranda</Link>
            <span>/</span>
            <Link to="/accommodations" style={{ color: 'var(--ink-muted)', textDecoration: 'none' }}>Penginapan</Link>
            <span>/</span>
            <span style={{ color: 'var(--ink)' }}>{acc.name}</span>
          </div>
        </div>
      </div>

      {/* Hero Image */}
      <div style={{ position: 'relative', height: '380px', overflow: 'hidden' }}>
        <img src={acc.image} alt={acc.name} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
        <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to bottom, rgba(0,0,0,0.1) 0%, rgba(0,0,0,0.6) 100%)' }} />
        <div className="container" style={{ position: 'absolute', bottom: '2rem', left: '50%', transform: 'translateX(-50%)', width: '100%' }}>
          <StarBadge stars={acc.stars} />
          <h1 style={{ color: 'white', fontSize: '2.2rem', fontWeight: 300, margin: '0.5rem 0', textShadow: '0 2px 8px rgba(0,0,0,0.4)' }}>{acc.name}</h1>
          <div style={{ display: 'flex', alignItems: 'center', gap: '1.5rem', flexWrap: 'wrap' }}>
            <span style={{ color: 'rgba(255,255,255,0.9)', display: 'flex', alignItems: 'center', gap: '6px', fontSize: '0.95rem' }}>
              <MapPin size={16} /> {acc.location}
            </span>
            <span style={{ color: '#ffd166', display: 'flex', alignItems: 'center', gap: '5px', fontWeight: 700 }}>
              <Star size={16} fill="#ffd166" /> {acc.rating.toFixed(1)} / 5.0
            </span>
          </div>
        </div>
        <Link to="/accommodations" style={{
          position: 'absolute', top: '1.5rem', left: '1.5rem',
          background: 'rgba(255,255,255,0.9)', border: 'none', borderRadius: '4px',
          padding: '8px 14px', display: 'flex', alignItems: 'center', gap: '6px',
          textDecoration: 'none', color: 'var(--ink)', fontSize: '0.85rem', fontWeight: 600,
          cursor: 'pointer'
        }}>
          <ChevronLeft size={16} /> Kembali
        </Link>
      </div>

      {/* Main Content */}
      <section style={{ padding: '2.5rem 0' }}>
        <div className="container grid md:grid-cols-3 gap-8" style={{ alignItems: 'start' }}>

          {/* Left Column */}
          <div className="md:col-span-2">
            {/* Description */}
            <div style={{ border: '1px solid var(--hairline)', borderRadius: '8px', padding: '1.5rem', marginBottom: '1.5rem', backgroundColor: 'var(--canvas)' }}>
              <h2 style={{ fontSize: '1.25rem', fontWeight: 600, marginBottom: '1rem', display: 'flex', alignItems: 'center', gap: '8px' }}>
                <BedDouble size={20} style={{ color: 'var(--primary)' }} /> Tentang Penginapan
              </h2>
              <p style={{ color: 'var(--ink-muted)', lineHeight: '1.7', margin: 0 }}>{acc.description}</p>
            </div>

            {/* Facilities */}
            <div style={{ border: '1px solid var(--hairline)', borderRadius: '8px', padding: '1.5rem', marginBottom: '1.5rem', backgroundColor: 'var(--canvas)' }}>
              <h2 style={{ fontSize: '1.25rem', fontWeight: 600, marginBottom: '1rem' }}>Fasilitas</h2>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(160px, 1fr))', gap: '8px' }}>
                {acc.facilities.map(f => (
                  <div key={f} style={{
                    padding: '8px 12px', border: '1px solid var(--hairline)',
                    borderRadius: '4px', fontSize: '0.85rem', color: 'var(--ink)',
                    backgroundColor: 'var(--surface-1)', display: 'flex', alignItems: 'center', gap: '6px'
                  }}>
                    <span style={{ color: 'var(--primary)' }}>✓</span> {f}
                  </div>
                ))}
              </div>
            </div>

            {/* Google Maps Embed */}
            <div style={{ border: '1px solid var(--hairline)', borderRadius: '8px', overflow: 'hidden', marginBottom: '1.5rem' }}>
              <div style={{ padding: '1rem 1.5rem', backgroundColor: 'var(--surface-1)', borderBottom: '1px solid var(--hairline)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <h2 style={{ fontSize: '1.25rem', fontWeight: 600, margin: 0 }}>Lokasi di Peta</h2>
                <a href={mapsUrl} target="_blank" rel="noopener noreferrer" className="btn btn-primary"
                  style={{ display: 'flex', alignItems: 'center', gap: '6px', padding: '8px 16px', borderRadius: '4px', fontSize: '0.85rem', textDecoration: 'none' }}>
                  <ExternalLink size={14} /> Buka Google Maps
                </a>
              </div>
              <iframe
                title={`Peta ${acc.name}`}
                width="100%"
                height="320"
                style={{ border: 'none', display: 'block' }}
                src={`https://maps.google.com/maps?q=${acc.lat},${acc.lng}&z=15&output=embed`}
              />
            </div>

            {/* Nearby Destinations */}
            {nearbyDests.length > 0 && (
              <div style={{ border: '1px solid var(--hairline)', borderRadius: '8px', padding: '1.5rem', backgroundColor: 'var(--canvas)' }}>
                <h2 style={{ fontSize: '1.25rem', fontWeight: 600, marginBottom: '1rem' }}>Destinasi Wisata Terdekat</h2>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))', gap: '10px' }}>
                  {nearbyDests.map(d => (
                    <Link key={d.id} to={`/destinations/${d.id}`}
                      style={{ display: 'flex', alignItems: 'center', gap: '10px', padding: '10px', border: '1px solid var(--hairline)', borderRadius: '6px', textDecoration: 'none', color: 'var(--ink)', transition: 'border-color 0.2s' }}>
                      <img src={d.image} alt={d.name} style={{ width: '48px', height: '48px', objectFit: 'cover', borderRadius: '4px', flexShrink: 0 }} />
                      <div>
                        <p style={{ margin: 0, fontWeight: 600, fontSize: '0.85rem', lineHeight: 1.3 }}>{d.name}</p>
                        <p style={{ margin: 0, fontSize: '0.75rem', color: 'var(--ink-muted)' }}>⭐ {d.rating.toFixed(1)}</p>
                      </div>
                    </Link>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Right Sidebar */}
          <div className="md:col-span-1" style={{ position: 'sticky', top: '80px' }}>
            <div style={{ border: '1px solid var(--hairline)', borderRadius: '8px', padding: '1.5rem', backgroundColor: 'var(--canvas)', marginBottom: '1rem' }}>
              <div style={{ marginBottom: '1.25rem', paddingBottom: '1.25rem', borderBottom: '1px solid var(--hairline)' }}>
                <p style={{ fontSize: '0.8rem', color: 'var(--ink-muted)', margin: '0 0 4px' }}>Harga per malam</p>
                <p style={{ fontSize: '1.3rem', fontWeight: 700, color: 'var(--primary)', margin: 0 }}>{acc.pricePerNight}</p>
              </div>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', marginBottom: '1.25rem' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '10px', fontSize: '0.875rem' }}>
                  <Clock size={16} style={{ color: 'var(--ink-muted)', flexShrink: 0 }} />
                  <div>
                    <p style={{ margin: 0, color: 'var(--ink-muted)', fontSize: '0.75rem' }}>Check-in / Check-out</p>
                    <p style={{ margin: 0, fontWeight: 600 }}>{acc.checkIn} — {acc.checkOut}</p>
                  </div>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '10px', fontSize: '0.875rem' }}>
                  <Phone size={16} style={{ color: 'var(--ink-muted)', flexShrink: 0 }} />
                  <div>
                    <p style={{ margin: 0, color: 'var(--ink-muted)', fontSize: '0.75rem' }}>Telepon</p>
                    <p style={{ margin: 0, fontWeight: 600 }}>{acc.phone}</p>
                  </div>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '10px', fontSize: '0.875rem' }}>
                  <MapPin size={16} style={{ color: 'var(--ink-muted)', flexShrink: 0 }} />
                  <div>
                    <p style={{ margin: 0, color: 'var(--ink-muted)', fontSize: '0.75rem' }}>Kabupaten</p>
                    <p style={{ margin: 0, fontWeight: 600 }}>{acc.region}</p>
                  </div>
                </div>
              </div>

              <a href={mapsUrl} target="_blank" rel="noopener noreferrer"
                style={{
                  display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px',
                  width: '100%', padding: '12px', borderRadius: '4px',
                  backgroundColor: 'var(--primary)', color: 'white', fontWeight: 600,
                  textDecoration: 'none', fontSize: '0.9rem', transition: 'opacity 0.2s'
                }}
                onMouseEnter={e => e.currentTarget.style.opacity = '0.85'}
                onMouseLeave={e => e.currentTarget.style.opacity = '1'}
              >
                <ExternalLink size={16} /> Lihat di Google Maps
              </a>
              <button onClick={() => toggleFavorite(acc.id, 'accommodation')}
                style={{
                  display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px',
                  width: '100%', padding: '12px', borderRadius: '4px', marginTop: '10px',
                  border: '1px solid var(--hairline-strong)', color: 'var(--ink)', fontWeight: 600,
                  textDecoration: 'none', fontSize: '0.9rem', backgroundColor: 'var(--canvas)',
                  cursor: 'pointer'
                }}>
                <Heart size={16} fill={isFav ? 'var(--semantic-error)' : 'none'} stroke={isFav ? 'var(--semantic-error)' : 'currentColor'} />
                {isFav ? 'Hapus dari Favorit' : 'Simpan ke Favorit'}
              </button>
              <a href={`tel:${acc.phone}`}
                style={{
                  display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px',
                  width: '100%', padding: '12px', borderRadius: '4px', marginTop: '10px',
                  border: '1px solid var(--hairline)', color: 'var(--ink)', fontWeight: 600,
                  textDecoration: 'none', fontSize: '0.9rem', backgroundColor: 'var(--canvas)'
                }}>
                <Phone size={16} /> Hubungi Sekarang
              </a>
            </div>

            {/* Region badge */}
            <div style={{ border: '1px solid var(--hairline)', borderRadius: '8px', padding: '1.25rem', backgroundColor: 'var(--surface-1)', textAlign: 'center' }}>
              <p style={{ margin: '0 0 4px', fontSize: '0.8rem', color: 'var(--ink-muted)' }}>Wilayah</p>
              <p style={{ margin: 0, fontWeight: 700, color: 'var(--primary)', fontSize: '1.1rem' }}>Kabupaten {acc.region}</p>
              <p style={{ margin: '4px 0 0', fontSize: '0.78rem', color: 'var(--ink-muted)' }}>Pulau Madura, Jawa Timur</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
