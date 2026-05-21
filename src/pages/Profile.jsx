import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { AppContext } from '../context/AppContext';
import { User, MapPin, Heart, Clock, Trash2, ShieldAlert } from 'lucide-react';

export default function Profile() {
  const { 
    favorites, 
    itinerary, 
    destinations, 
    msmes, 
    events, 
    culinaries, 
    toggleFavorite,
    resetAllData 
  } = useContext(AppContext);

  // Count planned destinations across all 3 days
  const itineraryCount = (itinerary.day1?.length || 0) + (itinerary.day2?.length || 0) + (itinerary.day3?.length || 0);

  // Map favorite items back to their original objects
  const favoriteItems = favorites.map(fav => {
    let originalItem = null;
    if (fav.type === 'destination') originalItem = destinations.find(d => d.id === fav.id);
    else if (fav.type === 'culinary') originalItem = culinaries.find(c => c.id === fav.id);
    else if (fav.type === 'event') originalItem = events.find(e => e.id === fav.id);
    else if (fav.type === 'msme') originalItem = msmes.find(m => m.id === fav.id);

    return originalItem ? { ...originalItem, type: fav.type } : null;
  }).filter(Boolean);

  const routePrefixes = {
    destination: 'destinations',
    culinary: 'culinary',
    event: 'events',
    msme: 'msme'
  };

  const typeLabels = {
    destination: 'Destinasi',
    culinary: 'Kuliner',
    event: 'Acara Budaya',
    msme: 'Toko UMKM'
  };

  return (
    <div className="section" style={{ backgroundColor: 'var(--canvas)', minHeight: '100vh', padding: '3rem 0' }}>
      <div className="container" style={{ maxWidth: '850px', margin: '0 auto' }}>
        
        {/* Profile Header */}
        <div className="card" style={{ padding: '2rem', display: 'flex', flexWrap: 'wrap', alignItems: 'center', gap: '2rem', border: '1px solid var(--hairline)', backgroundColor: 'var(--surface-1)', borderRadius: '4px', marginBottom: '2rem' }}>
          <div 
            style={{ 
              width: '90px', 
              height: '90px', 
              borderRadius: '50%', 
              backgroundColor: 'var(--surface-2)', 
              display: 'flex', 
              alignItems: 'center', 
              justifyContent: 'center',
              border: '1px solid var(--hairline-strong)',
              flexShrink: 0
            }}
          >
            <User size={40} style={{ color: 'var(--primary)' }} />
          </div>
          <div>
            <h1 style={{ fontSize: '1.75rem', fontWeight: 300, color: 'var(--ink)', margin: '0 0 6px 0' }}>Budi Traveler</h1>
            <p style={{ color: 'var(--ink-muted)', fontSize: '0.85rem', display: 'flex', alignItems: 'center', gap: '4px', margin: '0 0 16px 0' }}>
              <MapPin size={14} /> Surabaya, Jawa Timur
            </p>
            <div style={{ display: 'flex', gap: '6px', flexWrap: 'wrap' }}>
              <span className="badge" style={{ backgroundColor: 'var(--primary)', color: 'white', fontSize: '0.7rem', padding: '4px 8px', borderRadius: '4px' }}>
                👤 Penjelajah Nusantara
              </span>
              <span className="badge" style={{ backgroundColor: 'var(--canvas)', color: 'var(--ink)', fontSize: '0.7rem', padding: '4px 8px', borderRadius: '4px', border: '1px solid var(--hairline)' }}>
                ✨ {itineraryCount} Tempat Direncanakan
              </span>
              <span className="badge" style={{ backgroundColor: 'var(--canvas)', color: 'var(--ink)', fontSize: '0.7rem', padding: '4px 8px', borderRadius: '4px', border: '1px solid var(--hairline)' }}>
                ❤️ {favorites.length} Item Favorit
              </span>
            </div>
          </div>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {/* Favorites List */}
          <div className="md:col-span-2">
            <h2 style={{ fontSize: '1.25rem', fontWeight: 300, color: 'var(--ink)', marginBottom: '1.25rem', display: 'flex', alignItems: 'center', gap: '8px' }}>
              <Heart size={20} style={{ color: 'var(--semantic-error)' }} /> Daftar Pilihan & Favorit Anda ({favoriteItems.length})
            </h2>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
              {favoriteItems.map(item => (
                <div 
                  key={`${item.type}-${item.id}`} 
                  className="card hover-card" 
                  style={{ 
                    display: 'flex', 
                    flexDirection: 'row', 
                    alignItems: 'center', 
                    padding: '12px 16px', 
                    gap: '1rem', 
                    border: '1px solid var(--hairline)',
                    backgroundColor: 'var(--canvas)',
                    borderRadius: '4px'
                  }}
                >
                  <img src={item.image} alt={item.name} style={{ width: '60px', height: '60px', objectFit: 'cover', borderRadius: '4px', flexShrink: 0 }} />
                  <div style={{ flexGrow: 1 }}>
                    <Link 
                      to={`/${routePrefixes[item.type]}/${item.id}`}
                      style={{ fontSize: '0.925rem', fontWeight: 600, color: 'var(--ink)', textDecoration: 'none', display: 'block', marginBottom: '4px' }}
                    >
                      {item.name || item.title || 'Pilihan Favorit'}
                    </Link>
                    <div style={{ display: 'flex', gap: '8px', alignItems: 'center', fontSize: '0.75rem', color: 'var(--ink-muted)' }}>
                      <span className="badge" style={{ backgroundColor: 'var(--surface-1)', color: 'var(--ink)', fontSize: '0.65rem', padding: '1px 6px', borderRadius: '4px' }}>
                        {typeLabels[item.type]}
                      </span>
                      <span>📍 Khas {item.location}</span>
                    </div>
                  </div>
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      toggleFavorite(item.id, item.type);
                    }}
                    style={{ background: 'transparent', border: 'none', color: 'var(--semantic-error)', cursor: 'pointer', padding: '6px' }}
                    title="Hapus dari pilihan"
                  >
                    <Trash2 size={16} />
                  </button>
                </div>
              ))}

              {favoriteItems.length === 0 && (
                <div className="text-center py-12 text-subtle card" style={{ border: '1px dashed var(--hairline)', backgroundColor: 'var(--canvas)', borderRadius: '4px', color: 'var(--ink-muted)', fontSize: '0.85rem' }}>
                  Belum ada destinasi, kuliner, UMKM, atau acara festival favorit yang disimpan.
                </div>
              )}
            </div>
          </div>

          {/* Controls Sidebar */}
          <div className="col-span-1">
            <h2 style={{ fontSize: '1.25rem', fontWeight: 300, color: 'var(--ink)', marginBottom: '1.25rem', display: 'flex', alignItems: 'center', gap: '8px' }}>
              <Clock size={20} style={{ color: 'var(--primary)' }} /> Pengaturan Platform
            </h2>
            
            <div className="card p-4 mb-6" style={{ border: '1px solid var(--hairline)', backgroundColor: 'var(--canvas)', borderRadius: '4px', padding: '1rem', marginBottom: '1.5rem' }}>
              <h4 style={{ fontSize: '0.75rem', textTransform: 'uppercase', color: 'var(--ink-muted)', fontWeight: 600, marginBottom: '8px', margin: 0 }}>
                Status Sinkronisasi
              </h4>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', fontSize: '0.8rem', color: 'var(--ink)' }}>
                <div style={{ borderBottom: '1px solid var(--hairline)', paddingBottom: '8px' }}>
                  <div style={{ fontWeight: 600 }}>Tersinkronisasi Otomatis</div>
                  <div style={{ color: 'var(--ink-muted)', fontSize: '0.72rem' }}>Semua rencana dan favorit disimpan di browser Anda via localStorage.</div>
                </div>
                <div>
                  <div style={{ fontWeight: 600 }}>Pencapaian SDG</div>
                  <div style={{ color: 'var(--ink-muted)', fontSize: '0.72rem' }}>Rencana Anda mendukung SDG 8 (ekonomi lokal) dan SDG 11 (pelestarian budaya).</div>
                </div>
              </div>
            </div>

            <div className="card p-4" style={{ border: '1px solid var(--hairline)', backgroundColor: 'var(--surface-1)', borderRadius: '4px', padding: '1rem' }}>
              <h4 style={{ fontSize: '0.75rem', textTransform: 'uppercase', color: 'var(--semantic-error)', fontWeight: 600, display: 'flex', alignItems: 'center', gap: '4px', marginBottom: '8px', margin: 0 }}>
                <ShieldAlert size={14} /> Zona Bahaya
              </h4>
              <p style={{ fontSize: '0.72rem', color: 'var(--ink-muted)', marginBottom: '12px', lineHeight: '1.4' }}>
                Tindakan ini akan menghapus seluruh data simulasi perjalanan, kegemaran, dan mengembalikan setelan awal aplikasi.
              </p>
              <button
                onClick={() => {
                  if (window.confirm('Apakah Anda yakin ingin mengatur ulang semua data simulasi pariwisata Madura Anda?')) {
                    resetAllData();
                    alert('Data berhasil di-reset!');
                  }
                }}
                className="btn btn-secondary w-full"
                style={{
                  backgroundColor: 'white',
                  border: '1px solid var(--semantic-error)',
                  color: 'var(--semantic-error)',
                  fontSize: '0.8rem',
                  padding: '8px',
                  justifyContent: 'center',
                  fontWeight: 600,
                  borderRadius: '4px',
                  cursor: 'pointer'
                }}
              >
                Reset Semua Data
              </button>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}
