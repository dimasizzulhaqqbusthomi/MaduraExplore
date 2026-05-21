import { Link } from 'react-router-dom';
import { Map } from 'lucide-react';

export default function Footer() {
  return (
    <footer style={{ backgroundColor: 'var(--inverse-canvas)', color: 'var(--inverse-ink)', padding: '4rem 0 2rem 0', marginTop: 'auto' }}>
      <div className="container">
        <div className="grid md:grid-cols-3 gap-8 mb-8">
          <div>
            <h3 className="font-semibold mb-4 flex items-center gap-2">
              <Map size={20} />
              MaduraExplore
            </h3>
            <p className="text-subtle text-sm mb-4">
              Platform pariwisata terpadu Pulau Madura — temukan destinasi wisata, kuliner khas, produk UMKM lokal, dan acara budaya dari empat kabupaten: Bangkalan, Sampang, Pamekasan, dan Sumenep.
            </p>
          </div>
          
          <div>
            <h4 className="font-semibold mb-4">Jelajahi</h4>
            <div className="flex-col gap-2 text-sm text-subtle">
              <Link to="/explore" className="block mb-2 hover:text-white">Destinasi Wisata</Link>
              <Link to="/culinary" className="block mb-2 hover:text-white">Kuliner Khas</Link>
              <Link to="/msme" className="block mb-2 hover:text-white">UMKM Lokal</Link>
              <Link to="/events" className="block mb-2 hover:text-white">Festival Budaya</Link>
              <Link to="/planner" className="block mb-2 hover:text-white">Trip Planner</Link>
            </div>
          </div>
          
          <div>
            <h4 className="font-semibold mb-4">Tentang Madura</h4>
            <p className="text-subtle text-sm">
              Pulau Madura terkenal dengan kekayaan budayanya yang unik — dari tradisi Karapan Sapi, batik tulis gentongan, hingga kuliner khas seperti Sate Madura dan Kaldu Kokot yang mendunia. Empat kabupaten, satu pulau, seribu pesona.
            </p>
          </div>
        </div>
        
        <div style={{ borderTop: '1px solid var(--ink-muted)', paddingTop: '2rem', textAlign: 'center', fontSize: '0.875rem', color: 'var(--ink-subtle)' }}>
          © 2026 MaduraExplore. Platform Pariwisata Pulau Madura.
        </div>
      </div>
    </footer>
  );
}
