import React, { useState, useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Search, MapPin, Calendar, Store, Compass, ArrowRight } from 'lucide-react';
import { AppContext } from '../context/AppContext';
import { DestinationCard, CulinaryCard } from '../components/CardComponents';

export default function Home() {
  const [searchQuery, setSearchQuery] = useState('');
  const { destinations, msmes, events, culinaries } = useContext(AppContext);
  const navigate = useNavigate();

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/destinations?search=${encodeURIComponent(searchQuery.trim())}`);
    }
  };

  return (
    <div>
      {/* Hero Section */}
      <section className="section text-white" style={{ backgroundColor: 'var(--primary)', color: 'white', padding: '6rem 0', position: 'relative', overflow: 'hidden' }}>
        <div style={{
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          backgroundImage: 'linear-gradient(rgba(10, 37, 64, 0.82), rgba(10, 37, 64, 0.9)), url("https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&q=80&w=1200")',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          zIndex: 1
        }}></div>
        
        <div className="container text-center" style={{ position: 'relative', zIndex: 2 }}>
          <h1 className="font-semibold mb-4 text-white" style={{ color: 'white', fontSize: '2.5rem', textShadow: '0 2px 4px rgba(0,0,0,0.3)', fontWeight: 300 }}>
            Integrasi Pariwisata & Ekonomi Kreatif Madura
          </h1>
          <p className="text-lg mb-8 max-w-2xl mx-auto" style={{ maxWidth: '800px', margin: '0 auto 2.5rem auto', opacity: 0.95, textShadow: '0 1px 2px rgba(0,0,0,0.3)', fontSize: '1.1rem' }}>
            Platform pariwisata satu pintu terintegrasi untuk menjelajahi keindahan alam, kebudayaan luhur, kuliner legendaris, dan industri UMKM unggulan di Bangkalan, Sampang, Pamekasan, dan Sumenep.
          </p>
          
          <div className="flex justify-center gap-4 mb-8" style={{ display: 'flex', justifyContent: 'center', gap: '1rem', marginBottom: '2.5rem' }}>
            <Link to="/destinations" className="btn btn-primary" style={{ backgroundColor: 'var(--canvas)', color: 'var(--primary)', fontWeight: 600, border: 'none', padding: '12px 24px', borderRadius: '4px' }}>
              Mulai Menjelajah
            </Link>
            <Link to="/itinerary" className="btn btn-secondary" style={{ borderColor: 'white', border: '1px solid white', color: 'white', fontWeight: 600, padding: '12px 24px', borderRadius: '4px' }}>
              Rencanakan Perjalanan
            </Link>
          </div>
          
          <form onSubmit={handleSearchSubmit} style={{ maxWidth: '600px', margin: '0 auto', background: 'white', display: 'flex', padding: '6px', borderRadius: '4px', boxShadow: '0 4px 12px rgba(0,0,0,0.2)' }}>
            <input 
              type="text" 
              placeholder="Cari destinasi, kuliner, atau kerajinan khas..." 
              className="input" 
              style={{ border: 'none', flexGrow: 1, padding: '10px 16px', outline: 'none', color: '#161616', borderRadius: '2px' }}
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
            <button type="submit" className="btn btn-primary" style={{ padding: '10px 20px', borderRadius: '2px', display: 'flex', alignItems: 'center' }}>
              <Search size={20} />
            </button>
          </form>
        </div>
      </section>

      {/* Quick Categories */}
      <section className="section" style={{ padding: '4rem 0', backgroundColor: 'var(--surface-1)' }}>
        <div className="container">
          <h2 className="text-center font-semibold mb-8" style={{ fontSize: '1.75rem', fontWeight: 300, color: 'var(--ink)', textAlign: 'center', marginBottom: '2.5rem' }}>
            Telusuri Berdasarkan Ekosistem
          </h2>
          <div className="grid md:grid-cols-5 gap-4 text-center">
            {[
              { name: 'Wisata Alam & Pantai', icon: <Compass size={24} />, path: '/destinations?cat=Alam' },
              { name: 'Kuliner Legendaris', icon: <Store size={24} />, path: '/culinary' },
              { name: 'UMKM & Batik Kreatif', icon: <Store size={24} />, path: '/msme' },
              { name: 'Acara & Festival Budaya', icon: <Calendar size={24} />, path: '/events' },
              { name: 'Peta Interaktif Lokasi', icon: <MapPin size={24} />, path: '/maps' },
            ].map(cat => (
              <Link to={cat.path} key={cat.name} className="card hover-card" style={{ padding: '2rem 1.5rem', display: 'flex', flexDirection: 'column', alignItems: 'center', transition: 'all 0.2s', border: '1px solid var(--hairline)', backgroundColor: 'var(--canvas)', textDecoration: 'none', borderRadius: '4px' }}>
                <div style={{ color: 'var(--primary)', marginBottom: '12px' }}>{cat.icon}</div>
                <div style={{ fontWeight: 600, fontSize: '0.95rem', color: 'var(--ink)' }}>{cat.name}</div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Popular Destinations */}
      <section className="section" style={{ padding: '5rem 0', backgroundColor: 'var(--canvas)' }}>
        <div className="container">
          <div className="flex justify-between items-center mb-8" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginBottom: '2rem' }}>
            <div>
              <h2 className="font-semibold mb-1" style={{ fontSize: '1.75rem', fontWeight: 300, color: 'var(--ink)', margin: 0 }}>Destinasi Wisata Ikonik</h2>
              <p style={{ color: 'var(--ink-muted)', fontSize: '0.9rem', margin: '4px 0 0 0' }}>Destinasi wisata unggulan paling dicari di Pulau Madura.</p>
            </div>
            <Link to="/destinations" style={{ color: 'var(--primary)', fontWeight: 600, display: 'flex', alignItems: 'center', gap: '4px', textDecoration: 'none' }}>
              Lihat Semua <ArrowRight size={16} />
            </Link>
          </div>
          <div className="grid md:grid-cols-4 gap-6">
            {destinations.slice(0, 4).map(dest => (
              <div key={dest.id}>
                <DestinationCard item={dest} />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Culinary Showcase */}
      <section className="section" style={{ padding: '5rem 0', backgroundColor: 'var(--surface-1)' }}>
        <div className="container">
          <div className="flex justify-between items-center mb-8" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginBottom: '2rem' }}>
            <div>
              <h2 className="font-semibold mb-1" style={{ fontSize: '1.75rem', fontWeight: 300, color: 'var(--ink)', margin: 0 }}>Rasa Nusantara Khas Madura</h2>
              <p style={{ color: 'var(--ink-muted)', fontSize: '0.9rem', margin: '4px 0 0 0' }}>Kuliner tradisional legendaris beraroma bumbu rempah yang khas.</p>
            </div>
            <Link to="/culinary" style={{ color: 'var(--primary)', fontWeight: 600, display: 'flex', alignItems: 'center', gap: '4px', textDecoration: 'none' }}>
              Lihat Semua Kuliner <ArrowRight size={16} />
            </Link>
          </div>
          <div className="grid md:grid-cols-3 gap-6">
            {culinaries.slice(0, 3).map(cul => (
              <div key={cul.id}>
                <CulinaryCard item={cul} />
              </div>
            ))}
          </div>
        </div>
      </section>
      
      {/* MSMEs & Events preview */}
      <section className="section" style={{ padding: '5rem 0', backgroundColor: 'var(--canvas)' }}>
        <div className="container">
          <div className="grid md:grid-cols-2 gap-8">
            {/* MSMEs */}
            <div>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem' }}>
                <div>
                  <h2 className="font-semibold mb-0" style={{ fontSize: '1.5rem', fontWeight: 300 }}>Sentra Kreatif & UMKM</h2>
                  <p style={{ fontSize: '0.85rem', color: 'var(--ink-muted)', margin: '2px 0 0 0' }}>Dukung pertumbuhan usaha ekonomi warga lokal.</p>
                </div>
                <Link to="/msme" style={{ color: 'var(--primary)', fontWeight: 600, fontSize: '0.9rem', textDecoration: 'none' }}>Lihat Semua &rarr;</Link>
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                {msmes.slice(0, 3).map(msme => (
                  <Link to={`/msme/${msme.id}`} key={msme.id} style={{ display: 'flex', gap: '1rem', padding: '1rem', border: '1px solid var(--hairline)', backgroundColor: 'var(--canvas)', borderRadius: '4px', textDecoration: 'none', color: 'inherit' }}>
                    <img src={msme.image} alt={msme.name} style={{ width: '80px', height: '80px', objectFit: 'cover', borderRadius: '4px' }} />
                    <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
                      <h4 style={{ margin: '0 0 4px 0', fontSize: '1rem', fontWeight: 600 }}>{msme.name}</h4>
                      <p style={{ margin: '0 0 6px 0', fontSize: '0.8rem', color: 'var(--ink-muted)' }}>📍 {msme.location}</p>
                      <span className="badge" style={{ backgroundColor: 'var(--surface-1)', color: 'var(--primary)', padding: '2px 6px', fontSize: '0.7rem', width: 'fit-content' }}>
                        {msme.category}
                      </span>
                    </div>
                  </Link>
                ))}
              </div>
            </div>

            {/* Events */}
            <div>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem' }}>
                <div>
                  <h2 className="font-semibold mb-0" style={{ fontSize: '1.5rem', fontWeight: 300 }}>Jadwal Acara Budaya</h2>
                  <p style={{ fontSize: '0.85rem', color: 'var(--ink-muted)', margin: '2px 0 0 0' }}>Saksikan kemeriahan perayaan adat tradisi Madura.</p>
                </div>
                <Link to="/events" style={{ color: 'var(--primary)', fontWeight: 600, fontSize: '0.9rem', textDecoration: 'none' }}>Lihat Semua &rarr;</Link>
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                {events.slice(0, 3).map(event => (
                  <Link to={`/events/${event.id}`} key={event.id} style={{ display: 'flex', gap: '1rem', padding: '1rem', border: '1px solid var(--hairline)', backgroundColor: 'var(--canvas)', borderRadius: '4px', textDecoration: 'none', color: 'inherit' }}>
                    <div style={{ backgroundColor: 'var(--primary)', color: 'white', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', minWidth: '70px', height: '80px', borderRadius: '4px' }}>
                      <Calendar size={18} style={{ color: 'white', marginBottom: '4px' }} />
                      <div style={{ fontSize: '0.75rem', fontWeight: 600, color: 'white' }}>{event.date}</div>
                    </div>
                    <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
                      <h4 style={{ margin: '0 0 4px 0', fontSize: '1rem', fontWeight: 600 }}>{event.name}</h4>
                      <p style={{ margin: '0 0 6px 0', fontSize: '0.8rem', color: 'var(--ink-muted)' }}>📍 {event.location}</p>
                      <span className="badge" style={{ backgroundColor: 'var(--surface-1)', color: 'var(--semantic-error)', padding: '2px 6px', fontSize: '0.7rem', width: 'fit-content' }}>
                        {event.category}
                      </span>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
