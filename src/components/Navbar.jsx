import { useState, useEffect } from 'react';

const links = [
  { label: 'About',      href: '#about' },
  { label: 'Experience', href: '#experience' },
  { label: 'Projects',   href: '#projects' },
  { label: 'Stack',      href: '#stack' },
  { label: 'Chat',       href: '#chat' },
  { label: 'Contact',    href: '#contact' },
];

export default function Navbar() {
  const [scrolled,  setScrolled]  = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300
      ${scrolled ? 'glass-nav py-2' : 'py-4 bg-transparent'}`}>

      <div className="max-w-6xl mx-auto px-6 flex items-center justify-between">

        {/* Logo */}
        <a href="#" className="flex items-center gap-2 group">
          <span style={{
            fontFamily: "'Space Grotesk', sans-serif",
            fontWeight: 700, fontSize: '1.4rem',
            color: '#4F9B93', letterSpacing: '-0.02em',
            transition: 'color 0.15s',
          }}
          onMouseEnter={e => e.currentTarget.style.color = '#7EC8C0'}
          onMouseLeave={e => e.currentTarget.style.color = '#4F9B93'}>
            HT
          </span>
        </a>

        {/* Desktop links */}
        <div className="hidden md:flex items-center gap-1">
          {links.map(l => (
            <a key={l.label} href={l.href}
               style={{
                 fontFamily: "'Space Grotesk', sans-serif",
                 fontWeight: 500, fontSize: 14,
                 color: 'rgba(224,237,244,0.55)',
                 padding: '6px 14px', borderRadius: 6,
                 border: '1px solid transparent',
                 transition: 'all 0.15s',
               }}
               onMouseEnter={e => {
                 e.currentTarget.style.color = '#E0EDF4';
                 e.currentTarget.style.borderColor = 'rgba(79,155,147,0.3)';
                 e.currentTarget.style.background = 'rgba(79,155,147,0.07)';
               }}
               onMouseLeave={e => {
                 e.currentTarget.style.color = 'rgba(224,237,244,0.55)';
                 e.currentTarget.style.borderColor = 'transparent';
                 e.currentTarget.style.background = 'transparent';
               }}>
              {l.label}
            </a>
          ))}
        </div>

        {/* Mobile hamburger */}
        <button
          className="md:hidden btn-icon-comic"
          onClick={() => setMenuOpen(o => !o)}
          aria-label="Toggle menu">
          {menuOpen ? (
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none"
              stroke="currentColor" strokeWidth="2.5">
              <line x1="18" y1="6"  x2="6"  y2="18"/>
              <line x1="6"  y1="6"  x2="18" y2="18"/>
            </svg>
          ) : (
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none"
              stroke="currentColor" strokeWidth="2.5">
              <line x1="3" y1="6"  x2="21" y2="6"/>
              <line x1="3" y1="12" x2="21" y2="12"/>
              <line x1="3" y1="18" x2="21" y2="18"/>
            </svg>
          )}
        </button>
      </div>

      {/* Mobile dropdown */}
      {menuOpen && (
        <div className="md:hidden mt-2 mx-4 panel px-6 py-5 flex flex-col gap-3">
          {links.map(l => (
            <a key={l.label} href={l.href}
               onClick={() => setMenuOpen(false)}
               style={{
                 fontFamily: "'Space Grotesk', sans-serif",
                 fontWeight: 500, fontSize: 16,
                 color: 'rgba(224,237,244,0.75)',
                 transition: 'color 0.15s',
               }}
               onMouseEnter={e => e.currentTarget.style.color = '#4F9B93'}
               onMouseLeave={e => e.currentTarget.style.color = 'rgba(224,237,244,0.75)'}>
              {l.label}
            </a>
          ))}
        </div>
      )}
    </nav>
  );
}
