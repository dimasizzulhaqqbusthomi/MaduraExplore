import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Compass, Menu, X, User } from 'lucide-react';

export default function Navbar() {
  const location = useLocation();
  const [isOpen, setIsOpen] = useState(false);
  
  const navLinks = [
    { name: 'Beranda', path: '/' },
    { name: 'Destinasi', path: '/explore' },
    { name: 'Kuliner', path: '/culinary' },
    { name: 'UMKM', path: '/msme' },
    { name: 'Festival', path: '/events' },
    { name: 'Peta', path: '/maps' },
    { name: 'Trip Planner', path: '/planner' },
  ];

  return (
    <nav className="navbar" style={{ position: 'sticky', top: 0, zIndex: 100, backgroundColor: 'var(--canvas)', borderBottom: '1px solid var(--hairline)' }}>
      <div className="container" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', height: '64px', position: 'relative' }}>
        {/* Brand */}
        <Link to="/" className="nav-brand" style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', textDecoration: 'none', fontWeight: 'bold', fontSize: '1.25rem' }}>
          <Compass className="text-primary" size={24} />
          Madura<span style={{ fontWeight: 'normal', color: 'var(--primary)' }}>Explore</span>
        </Link>
        
        {/* Desktop Navigation Links */}
        <div style={{ display: 'flex', gap: '1.25rem' }} className="hidden md:flex">
          {navLinks.map(link => (
            <Link 
              key={link.path} 
              to={link.path}
              className={`nav-link ${location.pathname === link.path ? 'active' : ''}`}
              style={{
                textDecoration: 'none',
                fontSize: '0.85rem',
                color: location.pathname === link.path ? 'var(--primary)' : 'var(--ink)',
                fontWeight: location.pathname === link.path ? 600 : 400
              }}
            >
              {link.name}
            </Link>
          ))}
        </div>

        {/* User Icon & Hamburger Toggle */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
          <Link to="/profile" className="btn btn-ghost" style={{ padding: '8px', display: 'flex', alignItems: 'center', justifyContent: 'center', borderRadius: '4px' }} title="Profil Pengguna">
            <User size={18} />
          </Link>

          {/* Hamburger Menu button */}
          <button 
            onClick={() => setIsOpen(!isOpen)}
            className="md:hidden btn btn-ghost" 
            style={{ padding: '8px', border: 'none', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', borderRadius: '4px' }}
            aria-label="Toggle Menu"
          >
            {isOpen ? <X size={18} /> : <Menu size={18} />}
          </button>
        </div>

        {/* Mobile Navigation Dropdown */}
        {isOpen && (
          <div 
            style={{
              position: 'absolute',
              top: '64px',
              left: 0,
              right: 0,
              backgroundColor: 'var(--canvas)',
              borderBottom: '1px solid var(--hairline-strong)',
              display: 'flex',
              flexDirection: 'column',
              padding: '1rem 1.5rem',
              gap: '12px',
              boxShadow: '0 4px 12px rgba(0,0,0,0.08)',
              zIndex: 99
            }}
            className="md:hidden"
          >
            {navLinks.map(link => (
              <Link 
                key={link.path} 
                to={link.path}
                onClick={() => setIsOpen(false)}
                className={`nav-link ${location.pathname === link.path ? 'active' : ''}`}
                style={{
                  textDecoration: 'none',
                  fontSize: '0.95rem',
                  padding: '6px 0',
                  color: location.pathname === link.path ? 'var(--primary)' : 'var(--ink)',
                  fontWeight: location.pathname === link.path ? 600 : 400,
                  borderBottom: '1px solid var(--hairline)'
                }}
              >
                {link.name}
              </Link>
            ))}
          </div>
        )}
      </div>
    </nav>
  );
}
