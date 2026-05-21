import React, { useContext, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { MapPin, Clock, Ticket, Star, Map, Heart, AlertCircle, ShoppingBag, Utensils, Calendar } from 'lucide-react';
import { AppContext } from '../context/AppContext';

export default function DestinationDetail() {
  const { id } = useParams();
  const { destinations, msmes, events, culinaries, toggleFavorite, isFavorite, addToItinerary } = useContext(AppContext);
  
  const dest = destinations.find(d => d.id === parseInt(id));
  const [activeDay, setActiveDay] = useState(1);
  const [successMsg, setSuccessMsg] = useState('');

  if (!dest) {
    return (
      <div className="section text-center" style={{ padding: '6rem 0', backgroundColor: 'var(--canvas)' }}>
        <div className="container card" style={{ maxWidth: '500px', margin: '0 auto', padding: '2rem', border: '1px solid var(--hairline)', borderRadius: '4px' }}>
          <h2 style={{ fontWeight: 300, marginBottom: '1rem' }}>Destinasi Tidak Ditemukan</h2>
          <p style={{ color: 'var(--ink-muted)', marginBottom: '1.5rem' }}>Maaf, destinasi pariwisata yang Anda cari tidak tersedia dalam database kami.</p>
          <Link to="/destinations" className="btn btn-primary" style={{ borderRadius: '4px' }}>Kembali ke Destinasi</Link>
        </div>
      </div>
    );
  }

  const isFav = isFavorite(dest.id, 'destination');

  const handleItineraryAdd = () => {
    const res = addToItinerary(activeDay, dest);
    setSuccessMsg(res.message);
    setTimeout(() => setSuccessMsg(''), 3000);
  };

  // Find matching items
  const matchedMsmes = msmes.filter(m => 
    dest.nearbyMsmes?.some(name => m.name.toLowerCase().includes(name.toLowerCase()) || name.toLowerCase().includes(m.name.toLowerCase()))
  );

  const matchedCulinaries = culinaries.filter(c => 
    dest.nearbyCulinary?.some(name => c.name.toLowerCase().includes(name.toLowerCase()) || name.toLowerCase().includes(c.name.toLowerCase()))
  );

  const matchedEvents = events.filter(e => 
    dest.relatedEvents?.some(name => e.name.toLowerCase().includes(name.toLowerCase()) || name.toLowerCase().includes(e.name.toLowerCase()))
  );

  return (
    <div style={{ backgroundColor: 'var(--canvas)', minHeight: '100vh' }}>
      {/* Hero Image Section */}
      <div 
        style={{ 
          height: '420px', 
          backgroundImage: `linear-gradient(to bottom, rgba(0,0,0,0.1), rgba(0,0,0,0.85)), url(${dest.image})`, 
          backgroundSize: 'cover', 
          backgroundPosition: 'center',
          position: 'relative'
        }}
      >
        <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0, padding: '3rem 0', color: 'white' }}>
          <div className="container">
            <span className="badge" style={{ backgroundColor: 'var(--primary)', color: 'white', fontWeight: 600, fontSize: '0.8rem', padding: '6px 12px', borderRadius: '4px', marginBottom: '1rem', display: 'inline-block' }}>
              WISATA {dest.category.toUpperCase()}
            </span>
            <h1 className="text-white mb-2" style={{ color: 'white', fontSize: '2.75rem', fontWeight: 300, textShadow: '0 2px 4px rgba(0,0,0,0.4)', margin: '0 0 10px 0' }}>
              {dest.name}
            </h1>
            <p className="text-white flex items-center gap-2 text-sm" style={{ color: 'white', display: 'flex', alignItems: 'center', gap: '0.5rem', opacity: 0.95 }}>
              <MapPin size={16} /> {dest.address}
            </p>
          </div>
        </div>
      </div>

      {/* Main Details Section */}
      <div className="container py-8" style={{ padding: '3rem 0' }}>
        <div className="grid md:grid-cols-3 gap-8">
          {/* Main Left Content */}
          <div className="md:col-span-2">
            <section className="mb-8" style={{ marginBottom: '2.5rem' }}>
              <h2 className="font-semibold text-lg mb-4" style={{ fontSize: '1.4rem', borderBottom: '1px solid var(--hairline)', paddingBottom: '0.5rem', fontWeight: 300, color: 'var(--ink)' }}>
                Tentang Wisata
              </h2>
              <p style={{ lineHeight: '1.6', color: 'var(--ink)', fontSize: '1rem', letterSpacing: '0.16px' }}>
                {dest.description}
              </p>
            </section>

            <section className="mb-8" style={{ marginBottom: '2.5rem' }}>
              <h2 className="font-semibold text-lg mb-4" style={{ fontSize: '1.4rem', borderBottom: '1px solid var(--hairline)', paddingBottom: '0.5rem', fontWeight: 300, color: 'var(--ink)' }}>
                Fasilitas & Layanan
              </h2>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.75rem' }}>
                {dest.facilities.map((fac, i) => (
                  <span key={i} className="badge" style={{ padding: '8px 14px', backgroundColor: 'var(--surface-1)', border: '1px solid var(--hairline)', borderRadius: '4px', fontSize: '0.875rem', color: 'var(--ink)' }}>
                    ✓ {fac}
                  </span>
                ))}
              </div>
            </section>

            {/* Visit Meta Info */}
            <section className="mb-8" style={{ marginBottom: '2.5rem' }}>
              <h2 className="font-semibold text-lg mb-4" style={{ fontSize: '1.4rem', borderBottom: '1px solid var(--hairline)', paddingBottom: '0.5rem', fontWeight: 300, color: 'var(--ink)' }}>
                Informasi Penting
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '1rem' }}>
                <div className="card" style={{ padding: '1.25rem', display: 'flex', alignItems: 'center', gap: '1rem', border: '1px solid var(--hairline)', borderRadius: '4px' }}>
                  <Clock className="text-primary" size={24} style={{ color: 'var(--primary)' }} />
                  <div>
                    <div style={{ fontSize: '0.75rem', color: 'var(--ink-muted)', fontWeight: 600 }}>JAM OPERASIONAL</div>
                    <div style={{ fontSize: '0.9rem', fontWeight: 600, color: 'var(--ink)' }}>{dest.hours}</div>
                  </div>
                </div>
                <div className="card" style={{ padding: '1.25rem', display: 'flex', alignItems: 'center', gap: '1rem', border: '1px solid var(--hairline)', borderRadius: '4px' }}>
                  <Ticket className="text-primary" size={24} style={{ color: 'var(--primary)' }} />
                  <div>
                    <div style={{ fontSize: '0.75rem', color: 'var(--ink-muted)', fontWeight: 600 }}>HARGA TIKET</div>
                    <div style={{ fontSize: '0.9rem', fontWeight: 600, color: 'var(--ink)' }}>{dest.price}</div>
                  </div>
                </div>
                <div className="card" style={{ padding: '1.25rem', display: 'flex', alignItems: 'center', gap: '1rem', border: '1px solid var(--hairline)', borderRadius: '4px' }}>
                  <Star className="text-primary" size={24} style={{ color: 'var(--primary)' }} />
                  <div>
                    <div style={{ fontSize: '0.75rem', color: 'var(--ink-muted)', fontWeight: 600 }}>RATING PENGUNJUNG</div>
                    <div style={{ fontSize: '0.9rem', fontWeight: 600, color: 'var(--ink)' }}>⭐ {dest.rating.toFixed(1)} / 5.0</div>
                  </div>
                </div>
              </div>
            </section>

            {/* Recommendations Row */}
            <section className="mb-8" style={{ marginBottom: '2.5rem' }}>
              <h2 className="font-semibold text-lg mb-4" style={{ fontSize: '1.4rem', borderBottom: '1px solid var(--hairline)', paddingBottom: '0.5rem', fontWeight: 300, color: 'var(--ink)' }}>
                Ekosistem Kuliner Sekitar
              </h2>
              {matchedCulinaries.length > 0 ? (
                <div className="grid md:grid-cols-2 gap-4" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '1rem' }}>
                  {matchedCulinaries.map(cul => (
                    <Link to={`/culinary/${cul.id}`} key={cul.id} className="card hover-card" style={{ display: 'flex', gap: '1rem', padding: '1rem', border: '1px solid var(--hairline)', borderRadius: '4px', textDecoration: 'none', color: 'inherit' }}>
                      <img src={cul.image} alt={cul.name} style={{ width: '80px', height: '80px', objectFit: 'cover', borderRadius: '4px' }} />
                      <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
                        <h4 style={{ margin: '0 0 4px 0', fontSize: '0.95rem', fontWeight: 600 }}>{cul.name}</h4>
                        <span style={{ fontSize: '0.75rem', color: 'var(--semantic-success)', fontWeight: 600 }}>🍽️ Khas {cul.location}</span>
                      </div>
                    </Link>
                  ))}
                </div>
              ) : (
                <p style={{ color: 'var(--ink-muted)', fontSize: '0.85rem' }}>Belum ada kuliner terdekat yang terdaftar untuk lokasi ini.</p>
              )}
            </section>

            <section className="mb-8" style={{ marginBottom: '2.5rem' }}>
              <h2 className="font-semibold text-lg mb-4" style={{ fontSize: '1.4rem', borderBottom: '1px solid var(--hairline)', paddingBottom: '0.5rem', fontWeight: 300, color: 'var(--ink)' }}>
                Rekomendasi Belanja & UMKM Sekitar
              </h2>
              {matchedMsmes.length > 0 ? (
                <div className="grid md:grid-cols-2 gap-4" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '1rem' }}>
                  {matchedMsmes.map(msme => (
                    <Link to={`/msme/${msme.id}`} key={msme.id} className="card hover-card" style={{ display: 'flex', gap: '1rem', padding: '1rem', border: '1px solid var(--hairline)', borderRadius: '4px', textDecoration: 'none', color: 'inherit' }}>
                      <img src={msme.image} alt={msme.name} style={{ width: '80px', height: '80px', objectFit: 'cover', borderRadius: '4px' }} />
                      <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
                        <h4 style={{ margin: '0 0 4px 0', fontSize: '0.95rem', fontWeight: 600 }}>{msme.name}</h4>
                        <span style={{ fontSize: '0.75rem', color: 'var(--primary)', fontWeight: 600 }}>📦 {msme.product}</span>
                      </div>
                    </Link>
                  ))}
                </div>
              ) : (
                <p style={{ color: 'var(--ink-muted)', fontSize: '0.85rem' }}>Belum ada UMKM terdekat yang terdaftar untuk lokasi ini.</p>
              )}
            </section>

            {matchedEvents.length > 0 && (
              <section className="mb-8" style={{ marginBottom: '2.5rem' }}>
                <h2 className="font-semibold text-lg mb-4" style={{ fontSize: '1.4rem', borderBottom: '1px solid var(--hairline)', paddingBottom: '0.5rem', fontWeight: 300, color: 'var(--ink)' }}>
                  Acara Kebudayaan Terkait
                </h2>
                <div className="grid md:grid-cols-2 gap-4" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '1rem' }}>
                  {matchedEvents.map(event => (
                    <Link to={`/events/${event.id}`} key={event.id} className="card hover-card" style={{ display: 'flex', gap: '1rem', padding: '1rem', border: '1px solid var(--hairline)', borderRadius: '4px', textDecoration: 'none', color: 'inherit' }}>
                      <div style={{ backgroundColor: 'var(--primary)', color: 'white', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', width: '60px', height: '60px', borderRadius: '4px' }}>
                        <Calendar size={16} style={{ color: 'white' }} />
                        <span style={{ fontSize: '0.65rem', color: 'white', marginTop: '2px', textAlign: 'center' }}>{event.date}</span>
                      </div>
                      <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
                        <h4 style={{ margin: '0 0 4px 0', fontSize: '0.95rem', fontWeight: 600 }}>{event.name}</h4>
                        <span style={{ fontSize: '0.75rem', color: 'var(--semantic-error)', fontWeight: 600 }}>📅 {event.category}</span>
                      </div>
                    </Link>
                  ))}
                </div>
              </section>
            )}
          </div>

          {/* Right Sidebar Control Panel */}
          <div>
            <div className="card p-6" style={{ padding: '1.5rem', border: '1px solid var(--hairline)', backgroundColor: 'var(--surface-1)', borderRadius: '4px', position: 'sticky', top: '80px', marginBottom: '2rem' }}>
              <h3 style={{ fontSize: '1.1rem', fontWeight: 600, margin: '0 0 1rem 0' }}>Rencanakan Kunjungan</h3>
              
              {/* Itinerary Day Selection */}
              <div style={{ border: '1px solid var(--hairline)', padding: '12px', borderRadius: '4px', backgroundColor: 'var(--canvas)', marginBottom: '1.25rem' }}>
                <label style={{ fontSize: '0.8rem', fontWeight: 600, color: 'var(--ink-muted)', display: 'block', marginBottom: '8px' }}>
                  PILIH HARI RENCANA:
                </label>
                <div style={{ display: 'flex', gap: '4px', marginBottom: '12px' }}>
                  {[1, 2, 3].map(day => (
                    <button
                      key={day}
                      onClick={() => setActiveDay(day)}
                      style={{
                        flex: 1,
                        padding: '6px 0',
                        fontSize: '0.8rem',
                        backgroundColor: activeDay === day ? 'var(--primary)' : 'var(--surface-1)',
                        color: activeDay === day ? 'white' : 'var(--ink)',
                        border: '1px solid var(--hairline)',
                        borderRadius: '4px',
                        cursor: 'pointer',
                        fontWeight: 600
                      }}
                    >
                      Hari {day}
                    </button>
                  ))}
                </div>
                <button 
                  onClick={handleItineraryAdd}
                  className="btn btn-primary w-full"
                  style={{ justifyContent: 'center', fontSize: '0.85rem', padding: '10px', borderRadius: '4px' }}
                >
                  + Tambah ke Itinerary
                </button>
                {successMsg && (
                  <div style={{ fontSize: '0.75rem', color: 'green', marginTop: '8px', display: 'flex', alignItems: 'center', gap: '4px' }}>
                    <AlertCircle size={12} /> {successMsg}
                  </div>
                )}
              </div>

              {/* Action Buttons */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                <button 
                  onClick={() => toggleFavorite(dest.id, 'destination')}
                  className="btn btn-secondary w-full"
                  style={{ border: '1px solid var(--hairline-strong)', justifyContent: 'center', gap: '6px', borderRadius: '4px' }}
                >
                  <Heart size={16} fill={isFav ? 'var(--semantic-error)' : 'none'} stroke={isFav ? 'var(--semantic-error)' : 'currentColor'} />
                  {isFav ? 'Hapus dari Favorit' : 'Simpan ke Favorit'}
                </button>
                
                <Link 
                  to={`/maps?lat=${dest.lat}&lng=${dest.lng}`}
                  className="btn btn-ghost w-full"
                  style={{ border: '1px solid var(--hairline)', justifyContent: 'center', gap: '6px', borderRadius: '4px', backgroundColor: 'var(--canvas)' }}
                >
                  <Map size={16} /> Lihat Rute di Peta
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
