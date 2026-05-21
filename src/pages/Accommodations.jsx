import React, { useContext, useState } from 'react';
import { BedDouble, Search, Filter } from 'lucide-react';
import { AppContext } from '../context/AppContext';
import { AccommodationCard } from '../components/CardComponents';

export default function Accommodations() {
  const { accommodations } = useContext(AppContext);
  const [search, setSearch] = useState('');
  const [regionFilter, setRegionFilter] = useState('Semua');
  const [starsFilter, setStarsFilter] = useState('Semua');

  const regions = ['Semua', 'Bangkalan', 'Sampang', 'Pamekasan', 'Sumenep'];
  const starOptions = ['Semua', '2', '3', '4'];

  const filtered = accommodations.filter(acc => {
    const matchSearch = acc.name.toLowerCase().includes(search.toLowerCase()) ||
      acc.location.toLowerCase().includes(search.toLowerCase());
    const matchRegion = regionFilter === 'Semua' || acc.region === regionFilter;
    const matchStars = starsFilter === 'Semua' || acc.stars === parseInt(starsFilter);
    return matchSearch && matchRegion && matchStars;
  });

  return (
    <div style={{ backgroundColor: 'var(--canvas)', minHeight: '100vh' }}>
      {/* Page Header */}
      <section style={{ backgroundColor: 'var(--surface-1)', borderBottom: '1px solid var(--hairline)', padding: '2.5rem 0' }}>
        <div className="container">
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '0.5rem' }}>
            <BedDouble size={28} style={{ color: 'var(--primary)' }} />
            <h1 style={{ fontSize: '2rem', fontWeight: 300, margin: 0 }}>Penginapan di Madura</h1>
          </div>
          <p style={{ color: 'var(--ink-muted)', marginBottom: '1.5rem', maxWidth: '600px' }}>
            Temukan penginapan terbaik dari 4 kabupaten Madura — dari wisma ekonomis hingga boutique hotel premium yang memanjakan.
          </p>

          {/* Search bar */}
          <div style={{ display: 'flex', gap: '0.75rem', flexWrap: 'wrap' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', background: 'var(--canvas)', border: '1px solid var(--hairline)', borderRadius: '4px', padding: '0 12px', flex: '1 1 280px', maxWidth: '400px' }}>
              <Search size={16} style={{ color: 'var(--ink-muted)' }} />
              <input
                type="text"
                placeholder="Cari nama atau lokasi penginapan..."
                value={search}
                onChange={e => setSearch(e.target.value)}
                style={{ border: 'none', outline: 'none', padding: '10px 0', width: '100%', background: 'transparent', color: 'var(--ink)', fontSize: '0.9rem' }}
              />
            </div>

            {/* Region filter */}
            <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap', alignItems: 'center' }}>
              <Filter size={14} style={{ color: 'var(--ink-muted)' }} />
              {regions.map(r => (
                <button key={r} onClick={() => setRegionFilter(r)}
                  style={{
                    padding: '8px 14px', borderRadius: '4px', fontSize: '0.8rem', cursor: 'pointer',
                    border: '1px solid var(--hairline)',
                    background: regionFilter === r ? 'var(--primary)' : 'var(--canvas)',
                    color: regionFilter === r ? 'white' : 'var(--ink)',
                    fontWeight: regionFilter === r ? 600 : 400,
                    transition: 'all 0.2s ease'
                  }}>{r}</button>
              ))}
            </div>

            {/* Stars filter */}
            <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap', alignItems: 'center' }}>
              {starOptions.map(s => (
                <button key={s} onClick={() => setStarsFilter(s)}
                  style={{
                    padding: '8px 14px', borderRadius: '4px', fontSize: '0.8rem', cursor: 'pointer',
                    border: '1px solid var(--hairline)',
                    background: starsFilter === s ? 'var(--ink)' : 'var(--canvas)',
                    color: starsFilter === s ? 'white' : 'var(--ink)',
                    fontWeight: starsFilter === s ? 600 : 400,
                    transition: 'all 0.2s ease'
                  }}>{s === 'Semua' ? 'Semua Bintang' : `${s}★`}</button>
              ))}
            </div>
          </div>

          <p style={{ marginTop: '1rem', fontSize: '0.85rem', color: 'var(--ink-muted)' }}>
            Menampilkan <strong>{filtered.length}</strong> penginapan
          </p>
        </div>
      </section>

      {/* Grid */}
      <section style={{ padding: '2.5rem 0' }}>
        <div className="container">
          {filtered.length === 0 ? (
            <div style={{ textAlign: 'center', padding: '4rem 0', color: 'var(--ink-muted)' }}>
              <BedDouble size={48} style={{ opacity: 0.3, marginBottom: '1rem' }} />
              <p>Tidak ada penginapan yang sesuai filter.</p>
            </div>
          ) : (
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: '1.25rem' }}>
              {filtered.map(acc => (
                <AccommodationCard key={acc.id} item={acc} />
              ))}
            </div>
          )}
        </div>
      </section>
    </div>
  );
}
