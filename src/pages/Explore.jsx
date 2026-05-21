import React, { useState, useEffect, useContext } from 'react';
import { useSearchParams } from 'react-router-dom';
import { Filter, Search } from 'lucide-react';
import { AppContext } from '../context/AppContext';
import { DestinationCard } from '../components/CardComponents';

export default function Explore() {
  const { destinations } = useContext(AppContext);
  const [searchParams, setSearchParams] = useSearchParams();
  
  // States
  const [searchQuery, setSearchQuery] = useState('');
  const [filterRegion, setFilterRegion] = useState('Semua');
  const [filterCategory, setFilterCategory] = useState('Semua');

  // Handle Initial Search Params from Home redirect
  useEffect(() => {
    const searchVal = searchParams.get('search');
    const catVal = searchParams.get('cat');
    if (searchVal) setSearchQuery(searchVal);
    if (catVal) {
      // Map English Category values to Indonesian if needed
      const catMap = {
        'nature': 'Alam',
        'beach': 'Pantai',
        'culture': 'Budaya',
        'religious': 'Religi',
        'historical': 'Sejarah'
      };
      setFilterCategory(catMap[catVal.toLowerCase()] || catVal);
    }
  }, [searchParams]);

  const regions = ['Semua', 'Bangkalan', 'Sampang', 'Pamekasan', 'Sumenep'];
  const categories = ['Semua', 'Alam', 'Pantai', 'Budaya', 'Religi', 'Sejarah'];

  // Full Search & Filter Logic
  const filtered = destinations.filter(d => {
    const matchesRegion = filterRegion === 'Semua' || d.location === filterRegion;
    const matchesCategory = filterCategory === 'Semua' || d.category === filterCategory;
    
    // Multi-criteria search
    const query = searchQuery.toLowerCase().trim();
    const matchesSearch = !query || 
      d.name.toLowerCase().includes(query) ||
      d.location.toLowerCase().includes(query) ||
      d.category.toLowerCase().includes(query) ||
      (d.shortDescription && d.shortDescription.toLowerCase().includes(query)) ||
      (d.description && d.description.toLowerCase().includes(query));

    return matchesRegion && matchesCategory && matchesSearch;
  });

  return (
    <div className="section" style={{ backgroundColor: 'var(--canvas)' }}>
      <div className="container">
        {/* Header Section */}
        <div style={{ marginBottom: '2.5rem' }}>
          <h1 className="font-semibold" style={{ fontSize: '2rem', marginBottom: '0.5rem', fontWeight: 300, color: 'var(--ink)' }}>
            Jelajahi Destinasi Madura
          </h1>
          <p style={{ color: 'var(--ink-muted)', fontSize: '0.95rem', letterSpacing: '0.16px' }}>
            Temukan objek wisata alam eksotis, pantai pasir putih, budaya, religi, dan peninggalan sejarah terbaik di Pulau Madura.
          </p>
        </div>

        {/* Local Search Bar */}
        <div className="card p-3 mb-8" style={{ border: '1px solid var(--hairline)', backgroundColor: 'var(--surface-1)', padding: '12px', marginBottom: '2rem', borderRadius: '4px' }}>
          <div style={{ display: 'flex', gap: '0.5rem' }}>
            <div style={{ position: 'relative', flexGrow: 1 }}>
              <input 
                type="text" 
                placeholder="Cari destinasi berdasarkan nama, deskripsi, atau wilayah..." 
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
              <Search size={18} className="text-subtle" style={{ position: 'absolute', left: '1rem', top: '50%', transform: 'translateY(-50%)', color: 'var(--ink-muted)' }} />
            </div>
            {searchQuery && (
              <button 
                onClick={() => setSearchQuery('')}
                className="btn btn-ghost"
                style={{ border: '1px solid var(--hairline-strong)', fontSize: '0.9rem', padding: '11px 16px', borderRadius: '4px' }}
              >
                Reset
              </button>
            )}
          </div>
        </div>

        {/* Main Grid Section */}
        <div className="grid md:grid-cols-4 gap-8">
          {/* Sidebar Filters */}
          <div className="col-span-1">
            <div className="card p-4" style={{ padding: '1.5rem', border: '1px solid var(--hairline)', backgroundColor: 'var(--canvas)', borderRadius: '4px' }}>
              <h3 className="font-semibold flex items-center gap-2 mb-4" style={{ borderBottom: '1px solid var(--hairline)', paddingBottom: '0.75rem', fontSize: '1.1rem', fontWeight: 600 }}>
                <Filter size={18} /> Saring Pencarian
              </h3>
              
              <div className="mb-6">
                <h4 className="text-xs font-semibold mb-3" style={{ textTransform: 'uppercase', color: 'var(--ink-muted)', letterSpacing: '0.5px' }}>
                  Wilayah Kabupaten
                </h4>
                <div className="flex-col gap-2">
                  {regions.map(r => (
                    <label key={r} className="flex items-center gap-2 text-sm mb-2 cursor-pointer" style={{ color: filterRegion === r ? 'var(--primary)' : 'var(--ink)', fontWeight: filterRegion === r ? 600 : 400 }}>
                      <input 
                        type="radio" 
                        name="region" 
                        checked={filterRegion === r}
                        onChange={() => setFilterRegion(r)}
                        style={{ cursor: 'pointer' }}
                      />
                      {r}
                    </label>
                  ))}
                </div>
              </div>

              <div>
                <h4 className="text-xs font-semibold mb-3" style={{ textTransform: 'uppercase', color: 'var(--ink-muted)', letterSpacing: '0.5px' }}>
                  Kategori Wisata
                </h4>
                <div className="flex-col gap-2">
                  {categories.map(c => (
                    <label key={c} className="flex items-center gap-2 text-sm mb-2 cursor-pointer" style={{ color: filterCategory === c ? 'var(--primary)' : 'var(--ink)', fontWeight: filterCategory === c ? 600 : 400 }}>
                      <input 
                        type="radio" 
                        name="category" 
                        checked={filterCategory === c}
                        onChange={() => setFilterCategory(c)}
                        style={{ cursor: 'pointer' }}
                      />
                      {c}
                    </label>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Results Grid */}
          <div className="md:col-span-3">
            <div className="grid md:grid-cols-3 gap-6">
              {filtered.length > 0 ? filtered.map(dest => (
                <div key={dest.id}>
                  <DestinationCard item={dest} />
                </div>
              )) : (
                <div className="col-span-3 text-center py-12 text-subtle card" style={{ border: '1px dashed var(--hairline)', borderRadius: '4px', backgroundColor: 'var(--surface-1)', color: 'var(--ink-muted)' }}>
                  Tidak ada destinasi wisata yang cocok dengan kriteria pencarian Anda.
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
