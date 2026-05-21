import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { Star, MapPin, Heart, Calendar, Clock, Tag } from 'lucide-react';
import { AppContext } from '../context/AppContext';

// Destination Card
export function DestinationCard({ item }) {
  const { toggleFavorite, isFavorite } = useContext(AppContext);
  const isFav = isFavorite(item.id, 'destination');

  return (
    <div 
      className="card" 
      style={{ 
        display: 'flex', 
        flexDirection: 'column', 
        border: '1px solid var(--hairline)', 
        backgroundColor: 'var(--canvas)', 
        borderRadius: '4px', 
        overflow: 'hidden',
        height: '100%',
        transition: 'border-color 0.2s ease, background-color 0.2s ease'
      }}
    >
      <div style={{ position: 'relative', height: '200px', width: '100%' }}>
        <img 
          src={item.image} 
          alt={item.name} 
          style={{ width: '100%', height: '100%', objectFit: 'cover' }} 
        />
        <div style={{ position: 'absolute', top: '12px', left: '12px' }}>
          <span 
            className="badge" 
            style={{ 
              backgroundColor: 'var(--ink)', 
              color: 'var(--inverse-ink)', 
              fontWeight: 600, 
              fontSize: '0.75rem', 
              padding: '4px 8px', 
              borderRadius: '2px' 
            }}
          >
            {item.category}
          </span>
        </div>
        <button 
          onClick={(e) => {
            e.preventDefault();
            toggleFavorite(item.id, 'destination');
          }}
          style={{ 
            position: 'absolute', 
            top: '12px', 
            right: '12px', 
            background: 'rgba(255, 255, 255, 0.9)', 
            border: 'none', 
            borderRadius: '50%', 
            width: '36px', 
            height: '36px', 
            display: 'flex', 
            alignItems: 'center', 
            justifyContent: 'center', 
            cursor: 'pointer',
            boxShadow: '0 2px 5px rgba(0,0,0,0.1)'
          }}
          title={isFav ? "Hapus dari Favorit" : "Simpan ke Favorit"}
        >
          <Heart size={18} fill={isFav ? 'var(--semantic-error)' : 'none'} stroke={isFav ? 'var(--semantic-error)' : '#161616'} />
        </button>
      </div>

      <div style={{ padding: '16px', display: 'flex', flexDirection: 'column', flexGrow: 1 }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px' }}>
          <span style={{ fontSize: '0.8rem', color: 'var(--ink-muted)', display: 'flex', alignItems: 'center', gap: '4px' }}>
            <MapPin size={12} /> {item.location}
          </span>
          <span style={{ fontSize: '0.8rem', fontWeight: 600, color: 'var(--ink)', display: 'flex', alignItems: 'center', gap: '2px' }}>
            ⭐ {item.rating.toFixed(1)}
          </span>
        </div>

        <h3 style={{ fontSize: '1.2rem', fontWeight: 600, margin: '0 0 8px 0', color: 'var(--ink)', lineHeight: '1.3' }}>
          {item.name}
        </h3>

        <p style={{ fontSize: '0.85rem', color: 'var(--ink-muted)', margin: '0 0 16px 0', flexGrow: 1, lineHeight: '1.4' }}>
          {item.shortDescription}
        </p>

        <div style={{ display: 'flex', gap: '8px', marginTop: 'auto' }}>
          <Link 
            to={`/destinations/${item.id}`} 
            className="btn btn-primary" 
            style={{ flex: 1, justifyContent: 'center', fontSize: '0.85rem', padding: '10px 12px', borderRadius: '4px' }}
          >
            Lihat Detail
          </Link>
        </div>
      </div>
    </div>
  );
}

// MSME Card
export function MSMECard({ item }) {
  const { toggleFavorite, isFavorite } = useContext(AppContext);
  const isFav = isFavorite(item.id, 'msme');

  return (
    <div 
      className="card" 
      style={{ 
        display: 'flex', 
        flexDirection: 'column', 
        border: '1px solid var(--hairline)', 
        backgroundColor: 'var(--canvas)', 
        borderRadius: '4px', 
        overflow: 'hidden',
        height: '100%'
      }}
    >
      <div style={{ position: 'relative', height: '180px', width: '100%' }}>
        <img 
          src={item.image} 
          alt={item.name} 
          style={{ width: '100%', height: '100%', objectFit: 'cover' }} 
        />
        <div style={{ position: 'absolute', top: '12px', left: '12px' }}>
          <span 
            className="badge" 
            style={{ 
              backgroundColor: 'var(--primary)', 
              color: 'white', 
              fontWeight: 600, 
              fontSize: '0.75rem', 
              padding: '4px 8px', 
              borderRadius: '2px' 
            }}
          >
            {item.category.toUpperCase()}
          </span>
        </div>
        <button 
          onClick={(e) => {
            e.preventDefault();
            toggleFavorite(item.id, 'msme');
          }}
          style={{ 
            position: 'absolute', 
            top: '12px', 
            right: '12px', 
            background: 'rgba(255, 255, 255, 0.9)', 
            border: 'none', 
            borderRadius: '50%', 
            width: '36px', 
            height: '36px', 
            display: 'flex', 
            alignItems: 'center', 
            justifyContent: 'center', 
            cursor: 'pointer',
            boxShadow: '0 2px 5px rgba(0,0,0,0.1)'
          }}
        >
          <Heart size={18} fill={isFav ? 'var(--semantic-error)' : 'none'} stroke={isFav ? 'var(--semantic-error)' : '#161616'} />
        </button>
      </div>

      <div style={{ padding: '16px', display: 'flex', flexDirection: 'column', flexGrow: 1 }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px' }}>
          <span style={{ fontSize: '0.8rem', color: 'var(--ink-muted)', display: 'flex', alignItems: 'center', gap: '4px' }}>
            <MapPin size={12} /> {item.location}
          </span>
          <span style={{ fontSize: '0.8rem', fontWeight: 600, color: 'var(--ink)', display: 'flex', alignItems: 'center', gap: '2px' }}>
            ⭐ {item.rating.toFixed(1)}
          </span>
        </div>

        <h3 style={{ fontSize: '1.1rem', fontWeight: 600, margin: '0 0 4px 0', color: 'var(--ink)' }}>
          {item.name}
        </h3>
        
        <div style={{ fontSize: '0.8rem', color: 'var(--primary)', fontWeight: 600, marginBottom: '8px' }}>
          📦 {item.product}
        </div>

        <p style={{ fontSize: '0.85rem', color: 'var(--ink-muted)', margin: '0 0 16px 0', flexGrow: 1, lineHeight: '1.4' }}>
          {item.description.substring(0, 100)}...
        </p>

        <Link 
          to={`/msme/${item.id}`} 
          className="btn btn-secondary" 
          style={{ width: '100%', justifyContent: 'center', fontSize: '0.85rem', padding: '8px 12px', borderRadius: '4px', textAlign: 'center', border: '1px solid var(--hairline-strong)' }}
        >
          Detail Toko
        </Link>
      </div>
    </div>
  );
}

// Event Card
export function EventCard({ item }) {
  const { toggleFavorite, isFavorite } = useContext(AppContext);
  const isFav = isFavorite(item.id, 'event');

  return (
    <div 
      className="card" 
      style={{ 
        display: 'flex', 
        flexDirection: 'column', 
        border: '1px solid var(--hairline)', 
        backgroundColor: 'var(--canvas)', 
        borderRadius: '4px', 
        overflow: 'hidden',
        height: '100%'
      }}
    >
      <div style={{ position: 'relative', height: '180px', width: '100%' }}>
        <img 
          src={item.image} 
          alt={item.name} 
          style={{ width: '100%', height: '100%', objectFit: 'cover' }} 
        />
        <div style={{ position: 'absolute', top: '12px', left: '12px' }}>
          <span 
            className="badge" 
            style={{ 
              backgroundColor: 'var(--semantic-info)', 
              color: 'white', 
              fontWeight: 600, 
              fontSize: '0.72rem', 
              padding: '4px 8px', 
              borderRadius: '2px' 
            }}
          >
            {item.category.toUpperCase()}
          </span>
        </div>
        <button 
          onClick={(e) => {
            e.preventDefault();
            toggleFavorite(item.id, 'event');
          }}
          style={{ 
            position: 'absolute', 
            top: '12px', 
            right: '12px', 
            background: 'rgba(255, 255, 255, 0.9)', 
            border: 'none', 
            borderRadius: '50%', 
            width: '36px', 
            height: '36px', 
            display: 'flex', 
            alignItems: 'center', 
            justifyContent: 'center', 
            cursor: 'pointer',
            boxShadow: '0 2px 5px rgba(0,0,0,0.1)'
          }}
        >
          <Heart size={18} fill={isFav ? 'var(--semantic-error)' : 'none'} stroke={isFav ? 'var(--semantic-error)' : '#161616'} />
        </button>
      </div>

      <div style={{ padding: '16px', display: 'flex', flexDirection: 'column', flexGrow: 1 }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px' }}>
          <span style={{ fontSize: '0.8rem', color: 'var(--ink-muted)', display: 'flex', alignItems: 'center', gap: '4px' }}>
            <Calendar size={12} /> {item.date}
          </span>
          <span style={{ fontSize: '0.8rem', color: 'var(--ink-muted)', display: 'flex', alignItems: 'center', gap: '4px' }}>
            <MapPin size={12} /> {item.location.split(',')[1] || item.location}
          </span>
        </div>

        <h3 style={{ fontSize: '1.1rem', fontWeight: 600, margin: '0 0 8px 0', color: 'var(--ink)', lineHeight: '1.3' }}>
          {item.name}
        </h3>

        <p style={{ fontSize: '0.85rem', color: 'var(--ink-muted)', margin: '0 0 16px 0', flexGrow: 1, lineHeight: '1.4' }}>
          {item.shortDescription}
        </p>

        <Link 
          to={`/events/${item.id}`} 
          className="btn btn-secondary" 
          style={{ width: '100%', justifyContent: 'center', fontSize: '0.85rem', padding: '8px 12px', borderRadius: '4px', textAlign: 'center', border: '1px solid var(--hairline-strong)' }}
        >
          Lihat Acara
        </Link>
      </div>
    </div>
  );
}

// Culinary Card
export function CulinaryCard({ item }) {
  const { toggleFavorite, isFavorite } = useContext(AppContext);
  const isFav = isFavorite(item.id, 'culinary');

  return (
    <div 
      className="card" 
      style={{ 
        display: 'flex', 
        flexDirection: 'column', 
        border: '1px solid var(--hairline)', 
        backgroundColor: 'var(--canvas)', 
        borderRadius: '4px', 
        overflow: 'hidden',
        height: '100%'
      }}
    >
      <div style={{ position: 'relative', height: '180px', width: '100%' }}>
        <img 
          src={item.image} 
          alt={item.name} 
          style={{ width: '100%', height: '100%', objectFit: 'cover' }} 
        />
        <div style={{ position: 'absolute', top: '12px', left: '12px' }}>
          <span 
            className="badge" 
            style={{ 
              backgroundColor: 'var(--semantic-success)', 
              color: 'white', 
              fontWeight: 600, 
              fontSize: '0.72rem', 
              padding: '4px 8px', 
              borderRadius: '2px' 
            }}
          >
            {item.category}
          </span>
        </div>
        <button 
          onClick={(e) => {
            e.preventDefault();
            toggleFavorite(item.id, 'culinary');
          }}
          style={{ 
            position: 'absolute', 
            top: '12px', 
            right: '12px', 
            background: 'rgba(255, 255, 255, 0.9)', 
            border: 'none', 
            borderRadius: '50%', 
            width: '36px', 
            height: '36px', 
            display: 'flex', 
            alignItems: 'center', 
            justifyContent: 'center', 
            cursor: 'pointer',
            boxShadow: '0 2px 5px rgba(0,0,0,0.1)'
          }}
        >
          <Heart size={18} fill={isFav ? 'var(--semantic-error)' : 'none'} stroke={isFav ? 'var(--semantic-error)' : '#161616'} />
        </button>
      </div>

      <div style={{ padding: '16px', display: 'flex', flexDirection: 'column', flexGrow: 1 }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px' }}>
          <span style={{ fontSize: '0.8rem', color: 'var(--ink-muted)', display: 'flex', alignItems: 'center', gap: '4px' }}>
            <MapPin size={12} /> {item.location}
          </span>
          <span style={{ fontSize: '0.8rem', fontWeight: 600, color: 'var(--ink)', display: 'flex', alignItems: 'center', gap: '2px' }}>
            ⭐ {item.rating.toFixed(1)}
          </span>
        </div>

        <h3 style={{ fontSize: '1.1rem', fontWeight: 600, margin: '0 0 4px 0', color: 'var(--ink)' }}>
          {item.name}
        </h3>

        <div style={{ fontSize: '0.8rem', color: 'var(--ink-muted)', marginBottom: '8px' }}>
          💰 {item.priceRange}
        </div>

        <p style={{ fontSize: '0.85rem', color: 'var(--ink-muted)', margin: '0 0 16px 0', flexGrow: 1, lineHeight: '1.4' }}>
          {item.shortDescription}
        </p>

        <Link 
          to={`/culinary/${item.id}`} 
          className="btn btn-primary" 
          style={{ width: '100%', justifyContent: 'center', fontSize: '0.85rem', padding: '8px 12px', borderRadius: '4px', textAlign: 'center' }}
        >
          Lihat Kuliner
        </Link>
      </div>
    </div>
  );
}
