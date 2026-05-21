import React, { useState, useContext } from 'react';
import { Store, Search, Filter } from 'lucide-react';
import { AppContext } from '../context/AppContext';
import { MSMECard } from '../components/CardComponents';

export default function Msme() {
  const { msmes } = useContext(AppContext);
  const [searchQuery, setSearchQuery] = useState('');
  const [filterRegion, setFilterRegion] = useState('Semua');
  const [filterCategory, setFilterCategory] = useState('Semua');

  const regions = ['Semua', 'Bangkalan', 'Sampang', 'Pamekasan', 'Sumenep'];
  const categories = ['Semua', 'batik', 'handicrafts', 'local food', 'creative products', 'souvenirs'];

  // Map category names for UI display
  const categoryLabels = {
    'Semua': 'Semua Kategori',
    'batik': 'Batik & Fesyen',
    'handicrafts': 'Kerajinan Ukir & Kayu',
    'local food': 'Makanan Khas Olahan',
    'creative products': 'Produk Garam & Spa',
    'souvenirs': 'Suvenir & Pernak-pernik'
  };

  const filtered = msmes.filter(m => {
    const matchesRegion = filterRegion === 'Semua' || m.location.toLowerCase().includes(filterRegion.toLowerCase());
    const matchesCategory = filterCategory === 'Semua' || m.category === filterCategory;
    const query = searchQuery.toLowerCase().trim();
    const matchesSearch = !query || 
      m.name.toLowerCase().includes(query) ||
      m.location.toLowerCase().includes(query) ||
      m.category.toLowerCase().includes(query) ||
      m.product.toLowerCase().includes(query) ||
      m.description.toLowerCase().includes(query);

    return matchesRegion && matchesCategory && matchesSearch;
  });

  return (
    <div className="section" style={{ backgroundColor: 'var(--canvas)', minHeight: '100vh' }}>
      <div className="container">
        {/* Title Section */}
        <div style={{ marginBottom: '2.5rem' }}>
          <h1 style={{ fontSize: '2rem', fontWeight: 300, color: 'var(--ink)', marginBottom: '0.5rem' }}>
            Ekosistem UMKM & Ekonomi Kreatif Madura
          </h1>
          <p style={{ color: 'var(--ink-muted)', fontSize: '0.95rem', letterSpacing: '0.16px' }}>
            Mendukung SDG 8 dengan mempromosikan pariwisata yang berkelanjutan, menciptakan lapangan kerja produktif, serta melestarikan warisan batik dan kerajinan khas Madura.
          </p>
        </div>

        {/* Search Bar */}
        <div className="card p-3 mb-8" style={{ border: '1px solid var(--hairline)', backgroundColor: 'var(--surface-1)', padding: '12px', marginBottom: '2rem', borderRadius: '4px' }}>
          <div style={{ display: 'flex', gap: '0.5rem' }}>
            <div style={{ position: 'relative', flexGrow: 1 }}>
              <input 
                type="text" 
                placeholder="Cari toko UMKM berdasarkan nama, produk, atau keahlian..." 
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

        {/* Sidebar and Grid */}
        <div className="grid md:grid-cols-4 gap-8">
          {/* Filters */}
          <div className="col-span-1">
            <div className="card p-4" style={{ padding: '1.5rem', border: '1px solid var(--hairline)', backgroundColor: 'var(--canvas)', borderRadius: '4px' }}>
              <h3 className="font-semibold flex items-center gap-2 mb-4" style={{ borderBottom: '1px solid var(--hairline)', paddingBottom: '0.75rem', fontSize: '1.1rem', fontWeight: 600 }}>
                <Filter size={18} /> Saring Usaha
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
                  Sektor Kreatif
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
                      {categoryLabels[c] || c}
                    </label>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Results Grid */}
          <div className="md:col-span-3">
            <div className="grid md:grid-cols-3 gap-6">
              {filtered.length > 0 ? filtered.map(msme => (
                <div key={msme.id}>
                  <MSMECard item={msme} />
                </div>
              )) : (
                <div className="col-span-3 text-center py-12 text-subtle card" style={{ border: '1px dashed var(--hairline)', borderRadius: '4px', backgroundColor: 'var(--surface-1)', color: 'var(--ink-muted)' }}>
                  Tidak ada toko UMKM yang cocok dengan filter pencarian Anda.
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
