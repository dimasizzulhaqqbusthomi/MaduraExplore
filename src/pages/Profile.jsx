import React, { useContext, useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { AppContext } from '../context/AppContext';
import { User, MapPin, Heart, Clock, Trash2, ShieldAlert, LogIn, LogOut, Loader } from 'lucide-react';

const GOOGLE_CLIENT_ID = '915935440183-soo3op4jnvc19b1prmcivtkc3ukpgp07.apps.googleusercontent.com';

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

  // ---- User State ----
  const [user, setUser] = useState(() => {
    // Coba ambil dari localStorage jika sudah pernah login
    try {
      const saved = localStorage.getItem('maduraexplore_user');
      return saved ? JSON.parse(saved) : null;
    } catch { return null; }
  });

  // ---- Location State ----
  const [location, setLocation] = useState(() => {
    return localStorage.getItem('maduraexplore_location') || null;
  });
  const [locationLoading, setLocationLoading] = useState(false);
  const [locationError, setLocationError] = useState('');

  const googleBtnRef = useRef(null);

  // ---- Google Sign-In Init ----
  useEffect(() => {
    if (!window.google || user) return;

    window.google.accounts.id.initialize({
      client_id: GOOGLE_CLIENT_ID,
      callback: handleGoogleCredential,
      auto_select: false,
    });

    if (googleBtnRef.current) {
      window.google.accounts.id.renderButton(googleBtnRef.current, {
        type: 'standard',
        shape: 'rectangular',
        theme: 'outline',
        text: 'signin_with',
        size: 'large',
        logo_alignment: 'left',
        width: 280,
        locale: 'id_ID',
      });
    }
  }, [user]);

  // ---- Handle Google Credential (JWT decode) ----
  const handleGoogleCredential = (response) => {
    // Decode JWT payload (base64) tanpa library eksternal
    const payload = JSON.parse(atob(response.credential.split('.')[1]));
    const userData = {
      name: payload.name,
      email: payload.email,
      picture: payload.picture,
      given_name: payload.given_name,
    };
    setUser(userData);
    localStorage.setItem('maduraexplore_user', JSON.stringify(userData));
  };

  const handleLogout = () => {
    setUser(null);
    localStorage.removeItem('maduraexplore_user');
    if (window.google) {
      window.google.accounts.id.disableAutoSelect();
    }
  };

  // ---- Get Current Location ----
  const getLocation = () => {
    if (!navigator.geolocation) {
      setLocationError('Browser Anda tidak mendukung geolokasi.');
      return;
    }
    setLocationLoading(true);
    setLocationError('');
    navigator.geolocation.getCurrentPosition(
      async (pos) => {
        const { latitude, longitude } = pos.coords;
        try {
          // Reverse geocoding via free nominatim API
          const res = await fetch(
            `https://nominatim.openstreetmap.org/reverse?lat=${latitude}&lon=${longitude}&format=json&accept-language=id`
          );
          const data = await res.json();
          const city =
            data.address?.city ||
            data.address?.town ||
            data.address?.village ||
            data.address?.county ||
            'Lokasi Tidak Diketahui';
          const state = data.address?.state || '';
          const locationStr = state ? `${city}, ${state}` : city;
          setLocation(locationStr);
          localStorage.setItem('maduraexplore_location', locationStr);
        } catch {
          const fallback = `${latitude.toFixed(4)}°, ${longitude.toFixed(4)}°`;
          setLocation(fallback);
          localStorage.setItem('maduraexplore_location', fallback);
        }
        setLocationLoading(false);
      },
      (err) => {
        setLocationLoading(false);
        if (err.code === 1) setLocationError('Izin lokasi ditolak. Aktifkan lokasi di pengaturan browser.');
        else setLocationError('Gagal mendapatkan lokasi.');
      },
      { timeout: 10000 }
    );
  };

  // ---- Data ----
  const itineraryCount = (itinerary.day1?.length || 0) + (itinerary.day2?.length || 0) + (itinerary.day3?.length || 0);

  const favoriteItems = favorites.map(fav => {
    let originalItem = null;
    if (fav.type === 'destination') originalItem = destinations.find(d => d.id === fav.id);
    else if (fav.type === 'culinary') originalItem = culinaries.find(c => c.id === fav.id);
    else if (fav.type === 'event') originalItem = events.find(e => e.id === fav.id);
    else if (fav.type === 'msme') originalItem = msmes.find(m => m.id === fav.id);
    return originalItem ? { ...originalItem, type: fav.type } : null;
  }).filter(Boolean);

  const routePrefixes = { destination: 'destinations', culinary: 'culinary', event: 'events', msme: 'msme' };
  const typeLabels = { destination: 'Destinasi', culinary: 'Kuliner', event: 'Acara Budaya', msme: 'Toko UMKM' };

  const displayName = user ? user.name : 'Tamu';
  const displayLocation = location || 'Lokasi belum diatur';

  return (
    <div className="section" style={{ backgroundColor: 'var(--canvas)', minHeight: '100vh', paddingTop: '3rem', paddingBottom: '3rem' }}>
      <div className="container" style={{ maxWidth: '850px', margin: '0 auto' }}>

        {/* Profile Header Card */}
        <div className="card" style={{ padding: '2rem', display: 'flex', flexWrap: 'wrap', alignItems: 'center', gap: '2rem', border: '1px solid var(--hairline)', backgroundColor: 'var(--surface-1)', borderRadius: '4px', marginBottom: '2rem' }}>
          {/* Avatar */}
          <div style={{ flexShrink: 0 }}>
            {user?.picture ? (
              <img
                src={user.picture}
                alt={user.name}
                style={{ width: '90px', height: '90px', borderRadius: '50%', objectFit: 'cover', border: '2px solid var(--primary)' }}
              />
            ) : (
              <div style={{ width: '90px', height: '90px', borderRadius: '50%', backgroundColor: 'var(--surface-2)', display: 'flex', alignItems: 'center', justifyContent: 'center', border: '1px solid var(--hairline-strong)' }}>
                <User size={40} style={{ color: 'var(--primary)' }} />
              </div>
            )}
          </div>

          {/* Info */}
          <div style={{ flex: 1, minWidth: '200px' }}>
            <h1 style={{ fontSize: '1.75rem', fontWeight: 300, color: 'var(--ink)', margin: '0 0 4px 0' }}>
              {displayName}
            </h1>
            {user?.email && (
              <p style={{ fontSize: '0.8rem', color: 'var(--ink-muted)', margin: '0 0 8px 0' }}>{user.email}</p>
            )}

            {/* Location row */}
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '16px', flexWrap: 'wrap' }}>
              <span style={{ color: 'var(--ink-muted)', fontSize: '0.85rem', display: 'flex', alignItems: 'center', gap: '4px' }}>
                <MapPin size={14} /> {displayLocation}
              </span>
              <button
                onClick={getLocation}
                disabled={locationLoading}
                style={{ fontSize: '0.72rem', color: 'var(--primary)', background: 'transparent', border: '1px solid var(--primary)', borderRadius: '4px', padding: '2px 8px', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '4px' }}
              >
                {locationLoading ? <><Loader size={10} /> Mendeteksi...</> : '📍 Perbarui Lokasi'}
              </button>
            </div>
            {locationError && (
              <p style={{ fontSize: '0.75rem', color: 'var(--semantic-error)', margin: '-12px 0 12px 0' }}>{locationError}</p>
            )}

            {/* Badges */}
            <div style={{ display: 'flex', gap: '6px', flexWrap: 'wrap' }}>
              <span className="badge" style={{ backgroundColor: 'var(--primary)', color: 'white', fontSize: '0.7rem', padding: '4px 8px', borderRadius: '4px' }}>
                {user ? '✅ Masuk dengan Google' : '👤 Tamu'}
              </span>
              <span className="badge" style={{ backgroundColor: 'var(--canvas)', color: 'var(--ink)', fontSize: '0.7rem', padding: '4px 8px', borderRadius: '4px', border: '1px solid var(--hairline)' }}>
                ✨ {itineraryCount} Tempat Direncanakan
              </span>
              <span className="badge" style={{ backgroundColor: 'var(--canvas)', color: 'var(--ink)', fontSize: '0.7rem', padding: '4px 8px', borderRadius: '4px', border: '1px solid var(--hairline)' }}>
                ❤️ {favorites.length} Item Favorit
              </span>
            </div>
          </div>

          {/* Login / Logout button */}
          <div style={{ flexShrink: 0 }}>
            {user ? (
              <button
                onClick={handleLogout}
                className="btn btn-secondary"
                style={{ border: '1px solid var(--hairline-strong)', display: 'flex', alignItems: 'center', gap: '6px', fontSize: '0.85rem', borderRadius: '4px', padding: '10px 16px' }}
              >
                <LogOut size={16} /> Keluar
              </button>
            ) : (
              <div>
                <div ref={googleBtnRef} />
                <p style={{ fontSize: '0.72rem', color: 'var(--ink-muted)', marginTop: '8px', textAlign: 'center' }}>
                  Login untuk sinkronisasi
                </p>
              </div>
            )}
          </div>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {/* Favorites List */}
          <div className="md:col-span-2">
            <h2 style={{ fontSize: '1.25rem', fontWeight: 300, color: 'var(--ink)', marginBottom: '1.25rem', display: 'flex', alignItems: 'center', gap: '8px' }}>
              <Heart size={20} style={{ color: 'var(--semantic-error)' }} /> Daftar Pilihan &amp; Favorit Anda ({favoriteItems.length})
            </h2>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
              {favoriteItems.map(item => (
                <div
                  key={`${item.type}-${item.id}`}
                  className="card hover-card"
                  style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', padding: '12px 16px', gap: '1rem', border: '1px solid var(--hairline)', backgroundColor: 'var(--canvas)', borderRadius: '4px' }}
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
                    onClick={(e) => { e.stopPropagation(); toggleFavorite(item.id, item.type); }}
                    style={{ background: 'transparent', border: 'none', color: 'var(--semantic-error)', cursor: 'pointer', padding: '6px' }}
                    title="Hapus dari pilihan"
                  >
                    <Trash2 size={16} />
                  </button>
                </div>
              ))}
              {favoriteItems.length === 0 && (
                <div className="text-center py-12 text-subtle card" style={{ border: '1px dashed var(--hairline)', backgroundColor: 'var(--canvas)', borderRadius: '4px', color: 'var(--ink-muted)', fontSize: '0.85rem', padding: '2rem', textAlign: 'center' }}>
                  Belum ada destinasi, kuliner, UMKM, atau festival favorit yang disimpan.
                </div>
              )}
            </div>
          </div>

          {/* Controls Sidebar */}
          <div className="col-span-1">
            <h2 style={{ fontSize: '1.25rem', fontWeight: 300, color: 'var(--ink)', marginBottom: '1.25rem', display: 'flex', alignItems: 'center', gap: '8px' }}>
              <Clock size={20} style={{ color: 'var(--primary)' }} /> Pengaturan
            </h2>

            <div className="card p-4 mb-6" style={{ border: '1px solid var(--hairline)', backgroundColor: 'var(--canvas)', borderRadius: '4px', padding: '1rem', marginBottom: '1.5rem' }}>
              <h4 style={{ fontSize: '0.75rem', textTransform: 'uppercase', color: 'var(--ink-muted)', fontWeight: 600, marginBottom: '8px' }}>
                Status Sinkronisasi
              </h4>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', fontSize: '0.8rem', color: 'var(--ink)' }}>
                <div style={{ borderBottom: '1px solid var(--hairline)', paddingBottom: '8px' }}>
                  <div style={{ fontWeight: 600 }}>Tersimpan Otomatis</div>
                  <div style={{ color: 'var(--ink-muted)', fontSize: '0.72rem' }}>Favorit dan rencana perjalanan disimpan di browser Anda.</div>
                </div>
                <div>
                  <div style={{ fontWeight: 600 }}>Status Akun</div>
                  <div style={{ color: user ? 'var(--semantic-success)' : 'var(--ink-muted)', fontSize: '0.72rem' }}>
                    {user ? `✅ Masuk sebagai ${user.given_name || user.name}` : '⚪ Belum masuk — login dengan Google untuk identitas.'}
                  </div>
                </div>
              </div>
            </div>

            <div className="card p-4" style={{ border: '1px solid var(--hairline)', backgroundColor: 'var(--surface-1)', borderRadius: '4px', padding: '1rem' }}>
              <h4 style={{ fontSize: '0.75rem', textTransform: 'uppercase', color: 'var(--semantic-error)', fontWeight: 600, display: 'flex', alignItems: 'center', gap: '4px', marginBottom: '8px' }}>
                <ShieldAlert size={14} /> Zona Bahaya
              </h4>
              <p style={{ fontSize: '0.72rem', color: 'var(--ink-muted)', marginBottom: '12px', lineHeight: '1.4' }}>
                Tindakan ini akan menghapus seluruh data rencana perjalanan dan item favorit Anda.
              </p>
              <button
                onClick={() => {
                  if (window.confirm('Apakah Anda yakin ingin mengatur ulang semua data?')) {
                    resetAllData();
                    alert('Data berhasil di-reset!');
                  }
                }}
                className="btn btn-secondary w-full"
                style={{ backgroundColor: 'white', border: '1px solid var(--semantic-error)', color: 'var(--semantic-error)', fontSize: '0.8rem', padding: '8px', justifyContent: 'center', fontWeight: 600, borderRadius: '4px', cursor: 'pointer' }}
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
