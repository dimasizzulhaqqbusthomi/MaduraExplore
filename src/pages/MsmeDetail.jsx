import React, { useContext } from 'react';
import { useParams, Link } from 'react-router-dom';
import { MapPin, Phone, Award, ShoppingBag, Heart, Map } from 'lucide-react';
import { AppContext } from '../context/AppContext';

export default function MsmeDetail() {
  const { id } = useParams();
  const { msmes, destinations, accommodations, toggleFavorite, isFavorite } = useContext(AppContext);

  const msme = msmes.find(m => m.id === parseInt(id));

  if (!msme) {
    return (
      <div className="section text-center" style={{ padding: '6rem 0', backgroundColor: 'var(--canvas)' }}>
        <div className="container card" style={{ maxWidth: '500px', margin: '0 auto', padding: '2rem', border: '1px solid var(--hairline)', borderRadius: '4px' }}>
          <h2 style={{ fontWeight: 300, marginBottom: '1rem' }}>Toko UMKM Tidak Ditemukan</h2>
          <p style={{ color: 'var(--ink-muted)', marginBottom: '1.5rem' }}>Maaf, toko kerajinan/UMKM lokal yang Anda cari tidak tersedia.</p>
          <Link to="/msme" className="btn btn-primary" style={{ borderRadius: '4px' }}>Kembali ke UMKM</Link>
        </div>
      </div>
    );
  }

  const isFav = isFavorite(msme.id, 'msme');

  // Coordinates mapping
  const coordMap = {
    1: { lat: -7.0912, lng: 112.7402 }, // Bangkalan
    2: { lat: -7.1142, lng: 113.7212 }, // Sumenep Ukir
    3: { lat: -7.2144, lng: 113.5412 }, // Pamekasan Lorjuk
    4: { lat: -7.0391, lng: 113.9302 }, // Sumenep Garam
    5: { lat: -7.1395, lng: 113.4302 }  // Pamekasan Klampar
  };

  const coords = coordMap[msme.id] || { lat: -7.1068, lng: 113.4862 };
  const mapUrl = `https://maps.google.com/maps?q=${coords.lat},${coords.lng}&t=m&z=15&output=embed&iwloc=near`;

  // Find nearby tourism spots
  const nearbySpots = destinations.filter(d => 
    msme.nearbyTourism?.some(name => d.name.toLowerCase().includes(name.toLowerCase()) || name.toLowerCase().includes(d.name.toLowerCase()))
  );

  return (
    <div style={{ backgroundColor: 'var(--canvas)', minHeight: '100vh', padding: '3rem 0' }}>
      <div className="container">
        {/* Breadcrumb */}
        <div style={{ marginBottom: '1.5rem', fontSize: '0.85rem', color: 'var(--ink-muted)' }}>
          <Link to="/" style={{ color: 'inherit', textDecoration: 'none' }}>Beranda</Link> &gt;{' '}
          <Link to="/msme" style={{ color: 'inherit', textDecoration: 'none' }}>Sektor UMKM</Link> &gt;{' '}
          <span style={{ color: 'var(--primary)', fontWeight: 600 }}>{msme.name}</span>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {/* Left Column: Image and Map */}
          <div className="md:col-span-1">
            <div className="card" style={{ border: '1px solid var(--hairline)', borderRadius: '4px', overflow: 'hidden', backgroundColor: 'var(--canvas)', marginBottom: '1.5rem' }}>
              <img src={msme.image} alt={msme.name} style={{ width: '100%', height: '240px', objectFit: 'cover' }} />
              <div style={{ padding: '1.25rem' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px' }}>
                  <span style={{ fontSize: '0.8rem', color: 'var(--ink-muted)' }}>⭐ Rating Mitra</span>
                  <span style={{ fontWeight: 600, color: 'var(--ink)' }}>{msme.rating.toFixed(1)} / 5.0</span>
                </div>
                <button 
                  onClick={() => toggleFavorite(msme.id, 'msme')}
                  className="btn btn-secondary w-full"
                  style={{ border: '1px solid var(--hairline-strong)', justifyContent: 'center', gap: '6px', borderRadius: '4px', marginTop: '12px' }}
                >
                  <Heart size={16} fill={isFav ? 'var(--semantic-error)' : 'none'} stroke={isFav ? 'var(--semantic-error)' : 'currentColor'} />
                  {isFav ? 'Hapus Toko Pilihan' : 'Simpan Toko Pilihan'}
                </button>
              </div>
            </div>

            {/* Google Map Frame */}
            <div className="card" style={{ border: '1px solid var(--hairline)', borderRadius: '4px', overflow: 'hidden', backgroundColor: 'var(--canvas)' }}>
              <div style={{ padding: '1rem', borderBottom: '1px solid var(--hairline)', fontWeight: 600, fontSize: '0.9rem' }}>
                🗺️ Lokasi Maps Mitra
              </div>
              <div style={{ height: '240px', width: '100%' }}>
                <iframe
                  title="Peta Lokasi UMKM"
                  width="100%"
                  height="100%"
                  style={{ border: 0 }}
                  loading="lazy"
                  src={mapUrl}
                ></iframe>
              </div>
            </div>
          </div>

          {/* Right Column: Details */}
          <div className="md:col-span-2">
            <div className="card" style={{ padding: '2rem', border: '1px solid var(--hairline)', borderRadius: '4px', backgroundColor: 'var(--canvas)' }}>
              <div style={{ display: 'flex', gap: '8px', marginBottom: '1rem' }}>
                <span className="badge" style={{ backgroundColor: 'var(--primary)', color: 'white', fontSize: '0.75rem', fontWeight: 600, padding: '4px 8px', borderRadius: '4px' }}>
                  {msme.category.toUpperCase()}
                </span>
                <span className="badge" style={{ backgroundColor: 'var(--surface-1)', color: 'var(--ink)', fontSize: '0.75rem', fontWeight: 600, padding: '4px 8px', borderRadius: '4px', border: '1px solid var(--hairline)' }}>
                  SDG 8: Decent Work
                </span>
              </div>

              <h1 style={{ fontSize: '2.25rem', fontWeight: 300, color: 'var(--ink)', margin: '0 0 8px 0' }}>{msme.name}</h1>
              <p style={{ display: 'flex', alignItems: 'center', gap: '4px', color: 'var(--ink-muted)', fontSize: '0.9rem', margin: '0 0 1.5rem 0' }}>
                <MapPin size={16} /> {msme.location}
              </p>

              <div style={{ borderTop: '1px solid var(--hairline)', borderBottom: '1px solid var(--hairline)', padding: '1.25rem 0', margin: '1.5rem 0', display: 'flex', flexWrap: 'wrap', gap: '2rem' }}>
                <div>
                  <div style={{ fontSize: '0.75rem', color: 'var(--ink-muted)', fontWeight: 600, marginBottom: '4px' }}>PRODUK ANDALAN</div>
                  <div style={{ fontWeight: 600, color: 'var(--primary)', fontSize: '1.1rem' }}>{msme.product}</div>
                </div>
                <div>
                  <div style={{ fontSize: '0.75rem', color: 'var(--ink-muted)', fontWeight: 600, marginBottom: '4px' }}>RENTANG HARGA</div>
                  <div style={{ fontWeight: 600, color: 'var(--ink)', fontSize: '1.1rem' }}>{msme.priceRange}</div>
                </div>
                <div>
                  <div style={{ fontSize: '0.75rem', color: 'var(--ink-muted)', fontWeight: 600, marginBottom: '4px' }}>KONTAK MITRA</div>
                  <div style={{ fontWeight: 600, color: 'var(--ink)', fontSize: '1.1rem', display: 'flex', alignItems: 'center', gap: '4px' }}>
                    <Phone size={16} style={{ color: 'green' }} /> {msme.contact}
                  </div>
                </div>
              </div>

              <h3 style={{ fontSize: '1.25rem', fontWeight: 300, color: 'var(--ink)', margin: '0 0 0.75rem 0' }}>Deskripsi Bisnis</h3>
              <p style={{ lineHeight: '1.6', color: 'var(--ink)', fontSize: '0.975rem', margin: '0 0 2rem 0', letterSpacing: '0.16px' }}>
                {msme.description}
              </p>

              <h3 style={{ fontSize: '1.25rem', fontWeight: 300, color: 'var(--ink)', margin: '0 0 1rem 0' }}>Destinasi Wisata Terdekat</h3>
              {nearbySpots.length > 0 ? (
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '1rem' }}>
                  {nearbySpots.map(dest => (
                    <Link to={`/destinations/${dest.id}`} key={dest.id} className="card hover-card" style={{ display: 'flex', gap: '1rem', padding: '1rem', border: '1px solid var(--hairline)', borderRadius: '4px', textDecoration: 'none', color: 'inherit' }}>
                      <img src={dest.image} alt={dest.name} style={{ width: '60px', height: '60px', objectFit: 'cover', borderRadius: '4px' }} />
                      <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
                        <h4 style={{ margin: '0 0 4px 0', fontSize: '0.9rem', fontWeight: 600 }}>{dest.name}</h4>
                        <span style={{ fontSize: '0.75rem', color: 'var(--ink-muted)' }}>Wisata {dest.category}</span>
                      </div>
                    </Link>
                  ))}
                </div>
              ) : (
                <p style={{ color: 'var(--ink-muted)', fontSize: '0.85rem' }}>Belum ada destinasi wisata terdekat yang didaftarkan.</p>
              )}
            </div>

            {/* Nearby Accommodations */}
            <div style={{ padding: '0', marginTop: '2rem' }}>
              <div style={{ border: '1px solid var(--hairline)', borderRadius: '8px', padding: '1.5rem', backgroundColor: 'var(--canvas)' }}>
                <h2 style={{ fontSize: '1.25rem', fontWeight: 600, marginBottom: '1rem', display: 'flex', alignItems: 'center', gap: '8px' }}>
                  Penginapan Terdekat
                </h2>
                {(() => {
                  const region = msme.location?.split(',').pop()?.trim() || msme.region;
                  const nearbyAccommodations = (accommodations || []).filter(a => a.region === region || a.region === msme.region || msme.location?.includes(a.region)).slice(0, 3);
                  return nearbyAccommodations.length > 0 ? (
                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(220px, 1fr))', gap: '1rem' }}>
                      {nearbyAccommodations.map(acc => (
                        <Link to={`/accommodations/${acc.id}`} key={acc.id} style={{ display: 'flex', gap: '10px', padding: '10px', border: '1px solid var(--hairline)', borderRadius: '6px', textDecoration: 'none', color: 'inherit', transition: 'border-color 0.2s' }}>
                          <img src={acc.image} alt={acc.name} style={{ width: '56px', height: '56px', objectFit: 'cover', borderRadius: '4px', flexShrink: 0 }} />
                          <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
                            <p style={{ margin: '0 0 2px', fontWeight: 600, fontSize: '0.85rem', lineHeight: 1.3 }}>{acc.name}</p>
                            <p style={{ margin: 0, fontSize: '0.72rem', color: 'var(--primary)', fontWeight: 600 }}>{'★'.repeat(acc.stars)} {acc.stars}★</p>
                            <p style={{ margin: 0, fontSize: '0.72rem', color: 'var(--ink-muted)' }}>{acc.pricePerNight}</p>
                          </div>
                        </Link>
                      ))}
                    </div>
                  ) : <p style={{ color: 'var(--ink-muted)', fontSize: '0.85rem' }}>Belum ada penginapan terdekat yang tersedia.</p>;
                })()}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
