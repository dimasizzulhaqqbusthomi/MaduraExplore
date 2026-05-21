import React, { useState, useContext } from 'react';
import { Search, Filter } from 'lucide-react';
import { AppContext } from '../context/AppContext';
import { CulinaryCard } from '../components/CardComponents';

export default function Culinary() {
  const { culinaries } = useContext(AppContext);
  const [searchQuery, setSearchQuery] = useState('');
  const [filterRegion, setFilterRegion] = useState('Semua');
  const [filterCategory, setFilterCategory] = useState('Semua');

  const regions = ['Semua', 'Bangkalan', 'Sampang', 'Pamekasan', 'Sumenep'];
  const categories = ['Semua', 'Makanan Berat', 'Makanan Kuah', 'Kudapan / Manis'];

  const filtered = culinaries.filter(c => {
    const matchesRegion = filterRegion === 'Semua' || c.location === filterRegion;
    const matchesCategory = filterCategory === 'Semua' || c.category === filterCategory;
    const query = searchQuery.toLowerCase().trim();
    const matchesSearch = !query || 
      c.name.toLowerCase().includes(query) ||
      c.location.toLowerCase().includes(query) ||
      c.category.toLowerCase().includes(query) ||
      c.description.toLowerCase().includes(query) ||
      c.shortDescription.toLowerCase().includes(query);

    return matchesRegion && matchesCategory && matchesSearch;
  });

  return (
    <div className="section" style={{ backgroundColor: 'var(--canvas)', minHeight: '100vh' }}>
      <div className="container">
        {/* Header */}
        <div style={{ marginBottom: '2.5rem' }}>
          <h1 style={{ fontSize: '2rem', fontWeight: 300, color: 'var(--ink)', marginBottom: '0.5rem' }}>
            Kuliner Legendaris Madura
          </h1>
          <p style={{ color: 'var(--ink-muted)', fontSize: '0.95rem', letterSpacing: '0.16px' }}>
            Jelajahi keunikan kuliner khas Madura yang kaya akan bumbu rempah-rempah otentik nusantara, mulai dari sate hingga kaldu kikil sapi.
          </p>
        </div>

        {/* Search */}
        <div className="card p-3 mb-8" style={{ border: '1px solid var(--hairline)', backgroundColor: 'var(--surface-1)', padding: '12px', marginBottom: '2rem', borderRadius: '4px' }}>
          <div style={{ display: 'flex', gap: '0.5rem' }}>
            <div style={{ position: 'relative', flexGrow: 1 }}>
              <input 
                type="text" 
                placeholder="Cari makanan khas Madura berdasarkan nama atau deskripsi..." 
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
              <Search size={18} style={{ position: 'absolute', left: '1rem', top: '50%', transform: 'translateY(-50%)', color: 'var(--ink-muted)' }} />
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

        {/* Layout */}
        <div className="grid md:grid-cols-4 gap-8">
          {/* Filters */}
          <div className="col-span-1">
            <div className="card p-4" style={{ padding: '1.5rem', border: '1px solid var(--hairline)', backgroundColor: 'var(--canvas)', borderRadius: '4px' }}>
              <h3 className="font-semibold flex items-center gap-2 mb-4" style={{ borderBottom: '1px solid var(--hairline)', paddingBottom: '0.75rem', fontSize: '1.1rem', fontWeight: 600 }}>
                <Filter size={18} /> Saring Kuliner
              </h3>
              
              <div className="mb-6">
                <h4 className="text-xs font-semibold mb-3" style={{ textTransform: 'uppercase', color: 'var(--ink-muted)', letterSpacing: '0.5px' }}>
                  Kabupaten Asal
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
                  Jenis Sajian
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
              {filtered.length > 0 ? filtered.map(cul => (
                <div key={cul.id}>
                  <CulinaryCard item={cul} />
                </div>
              )) : (
                <div className="col-span-3 text-center py-12 text-subtle card" style={{ border: '1px dashed var(--hairline)', borderRadius: '4px', backgroundColor: 'var(--surface-1)', color: 'var(--ink-muted)' }}>
                  Tidak ada makanan khas yang cocok dengan filter pencarian Anda.
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
